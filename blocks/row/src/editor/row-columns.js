import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor'

const RowColumns = (props) => {
    const ROW_COLS = [ 'auto', 1, 2, 3, 4, 5, 6 ];
    const {
        value: rowColumns,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings )

    if (!rowColumns) {
        const initRowColumns = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = '';
                return obj;
            }, {
                '_': ''
            }
        );
        onChange(initRowColumns);
    }

    return (
        <>
            <SelectControl
                value={ rowColumns && rowColumns[tabName] && rowColumns[tabName] }
                options={
                    [
                        { label: '-', value: '' },
                        ...ROW_COLS.map((col) => {
                            return {label: `row-cols-${col}`, value: col}
                        })
                    ]
                }
                onChange={ (value) => onChange({...rowColumns, [tabName] : value })}
            />
            <ShowClassList
                attr = { rowColumns }
                classGenerator  = { rowColsClassGenerator }
            />
        </>
    )
}

const rowColsClassGenerator = (rowColumns) => {
    const classList = [];
    for (const breakpoint in rowColumns) {
        const rowColsValue = rowColumns[breakpoint];
        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : '';

        if(rowColsValue){
            classList.push(`row-cols-${breakpointCss}${rowColsValue}`);
        }
    }
    return classList.join(' ');
}

export {
    RowColumns as default,
    rowColsClassGenerator
};
