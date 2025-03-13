/**
 * pageTemplate.ts
 *
 * 페이지 기본 서식을 HTML 문자열로 생성하고, 이를 페이지에 동적으로 추가하는 함수입니다.
 * 필요한 CSS는 별도의 pageTemplate.css로 분리하여 적용합니다.
 */

// 페이지 번호 전역 변수
let problemPageCount = 1;
let answerPageCount = 1;

/**
 * createPageTemplate
 * 
 * @param params.pageType - '문제지' 또는 '정답지'
 * @param params.title - 페이지 상단 타이틀 (기본: '수학 평가지')
 * @param params.subTitle - 부제목 (예: 단원명, 유형 등)
 * @returns 생성된 페이지 기본 서식 HTML 문자열
 */
export function createPageTemplate(params: {
  pageType: '문제지' | '정답지',
  title?: string,
  subTitle?: string
}): string {
  const { pageType, title = '수학 평가지', subTitle = '' } = params;

  // 타이틀과 부제목
  const header = `
    <div style="text-align: center; margin-bottom: 1rem;">
      <h1 style="margin:0; font-size:2.5rem;">${title}</h1>
      ${subTitle ? `<h2 style="margin:0.5rem 0; font-size:1.5rem;">${subTitle}</h2>` : ''}
    </div>
  `;

  // 학생 정보 작성란
  const infoArea = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.2rem;">
      <div>이름: ______________________</div>
      <div>반/학번: ____________________</div>
      <div>날짜: ______________________</div>
    </div>
  `;

  // 페이지 정보 (페이지 번호 및 문제지/정답지 구분)
  let pageInfo = '';
  if (pageType === '문제지') {
    pageInfo = `<div style="text-align: right; font-size: 1.2rem;">p.${problemPageCount} (문제지)</div>`;
    problemPageCount++;
  } else {
    pageInfo = `<div style="text-align: right; font-size: 1.2rem;">p.${answerPageCount} (정답지)</div>`;
    answerPageCount++;
  }

  // 구분용 수평선
  const hr = `<hr style="border: none; border-top: 2px solid #444; margin: 1rem 0;" />`;

  // 문제/풀이를 추가할 내용 (빈 영역)
  const contentArea = `<div class="worksheet-content" style="min-height: calc(100% - 150px);"></div>`;

  // 최종 HTML 문자열 반환
  return `
    <div class="a4-page" style="position: relative; padding: 20mm; box-sizing: border-box; background-color: white; width: 210mm; height: 297mm;">
      ${header}
      ${infoArea}
      ${pageInfo}
      ${hr}
      ${contentArea}
    </div>
  `;
}

/* 
   위 함수는 페이지에 템플릿을 동적으로 생성해서 반환합니다. 
   이후 이 템플릿을 DOM에 추가하려면 innerHTML 또는 직접 요소 삽입을 사용할 수 있습니다.
*/
