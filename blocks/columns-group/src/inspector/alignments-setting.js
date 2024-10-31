import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    SelectControl,
} from '@wordpress/components';

function AlignmentsSetting ( props ) {
    const {
        columnGroup,
        onChange
    } = props;

    return (
        <>
            <BaseControl>
                <SelectControl
                    label={ __( 'Alignment', 'savvy-blocks' ) }
                    value={ columnGroup?.alignment }
                    options={
                        [
                            { label: '-', value: '' },
                            { label: 'Left', value: 'start' },
                            { label: 'Right', value: 'end' },
                            { label: 'Center', value: 'center' },
                        ]
                    }
                    onChange={(value) => onChange({
                        ...columnGroup,
                        alignment: value
                })}
                />
            </BaseControl>
        </>
    )
}

export default AlignmentsSetting;