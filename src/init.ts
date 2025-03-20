// // ====================================================================================================
// // js, css 파일을 불러오는 코드
// // ====================================================================================================
import { jsList } from "./importList";
import { cssList } from "./importList";



// js 파일들을 불러와서 추가
jsList.forEach(fileName => {
	const script = document.createElement('script');
	script.type = 'module';
	script.src = `./src/${fileName}.ts`;
	document.body.appendChild(script);
});

// css 파일들을 불러와서 head에 추가
const cssElements = cssList.map(fileName => {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = `./style/${fileName}.css`;

	return link;
});

cssElements.forEach(link => document.head.appendChild(link));



/**
 * 초기화 및 메인 로직 처리 파일
 * - 문제 유형 드롭다운 옵션 동적 생성
 * - 문제 추가, 편집, 미리보기 업데이트 및 페이지 분할 처리
 */

import { problemList } from "./importList";
// 문제 편집 모달 모듈을 먼저 로드하여 window.problemEditorModal이 정의되도록 합니다.
import "./problemEditorModal";

// 문제 모듈들을 저장할 객체 (문제 식별자 → 문제 모듈)
const problemModules: { [key: string]: any } = {};

// 편집 가능한 문제 아이템들의 리스트
let problemItems: Array<{
  id: string;
  title: string;
  tag: string;
  settings: any;
  uniqueId: number;
}> = [];

/**
 * 문제 모듈들을 동적으로 불러와 드롭다운 메뉴 옵션을 생성합니다.
 */
async function loadProblems() {
  for (const id of problemList) {
    try {
      // 동적 import를 통해 각 문제 유형 모듈 로드 (파일명과 동일한 문제 ID 사용)
      const module = await import(`../prbm/${id}.ts`);
      problemModules[id] = module.default;
    } catch (error) {
      console.error(`${id} 모듈 로드 실패:`, error);
    }
  }
  populateDropdown();
}

/**
 * 드롭다운 메뉴에 문제 옵션을 추가합니다. (문제 모듈의 title을 사용)
 */
function populateDropdown() {
  const dropdown = document.getElementById("problem-type-dropdown") as HTMLSelectElement;
  dropdown.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "문제 유형 선택";
  defaultOption.value = "";
  dropdown.appendChild(defaultOption);
  for (const id in problemModules) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = problemModules[id].title;
    dropdown.appendChild(option);
  }
}

/**
 * 선택한 문제 유형을 기반으로 새로운 문제 아이템을 생성하여 리스트에 추가합니다.
 * @param problemId - 선택된 문제 유형 식별자
 */
function addProblemItem(problemId: string) {
  const problem = problemModules[problemId];
  const newItem = {
    id: problemId,
    title: problem.title,
    tag: problem.tag,
    settings: { ...problem.settings },
    uniqueId: Date.now()
  };
  problemItems.push(newItem);
  renderProblemList();
  updatePreviews();
}

/**
 * 좌측 문제 리스트에 현재 문제 아이템들을 렌더링합니다.
 */
function renderProblemList() {
  const listContainer = document.querySelector(".problem-list") as HTMLElement;
  listContainer.innerHTML = "";
  for (const item of problemItems) {
    // 문제 아이템 컨테이너 생성
    const itemDiv = document.createElement("div");
    itemDiv.className = "problem-item";
    itemDiv.setAttribute("data-id", item.uniqueId.toString());

    // 문제 제목 및 태그(카테고리) 표시 영역 생성
    const textDiv = document.createElement("div");
    textDiv.className = "problem-textDiv";
    const titleDiv = document.createElement("div");
    titleDiv.className = "problem-text";
    titleDiv.textContent = item.title;
    const infoDiv = document.createElement("div");
    infoDiv.className = "problem-info";
    infoDiv.textContent = `카테고리: ${item.tag}`;
    textDiv.appendChild(titleDiv);
    textDiv.appendChild(infoDiv);
    itemDiv.appendChild(textDiv);

    // 편집 버튼 생성 – 클릭 시 문제 편집 모달을 엽니다.
    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.title = "편집";
    editBtn.innerHTML = `<i class="material-icons">edit</i>`;
    editBtn.addEventListener("click", () => {
      openProblemEditor(item.uniqueId);
    });
    itemDiv.appendChild(editBtn);

    listContainer.appendChild(itemDiv);
  }
}

