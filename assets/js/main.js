// Thu nho header khi cuon
window.addEventListener('scroll', function() {
    var header = document.querySelector('.header');
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});

// Lang nghe su kien cuon trang
window.addEventListener('scroll', function() {
    var backToTopButton = document.getElementById('backToTop');
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 200) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});
// Hieu ung muot ma
document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



