'use strict';

$(function() {
    $('.js-navtoggle').on('click', function(e) {
        e.preventDefault();
        $('.header').toggleClass('open');
        $('.navigation').toggleClass('open-navigation');
    });

    $('.js-navigation').on('click', 'a', function(e) {
        $('.header').removeClass('open');
        $('.navigation').removeClass('open-navigation');
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top - 60}, 1000);
    });


    var owlSlider = $('.slider .owl-carousel');
    owlSlider.owlCarousel({
        items: 1,
        loop: true,
        paginationClickable: true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        pagination: true
    });

    var owlAgents = $('.slider-agents .owl-carousel');
    owlAgents.owlCarousel({
        items: 1,
        loop: true,
        autoplay:true,
        autoplayHoverPause:true
    });

    var owl3 = $('.slider3 .owl-carousel');
    owl3.owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        navText: ['','']
    });
});