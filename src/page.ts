/**
 * page.ts
 * A4 페이지 크기에 맞춰 문제지 및 정답지를 여러 페이지로 분할하는 로직을 담당합니다.
 */

/**
 * splitContentIntoPages 함수
 * 주어진 콘텐츠 컨테이너의 자식 요소들을 A4 페이지 크기에 맞게 분할하여 배열로 반환합니다.
 * @param contentContainer - 분할할 콘텐츠가 있는 DOM 요소
 * @returns A4 페이지로 분할된 DOM 요소 배열
 */
export function splitContentIntoPages(contentContainer: HTMLElement): HTMLElement[] {
    const pages: HTMLElement[] = [];
    const tempPage = document.createElement("div");
    tempPage.className = "a4-page";
    document.body.appendChild(tempPage);
    const a4Height = tempPage.clientHeight;
    document.body.removeChild(tempPage);
  
    let currentPage = document.createElement("div");
    currentPage.className = "a4-page";
    pages.push(currentPage);
  
    Array.from(contentContainer.children).forEach(child => {
      currentPage.appendChild(child);
      if (currentPage.scrollHeight > a4Height) {
        const overflowChild = currentPage.lastElementChild;
        if (overflowChild) {
          currentPage.removeChild(overflowChild);
          currentPage = document.createElement("div");
          currentPage.className = "a4-page";
          currentPage.appendChild(overflowChild);
          pages.push(currentPage);
        }
      }
    });
    return pages;
  }
  
  /**
   * updatePreviewContainers 함수
   * 미리보기 영역 컨테이너 내에 분할된 페이지들을 업데이트합니다.
   * @param previewContainerId - 미리보기 영역의 컨테이너 ID ("problems-preview" 또는 "answers-preview")
   * @param contentContainer - 실제 콘텐츠가 들어있는 요소
   */
  export function updatePreviewContainers(previewContainerId: string, contentContainer: HTMLElement) {
    const previewContainer = document.getElementById(previewContainerId) as HTMLElement;
    previewContainer.innerHTML = "";
    const pages = splitContentIntoPages(contentContainer);
    pages.forEach(page => {
      previewContainer.appendChild(page);
    });
  }
  