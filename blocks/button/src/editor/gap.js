import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor'

const Gap = (props) => {
    const {
        value: gap,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings)

    if (gap === undefined || gap.length === 0) {
        const initGap = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = {
                    'x': '',
                };
                return obj;
            }, {
                '_': {
                    'x': '',
                }
            }
        );
        onChange(initGap);
    }

    const gapPositions = [
        { label: __( 'Column' ), posValue: 'x' },
    ];

    const {label, posValue} = gapPositions[0];

    return (
        <>
            {
                <SelectControl
                    label={label}
                    value={ gap && gap[tabName] && gap[tabName][posValue] }
                    options={
                        [
                            { label: '-', value: '' },
                            ...(settings ? settings.spaces.map((space) => {
                                return {label: `${space}px`, value: space}
                            }) : [])
                        ]
                    }
                    onChange={ (value) => onChange({...gap, [tabName] : { ...gap[tabName] , [posValue] : value }})}
                />
            }
            <ShowClassList
                attr = { gap }
                classGenerator  = { gapClassGenerator }
            />
        </>
    )
}

const gapClassGenerator = (gap) => {
    const classList = [];

    for (const breakpoint in gap) {
        const gx = gap[breakpoint]['x'];
        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : '';
        
        if (gx) {
            classList.push(`column-gap-${breakpointCss}${gx}`)
        }
    }

    return classList.join(' ');
}

export {
    Gap as default,
    gapClassGenerator
};