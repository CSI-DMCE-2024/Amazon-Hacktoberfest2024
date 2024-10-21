const menuIcon = document.querySelector('.menu-icon');
const navbarLinks = document.querySelector('.navbar-links');

menuIcon.addEventListener('click', () => {
    navbarLinks.classList.toggle('open');
});
