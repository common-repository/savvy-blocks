import { __ } from '@wordpress/i18n'
import { InspectorControls } from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
} from '@wordpress/components';

import { GeneralSetting } from './inspector/index';

const Inspector = (props) => {
    const {
        attributes: {
            link
        },
        setAttributes,
    } = props;

    return (
        <InspectorControls>
            <Panel className='wp-block-savvy-blocks-link'>
                <PanelBody>
                    <GeneralSetting 
                        link={ link }
                        setAttributes={ setAttributes }
                    />
                </PanelBody>
            </Panel>
        </InspectorControls>
    )
}

export default Inspector;
