import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { Settings } from '/components/context';
import { COLUMNS_OPTIONS } from '../inspector/index';

const ColumnsLayout = (props) => {

    const {
        columnsLayout,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings )

    if (!columnsLayout) {
        const initColumnsLayout = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = 0;
                return obj;
            }, {
                '_': 0
            }
        );
        onChange(initColumnsLayout);
    }

    return (
        <SelectControl
            value={ columnsLayout && columnsLayout[tabName] && columnsLayout[tabName] }
            options={ COLUMNS_OPTIONS }
            onChange={ (value) => onChange({...columnsLayout, [tabName] : Number(value) })}
        />
    )
}

export default ColumnsLayout;

