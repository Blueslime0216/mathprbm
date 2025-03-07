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
    if (problemText) {
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
    }
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
