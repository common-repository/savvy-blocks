import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor'

const FlexAlignment = (props) => {
    const alignItems = ['start', 'end', 'center', 'baseline', 'stretch'];
    const justifyContent = ['start', 'end', 'center', 'between', 'around', 'evenly'];

    const {
        value: flexAlignment,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings )

    if (flexAlignment === undefined || flexAlignment.length === 0) {
        const initFlexAlignment = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = {
                    'align-items': '',
                    'justify-content': '',
                };
                return obj;
            }, {
                '_': {
                    'align-items': '',
                    'justify-content': '',
                }
            }
        );
        onChange(initFlexAlignment);
    }

    const flexAlignmentItems = [
        { label: __( 'Align Items' ), flexItem: 'align-items', values: alignItems },
        { label: __( 'Justify Content' ), flexItem: 'justify-content', values: justifyContent },
    ];

    return (
        <>
            {
                flexAlignmentItems.map(({label, flexItem, values}) => {
                    return(
                        <SelectControl
                            label={label}
                            value={ flexAlignment && flexAlignment[tabName] && flexAlignment[tabName][flexItem] }
                            options={
                                [
                                    { label: '-', value: '' },
                                    ...values.map((space) => {
                                        return {label: `${space}`, value: space}
                                    })
                                ]
                            }
                            onChange={ (value) => onChange({...flexAlignment, [tabName] : { ...flexAlignment[tabName] , [flexItem] : value }})}
                        />
                    )
                })
            }
            <ShowClassList
                attr = { flexAlignment }
                classGenerator  = { flexAlignmentClassGenerator }
            />
        </>
    )
}

const flexAlignmentClassGenerator = (flexAlignment) => {
    const classList = [];

    for (const breakpoint in flexAlignment) {
        const alignItems = flexAlignment[breakpoint]['align-items'];
        const justifyContent = flexAlignment[breakpoint]['justify-content'];

        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : ''

        if (justifyContent) {
            classList.push(`justify-content-${breakpointCss}${justifyContent}`)
        }
        if (alignItems) {
            classList.push(`align-items-${breakpointCss}${alignItems}`)
        }
    }

    return classList.join(' ');
}

export {
    FlexAlignment as default,
    flexAlignmentClassGenerator
};
