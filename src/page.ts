/* ========== 탭 전환 기능 ========== */
const tabs = document.querySelectorAll<HTMLElement>('.preview-tab');
tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');
        document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.preview-container').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(`${tabId}-preview`)?.classList.add('active');
    });
});
  
/* ========== 줌 컨트롤 기능 ========== */
const zoomIn = document.getElementById('zoom-in') as HTMLButtonElement;
const zoomOut = document.getElementById('zoom-out') as HTMLButtonElement;
const zoomLevel = document.getElementById('zoom-level') as HTMLElement;
const pages = document.querySelectorAll<HTMLElement>('.a4-page');
let currentZoom = 100;

zoomIn.addEventListener('click', () => {
    if (currentZoom < 200) {
        currentZoom += 10;
        updateZoom();
    }
});
zoomOut.addEventListener('click', () => {
    if (currentZoom > 50) {
        currentZoom -= 10;
        updateZoom();
    }
});
function updateZoom(): void {
    zoomLevel.textContent = `${currentZoom}%`;
    pages.forEach(page => {
        page.style.transform = `scale(${currentZoom / 100})`;
    });
}

/* ========== 문제지 미리보기 업데이트 ========== */
export function updateProblems(): void {
    const problems = document.querySelectorAll<HTMLElement>('.problem-item');
    const problemsPreviewContainer = document.querySelector('#problems-preview .a4-page') as HTMLElement;
    const answersPreviewContainer = document.querySelector('#answers-preview .a4-page') as HTMLElement;
    const title = (document.getElementById('worksheet-title') as HTMLInputElement).value;

    let problemsHTML = '';
    let answersHTML = '';
    let answerSheetHTML = '';

    problems.forEach((problem, index) => {
        const problemText = problem.querySelector('.problem-text')?.textContent || '';
        problemsHTML += `<div class="problem">${index + 1}. ${problemText}</div>`;
        answersHTML += `<div class="problem">${index + 1}. ${problemText}<br>
                        <strong>정답: 정답 미설정</strong>
                        </div>`;
        answerSheetHTML += `<div class="answer-item"><span>${index + 1}.</span><div></div></div>`;
    });
    
    problemsPreviewContainer.innerHTML = `
        <h2>${title}</h2>
        ${problemsHTML}
        <div class="answer-sheet">
        ${answerSheetHTML}
        </div>
    `;
    answersPreviewContainer.innerHTML = `
        <h2>${title} - 정답</h2>
        ${answersHTML}
    `;
}
(document.getElementById('worksheet-title') as HTMLInputElement).addEventListener('input', updateProblems);
updateProblems();