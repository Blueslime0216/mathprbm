// modal.ts

const MODAL_CONTAINER_ID = 'modal-container';

function createModalContainer(): HTMLElement {
  let container = document.getElementById(MODAL_CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.id = MODAL_CONTAINER_ID;
    Object.assign(container.style, {
      position: 'fixed',
      left: '20px',
      bottom: '20px',
      zIndex: '10000',
      display: 'flex',
      flexDirection: 'column-reverse', // 새 모달이 아래에 추가되어 기존 모달이 위로 밀림
      gap: '10px',
      alignItems: 'flex-start',
      pointerEvents: 'none' // 컨테이너는 클릭 이벤트를 비활성화, 개별 모달에서 활성화
    });
    document.body.appendChild(container);
  }
  return container;
}

export function showModal(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
  const container = createModalContainer();
  const modal = document.createElement('div');
  modal.classList.add('message-box', `message-${type}`);
  modal.style.pointerEvents = 'auto'; // 모달 내부의 버튼 등 클릭 가능하게 처리

  modal.innerHTML = `
    <div class="message-header">
      <span class="message-title">${type.toUpperCase()}</span>
      <button class="message-close" aria-label="Close">&times;</button>
    </div>
    <div class="message-content">${message}</div>
  `;

  // 입장 애니메이션 적용
  modal.classList.add('modal-enter');
  modal.addEventListener('animationend', () => {
    modal.classList.remove('modal-enter');
  });

  // 닫기 버튼 클릭 시 퇴장 애니메이션 후 제거
  modal.querySelector('.message-close')?.addEventListener('click', () => {
    modal.classList.add('modal-exit');
    modal.addEventListener('animationend', () => {
      modal.remove();
    });
  });

  container.appendChild(modal);
}
