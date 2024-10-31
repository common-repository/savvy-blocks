import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

function GeneralSetting ( props ) {
    const {
        containerType,
        setAttributes,
    } = props;

    const CONTAINER_TYPE_OPTIONS = [
        { label: __( 'Fluid Container' ), value: 'container-fluid' },
        { label: __( 'Container' ), value: 'container' },
        { label: __( 'Container Small' ), value: 'container-sm' },
        { label: __( 'Container Medium' ), value: 'container-md' },
        { label: __( 'Container Large' ), value: 'container-lg' },
        { label: __( 'Container X-Large' ), value: 'container-xl' },
        { label: __( 'Container XX-Large' ), value: 'container-xxl' },
    ];

    return (
        <>
            <SelectControl
                label={ __( 'Container Type', 'savvy-blocks' ) }
                options={ CONTAINER_TYPE_OPTIONS }
                onChange={ ( selectedItem ) => setAttributes( { containerType: selectedItem } ) }
                value={ containerType || 'container' }
            />
        </>
    )
}

export default GeneralSetting;