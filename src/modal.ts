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
      flexDirection: 'column', // 새 모달이 컨테이너 하단에 추가되어 아래에서 위로 등장
      gap: '10px',
      alignItems: 'flex-start',
      pointerEvents: 'none'
    });
    document.body.appendChild(container);
  }
  return container;
}

/**
 * 모달을 표시하고, 지정 시간(기본 5000ms) 후 자동 종료합니다.
 * 모달 상단에 진행바를 표시하여 남은 시간을 시각적으로 보여줍니다.
 * @param message - 표시할 메시지
 * @param type - 메시지 타입 ('info' | 'success' | 'warning' | 'error')
 * @param duration - 자동 종료 시간 (밀리초, 0이면 자동 종료 없음)
 */
export function showModal(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', duration: number = 5000) {
  const container = createModalContainer();
  const modal = document.createElement('div');
  modal.classList.add('message-box', `message-${type}`);
  modal.style.pointerEvents = 'auto';

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
    modal.innerHTML = `
      <div class="message-header">
        <span class="message-title">${type.toUpperCase()}</span>
        <button class="message-close" aria-label="Close">&times;</button>
      </div>
      <div class="message-content">${message}</div>
    `;
  }

  let progressTimer: number | null = null;
  if (duration > 0) {
    const progressBar = modal.querySelector('.modal-progress-bar') as HTMLElement;
    const startTime = Date.now();
    progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(duration - elapsed, 0);
      const percentage = (remaining / duration) * 100;
      progressBar.style.width = percentage + '%';
      if (remaining <= 0) {
        clearInterval(progressTimer!);
      }
    }, 100);
  }

  modal.classList.add('modal-enter');
  modal.addEventListener('animationend', () => {
    modal.classList.remove('modal-enter');
  });

  modal.querySelector('.message-close')?.addEventListener('click', () => {
    closeModal(modal, progressTimer);
  });

  if (duration > 0) {
    setTimeout(() => {
      if (modal.parentElement) {
        closeModal(modal, progressTimer);
      }
    }, duration);
  }

  container.appendChild(modal);
}

function closeModal(modal: HTMLElement, progressTimer: number | null) {
  if (progressTimer) {
    clearInterval(progressTimer);
  }
  modal.classList.add('modal-exit');
  modal.addEventListener('animationend', () => {
    modal.remove();
  });
}
