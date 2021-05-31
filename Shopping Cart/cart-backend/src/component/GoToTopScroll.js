// const $GoToScrollContainer = document.getElementById('.scroll-icon').content
//   .firstElemnetChild;
// console.log($GoToScrollContainer, 239083290);

// export default () => {
//   const $newGoToTopScrollContainer = $GoToScrollContainer.cloneNode(true);
//   // Scroll | button show/hide
//   window.addEventListener('scroll', () => {
//     // if (document.querySelector('html').scrollTop > 100) { 과 아래가 같음.
//     if (window.pageYOffset > 100) {
//       document.querySelector('.scroll-icon').style.display = 'block';
//     } else {
//       document.querySelector('.scroll-icon').style.display = 'none';
//     }
//   });
//   // back to top
//   document.querySelector('.scroll-icon').addEventListener('click', () => {
//     window.scrollTo({
//       // 문서의 지정된 위치로 스크롤한다.
//       top: 0,
//       left: 0,
//       behavior: 'smooth'
//     });
//   });
// };

// // window.scroll와 scrollTo는 같은 효과를 가진다.
// // window.pageYOffset과 scrollY는 같은 효과를 지닌다.
// // 차이점은 pageYOffset이 크로스브라우저 호환성이 높기때문에 pageYOffset만 써도 무방하다.
