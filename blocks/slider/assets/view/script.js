import Swiper from 'swiper/bundle';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
    const breakpoints = savvy_breakpoints;
    const swiperList = [];
    const swiperElements = document.getElementsByClassName('slider-swiper');

    let lastBreakpoint = getCurrentBreakpoint();

    window.addEventListener('resize', function () {
        checkResize();
    });

    for (let i = 0; i < swiperElements.length; i++) {
        const swiperData = swiperElements[i].querySelector('.swiper-data');
        const swiperId = swiperElements[i].getAttribute('id');
        const paginationType = swiperElements[i].getAttribute('data-pagination-type');
        const paginationColor = swiperElements[i].getAttribute('data-pagination-color');
        const swiperAll = swiperData.getAttribute('data-_');

        const initSwiperOptions = {
            grabCursor: true,
            mousewheelControl: true,
            keyboardControl: true,
            loopAddBlankSlides: true,
            navigation: {
                nextEl: ".swiper-button-next-" + swiperId,
                prevEl: ".swiper-button-prev-" + swiperId,
            },
            pagination: {
                el: ".swiper-pagination-" + swiperId,
                clickable: true,
                renderBullet: function (index, className) {
                    if (paginationType === "custom") {
                        return '<span class="m-0 savvy-responsive-width savvy-responsive-height d-flex flex-column align-items-center justify-content-center ' + className + ' bg-' + paginationColor + '">' + (index + 1) + "</span>";
                    } else {
                        return '<span class="m-0 savvy-responsive-width savvy-responsive-height ' + className + ' bg-' + paginationColor + '" tabindex="'+ index +'" role="button" aria-current="false"></span>';
                    }
                },
                renderProgressbar: function (progressbarFillClass) {
                    return '<span class="m-0 savvy-responsive-width savvy-responsive-height ' + progressbarFillClass + ' bg-' + paginationColor + '"></span>';
                },
                renderFraction: function (currentClass, totalClass) {
                    return '<div><span class="m-0 savvy-responsive-width savvy-responsive-height ' + currentClass + ' text-' + paginationColor + '"></span>' + ' <span class="text-' + paginationColor + '">/</span> ' + '<span class="' + totalClass + ' text-' + paginationColor + '"></span></div>';
                },
            },
            scrollbar: {
                el: ".swiper-scrollbar-" + swiperId,
                hide: false,
            },
        };

        if (paginationType !== "custom") {
            initSwiperOptions.pagination.type = paginationType;
        }

        let swiperOptions = {};

        if (breakpoints) {
            for (let breakpoint of Object.keys(breakpoints)) {
                let breakpointOptions = {};

                const dataBreakpoint = swiperData.getAttribute('data-' + breakpoint);
                if (dataBreakpoint !== null) {
                    const loop = swiperData.getAttribute('data-loop-' + breakpoint);
                    if (loop != null) {
                        breakpointOptions.loop = loop === 'true';
                    }

                    const spaceBetween = swiperData.getAttribute('data-spacebetween-' + breakpoint);
                    if (spaceBetween != null) {
                        breakpointOptions.spaceBetween = parseFloat(spaceBetween);
                    }

                    const slidesPerView = swiperData.getAttribute('data-slidesperview-' + breakpoint);
                    if (slidesPerView != null) {
                        breakpointOptions.slidesPerView = slidesPerView;
                        breakpointOptions.slidesPerGroup = slidesPerView;
                    }

                    const autoPlay = swiperData.getAttribute('data-autoplay-' + breakpoint);
                    if (autoPlay != null) {
                        const autoplayValue = autoPlay === 'true';
                        const delayAttr = swiperData.getAttribute('data-delay-' + breakpoint) || '4000';

                        breakpointOptions.autoplay = autoplayValue ? { delay: parseFloat(delayAttr) } : false;
                    }

                    const grid = swiperData.getAttribute('data-grid-' + breakpoint);
                    if (grid != null) {
                        breakpointOptions.grid = { rows: parseFloat(grid), fill: 'row' };
                    }

                    const centeredSlides = swiperData.getAttribute('data-centeredslides-' + breakpoint);
                    if (centeredSlides != null) {
                        breakpointOptions.centeredSlides = centeredSlides === 'true';
                    }

                    const speed = swiperData.getAttribute('data-speed-' + breakpoint);
                    if (speed != null) {
                        breakpointOptions.speed = parseFloat(speed);
                    }

                    const freeMode = swiperData.getAttribute('data-freemode-' + breakpoint);
                    if (freeMode != null) {
                        breakpointOptions.freeMode = freeMode === 'true';
                    }

                    const autoHeight = swiperData.getAttribute('data-autoheight-' + breakpoint);
                    if (autoHeight != null) {
                        breakpointOptions.autoHeight = autoHeight === 'true';
                    }

                    const slidesOffsetBefore = swiperData.getAttribute('data-slidesoffsetbefore-' + breakpoint);
                    if (slidesOffsetBefore != null) {
                        breakpointOptions.slidesOffsetBefore = parseFloat(slidesOffsetBefore);
                    }

                    const slidesOffsetAfter = swiperData.getAttribute('data-slidesoffsetafter-' + breakpoint);
                    if (slidesOffsetAfter != null) {
                        breakpointOptions.slidesOffsetAfter = parseFloat(slidesOffsetAfter);
                    }

                    swiperOptions[breakpoint] = { ...initSwiperOptions, ...breakpointOptions };

                } else {
                    const loop = swiperData.getAttribute('data-loop-_');
                    if (loop != null) {
                        breakpointOptions.loop = loop === 'true';
                    }

                    const spaceBetween = swiperData.getAttribute('data-spacebetween-_');
                    if (spaceBetween != null) {
                        breakpointOptions.spaceBetween = parseFloat(spaceBetween);
                    }

                    const slidesPerView = swiperData.getAttribute('data-slidesperview-_');
                    if (slidesPerView != null) {
                        breakpointOptions.slidesPerView = slidesPerView;
                        // breakpointOptions.slidesPerGroup = slidesPerView;
                    }

                    const autoPlay = swiperData.getAttribute('data-autoplay-_');
                    if (autoPlay != null) {
                        const autoplayValue = autoPlay === 'true';
                        const delayAttr = swiperData.getAttribute('data-delay-_') || '4000';

                        breakpointOptions.autoplay = autoplayValue ? { delay: parseFloat(delayAttr) } : false;
                    }

                    const grid = swiperData.getAttribute('data-grid-_');
                    if (grid != null) {
                        breakpointOptions.grid = { rows: parseFloat(grid), fill: 'row' };
                    }

                    const centeredSlides = swiperData.getAttribute('data-centeredslides-_');
                    if (centeredSlides != null) {
                        breakpointOptions.centeredSlides = centeredSlides === 'true';
                    }

                    const speed = swiperData.getAttribute('data-speed-_');
                    if (speed != null) {
                        breakpointOptions.speed = parseFloat(speed);
                    }

                    const freeMode = swiperData.getAttribute('data-freemode-_');
                    if (freeMode != null) {
                        breakpointOptions.freeMode = freeMode === 'true';
                    }

                    const autoHeight = swiperData.getAttribute('data-autoheight-_');
                    if (autoHeight != null) {
                        breakpointOptions.autoHeight = autoHeight === 'true';
                    }

                    const slidesOffsetBefore = swiperData.getAttribute('data-slidesoffsetbefore-_');
                    if (slidesOffsetBefore != null) {
                        breakpointOptions.slidesOffsetBefore = parseFloat(slidesOffsetBefore);
                    }

                    const slidesOffsetAfter = swiperData.getAttribute('data-slidesoffsetafter-_');
                    if (slidesOffsetAfter != null) {
                        breakpointOptions.slidesOffsetAfter = parseFloat(slidesOffsetAfter);
                    }

                    swiperOptions[breakpoint] = { ...initSwiperOptions, ...breakpointOptions };
                }
            }
        }

        swiperList.push(
            {
                swiper: undefined,
                options: swiperOptions,
                swiperSlider(breakpoint) {
                    if (this.swiper !== undefined && this.swiper?.initialized) {
                        this.swiper.destroy();
                        this.swiper = undefined;
                    }
                    if (this.options[breakpoint]) {
                        this.swiper = new Swiper(document.getElementById(swiperId), this.options[breakpoint]);
                    } 
                }
            }
        );
    }

    // console.log(swiperList[0].options);

    initSlider();

    function initSlider() {
        swiperList.forEach((swiper) => {
            swiper.swiperSlider(getCurrentBreakpoint());
        });
    }

    function getCurrentBreakpoint() {
        const windowWidth = window.innerWidth;
        if (breakpoints) {
            const breakpointEntries = Object.entries(breakpoints);
            for (const [breakpoint, width] of breakpointEntries) {
                if (windowWidth <= width) {
                    return breakpoint;
                }
            }

            return breakpointEntries[breakpointEntries.length - 1][0];
        }

        return '';
    }

    function checkResize() {
        const breakpoint = getCurrentBreakpoint();
        if (lastBreakpoint !== breakpoint) {
            initSlider();
            lastBreakpoint = breakpoint;
        }
    }
});
