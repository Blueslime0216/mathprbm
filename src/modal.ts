// modal.ts

// 모달 컨테이너의 고유 ID를 상수로 정의합니다.
const MODAL_CONTAINER_ID = 'modal-container';

/**
 * 모달 컨테이너를 생성하거나 이미 존재하는 컨테이너를 반환하는 함수입니다.
 * 모달이 여러 개 동시에 표시될 경우, 하나의 컨테이너 내에 쌓아두어 관리합니다.
 * 
 * @returns HTMLElement - 모달 컨테이너 요소
 */
function createModalContainer(): HTMLElement {
    // 문서에서 기존에 생성된 모달 컨테이너를 찾습니다.
    let container = document.getElementById(MODAL_CONTAINER_ID);
    // 만약 컨테이너가 존재하지 않으면 새로 생성합니다.
    if (!container) {
        container = document.createElement('div');
        // 생성한 컨테이너에 고유 ID를 부여합니다.
        container.id = MODAL_CONTAINER_ID;
        // 컨테이너의 스타일을 설정하여 화면 하단 왼쪽에 고정시키고,
        // 내부 요소들을 수직으로 정렬하며, 간격을 설정합니다.
        Object.assign(container.style, {
            position: 'fixed',          // 화면에 고정되어 스크롤에 영향을 받지 않음
            left: '20px',               // 왼쪽에서 20px 떨어진 위치
            bottom: '20px',             // 하단에서 20px 떨어진 위치
            zIndex: '10000',            // 다른 요소 위에 표시하기 위한 높은 z-index
            display: 'flex',            // 플렉스 박스로 내부 요소들을 정렬
            flexDirection: 'column',    // 수직 방향으로 정렬
            gap: '10px',                // 각 모달 간의 간격을 10px로 설정
            alignItems: 'flex-start',   // 왼쪽 정렬
            pointerEvents: 'none'       // 기본적으로 클릭 이벤트를 받지 않음 (필요 시 개별 요소에서 활성화)
        });
        // 문서의 body에 생성한 컨테이너를 추가합니다.
        document.body.appendChild(container);
    }
    // 생성되었거나 기존의 컨테이너를 반환합니다.
    return container;
}

/**
 * 모달을 표시하고, 지정된 시간(기본 5000ms) 후 자동으로 종료하는 함수입니다.
 * 모달 상단에 진행바를 표시하여 남은 시간을 시각적으로 보여줍니다.
 * 
 * @param message - 모달에 표시할 메시지 내용
 * @param type - 메시지의 종류 ('info', 'success', 'warning', 'error')
 * @param duration - 모달이 자동 종료되기 전까지의 시간 (밀리초 단위, 0이면 자동 종료 없음)
 */
export function showModal(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', duration: number = 5000) {
    // 모달 컨테이너를 생성하거나 가져옵니다.
    const container = createModalContainer();
    // 새로운 모달 요소를 생성합니다.
    const modal = document.createElement('div');
    // 모달에 기본 스타일 클래스 'message-box'와 타입에 따른 클래스 'message-{type}'를 추가합니다.
    modal.classList.add('message-box', `message-${type}`);
    // 모달 요소에 마우스 이벤트를 받을 수 있도록 pointerEvents를 활성화합니다.
    modal.style.pointerEvents = 'auto';

    // 자동 종료 시간이 설정된 경우(duration > 0), 진행바를 포함한 모달 HTML 구조를 생성합니다.
    if (duration > 0) {
        modal.innerHTML = `
            <div class="modal-progress-container">
                <div class="modal-progress-bar"></div>
            </div>
            <div class="message-header">
                <span class="message-title">${type.toUpperCase()}</span>
                <button class="message-close" aria-label="Close">&times;</button>
            </div>
            <div class="message-content">${message}</div>
        `;
    } else {
        // 자동 종료 시간이 0인 경우, 진행바 없이 기본 모달 HTML 구조를 생성합니다.
        modal.innerHTML = `
            <div class="message-header">
                <span class="message-title">${type.toUpperCase()}</span>
                <button class="message-close" aria-label="Close">&times;</button>
            </div>
            <div class="message-content">${message}</div>
        `;
    }

    // 진행바 업데이트에 사용될 타이머 ID를 저장할 변수 (없으면 null)
    let progressTimer: number | null = null;
    // 자동 종료 시간이 설정된 경우 진행바를 업데이트합니다.
    if (duration > 0) {
        // 모달 내부의 진행바 요소를 선택합니다.
        const progressBar = modal.querySelector('.modal-progress-bar') as HTMLElement;
        // 모달이 표시된 시점을 기준으로 현재 시간을 기록합니다.
        const startTime = Date.now();
        // 일정 간격(100ms)마다 진행바의 너비를 업데이트하는 타이머를 설정합니다.
        progressTimer = window.setInterval(() => {
            // 경과된 시간 계산
            const elapsed = Date.now() - startTime;
            // 남은 시간을 계산 (음수가 되지 않도록 Math.max 사용)
            const remaining = Math.max(duration - elapsed, 0);
            // 남은 시간의 비율을 백분율로 계산합니다.
            const percentage = (remaining / duration) * 100;
            // 진행바의 너비를 업데이트하여 남은 시간을 시각적으로 표현합니다.
            progressBar.style.width = percentage + '%';
            // 만약 남은 시간이 0이 되면 타이머를 중지합니다.
            if (remaining <= 0) {
                clearInterval(progressTimer!);
            }
        }, 100);
    }

    // 모달 입장 애니메이션 효과를 적용하기 위해 'modal-enter' 클래스를 추가합니다.
    modal.classList.add('modal-enter');
    // 애니메이션이 종료되면 'modal-enter' 클래스를 제거하여 상태를 초기화합니다.
    modal.addEventListener('animationend', () => {
        modal.classList.remove('modal-enter');
    });

    // 모달의 닫기 버튼에 클릭 이벤트를 등록하여 사용자가 직접 모달을 종료할 수 있도록 합니다.
    modal.querySelector('.message-close')?.addEventListener('click', () => {
        closeModal(modal, progressTimer);
    });

    // 자동 종료 시간이 설정되어 있으면, 지정된 시간이 지난 후 모달을 자동으로 닫습니다.
    if (duration > 0) {
        setTimeout(() => {
            // 모달이 여전히 DOM에 존재할 경우, closeModal 함수를 호출하여 종료합니다.
            if (modal.parentElement) {
                closeModal(modal, progressTimer);
            }
        }, duration);
    }

    // 최종적으로 생성한 모달 요소를 모달 컨테이너에 추가하여 화면에 표시합니다.
    container.appendChild(modal);
}

/**
 * 모달을 종료(닫기)하는 함수입니다.
 * 진행바 업데이트 타이머가 실행 중이면 중지하고, 모달에 종료 애니메이션을 적용한 후 DOM에서 제거합니다.
 * 
 * @param modal - 종료할 모달 요소
 * @param progressTimer - 진행바 업데이트에 사용된 타이머 ID (없으면 null)
 */
function closeModal(modal: HTMLElement, progressTimer: number | null) {
    // 진행바 업데이트 타이머가 설정되어 있으면 타이머를 중지합니다.
    if (progressTimer) {
        clearInterval(progressTimer);
    }
    // 모달에 종료 애니메이션 효과를 적용하기 위해 'modal-exit' 클래스를 추가합니다.
    modal.classList.add('modal-exit');
    // 애니메이션이 종료되면 모달 요소를 DOM에서 제거합니다.
    modal.addEventListener('animationend', () => {
        modal.remove();
    });
}
