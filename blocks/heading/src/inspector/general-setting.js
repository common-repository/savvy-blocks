import { __ } from '@wordpress/i18n';
import { SelectControl} from '@wordpress/components';

import BlockTypeSelector from "/components/editor/block-type-selector";
const GeneralSetting = (props) => {
    const {
        blockType,
        headingType,
        setAttributes,
        settings,
    } = props;

    const HEADING_TYPE_OPTIONS = [
        { label: __( 'H1' ), value: 'h1' },
        { label: __( 'H2' ), value: 'h2' },
        { label: __( 'H3' ), value: 'h3' },
        { label: __( 'H4' ), value: 'h4' },
        { label: __( 'H5' ), value: 'h5' },
        { label: __( 'H6' ), value: 'h6' },
    ];

    return (
        <>
            <SelectControl
                label={ __( 'Heading Level' ) }
                options={ HEADING_TYPE_OPTIONS }
                onChange={ ( value ) => { setAttributes( { headingType: value } ) } }
                value={ headingType }
            />
            <BlockTypeSelector
                blockName="savvy-blocks/heading"
                label="Heading Type"
                blockType={ blockType }
                settings={ settings }
                setAttributes={ setAttributes }
            />
        </>
    )
}

export default GeneralSetting;
