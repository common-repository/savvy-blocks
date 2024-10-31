import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import {
    flexAlignmentClassGenerator,
    marginClassGenerator,
    gapClassGenerator,
} from '/components/editor';

import {
    itemWidthClassGenerator,
    itemHeightClassGenerator,
    sliderHeightClassGenerator,
    arrowFontSizeClassGenerator,
} from './editor/index';

const Save = (props) => {
    const {
        attributes: {
            slider,
            margin,
            blockId,
            swiperId,
            swiperModule,
            pagination,
            arrow,
            scrollbar,
            swiperHeight,
            swiperAlignment,
        },
    } = props;

    if (slider === undefined ? '' : slider) {

        function sliderProps(slider) {
            const keys = Object.keys(slider);
            const sliderPropsArray = [];

            keys.forEach(key => {
                const innerObject = slider[key];
                if (innerObject) {
                    const sliderProps = {
                        [`data-${key}`]: { key } ? true : false,
                        [`data-centeredslides-${key}`]: slider[key]?.centeredSlides,
                        [`data-slidesoffsetbefore-${key}`]: slider[key]?.slidesOffsetBefore,
                        [`data-slidesoffsetafter-${key}`]: slider[key]?.slidesOffsetAfter,
                        [`data-autoplay-${key}`]: slider[key]?.autoPlay,
                        [`data-speed-${key}`]: slider[key]?.speed,
                        [`data-delay-${key}`]: slider[key]?.delay,
                        [`data-loop-${key}`]: slider[key]?.loop,
                        [`data-autoheight-${key}`]: slider[key]?.autoHeight,
                        [`data-slidesperview-${key}`]: slider[key]?.slidesPerView,
                        [`data-spacebetween-${key}`]: slider[key]?.spaceBetween,
                        [`data-freemode-${key}`]: slider[key]?.freeMode,
                        [`data-grid-${key}`]: slider[key]?.grid?.rows,
                    };
                    sliderPropsArray.push(sliderProps);
                }
            });

            return sliderPropsArray;
        }

        const sliderPropsArray = sliderProps(slider);
        var combinedAttributes = Object.assign({}, ...sliderPropsArray);

    }

    const blockProps = useBlockProps.save({
        className: [
            'savvy-slider position-relative',
        ].join(' '),
    });

    const marginClass = [
        ...(margin ? [marginClassGenerator(margin)] : []),
    ].join(' ');

    const marginPaginationClass = [
        ...(pagination?.margin ? [marginClassGenerator(pagination.margin)] : []),
    ].join(' ');

    const gapPaginationClass = [
        ...(pagination?.gap ? [gapClassGenerator(pagination.gap)] : []),
    ].join(' ');

    const alignmentPaginationClass = [
        ...(pagination?.alignment ? [flexAlignmentClassGenerator(pagination.alignment)] : []),
    ].join(' ');

    const colorPaginationClass = pagination?.color ? `${pagination?.color}` : '';

    const stylePaginationClass = pagination?.style ? `pagination-${pagination?.style}` : '';

    const widthPagination = [
        ...(pagination?.width ? [itemWidthClassGenerator(pagination.width)] : []),
    ].join(' ');

    const heightPagination = [
        ...(pagination?.height ? [itemHeightClassGenerator(pagination.height)] : []),
    ].join(' ');

    //Scrollbar
    const marginScrollbarClass = [
        ...(scrollbar?.margin ? [marginClassGenerator(scrollbar.margin)] : []),
    ].join(' ');

    const colorScrollbarClass = scrollbar?.color ? `${scrollbar?.color}` : '';

    //Navigation
    const arrowFontSize = [
        ...(arrow?.fontSize ? [arrowFontSizeClassGenerator(arrow.fontSize)] : []),
    ].join(' ');

    const colorArrowClass = arrow?.color ? arrow?.color : '';
    const iconArrowClass = arrow?.icon ? arrow?.icon : '';
    const verticalArrow = arrow?.verticalPosition ? arrow?.verticalPosition : '';
    const horizontalArrow = arrow?.horizontalPosition ? arrow?.horizontalPosition : '';

    //Height
    const sliderHeight = [
        ...(swiperHeight?.height ? [sliderHeightClassGenerator(swiperHeight.height)] : []),
    ].join(' ');

    return (
        <div {...blockProps}>
            <div className={`swiper slider-swiper position-static ${marginClass}`} data-pagination-color={colorPaginationClass} data-pagination-type={pagination?.type} id={swiperId ? swiperId : blockId}>
                <span className="swiper-data" {...combinedAttributes}></span>
                <div className={`swiper-wrapper ${swiperAlignment}`}>
                    <InnerBlocks.Content />
                </div>

                <div class={`swiper-module-wrapper d-flex  ${horizontalArrow}`}>

                    {swiperModule?.navigation === true && (
                        <div class={`swiper-navigation swiper-button-prev ${verticalArrow} swiper-button-prev-${swiperId ? swiperId : blockId}`}>
                            <span class={`savvy-icon has-${colorArrowClass}-color`}>
                                <span class={`savvy-responsive-font-size icon-size icon-${iconArrowClass}`} style={`${arrowFontSize}`}></span>
                            </span>
                        </div>
                    )}

                    {swiperModule?.pagination === true && (
                        <div style={`${widthPagination}; ${heightPagination};`} class={`swiper-pagination position-relative d-flex flex-row align-items-center bottom-0 ${alignmentPaginationClass} ${marginPaginationClass} ${gapPaginationClass} ${stylePaginationClass} swiper-pagination-${swiperId ? swiperId : blockId}`}></div>
                    )}

                    {swiperModule?.navigation === true && (
                        <>
                            <div class={`swiper-navigation swiper-button-next ${verticalArrow} swiper-button-next-${swiperId ? swiperId : blockId}`}>
                                <span class={`savvy-icon has-${colorArrowClass}-color`}>
                                    <span class={`savvy-responsive-font-size icon-size icon-${iconArrowClass}`} style={`${arrowFontSize}`}></span>
                                </span>
                            </div>
                        </>
                    )}

                </div>

                {swiperModule?.scrollbar === true && (
                    <>
                        <div style={`--scrollbar-color:${colorScrollbarClass};`} class={`swiper-scrollbar responsive-scrollbar position-relative d-flex flex-row align-items-center bottom-0 ${marginScrollbarClass} swiper-scrollbar-${swiperId ? swiperId : blockId}`}></div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Save

