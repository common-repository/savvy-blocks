import { __ } from '@wordpress/i18n';
import {
    BaseControl,     
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';

function Top ( props ) {
    const {
        value: top,
        tabName,
        onChange
    } = props;

    return (
        <>
            <BaseControl
                label={ __('Top Space', 'savvy-blocks') }
            >
                <UnitControl
                    labelPostion={ __('edge', 'savvy-blocks') }
                    units={[
                        { value: 'px', label: 'px', default: 0 }
                    ]}
                    value={ top && top[tabName] }
                    onChange={ (unit) => onChange({ top: { ...top, [tabName]:unit } }) }
                />
            </BaseControl>
        </>
    )
}


const bulletTopStyleGenerator = (bulletTop) => {
    const cssVariables = {};
    
    for (const breakpoint in bulletTop) {
        const topSpace = bulletTop[breakpoint];
        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : ''

        if (topSpace) {
            const variableName = `--margin-top${breakpointCss}`;
            cssVariables[variableName] = topSpace
        }
    }

    return cssVariables;
};

export {
    Top as default,
    bulletTopStyleGenerator
};