import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor'

const ALIGN_ITEMS = ['start', 'end', 'center', 'baseline', 'stretch']

const AlignSelf = (props) => {
    const {
        value: alignSelf,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings);

    if (alignSelf === undefined || alignSelf.length === 0) {
        const initAlignSelf = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = {
                    'align-self': '',
                };
                return obj;
            }, {
                '_': {
                    'align-self': '',
                }
            }
        );
        onChange(initAlignSelf);
    }

    const ALIGN_SELF_POSITIONS = [
        { label: __( 'Align Self' ), posValue: 'align-self', values: ALIGN_ITEMS },
    ];

    return (
        <>
            <>
                {
                    ALIGN_SELF_POSITIONS.map(({label, posValue, values}) => {
                        return(
                            <SelectControl
                                label={label}
                                value={ alignSelf && alignSelf[tabName] && alignSelf[tabName][posValue] }
                                options={
                                    [
                                        { label: '-', value: '' },
                                        ...values.map((space) => {
                                            return {label: `${space}`, value: space}
                                        })
                                    ]
                                }
                                onChange={ (value) => onChange({...alignSelf, [tabName] : { ...alignSelf[tabName] , [posValue] : value }})}
                            />
                        )
                    })
                }
            </>
            <ShowClassList
                attr = { alignSelf }
                classGenerator  = { alignSelfClassGenerator }
            />
        </>
    )
}

const alignSelfClassGenerator = (alignSelf) => {
    const classList = [];

    for (const breakpoint in alignSelf) {
        const alignItems = alignSelf[breakpoint]['align-self'];

        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : ''

        if (alignItems) {
            classList.push(`align-self-${breakpointCss}${alignItems}`)
        }
    }

    return classList.join(' ');
}

export {
    AlignSelf as default,
    alignSelfClassGenerator
};
