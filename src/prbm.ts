// 모듈 import 구문
// 모달 창을 보여주는 showModal 함수를 modal 모듈에서 가져옴
import { showModal } from "./modal";
// 페이지 레이아웃이나 내용 업데이트를 위한 updatePages 함수를 page 모듈에서 가져옴
import { updatePages } from "./page";

/* ========== 드래그 앤 드롭 기능 구현 ========== */
// .problem-item 클래스를 가진 모든 요소들을 선택하여 problemItems 변수에 저장함
const problemItems = document.querySelectorAll<HTMLElement>('.problem-item');
// 문제 리스트를 나타내는 컨테이너(.problem-list)를 선택하여 problemList 변수에 저장함
const problemList = document.querySelector('.problem-list') as HTMLElement;
// 현재 드래그 중인 요소를 저장하기 위한 변수 (없을 경우 null)
let draggedItem: HTMLElement | null = null;

// 각 문제 아이템에 대해 드래그 관련 이벤트를 등록함
problemItems.forEach(item => {
    // 드래그 시작 시 실행되는 이벤트 리스너 등록
    item.addEventListener('dragstart', function () {
        // 현재 드래그 시작한 요소를 draggedItem 변수에 할당
        draggedItem = this;
        // 비동기적으로 (0ms 후 실행) 시각적 효과를 적용
        setTimeout(() => {
            // 드래그 중임을 표시하기 위해 'dragging' 클래스 추가
            this.classList.add('dragging');
            // 드래그 중인 요소의 투명도를 0.5로 설정하여 시각적으로 구분
            this.style.opacity = '0.5'; // 드래그 중인 요소의 투명도 변경
            // 드래그 중인 요소에 그림자를 추가하여 강조 효과 부여
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // 드래그 중인 요소에 그림자 추가
        }, 0);
    });

    // 드래그 종료 시 실행되는 이벤트 리스너 등록
    item.addEventListener('dragend', function () {
        // 'dragging' 클래스를 제거하여 드래그 상태 해제
        this.classList.remove('dragging');
        // 투명도를 원래 상태로 복원 (빈 문자열로 초기화)
        this.style.opacity = ''; // 드래그 종료 시 투명도 원래대로
        // 그림자 효과 제거
        this.style.boxShadow = ''; // 드래그 종료 시 그림자 제거
        // 현재 드래그 중인 요소 변수 초기화
        draggedItem = null;
    });
});

// 문제 리스트 컨테이너에 대해 드래그 오버 이벤트를 등록하여 요소 이동 위치 결정
problemList.addEventListener('dragover', (e: DragEvent) => {
    // 기본 동작(예: 링크 열기 등) 방지
    e.preventDefault();
    // 드래그 중인 요소를 삽입할 적절한 위치(요소)를 계산
    const afterElement = getDragAfterElement(problemList, e.clientY);
    // 현재 'dragging' 클래스를 가진 요소(드래그 중인 요소)를 선택
    const draggable = document.querySelector('.dragging') as HTMLElement;
    // 적절한 위치가 없다면 리스트의 마지막에 요소 추가, 있다면 해당 요소 앞에 삽입
    if (afterElement == null) {
        problemList.appendChild(draggable);
    } else {
        problemList.insertBefore(draggable, afterElement);
    }
});

/**
 * 드래그 중인 요소를 기준으로 마우스의 Y 좌표 위치에 가장 가까운 문제 아이템을 찾는 함수
 * @param container - 문제 아이템들이 포함된 컨테이너 요소
 * @param y - 현재 마우스의 Y 좌표 (클라이언트 좌표)
 * @returns 드래그된 요소를 삽입할 위치에 해당하는 요소 (없으면 null)
 */