/**
 * 문제지 및 정답지 미리보기 영역을 업데이트합니다.
 */
function updatePreviews() {
  const problemsPreviewContainer = document.querySelector("#problems-preview .a4-page") as HTMLElement;
  const answersPreviewContainer = document.querySelector("#answers-preview .a4-page") as HTMLElement;
  problemsPreviewContainer.innerHTML = "";
  answersPreviewContainer.innerHTML = "";

  // 각 문제 아이템에 대해 문제와 정답 영역 생성
  for (const item of problemItems) {
    const problemModule = problemModules[item.id];
    // 문제 영역 생성
    const problemDiv = document.createElement("div");
    problemDiv.className = "problem";
    problemModule.addToWorksheet(problemDiv, item.settings);
    problemsPreviewContainer.appendChild(problemDiv);

    // 정답 영역 생성
    const answerDiv = document.createElement("div");
    answerDiv.className = "problem";
    problemModule.addToAnswerSheet(answerDiv, item.settings);
    answersPreviewContainer.appendChild(answerDiv);
  }
  // 페이지 분할 처리 (간단한 로직)
  splitPages(problemsPreviewContainer, "problems-preview");
  splitPages(answersPreviewContainer, "answers-preview");
}

/**
 * 미리보기 영역에서 A4 페이지 크기를 초과하는 경우 새 페이지를 생성합니다.
 * @param container - 문제 또는 정답 영역의 A4 페이지 요소
 * @param previewContainerId - 미리보기 전체 컨테이너의 ID
 */
function splitPages(container: HTMLElement, previewContainerId: string) {
  const previewContainer = document.getElementById(previewContainerId) as HTMLElement;
  const a4PageElement = previewContainer.querySelector(".a4-page") as HTMLElement;
  const a4Height = a4PageElement.clientHeight;
  if (container.scrollHeight > a4Height) {
    const newPage = document.createElement("div");
    newPage.className = "a4-page";
    while (container.scrollHeight > a4Height && container.lastElementChild) {
      newPage.insertBefore(container.lastElementChild, newPage.firstChild);
    }
    previewContainer.appendChild(newPage);
  }
}

/**
 * 문제 편집 모달을 열어 해당 문제 아이템의 설정을 수정합니다.
 * @param uniqueId - 편집할 문제 아이템의 고유 ID
 */
function openProblemEditor(uniqueId: number) {
  const item = problemItems.find(p => p.uniqueId === uniqueId);
  if (!item) return;
  // window.problemEditorModal는 problemEditorModal.ts에서 전역 객체에 등록되어야 합니다.
  (window as any).problemEditorModal.open(item, (updatedItem: any) => {
    const index = problemItems.findIndex(p => p.uniqueId === uniqueId);
    if (index !== -1) {
      problemItems[index] = updatedItem;
      renderProblemList();
      updatePreviews();
    }
  });
}

/**
 * 디버깅 모드 활성 여부에 따라 미리보기 영역에 여백 오버레이를 표시합니다.
 * @param enabled - 디버깅 모드 활성화 여부
 */
function updateDebugMode(enabled: boolean) {
  const previewPages = document.querySelectorAll(".a4-page");
  previewPages.forEach(page => {
    if (enabled) {
      page.classList.add("debug-mode");
    } else {
      page.classList.remove("debug-mode");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProblems();
  document.getElementById("add-problem")!.addEventListener("click", () => {
    const dropdown = document.getElementById("problem-type-dropdown") as HTMLSelectElement;
    const selectedId = dropdown.value;
    if (!selectedId) {
      alert("문제 유형을 선택해주세요.");
      return;
    }
    addProblemItem(selectedId);
  });
  document.getElementById("debug-mode")!.addEventListener("change", (e: any) => {
    updateDebugMode(e.target.checked);
  });
});

export {};
