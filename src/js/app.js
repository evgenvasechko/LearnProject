import $ from 'jquery'

window.$ = $


window.addEventListener('DOMContentLoaded', function() {
    
    var menuButton = document.querySelector('.hamburger');
    var menu = document.querySelector('.header__menu');
    var coord = document.querySelectorAll('.map__coordinate');
    var i;

    console.log(coord);

    menuButton.addEventListener('click', function(e){
        menuButton.classList.toggle('is-active');
        menu.classList.toggle('visible');
    })

    for (var i = 0; i < coord.length; i++) {
        coord[i].addEventListener('mouseover', function(){
            this.nextElementSibling.classList.add('visible');
        })
        coord[i].addEventListener('mouseleave', function() {
            this.nextElementSibling.classList.remove('visible');
        })
    }

    window.addEventListener('click', function(e) {
        console.log(e.target.tagName);
    });
});
