// import { initPages } from "./page";


document.addEventListener('DOMContentLoaded', () => {
    /* ========== 설정 영역 토글(아코디언) 기능 ========== */
    const menuHeaders = document.querySelectorAll<HTMLElement>('.menu-section h3');
    menuHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling as HTMLElement;
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });
    // 기존 초기화 작업 후 페이지 미리보기 초기화
    // initPages();
});