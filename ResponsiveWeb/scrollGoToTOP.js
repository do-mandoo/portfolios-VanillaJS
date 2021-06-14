const goToTop = () => {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      document.querySelector('.scrollIcon').style.display = 'block';
    } else {
      document.querySelector('.scrollIcon').style.display = 'none';
    }
  });

  // go to top
  document.querySelector('.scrollIcon').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
};

goToTop();
