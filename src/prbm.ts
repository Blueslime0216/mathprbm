import { showModal } from "./modal";
import { updateProblems } from "./page";

/* ========== 드래그 앤 드롭 기능 ========== */
const problemItems = document.querySelectorAll<HTMLElement>('.problem-item');
const problemList = document.querySelector('.problem-list') as HTMLElement;
let draggedItem: HTMLElement | null = null;

problemItems.forEach(item => {
    item.addEventListener('dragstart', function () {
        draggedItem = this;
        setTimeout(() => {
            this.classList.add('dragging');
            this.style.opacity = '0.5'; // 드래그 중인 요소의 투명도 변경
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // 드래그 중인 요소에 그림자 추가
        }, 0);
    });
    item.addEventListener('dragend', function () {
        this.classList.remove('dragging');
        this.style.opacity = ''; // 드래그 종료 시 투명도 원래대로
        this.style.boxShadow = ''; // 드래그 종료 시 그림자 제거
        draggedItem = null;
    });
});

problemList.addEventListener('dragover', (e: DragEvent) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(problemList, e.clientY);
    const draggable = document.querySelector('.dragging') as HTMLElement;
    if (afterElement == null) {
        problemList.appendChild(draggable);
    } else {
        problemList.insertBefore(draggable, afterElement);
    }
});

function getDragAfterElement(container: HTMLElement, y: number): HTMLElement | null {
    const draggableElements = [...container.querySelectorAll<HTMLElement>('.problem-item:not(.dragging)')];
    return draggableElements.reduce(
        (closest: { offset: number; element: HTMLElement | null }, child: HTMLElement) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY, element: null }
    ).element;
}

/* ========== 문제 추가 및 편집 기능 ========== */
const addProblemButton = document.getElementById('add-problem') as HTMLButtonElement;
const problemTextInput = document.getElementById('problem-text') as HTMLInputElement;

addProblemButton.addEventListener('click', () => {
    const problemText = problemTextInput.value.trim();
    if (!problemText) {
        // 기본 메시지 (info 타입)
        // msg("안녕하세요! 이것은 정보 메시지입니다.");

        // 성공 메시지
        // msg("작업이 성공적으로 완료되었습니다!", "success");

        // 경고 메시지
        // msg("주의: 저장되지 않은 변경사항이 있습니다.", "warning");
        showModal("주의: 저장되지 않은 변경사항이 있습니다.", "warning");

        // // 오류 메시지
        // msg("오류가 발생했습니다. 다시 시도해 주세요.", "error");
        // showModal("오류가 발생했습니다. 다시 시도해 주세요.", "error");

        // // 별칭 함수를 사용한 방법
        // msgInfo("정보 메시지입니다.");
        // msgSuccess("성공 메시지입니다.");
        // msgWarning("경고 메시지입니다.");
        // msgError("오류 메시지입니다.");

        // // 추가 옵션 사용
        // msg("커스텀 제목과 콜백이 있는 메시지입니다.", "info", {
        // title: "커스텀 제목",
        // duration: 5000,  // 5초 후 자동으로 닫힘
        //     callback: () => console.log("메시지가 닫혔습니다!")
        // });

        // // alert 대체
        // customAlert("기존 alert 대신 사용하는 메시지입니다.");
        return;
    }
    const newProblem = document.createElement('div');
    newProblem.className = 'problem-item';
    newProblem.draggable = true;
    newProblem.innerHTML = `
        <div class="problem-textDiv">
            <div class="problem-text">${problemText}</div>
            <div class="problem-info">난이도: 보통 | 배점: 10점</div>
        </div>
        <button class="edit" title="편집"><i class="material-icons">edit</i></button>
    `;
    problemList.appendChild(newProblem);
    updateProblems();
    problemTextInput.value = '';
    addProblemEvents(newProblem);
});

function addProblemEvents(problem: HTMLElement): void {
    problem.addEventListener('dragstart', function () {
        draggedItem = this;
        setTimeout(() => {
            this.classList.add('dragging');
        }, 0);
    });
    problem.addEventListener('dragend', function () {
        this.classList.remove('dragging');
        draggedItem = null;
    });

    const editButton = problem.querySelector('.edit') as HTMLElement;
    editButton.addEventListener('click', () => {
        alert('문제 편집 이벤트 발생');
        // 추가 편집 로직을 여기에 구현 가능
    });
}
problemItems.forEach(item => addProblemEvents(item));