function getDragAfterElement(container: HTMLElement, y: number): HTMLElement | null {
    // 컨테이너 내에서 'dragging' 클래스가 없는 모든 문제 아이템들을 배열로 변환
    const draggableElements = [...container.querySelectorAll<HTMLElement>('.problem-item:not(.dragging)')];
    // 배열의 각 요소에 대해 마우스 위치와 요소 중심의 차이를 계산하여,
    // 현재 마우스 위치보다 위쪽에 있으면서 가장 가까운 요소를 찾음
    return draggableElements.reduce(
        (closest: { offset: number; element: HTMLElement | null }, child: HTMLElement) => {
            // 각 요소의 위치와 크기를 가져옴
            const box = child.getBoundingClientRect();
            // 요소의 중간 지점과 비교하여 마우스와의 거리 차이를 계산
            const offset = y - box.top - box.height / 2;
            // offset이 음수(마우스가 해당 요소 위에 있음)이고, 이전보다 더 가까운 경우 갱신
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        // 초기값은 가장 작은 offset과 null 요소로 설정
        { offset: Number.NEGATIVE_INFINITY, element: null }
    ).element;
}

/* ========== 문제 추가 및 편집 기능 구현 ========== */
// '문제 추가' 버튼 요소를 가져옴 (id가 'add-problem')
const addProblemButton = document.getElementById('add-problem') as HTMLButtonElement;
// 문제 입력 필드 요소를 가져옴 (id가 'problem-text')
const problemTextInput = document.getElementById('problem-text') as HTMLInputElement;

// '문제 추가' 버튼 클릭 시 실행되는 이벤트 리스너 등록
addProblemButton.addEventListener('click', () => {
    // 입력 필드의 값에서 좌우 공백을 제거하여 문제 텍스트 추출
    const problemText = problemTextInput.value.trim();
    // 만약 입력값이 비어있다면 경고 모달 창을 띄우고 함수 종료
    if (!problemText) {
        showModal('문제를 선택해주세요.', 'warning');
        return;
    }
    // 새 문제 아이템을 생성하기 위한 div 요소를 동적으로 생성
    const newProblem = document.createElement('div');
    // 새 문제 아이템에 'problem-item' 클래스를 부여하여 스타일 및 이벤트 적용 대상이 되게 함
    newProblem.className = 'problem-item';
    // 새 요소를 드래그 가능하도록 설정
    newProblem.draggable = true;
    // 새 문제 아이템 내부의 HTML 구조를 정의
    // 문제 텍스트와 기본 정보(난이도: 보통, 배점: 10점) 및 편집 버튼 포함
    newProblem.innerHTML = `
        <div class="problem-textDiv">
            <div class="problem-text">${problemText}</div>
            <div class="problem-info">난이도: 보통 | 배점: 10점</div>
        </div>
        <button class="edit" title="편집"><i class="material-icons">edit</i></button>
    `;
    // 생성한 문제 아이템을 문제 리스트 컨테이너에 추가
    problemList.appendChild(newProblem);
    // 페이지의 미리보기 영역 등 필요한 업데이트를 수행하는 함수 호출
    updatePages();
    // 입력 필드 초기화
    problemTextInput.value = '';
    // 새로 생성한 문제 아이템에 대해 드래그 및 편집 이벤트 등록
    addProblemEvents(newProblem);
});

/**
 * 특정 문제 아이템에 대해 드래그 및 편집 이벤트를 추가하는 함수
 * @param problem - 이벤트를 등록할 문제 아이템 요소
 */
function addProblemEvents(problem: HTMLElement): void {
    // 문제 아이템에 드래그 시작 이벤트 등록
    problem.addEventListener('dragstart', function () {
        // 현재 드래그 중인 요소로 할당
        draggedItem = this;
        // 비동기적으로 'dragging' 클래스 추가 (시각적 효과 적용)
        setTimeout(() => {
            this.classList.add('dragging');
        }, 0);
    });
    // 문제 아이템에 드래그 종료 이벤트 등록
    problem.addEventListener('dragend', function () {
        // 'dragging' 클래스 제거하여 시각적 효과 해제
        this.classList.remove('dragging');
        // 드래그 중인 요소 변수 초기화
        draggedItem = null;
    });

    // 문제 아이템 내부의 편집 버튼을 선택
    const editButton = problem.querySelector('.edit') as HTMLElement;
    // 편집 버튼 클릭 시 실행되는 이벤트 리스너 등록
    editButton.addEventListener('click', () => {
        // 임시로 편집 이벤트 실행 시 모달을 띄움
        showModal('편집 기능이 준비 중입니다.', 'info');
        // 추가 편집 로직을 여기에 구현 가능
    });
}

// 기존에 로드된 문제 아이템들에도 드래그 및 편집 이벤트를 등록함
problemItems.forEach(item => addProblemEvents(item));
