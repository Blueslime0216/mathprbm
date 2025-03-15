/* ========== 탭 전환 기능 ========== */
// 미리보기 영역에서 '문제지', '정답지' 등의 탭을 클릭할 때마다, 해당 탭을 활성화하고 관련 컨텐츠를 보여주는 기능입니다.
// 모든 탭 요소(클래스 이름이 .preview-tab인 요소)를 선택합니다.
const tabs = document.querySelectorAll<HTMLElement>('.preview-tab');

// 각 탭에 대해 클릭 이벤트 리스너를 추가합니다.
tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        // 클릭한 탭 요소에서 data-tab 속성 값을 가져옵니다.
        // 이 값은 해당 탭과 연결된 미리보기 컨텐츠의 식별자로 사용됩니다.
        const tabId = this.getAttribute('data-tab');

        // 모든 탭 요소에서 'active' 클래스를 제거하여 이전에 활성화된 탭의 상태를 초기화합니다.
        document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
        // 모든 미리보기 컨테이너 요소에서 'active' 클래스를 제거하여 이전에 활성화된 컨텐츠를 숨깁니다.
        document.querySelectorAll('.preview-container').forEach(c => c.classList.remove('active'));
        // 현재 클릭한 탭 요소에 'active' 클래스를 추가하여 활성화 상태로 표시합니다.
        this.classList.add('active');
        // data-tab 값과 연결된 미리보기 컨테이너(예: id가 "problems-preview" 또는 "answers-preview"인 요소)를 찾아 'active' 클래스를 추가하여 보이게 합니다.
        document.getElementById(`${tabId}-preview`)?.classList.add('active');
    });
});
  
/* ========== 줌 컨트롤 기능 ========== */
// 줌 컨트롤 기능은 미리보기 영역의 페이지 크기를 확대/축소할 수 있도록 도와줍니다.
// 확대 버튼(zoom-in), 축소 버튼(zoom-out), 현재 줌 레벨을 표시하는 요소(zoom-level) 및 A4 페이지 영역(.a4-page) 요소들을 각각 선택합니다.
const zoomIn = document.getElementById('zoom-in') as HTMLButtonElement;
const zoomOut = document.getElementById('zoom-out') as HTMLButtonElement;
const zoomLevel = document.getElementById('zoom-level') as HTMLElement;
const pages = document.querySelectorAll<HTMLElement>('.a4-page');

// 현재 줌 비율을 나타내는 변수 currentZoom을 초기값 100(100%)으로 설정합니다.
let currentZoom = 100;

// 확대 버튼 클릭 시 이벤트 리스너 추가:
//    - 현재 줌 비율이 200% 미만이면 10%씩 증가시키고, updateZoom() 함수를 호출하여 페이지에 반영합니다.
zoomIn.addEventListener('click', () => {
    if (currentZoom < 200) {
        currentZoom += 10;
        updateZoom();
    }
});

// 축소 버튼 클릭 시 이벤트 리스너 추가:
//    - 현재 줌 비율이 50% 초과이면 10%씩 감소시키고, updateZoom() 함수를 호출하여 페이지에 반영합니다.
zoomOut.addEventListener('click', () => {
    if (currentZoom > 50) {
        currentZoom -= 10;
        updateZoom();
    }
});

// updateZoom 함수:
//    - zoomLevel 요소에 현재 줌 비율을 텍스트로 업데이트합니다.
//    - 각 페이지 요소에 CSS transform 스타일을 적용하여 줌 비율(스케일)을 변경합니다.
function updateZoom(): void {
    zoomLevel.textContent = `${currentZoom}%`;
    pages.forEach(page => {
        page.style.transform = `scale(${currentZoom / 100})`;
    });
}

/* ========== 문제지 미리보기 업데이트 ========== */
// updatePages 함수는 문제 목록을 기반으로 문제지와 정답지 미리보기 내용을 업데이트하는 기능을 수행합니다.
export function updatePages(): void {
    // 현재 문제 목록(문제 아이템 요소들)을 모두 선택합니다.
    const problems = document.querySelectorAll<HTMLElement>('.problem-item');
    // 문제 미리보기 컨테이너와 정답 미리보기 컨테이너를 선택합니다.
    const problemsPreviewContainer = document.querySelector('#problems-preview .a4-page') as HTMLElement;
    const answersPreviewContainer = document.querySelector('#answers-preview .a4-page') as HTMLElement;
    // 문제지 제목 입력 필드에서 값을 가져와 제목으로 사용합니다.
    const title = (document.getElementById('worksheet-title') as HTMLInputElement).value;

    // 각 미리보기 영역에 들어갈 HTML 코드를 저장할 빈 문자열 변수를 초기화합니다.
    let problemsHTML = '';
    let answersHTML = '';
    let answerSheetHTML = '';

    // 문제 목록의 각 문제 아이템에 대해 반복합니다.
    problems.forEach((problem, index) => {
        // 각 문제 아이템 내부에서 문제 텍스트 요소(.problem-text)의 텍스트 내용을 가져옵니다.
        // 만약 텍스트 내용이 없으면 빈 문자열('')을 사용합니다.
        const problemText = problem.querySelector('.problem-text')?.textContent || '';
        // 문제 미리보기 영역에 들어갈 HTML 코드에 번호와 문제 텍스트를 추가합니다.
        problemsHTML += `<div class="problem">${index + 1}. ${problemText}</div>`;
        // 정답 미리보기 영역에 들어갈 HTML 코드에 문제 번호, 문제 텍스트, 그리고 기본 정답(현재는 "정답 미설정") 정보를 추가합니다.
        answersHTML += `<div class="problem">${index + 1}. ${problemText}<br>
                        <strong>정답: 정답 미설정</strong>
                        </div>`;
        // 답안지(객관식 등 실제 답안을 입력할 영역)의 HTML 코드에 문제 번호를 포함한 요소를 추가합니다.
        answerSheetHTML += `<div class="answer-item"><span>${index + 1}.</span><div></div></div>`;
    });
    
    // 문제 미리보기 컨테이너의 innerHTML을 업데이트하여 제목, 문제 목록, 그리고 답안지 영역을 포함하는 전체 HTML 코드를 설정합니다.
    problemsPreviewContainer.innerHTML = `
        <h2>${title}</h2>
        ${problemsHTML}
        <div class="answer-sheet">
        ${answerSheetHTML}
        </div>
    `;
    // 정답 미리보기 컨테이너의 innerHTML을 업데이트하여 제목과 정답 정보를 포함하는 HTML 코드를 설정합니다.
    answersPreviewContainer.innerHTML = `
        <h2>${title} - 정답</h2>
        ${answersHTML}
    `;
}

// 문제지 제목 입력 필드에 입력 이벤트 리스너를 추가하여, 사용자가 제목을 변경할 때마다 미리보기 내용을 업데이트하도록 합니다.
(document.getElementById('worksheet-title') as HTMLInputElement).addEventListener('input', updatePages);

// 페이지가 처음 로드될 때 미리보기 영역을 초기화하기 위해 updatePages 함수를 호출합니다.
updatePages();
