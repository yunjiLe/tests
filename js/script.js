// text 작성, 삭제, 즉시실행
(function(){
    const spanEl = document.querySelector('main h2 span')
    const txtarr = ['Web Publisher', 'Front-End Developer', 'Web UI Designer', 'UX Designer', 'Back-End Developer'];
    console.log(txtarr)
    let index = 0;
    let currentTxt = txtarr[index].split("")
    // split : 문자열 분할 메서드
    console.log(currentTxt)

    function writeTxt(){
        spanEl.textContent += currentTxt.shift();
        // 배열의 요소를 앞에서부터 하나씩 출력
        // array shift() : 배열 맨 앞 요소를 추출하고 추출한 요소를 원본에서 삭제
        if(currentTxt.length !== 0) {
            setTimeout(writeTxt, Math.floor(Math.random() * 100))
            // 0~100 사이 숫자가 무작위로 작성되는 글자 속도
        }else {
            currentTxt = spanEl.textContent.split();
            // 텍스트 작성 함수를 끝내기 전에 텍스트를 지우기 위해서 화면에 표시된 텍스트를 가져와서 split 메서드로 다시 분리하여 배열에 넣기
            setTimeout(deleteTxt, 3000)  //3초 후 텍스트 지우기
        }
    }

    function deleteTxt(){
        currentTxt.pop();
        // array pop() : 배열 요소를 끝에서부터 하나씩 삭제
        spanEl.textContent = currentTxt.join() 
        // join : 현재 배열에 있는 요소를 하나의 문자열로 합침
        if(currentTxt.length !==0){
            setTimeout(deleteTxt, Math.floor(Math.random()* 100))
            // 만약 값이 남아있으면 deleteTxt 함수를 호출하고  0~100 무작위로 호출시간을 설정
        } else { // pop에 의해서 다 삭제가 되면 실행
            index = (index + 1) % txtarr.length;
            currentTxt = txtarr[index].split("")
            writeTxt();
        }
    }
    writeTxt()
})();

// scroll했을 때 header 태그에 active 클래스 추가, 삭제
const headerEl = document.querySelector('header')

window.addEventListener('scroll', function(){
    requestAnimationFrame(scrollCheck)
})
function scrollCheck(){
    let browserScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
    if(browserScrollY > 0) {
        headerEl.classList.add('active')
    }else {
        headerEl.classList.remove('active')
    }
}

// move 메뉴 클릭시 해당 영역으로 이동하기 
const animationMove = function(selector){
    // 1. selector 매개변수로 이동할 대상 요소 가져오기
    const targetEl = document.querySelector(selector)
    // 2. 현재 브러우저 스크롤 정보
    const browserScrollY = window.pageYOffset;
    // 3. 이동할 대상 위치 (y값) getBoundingClientRect : 요소의 위치값 찾기
    const targetScrollY = targetEl.getBoundingClientRect().top + browserScrollY
    // 4. 스크롤을 이동
    window.scrollTo({ top : targetScrollY, behavior: 'smooth'})
}

// scroll event 연결하기
const scrollMove = document .querySelectorAll('[data-animation-scroll="true"]')
for(let i = 0; i < scrollMove.length; i++){
    scrollMove[i].addEventListener('click', function(e){
        const target = this.dataset.target;
        animationMove(target)
    })
}
