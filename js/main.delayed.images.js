var lazyAll;

function loadLazyImages() {
    lazyAll = $(".lazy-img:not(.lazy-slick), .lazy-iframe, .lazy-video").lazy({
        defaultImage: "",
        chainable: false,
        visibleOnly: true,
        effect: "fadeIn",
        effectTime: 500,
        threshold: 200,
        beforeLoad: function(element){
            element.css("display", "");
        },
        afterLoad: function(element) {
            element.css("display", "");
        }
    });
    lazyAll.update();
}
function loadLazySlick(slider) {
    var sliderLazyDelayed;
    var sliderLazy = slider.find("[data-src]:not(.lazy-slick-delayed)").lazy({
        defaultImage: "",
        chainable: false,
        visibleOnly: true,
        effect: "fadeIn",
        effectTime: 500,
        threshold: 200,
        beforeLoad: function(element){
            element.css("display", "");
        },
        afterLoad: function(element) {
            element.css("display", "");
        }
    });


    slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        var sliderDelayedImages = slider.find(".lazy-slick-delayed[data-src]");
        if (sliderDelayedImages.length) {
            sliderLazyDelayed = slider.find(".lazy-slick-delayed[data-src]").lazy({
                defaultImage: "",
                chainable: false,
                visibleOnly: true,
                effect: "fadeIn",
                effectTime: 500,
                threshold: 200,
                beforeLoad: function(element){
                    element.css("display", "");
                },
                afterLoad: function(element) {
                    element.css("display", "");
                }
            });
            sliderLazyDelayed.update();
        }

        sliderLazy.update();

        var clonedSlides = slider.find(".slick-cloned .lazy-img[data-src]"),
            remainedSlides = slider.find(".lazy-img[data-src]:not(.lazy-slick-delayed)");
        if (clonedSlides.length > 0) {
            sliderLazy.force(clonedSlides);
            sliderLazy.force(remainedSlides);
        }
    });
}

function loadLazySlider(swiper) {
    var sliderLazyDelayed;
    var slider = $(swiper.el).parent();
    var sliderLazy = slider.find(".lazy-slick:not(.lazy-slick-delayed):not(.lazy-slick-loaded)").lazy({
        defaultImage: "",
        chainable: false,
        visibleOnly: true,
        effect: "fadeIn",
        effectTime: 500,
        threshold: 200,
        beforeLoad: function(element){
            element.css("display", "");
        },
        afterLoad: function(element) {
            element.css("display", "");
            element.addClass("lazy-slick-loaded");
        }
    });

    swiper.on('beforeSlideChangeStart', function() {
        var sliderDelayedImages = slider.find(".lazy-slick-delayed:not(.lazy-slick-loaded)");
        if (sliderDelayedImages.length) {
            sliderLazyDelayed = slider.find(".lazy-slick-delayed:not(.lazy-slick-loaded)").lazy({
                defaultImage: "",
                chainable: false,
                visibleOnly: true,
                effect: "fadeIn",
                effectTime: 500,
                threshold: 200,
                beforeLoad: function(element){
                    element.css("display", "");
                },
                afterLoad: function(element) {
                    element.css("display", "");
                    element.addClass("lazy-slick-loaded");
                }
            });
            sliderLazyDelayed.update();
        }

        sliderLazy.update();

        var remainedSlides = slider.find(".lazy-slick:not(.lazy-slick-loaded):not(.lazy-slick-delayed)");
        if (remainedSlides.length > 0) {
            sliderLazy.force(remainedSlides);
        }

        var remainedDelayedSlides = slider.find(".lazy-slick-delayed:not(.lazy-slick-loaded)");
        if (remainedDelayedSlides.length > 0) {
            sliderLazyDelayed.force(remainedDelayedSlides);
        }
    });
}

function resizeProjectSliders() {
    var container = $('.product-info-top'),
        info = container.find('.description_left'),
        sliderImages = container.find('#ph_product_fasad > .slick-for a img');

    sliderImages.css({
        'height': window.matchMedia("(max-width: 1000px)").matches ? '100%' : info.height()
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var loadedLazyImages = false;

    loadDelayedImages();

    // //$(document).on("scroll.delayedImages", checkDelayedEvent);
    // $(document).on("click.delayedImages", checkDelayedEvent);
    // $(document).on("mousemove.delayedImages", checkDelayedEvent);

    // $(document).on("touchstart.delayedImages", checkDelayedEvent);
    // $(document).on("touchmove.delayedImages", checkDelayedEvent);

    // var delayTimeout = setTimeout(checkDelayedTimeout, 500);

    // function checkDelayedTimeout(e) {
    //     if (!loadedLazyImages) {
    //         loadDelayedImages();
    //     }
    // };

    // function checkDelayedEvent(e) {
    //     if (e.originalEvent && !loadedLazyImages) {
    //         loadDelayedImages();
    //         clearTimeout(delayTimeout);
    //     }
    // };

    function loadDelayedImages() {
        loadedLazyImages = true;

        loadLazyImages();
        resizeProjectSliders();

        $(window).on('resize', function() {
            resizeProjectSliders();
        })

        $(document).on('click', '[data-toggle="tab"]', function() {
            setTimeout(function() {
                lazyAll.update();
            }, 300);
        });

        console.log("Images loaded");

        // //$(document).off("scroll.delayedImages", checkDelayedEvent);
        // $(document).off("click.delayedImages", checkDelayedEvent);
        // $(document).off("mousemove.delayedImages", checkDelayedEvent);

        // $(document).off("touchstart.delayedImages", checkDelayedEvent);
        // $(document).off("touchmove.delayedImages", checkDelayedEvent);
    }
});
