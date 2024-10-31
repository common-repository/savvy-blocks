import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor'
import './styles.scss'

const TextAlign = (props) => {
    const {
        value: textAlign,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings )

    //textAlign is array as default
    if (textAlign === undefined || textAlign.length === 0) {
        const initTextAlign = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = '';
                return obj;
            }, {
                '_': ''
            }
        );
        onChange(initTextAlign);
    }

    return (
        <>
            <SelectControl
                value={ textAlign && textAlign[tabName] }
                options={
                    [
                        { label: '-', value: '' },
                        { label: 'Start', value: 'start' },
                        { label: 'End', value: 'end' },
                        { label: 'Center', value: 'center' },
                        { label: 'Justify', value: 'justify '}
                    ]
                }
                onChange={ (value) => onChange({...textAlign, [tabName] : value })}
            />
            <ShowClassList
                attr = { textAlign }
                classGenerator  = { textAlignClassGenerator }
            />
        </>
    )
}

const textAlignClassGenerator = (textAlign) => {
    const classList = [];

    for (const breakpoint in textAlign) {
        const alignment = textAlign[breakpoint];
        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : ''

        if (alignment) {
            classList.push(`text-${breakpointCss}${alignment}`)
        }
    }

    return classList.join(' ');
}

export {
    TextAlign as default,
    textAlignClassGenerator
};
