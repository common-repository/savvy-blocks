import Swiper from 'swiper/bundle';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
    const breakpoints = savvy_breakpoints;
    const swiperList = [];
    const swiperElements = document.getElementsByClassName('columns-group-swiper');

    let lastBreakpoint = getCurrentBreakpoint();

    window.addEventListener('resize', function() {
        checkResize();
    });

    for (let i = 0; i < swiperElements.length; i++) {
        const swiperData = swiperElements[i].querySelector('.swiper-data');
        const swiperId = swiperElements[i].getAttribute('id');

        const initSwiperOptions = {
            grabCursor: true,
            mousewheelControl: true,
            keyboardControl: true,
            navigation: {
                nextEl: ".swiper-button-next-" + swiperId,
                prevEl: ".swiper-button-prev-" + swiperId,
            },
            pagination: {
                el: ".swiper-pagination-" + swiperId,
                clickable: true,
            },
            // modules: [Navigation, Pagination, Autoplay],
            on: {
                init: function () {
                    this.wrapperEl.classList.remove('row');
                },
                beforeDestroy: ( swiper ) => {
                    swiper.wrapperEl.classList.add('row');
                }
            }
        };

        let swiperOptions = { };

        if (breakpoints) {
            for ( let breakpoint of Object.keys(breakpoints) ) {
                let breakpointOptions = {};

                const dataBreakpoint = swiperData.getAttribute('data-' + breakpoint);
                if ( dataBreakpoint !== null ) {
                    const loop = swiperData.getAttribute('data-loop-' + breakpoint);
                    if (loop != null) {
                        breakpointOptions.loop = loop === 'true';
                    }

                    const spaceBetween = swiperData.getAttribute('data-spacebetween-' + breakpoint);
                    if (spaceBetween != null) {
                        breakpointOptions.spaceBetween = parseFloat(spaceBetween);
                    }

                    const slidesPerView= swiperData.getAttribute('data-slidesperview-' + breakpoint);
                    if (slidesPerView!= null) {
                        breakpointOptions.slidesPerView= slidesPerView;
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

                    const slidesOffsetBefore = swiperData.getAttribute('data-slidesoffsetbefore-' + breakpoint);
                    if (slidesOffsetBefore != null) {
                        breakpointOptions.slidesOffsetBefore = parseFloat(slidesOffsetBefore);
                    }

                    const slidesOffsetAfter = swiperData.getAttribute('data-slidesoffsetAfter-' + breakpoint);
                    if (slidesOffsetAfter != null) {
                        breakpointOptions.slidesOffsetAfter = parseFloat(slidesOffsetAfter);
                    }

                    swiperOptions[breakpoint] = { ...initSwiperOptions, ...breakpointOptions };

                } else {
                    swiperOptions[breakpoint] = false;
                }
            }
        }

        swiperList.push(
            {
                swiper: undefined,
                options: swiperOptions,
                swiperSlider( breakpoint ) {
                    if ( this.options[breakpoint] ) {
                        this.swiper = new Swiper( document.getElementById( swiperId ), this.options[breakpoint] );
                    } else if (this.swiper !== undefined && this.swiper.initialized) {
                        this.swiper.destroy();
                        this.swiper = undefined;
                    }
                }
            }
        );
    }

    initSlider();

    function initSlider(){
        swiperList.forEach( ( swiper ) => {
            swiper.swiperSlider( getCurrentBreakpoint() );
        });
    }

    function getCurrentBreakpoint() {
        const windowWidth = window.innerWidth;
        if (breakpoints) {
            const breakpointEntries = Object.entries(breakpoints);
            for ( const [breakpoint, width] of breakpointEntries ) {
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
