window.addEventListener('click', e => {
  console.log(e.target, 'eíê²ëë¼');
  if (!e.target.matches('.burgerBar') && !e.target.matches('.buttonBurger'))
    return;
  const menuToggle = document.querySelector('.mobileView');
  menuToggle.classList.toggle('isAct');
  const ulListWrap = document.querySelector('.ulListWrap');
  ulListWrap.classList.toggle('isAct');
});
