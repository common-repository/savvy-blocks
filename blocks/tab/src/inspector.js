import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor'
import {
    BaseControl,
    PanelBody,
    TextControl,
} from '@wordpress/components'

function Inspector( props ) {
    const {
        attributes: {
            tabLabel,
        },
        setAttributes,
    } = props

    return (
        <InspectorControls>
            <PanelBody>
                <BaseControl>
                    <TextControl
                        label={ __('Label', 'savvy-blocks') }
                        value={ tabLabel }
                        onChange={ ( text ) => setAttributes({ tabLabel: text }) }
                    />
                </BaseControl>
            </PanelBody>
        </InspectorControls>
    );
}

export default Inspector;
