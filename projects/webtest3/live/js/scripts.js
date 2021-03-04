/*-----------------------------------------------------------------------------------

    Theme Name: Archo
    Theme URI: http://
    Description: Architecture & Interior Design HTML Template
    Author: UI-ThemeZ
    Author URI: http://themeforest.net/user/UI-ThemeZ
    Version: 1.0

-----------------------------------------------------------------------------------*/


$(function () {

    "use strict";


    /* ===============================  Navbar Menu  =============================== */

    var wind = $(window);

    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar.change"),
            logo = $(".navbar.change .logo> img");

        if (bodyScroll > 300) {

            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo-dark.png');

        } else {

            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo-light.png');
        }
    });

    $('.navbar .search .icon').on('click', function () {
        $(".navbar .search .search-form").fadeIn();
    });

    $('.navbar .search .search-form .close').on('click', function () {
        $(".navbar .search .search-form").fadeOut();
    });


    /* ===============================  Swiper slider  =============================== */


    var parallaxSlider;
    var parallaxSliderOptions = {
        speed: 1000,
        autoplay: true,
        parallax: true,
        loop: true,
        pagination: {
            el: '.slider .parallax-slider .swiper-pagination',
            clickable: true
        },
        on: {
            init: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    $(swiper.slides[i])
                        .find('.bg-img')
                        .attr({
                            'data-swiper-parallax': 0.75 * swiper.width
                        });
                }
            },
            resize: function () {
                this.update();
            }
        },

        pagination: {
            el: '.slider .parallax-slider .swiper-pagination',
            type: 'fraction',
        },

        navigation: {
            nextEl: '.slider .parallax-slider .next-ctrl',
            prevEl: '.slider .parallax-slider .prev-ctrl'
        }
    };
    parallaxSlider = new Swiper('.slider .parallax-slider', parallaxSliderOptions);

    var swiperWorkMetro = new Swiper('.metro .swiper-container', {
        slidesPerView: 2,
        spaceBetween: 0,
        speed: 1000,
        loop: true,
        centeredSlides: true,

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 0
            }
        },

        pagination: {
            el: '.metro .swiper-pagination',
            type: 'progressbar',
        },

        navigation: {
            nextEl: '.metro .next-ctrl',
            prevEl: '.metro .prev-ctrl'
        },
    });

    var swiperWorkSlider = new Swiper('.slider-scroll .swiper-container', {
        slidesPerView: 2,
        spaceBetween: 30,
        mousewheel: true,
        centeredSlides: true,
        speed: 1000,
        loop: true,

        breakpoints: {
            320: {
                slidesPerView: 1
            },
            480: {
                slidesPerView: 1
            },
            640: {
                slidesPerView: 2
            },
            991: {
                slidesPerView: 2
            }
        },

        navigation: {
            nextEl: '.slider-scroll .next-ctrl',
            prevEl: '.slider-scroll .prev-ctrl'
        }
    });


    const slider = document.getElementById("js-cta-slider");
    const sliderNext = document.getElementById("js-cta-slider-next");
    const sliderPrevious = document.getElementById("js-cta-slider-previous");

    const interleaveOffset = 0.75;

    const swiper = new Swiper(slider, {
    loop: true,
    direction: "vertical",
    speed: 800,
    grabCursor: true,
    watchSlidesProgress: true,
    autoplay: {
    delay: 2500,
    disableOnInteraction: false
    },
    pagination: {
        el: '.slid-half .swiper-pagination',
        type: 'fraction',
    },
    navigation: {
    nextEl: sliderNext,
    prevEl: sliderPrevious
    },
    on: {
    progress: function() {
        let swiper = this;

        for (let i = 0; i < swiper.slides.length; i++) {
        let slideProgress = swiper.slides[i].progress;
        let innerOffset = swiper.height * interleaveOffset;
        let innerTranslate = slideProgress * innerOffset;

        TweenMax.set(swiper.slides[i].querySelector(".slide-inner"), {
            y: innerTranslate,
        });
        }
    },
    touchStart: function() {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = "";
        }
    },
    setTransition: function(speed) {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector(".slide-inner").style.transition =
            speed + "ms";
        }
    }
    }
    });



    /* ===============================  Work background  =============================== */

    $('.full-bg .cluom').on('mouseenter', function () {
        var tab_id = $(this).attr('data-tab');
        $('.full-bg .cluom').removeClass('current');
        $(this).addClass('current');

        $('.glry-img .tab-img ').removeClass('current');
        $("#" + tab_id).addClass('current');

        if ($(this).hasClass('current')) {
            return false;
           }
    });



    /* ===============================  Var Background image  =============================== */

    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });


    /* ===============================  slick Carousel  =============================== */

    $('.testimonials .testim').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '.testimonials .prev',
        nextArrow: '.testimonials .next',
        dots: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.team .team-container').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '.team .prev',
        nextArrow: '.team .next',
        dots: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });


    /* ===============================  YouTubePopUp  =============================== */

    $("a.vid").YouTubePopUp();


    /* ===============================  Before & After Section  =============================== */

    $(".twentytwenty-container").twentytwenty();


    /* ===============================  parallaxie  =============================== */

    $('.parallaxie').parallaxie({
        speed: 0.2,
        size: "cover"
    });


    /* ===============================  justifiedGallery  =============================== */

    $('.justified-gallery').justifiedGallery({
        rowHeight: 400,
        lastRow: 'nojustify',
        margins: 15
    });


    /* ===============================  skills-circle  =============================== */

    var c4 = $('.skills-circle .skill');
    var myVal = $(this).attr('data-value');

    $(".skills-circle .skill").each(function () {

        c4.circleProgress({
            startAngle: -Math.PI / 2 * 1,
            value: myVal,
            thickness: 5,
            size: 200,
            fill: { color: "#b19777" }
        });

    });

    wind.on('scroll', function () {
        $(".skill-progress .progres").each(function () {
            var bottom_of_object =
                $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
                $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width: myVal
                });
            }
        });
    });


    /* ===============================  blog-grid  =============================== */

    var blgImg = $('.blog-grid .post-img .img').outerHeight() + 120;

    $(".blog-grid .bg-pattern").css("height", blgImg);

});


