document.addEventListener('DOMContentLoaded', () => {
    /* ========== 설정 영역 토글(아코디언) 기능 ========== */
    const menuHeaders = document.querySelectorAll<HTMLElement>('.menu-section h3');
    menuHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling as HTMLElement;
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });
});
  