/**
 * problemEditorModal.ts
 *
 * 각 문제 아이템의 세부 설정을 수정할 수 있는 편집 모달을 구현합니다.
 * 모달에서는 문제 질문, 문제 개수, 숫자 범위 등 다양한 속성을 수정할 수 있으며,
 * 저장 시 해당 문제 아이템과 미리보기 영역이 업데이트됩니다.
 */

interface ProblemItem {
    id: string;
    title: string;
    tag: string;
    settings: any;
    uniqueId: number;
  }
  
  interface EditorCallback {
    (updatedItem: ProblemItem): void;
  }
  
  const problemEditorModal = {
    /**
     * 모달을 열어 현재 문제 아이템의 설정을 편집합니다.
     * @param item - 편집할 문제 아이템
     * @param callback - 편집 완료 후 업데이트된 아이템을 반환하는 콜백 함수
     */
    open: function (item: ProblemItem, callback: EditorCallback) {
      // 모달 백그라운드 오버레이 생성
      const overlay = document.createElement("div");
      overlay.className = "editor-overlay";
      // 모달 창 생성
      const modal = document.createElement("div");
      modal.className = "editor-modal";
  
      // 모달 제목 영역 추가
      const modalTitle = document.createElement("h2");
      modalTitle.textContent = "문제 설정 편집";
      modal.appendChild(modalTitle);
  
      // 편집 폼 생성 – 문제 질문, 문제 개수, 숫자 범위
      const form = document.createElement("form");
  
      // 문제 질문 입력 필드
      const questionLabel = document.createElement("label");
      questionLabel.textContent = "문제 질문:";
      const questionInput = document.createElement("input");
      questionInput.type = "text";
      questionInput.value = item.settings.questionText;
      form.appendChild(questionLabel);
      form.appendChild(questionInput);
  
      // 문제 개수 입력 필드
      const countLabel = document.createElement("label");
      countLabel.textContent = "문제 개수:";
      const countInput = document.createElement("input");
      countInput.type = "number";
      countInput.value = item.settings.problemCount;
      form.appendChild(countLabel);
      form.appendChild(countInput);
  
      // 숫자 범위 최소값 입력 필드
      const rangeMinLabel = document.createElement("label");
      rangeMinLabel.textContent = "숫자 범위 최소값:";
      const rangeMinInput = document.createElement("input");
      rangeMinInput.type = "number";
      rangeMinInput.value = item.settings.numberRange.min;
      form.appendChild(rangeMinLabel);
      form.appendChild(rangeMinInput);
  
      // 숫자 범위 최대값 입력 필드
      const rangeMaxLabel = document.createElement("label");
      rangeMaxLabel.textContent = "숫자 범위 최대값:";
      const rangeMaxInput = document.createElement("input");
      rangeMaxInput.type = "number";
      rangeMaxInput.value = item.settings.numberRange.max;
      form.appendChild(rangeMaxLabel);
      form.appendChild(rangeMaxInput);
  
      // 추가 입력 필드가 필요하면 여기에 생성 (예: 선택지 개수 등)
      modal.appendChild(form);
  
      // 저장 및 취소 버튼 영역 생성
      const btnContainer = document.createElement("div");
      btnContainer.className = "editor-btn-container";
  
      // 저장 버튼
      const saveBtn = document.createElement("button");
      saveBtn.type = "button";
      saveBtn.textContent = "저장";
      saveBtn.addEventListener("click", () => {
        // 입력값을 기반으로 item.settings 업데이트
        item.settings.questionText = questionInput.value;
        item.settings.problemCount = parseInt(countInput.value, 10);
        item.settings.numberRange = {
          min: parseInt(rangeMinInput.value, 10),
          max: parseInt(rangeMaxInput.value, 10)
        };
        document.body.removeChild(overlay);
        callback(item);
      });
      btnContainer.appendChild(saveBtn);
  
      // 취소 버튼
      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.textContent = "취소";
      cancelBtn.addEventListener("click", () => {
        document.body.removeChild(overlay);
      });
      btnContainer.appendChild(cancelBtn);
  
      modal.appendChild(btnContainer);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
    }
  };
  
  (window as any).problemEditorModal = problemEditorModal;
  
//   export {};
  