/* ===============================  Wow Animation  =============================== */

wow = new WOW({
    animateClass: 'animated',
    offset: 100
});
wow.init();


// === window When Loading === //

$(window).on("load", function () {


    /* ===============================  SPLITTING TEXT  =============================== */

    Splitting();


    /* ===============================  thumparallax  =============================== */

    var imageUp = document.getElementsByClassName('thumparallax');
    new simpleParallax(imageUp, {
        delay: 1,
        scale: 1.1
    });

    var imageDown = document.getElementsByClassName('thumparallax-down');
    new simpleParallax(imageDown, {
        orientation: 'down',
        delay: 1,
        scale: 1.1
    });


    /* ===============================  isotope Masonery  =============================== */

    $('.gallery').isotope({
        itemSelector: '.items',
      });

    var $gallery = $('.gallery').isotope();

    $('.filtering').on('click', 'span', function () {
        var filterValue = $(this).attr('data-filter');
        $gallery.isotope({ filter: filterValue });
    });

    $('.filtering').on('click', 'span', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });


    /* ===============================  contact validator  =============================== */

    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });

});


/* ===============================  Preloader page  =============================== */

paceOptions = {
    ajax: true,
    document: true,
    eventLag: false
};

Pace.on('done', function () {
    $('#preloader').addClass("isdone");
    $('.loading-text').addClass("isdone");
});


/* ===============================  Scroll back to top  =============================== */

$(document).ready(function () {
    "use strict";

    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 150;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    })


});



/* ===============================  Mouse effect  =============================== */

function mousecursor() {
    if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
            t = document.querySelector(".cursor-outer");
        let n, i = 0,
            o = !1;
        window.onmousemove = function (s) {
            o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
        }, $("body").on("mouseenter", "a, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
        }), $("body").on("mouseleave", "a, .cursor-pointer", function () {
            $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
        }), e.style.visibility = "visible", t.style.visibility = "visible"
    }
};

$(function () {
    mousecursor();
});
