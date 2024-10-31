import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor'

const Col = (props) => {
    const COLS = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const {
        value: col,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings)

    if (!col) {
        const initCol = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = '';
                return obj;
            }, {
                '_': ''
            }
        );
        onChange(initCol);
    }

    return (
        <>
            <SelectControl
                value={ col && col[tabName] }
                options={
                    [
                        { label: '-', value: '' },
                        ...COLS.map((col) => {
                            return {label: `col-${col}`, value: col}
                        })
                    ]
                }
                onChange={ (value) => onChange({ ...col, [tabName]: value })}
            />
            <ShowClassList
                attr = { col }
                classGenerator  = { colClassGenerator }
            />
        </>

    )
}

const colClassGenerator = (col) => {
    const classList = [];
    for (const breakpoint in col) {

        const rowColsValue = col[breakpoint];
        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : '';

        if(rowColsValue){
            classList.push(`col-${breakpointCss}${rowColsValue}`);
        }

    }
    return classList.join(' ');
}

export {
    Col as default,
    colClassGenerator
};
