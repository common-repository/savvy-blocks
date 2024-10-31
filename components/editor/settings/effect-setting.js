import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    RangeControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';

const FILTERS = [
    { slug: 'blur',         title:'Blur',       step:.1, max:10, unit:'px',},
    { slug: 'brightness',   title:'Brightness', step:.1, max:3, defaultValue: 1 },
    { slug: 'contrast',     title:'Contrast',   step:.1, max:3, defaultValue: 1 },
    { slug: 'grayscale',    title:'Grayscale',  step:.01, max:1 },
    { slug: 'hueRotate',    title:'Hue Rotate', step:1, max:360, unit:'deg' },
    { slug: 'invert',       title:'Invert',     step:.01, max:1 },
    { slug: 'opacity',      title:'Opacity',    step:.01, max:1, defaultValue: 1 },
    { slug: 'saturate',     title:'Saturate',   step:.1, max:3, defaultValue: 1 },
    { slug: 'sepia',        title:'Sepia',      step:.01, max:1 },
]

function EffectSetting ( props ) {
    const {
        value:effectValues,
        tabStateName,
        setAttributes,
    } = props;

    return (
        <>
            {
                FILTERS.map(({slug, title, step, max, defaultValue }) => {
                    return(
                    <BaseControl help={ __(`Default Value of ${title}: ${defaultValue || 0 }`) }>
                        <RangeControl
                            label={ __( title, 'savvy-blocks' ) }
                            value={ (effectValues && effectValues?.[tabStateName] && effectValues[tabStateName][slug] !== undefined ) ? Number(effectValues[tabStateName][slug]) : Number( defaultValue || '' ) }
                            onChange={
                                ( value ) => setAttributes( {
                                    effects:{
                                        ...effectValues, [tabStateName]: {
                                            ...effectValues?.[tabStateName],
                                            [slug]: (value !== undefined) ? Number(value) : undefined
                                        }
                                    }
                                } )
                            }
                            step = { step }
                            min={ 0 }
                            max={ max }
                            currentInput = { 0 }
                            allowReset = { true }
                        />
                    </BaseControl>
                    )
                })
            }
        </>

    )
}


const effectClassGenerator = (effects) => {
    const classList = [];
    for (const state in effects) {
        Object.keys(effects[state]).forEach(effectName => {
            const stateCss = state !== '_' ? `-${ state }` : '';
            classList.push(`savvy-effect${ stateCss }`);
        });
    }

    return classList.join(' ');
}

const effectStyleGenerator = (effects) => {
    const style = {};

    FILTERS.forEach( filter => {
        /*Some effects has unit such as deg, px, ... */
        (effects?.['_']?.[filter?.slug] !== undefined) ? (style[`--savvy-effect-${ filter?.slug }`] = `${effects?.['_']?.[filter?.slug]}${filter?.unit !== undefined ? filter?.unit : '' }`) : null;
        (effects?.['hover']?.[filter?.slug] !== undefined ) ? (style[`--savvy-effect-hover-${ filter?.slug }`] = `${effects?.['hover']?.[filter?.slug]}${filter?.unit !== undefined ? filter?.unit : '' }`) : null;
    });

    return style;
}

const effectChangedOptions = (effects) => {
    const changedList = [];

    for (const state in effects) {
        Object.keys(effects[state]).forEach(effectName => {
            const index = FILTERS.findIndex(object => {
                return object.slug === effectName;
            });
            if ( effects?.[state]?.[effectName] === undefined || effects?.[state]?.[effectName] === FILTERS[index].defaultValue ) {
                delete effects?.[state]?.[effectName]
            }
            if (effects?.[state]?.[effectName] && !changedList.includes(effectName)) {
                changedList.push(effectName);
            }
        });
    }

    return changedList.join(', ');
}

export {
    EffectSetting as default,
    effectClassGenerator,
    effectStyleGenerator,
    effectChangedOptions
};

