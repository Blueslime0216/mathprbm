// ========== 설정 영역 토글(아코디언) 기능 ==========
/* 원리 :
    설정 영역의 헤더를 클릭하면, 해당 설정 영역의 내용이 펼쳐지거나 닫히도록 함.
    내용(content) 요소의 높이를 계산하고, 최소화(minimized) 상태에 따라 높이를 0 또는 펼쳤을 때 높이로 설정
    (height를 auto로 설정하면 CSS transition 효과가 적용되지 않음).
*/
const menuHeaders = document.querySelectorAll<HTMLElement>('.menu-section h3');
menuHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const content = this.nextElementSibling as HTMLElement; // h3 요소의 다음 형제 요소(content) 선택
        const actualHeight = content.scrollHeight; // 실제 높이 계산
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        
        if (content.classList.contains('minimized')) {
            // 최소화 해제 처리
            content.style.height = '0px'; // 초기 상태에 고정값 설정
            requestAnimationFrame(() => {
                content.style.height = `${actualHeight + rem}px`;
            });
        } else {
            // 최소화 처리
            content.style.height = `${actualHeight}px`; // 초기 상태에 고정값 설정
            requestAnimationFrame(() => {
                content.style.height = '0px';
            });
        }
        content.classList.toggle('minimized');
    });
});