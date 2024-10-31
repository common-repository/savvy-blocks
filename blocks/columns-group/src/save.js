import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import {
    marginClassGenerator,
} from '/components/editor';

import {
    columnGroupClassGenerator,
    columnGroupAlignmentsClassGenerator,
    columnGroupGapClassGenerator
} from './inspector/index';

const Save = (props) => {
    const {
        attributes: {
            columnGroup,
            margin,
            blockId
        },
    } = props;

    if ( columnGroup === undefined ? '' : columnGroup ){

        function sliderProps(columnGroup) {
            const keys = Object.keys(columnGroup);
            const sliderPropsArray = [];
        
            keys.forEach(key => {
                const innerObject = columnGroup[key];
                if ( innerObject && innerObject?.hasSlider === true ) {
                    const sliderProps = {
                        [`data-${key}`]: {key} ? true : false,
                        [`data-centeredslides-${key}`]: columnGroup[key]?.slider?.centeredSlides,
                        [`data-slidesoffsetbefore-${key}`]: columnGroup[key]?.slider?.slidesOffsetBefore,
                        [`data-slidesoffsetAfter-${key}`]: columnGroup[key]?.slider?.slidesOffsetAfter,
                        [`data-autoplay-${key}`]: columnGroup[key]?.slider?.autoPlay,
                        [`data-speed-${key}`]: columnGroup[key]?.slider?.speed,
                        [`data-delay-${key}`]: columnGroup[key]?.slider?.delay,
                        [`data-loop-${key}`]: columnGroup[key]?.slider?.loop,
                        [`data-slidesperview-${key}`]: columnGroup[key]?.slider?.slidesPerView,
                        [`data-spacebetween-${key}`]: columnGroup[key]?.slider?.spaceBetween,
                        [`data-freemode-${key}`]: columnGroup[key]?.slider?.freeMode,
                        [`data-grid-${key}`]: columnGroup[key]?.slider?.grid?.rows,
                    };
                    sliderPropsArray.push(sliderProps);
                }
            });
        
            return sliderPropsArray;
        }

        const sliderPropsArray = sliderProps(columnGroup);
        var combinedAttributes = Object.assign({}, ...sliderPropsArray);
        
    }

    const blockProps = useBlockProps.save({
        className: [
            'savvy-columns-group position-relative',
            ...( columnGroup ? [ columnGroupClassGenerator( columnGroup ) ] : [] ),
        ].join(' '),
    } );

    const marginClass =  [
        ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
    ].join(' ');

    const alignmentsClass =  [
        ...( columnGroup ? [ columnGroupAlignmentsClassGenerator( columnGroup ) ] : [] ),
    ].join(' ');

    const gapClass =  [
        ...( columnGroup ? [ columnGroupGapClassGenerator( columnGroup ) ] : [] ),
    ].join(' ');
    
    return (
        <div { ...blockProps }>
            <div className={ `swiper columns-group-swiper position-static ${ marginClass }` } id={ blockId }>
                <span className="swiper-data" {...combinedAttributes}></span>
                <div className={`swiper-wrapper row ${ alignmentsClass } ${ gapClass }`}>
                    <InnerBlocks.Content />
                </div>
                <div class={ `swiper-pagination swiper-pagination-${ blockId }` }></div>
                <div class={ `swiper-button-next swiper-button-next-${ blockId }` }></div>
                <div class={ `swiper-button-prev swiper-button-prev-${ blockId }` }></div>
            </div>
        </div>
    )
}

export default Save

