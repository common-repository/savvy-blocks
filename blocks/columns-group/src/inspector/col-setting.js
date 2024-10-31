import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    SelectControl,
} from '@wordpress/components';

function ColSetting ( props ) {

    const COLS = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const {
        columnGroup,
        onChange,
    } = props;

    return (
        <>
            <BaseControl>
                <SelectControl
                    label={ __( 'Column', 'savvy-blocks' ) }
                    value={ columnGroup?.col }
                    options={
                        [
                            { label: '-', value: '' },
                            ...COLS.map((col) => {
                                return {label: `col-${col}`, value: col}
                            })
                        ]
                    }
                    onChange={(value) => onChange({
                        ...columnGroup,
                        col: value
                })}
                />
            </BaseControl>
        </>

    )
}

export {
    ColSetting as default,
};
