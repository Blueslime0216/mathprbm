/* ========== PDF 다운로드 기능 ========== */
const downloadWorksheetButton = document.getElementById('download-worksheet') as HTMLButtonElement;
const downloadAnswersButton = document.getElementById('download-answers') as HTMLButtonElement;
downloadWorksheetButton.addEventListener('click', () => {
    const element = document.querySelector('#problems-preview .a4-page') as HTMLElement;
    const opt = {
        margin: 0,
        filename: '문제지.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
      //@ts-ignore
      html2pdf().set(opt).from(element).save();
    });
    downloadAnswersButton.addEventListener('click', () => {
    const element = document.querySelector('#answers-preview .a4-page') as HTMLElement;
    const opt = {
        margin: 0,
        filename: 'worksheet.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    //@ts-ignore
    html2pdf().set(opt).from(element).save();
});