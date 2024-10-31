import {
    effectClassGenerator,
    effectStyleGenerator,
    gapClassGenerator,
    marginClassGenerator,
    paddingClassGenerator
} from '/components/editor';

export function getBlockProps( attributes ){
    const {
        backgroundColor,
        border,
        blockType,
        effects,
        elementStates,
        gap,
        margin,
        padding,
        textColor,
    } = attributes;

    //Sate includes hover, active, focus, ... (tag a in button
    let colorStatesClasses = [];
    if ( elementStates !== undefined && Object.keys( elementStates ).length !== 0 ) {
        colorStatesClasses = Object.keys( elementStates ).map( ( attrSlug ) => {
           return ([
                    ...( elementStates?.[ attrSlug ]?.backgroundColor ? [ `bg-${ attrSlug }-${ elementStates?.[ attrSlug ]?.backgroundColor }` ] : [] ),
                    ...( elementStates?.[ attrSlug ]?.textColor ? [ `text-${ attrSlug }-${ elementStates?.[ attrSlug ]?.textColor }` ] : [] ),
               ].join(' '))
           }
       );
    }

    return(
        {
            style: {
                [ '--hover-overlay-color' ]: elementStates?.hover?.overlay?.color || undefined,
                [ '--active-overlay-color' ]: elementStates?.active?.overlay?.color || undefined,
                [ '--hover-overlay-gradient' ]: elementStates?.hover?.overlay?.gradient || undefined,
                [ '--active-overlay-gradient' ]: elementStates?.active?.overlay?.gradient || undefined,
                [ '--hover-overlay-opacity' ]: ( elementStates?.hover?.overlay?.opacity || elementStates?.hover?.overlay?.opacity === 0 ) ? elementStates?.hover?.overlay?.opacity + '%' : undefined,
                [ '--active-overlay-opacity' ]: ( elementStates?.active?.overlay?.opacity || elementStates?.active?.overlay?.opacity === 0 ) ? elementStates?.active?.overlay?.opacity + '%' : undefined,
                borderRadius: border?.radius || undefined,
                borderWidth : border?.width || undefined,
                borderColor : border?.color || undefined,
                ...(effects && effectStyleGenerator(effects)),
            },
            className: [
                `savvy-btn savvy-btn-${ blockType }`,
                ...( backgroundColor ? [ `bg-${ backgroundColor }`] : [] ),
                ...( gap ? [ gapClassGenerator( gap ) ] : [] ),
                ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
                ...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
                ...( textColor ? [ `text-${ textColor }` ] : [] ),
                ...( effects? [ effectClassGenerator( effects ) ] : [] ),
                ...colorStatesClasses,
                ...(
                    elementStates?.hover?.overlay?.hasGradientOverlay ? (
                        elementStates?.hover?.overlay?.gradient !== undefined ? [ `has-hover-overlay-gradient` ] : []
                    ) : (
                        elementStates?.hover?.overlay?.color !== undefined ? [ `has-hover-overlay-color` ] : []
                    )
                ),
                ...(
                    elementStates?.active?.overlay?.hasGradientOverlay ? (
                        elementStates?.active?.overlay?.gradient !== undefined ? [ `has-active-overlay-gradient` ] : []
                    ) : (
                        elementStates?.active?.overlay?.color !== undefined ? [ `has-active-overlay-color` ] : []
                    )
                ),
                ...( elementStates?.hover?.overlay?.opacity !== undefined ? [ `has-hover-overlay-opacity` ] : [] ),
                ...( elementStates?.active?.overlay?.opacity !== undefined ? [ `has-active-overlay-opacity` ] : [] )
            ].join(' ')
        }
    )
}
