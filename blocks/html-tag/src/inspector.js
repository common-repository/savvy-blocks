import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor'
import {
    Panel,
    PanelBody,
} from '@wordpress/components'

function Inspector( { attributes } ) {
    
    const { tagName } = attributes

    return (
        <InspectorControls>
            <Panel>
                <PanelBody>
                    <strong>{ __('Tag Name', 'savvy-blocks') }:</strong><span> { tagName }</span>
                </PanelBody>
            </Panel>
        </InspectorControls>
    );
}

export default Inspector;
