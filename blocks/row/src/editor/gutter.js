import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor'

const Gutter = (props) => {
    const {
        value: gutter,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings )

    if (gutter === undefined || gutter.length === 0) {
        const initGutter = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = {
                    'y': '',
                    'x': '',
                };
                return obj;
            }, {
                '_': {
                    'y': '',
                    'x': '',
                }
            }
        );
        onChange(initGutter);
    }

    const GUTTER_POSITIONS = [
        { label: __( 'Column' ), posValue: 'x' },
        { label: __( 'Row' ), posValue: 'y' },
    ];

    return (
        <>
            {
                GUTTER_POSITIONS.map(({label, posValue}) => {
                    return(
                        <SelectControl
                            label={label}
                            value={ gutter && gutter[tabName] && gutter[tabName][posValue] }
                            options={
                                [
                                    { label: '-', value: '' },
                                    { label: '0', value: '0' },
                                    ...(settings ? settings.spaces.map((space) => {
                                        return {label: `${space}px`, value: space}
                                    }) : [])
                                ]
                            }
                            onChange={ (value) => onChange({...gutter, [tabName] : { ...gutter[tabName] , [posValue] : value }})}
                        />
                    )
                })
            }
            <ShowClassList
                attr = { gutter }
                classGenerator  = { gutterClassGenerator }
            />
        </>
    )
}

const gutterClassGenerator = (gutter) => {
    const classList = [];

    for (const breakpoint in gutter) {
        const gy = gutter[breakpoint]['y'];
        const gx = gutter[breakpoint]['x'];

        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : ''

        if (gx === gy && gx) {
            classList.push(`g-${breakpointCss}${gx}`);
        } else {
            if (gx) {
                classList.push(`gx-${breakpointCss}${gx}`)
            }
            if (gy) {
                classList.push(`gy-${breakpointCss}${gy}`)
            }
        }
    }

    return classList.join(' ');
}

export {
    Gutter as default,
    gutterClassGenerator
};
