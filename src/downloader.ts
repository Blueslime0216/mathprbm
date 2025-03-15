/* ========== PDF 다운로드 기능 ========== */

// '문제지 PDF 다운로드' 버튼 요소를 가져와 downloadWorksheetButton 변수에 할당합니다.
const downloadWorksheetButton = document.getElementById('download-worksheet') as HTMLButtonElement;

// '정답지 PDF 다운로드' 버튼 요소를 가져와 downloadAnswersButton 변수에 할당합니다.
const downloadAnswersButton = document.getElementById('download-answers') as HTMLButtonElement;

// '문제지 PDF 다운로드' 버튼에 클릭 이벤트를 등록합니다.
downloadWorksheetButton.addEventListener('click', () => {
    // 미리보기 영역에서 문제지를 포함하는 A4 페이지 요소를 선택합니다.
    const element = document.querySelector('#problems-preview .a4-page') as HTMLElement;

    // html2pdf 라이브러리에서 사용할 옵션들을 설정합니다.
    const opt = {
        margin: 0,                                    // PDF 여백을 0으로 설정
        filename: '문제지.pdf',                         // 저장될 PDF 파일명 설정
        image: { type: 'jpeg', quality: 1 },           // 이미지 형식과 품질 설정 (최고 품질)
        html2canvas: { scale: 2 },                     // 캡처 스케일 설정 (해상도 향상)
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }  // jsPDF 설정 (A4, mm 단위, 세로 방향)
    };

    // @ts-ignore 지시어를 사용하여 TypeScript 컴파일러의 오류를 무시합니다.
    // html2pdf 함수를 호출하여 설정(opt)을 적용하고, 선택한 요소(element)를 PDF로 변환 후 저장합니다.
    //@ts-ignore
    html2pdf().set(opt).from(element).save();
});

// '정답지 PDF 다운로드' 버튼에 클릭 이벤트를 등록합니다.
downloadAnswersButton.addEventListener('click', () => {
    // 미리보기 영역에서 정답지를 포함하는 A4 페이지 요소를 선택합니다.
    const element = document.querySelector('#answers-preview .a4-page') as HTMLElement;

    // html2pdf 라이브러리에서 사용할 옵션들을 설정합니다.
    const opt = {
        margin: 0,                                    // PDF 여백을 0으로 설정
        filename: 'worksheet.pdf',                     // 저장될 PDF 파일명 설정 (영문 파일명)
        image: { type: 'jpeg', quality: 1 },           // 이미지 형식과 품질 설정 (최고 품질)
        html2canvas: { scale: 2 },                     // 캡처 스케일 설정 (해상도 향상)
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, // jsPDF 설정 (A4, mm 단위, 세로 방향)
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // 페이지 나누기 설정: 가능한 한 페이지 나누기를 피함
    };

    // @ts-ignore 지시어를 사용하여 TypeScript 컴파일러의 오류를 무시합니다.
    // html2pdf 함수를 호출하여 설정(opt)을 적용하고, 선택한 요소(element)를 PDF로 변환 후 저장합니다.
    //@ts-ignore
    html2pdf().set(opt).from(element).save();
});
