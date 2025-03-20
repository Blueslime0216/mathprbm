/**
 * 한 자릿수 덧셈 문제 유형 모듈
 * - 문제 제목, 설명, 카테고리(태그) 및 문제 생성/정답 생성 관련 기본 설정과 로직을 포함합니다.
 */
export default {
    // 문제 유형 제목
    title: "한 자릿수 덧셈",
    // 문제 유형 설명
    description: "랜덤한 한 자릿수 숫자 2개의 덧셈 문제입니다.",
    // 문제에 속하는 카테고리 (난이도, 배점 대신 사용)
    tag: "사칙연산",
    // 기본 설정값 (문제 생성 시 사용)
    settings: {
      questionText: "두 숫자를 더하세요:",
      problemCount: 10,
      numberRange: { min: 1, max: 9 },
      margin: 10,            // 문제 간 여백 (픽셀)
      fontSize: 14,          // 기본 글자 크기
      fontFamily: "Noto Sans KR"
    },
    /**
     * 문제지를 생성하는 함수
     * @param container - 문제지를 추가할 DOM 요소
     * @param settings - 문제 생성 설정 (편집 가능)
     */
    addToWorksheet: function (container: HTMLElement, settings: any) {
      for (let i = 0; i < settings.problemCount; i++) {
        const num1 = Math.floor(Math.random() * (settings.numberRange.max - settings.numberRange.min + 1)) + settings.numberRange.min;
        const num2 = Math.floor(Math.random() * (settings.numberRange.max - settings.numberRange.min + 1)) + settings.numberRange.min;
        const problemText = document.createElement("div");
        problemText.style.marginBottom = settings.margin + "px";
        problemText.style.fontSize = settings.fontSize + "px";
        problemText.style.fontFamily = settings.fontFamily;
        problemText.textContent = `${settings.questionText} ${num1} + ${num2} = ?`;
        container.appendChild(problemText);
      }
    },
    /**
     * 정답지를 생성하는 함수
     * @param container - 정답지를 추가할 DOM 요소
     * @param settings - 문제 생성 설정 (편집 가능)
     */
    addToAnswerSheet: function (container: HTMLElement, settings: any) {
      for (let i = 0; i < settings.problemCount; i++) {
        const num1 = Math.floor(Math.random() * (settings.numberRange.max - settings.numberRange.min + 1)) + settings.numberRange.min;
        const num2 = Math.floor(Math.random() * (settings.numberRange.max - settings.numberRange.min + 1)) + settings.numberRange.min;
        const answerText = document.createElement("div");
        answerText.style.marginBottom = settings.margin + "px";
        answerText.style.fontSize = settings.fontSize + "px";
        answerText.style.fontFamily = settings.fontFamily;
        answerText.textContent = `${num1} + ${num2} = ${num1 + num2}`;
        container.appendChild(answerText);
      }
    }
  };
  