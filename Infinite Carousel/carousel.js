const $slideAll = document.querySelector('.slideAll');
// const $slide = document.querySelector('.slide');
const $prev = document.querySelector('.prev');
const $next = document.querySelector('.next');

// Counter
let counter = 1;
const offset = -100;

// 페이지 넘어가는 x축의 translate값 설정.
const movingPage = () => {
  // requestAnimationFrame브라우저에게 수행하기를 원하는 애니메이션을 알리고,
  // 다음 rePaint가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게합니다.
  // 이 메소드는 rePaint 이전에 사용을 인자로받습니다.
  window.requestAnimationFrame(() => {
    $slideAll.style.transform = `translateX(${offset * counter}px)`;
  });
};

// Button Listeners
$next.addEventListener('click', () => {
  if (counter >= $slideAll.children.length - 1) return;
  $slideAll.style.transition = 'transform 0.4s ease-in-out';
  counter++;
  movingPage();
});

$prev.addEventListener('click', () => {
  if (counter <= 0) return;
  $slideAll.style.transition = 'transform 0.4s ease-in-out';
  counter--;
  movingPage();
});

// transitionend함수생성해서 counter의 id가 각 clone(lastClone, firstClone)과 맞는다면 slideAll의 transition을 none으로 재할당(=설정).
// counter는 slide전체 길이의 -2를 할당함.
$slideAll.addEventListener('transitionend', () => {
  if ($slideAll.children[counter].id === 'lastClone') {
    $slideAll.style.transition = 'none';
    counter = $slideAll.children.length - 2;
    movingPage();
  }
  if ($slideAll.children[counter].id === 'firstClone') {
    $slideAll.style.transition = 'none';
    counter = $slideAll.children.length - counter;
    movingPage();
  }
});
