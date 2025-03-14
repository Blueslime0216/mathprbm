// ====================================================================================================
// js, css 파일을 불러오는 코드
// ====================================================================================================
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

