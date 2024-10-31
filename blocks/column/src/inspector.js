import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
} from '@wordpress/components';


import {
    AlignSelfSetting,
    ColumnSetting,
    GeneralSetting,
} from './inspector/index'

const Inspector = (props) => {
    const {
        attributes: {
            alignSelf,
            col,
            offset
        },
        setAttributes,
    } = props;

    return (
        <InspectorControls>
            <Panel>
                <PanelBody>
                    <GeneralSetting
                        col={ col }
                        setAttributes={ setAttributes }
                    />
                </PanelBody>
            </Panel>
                <Panel>
                    <PanelBody title={ __('Align Self', 'savvy-blocks') } initialOpen={ false } >
                        <AlignSelfSetting
                            alignSelf = { alignSelf }
                            setAttributes={ setAttributes }
                        />
                    </PanelBody>
                </Panel>'>
                <Panel>
                    <PanelBody title={ __('Offset', 'savvy-blocks') } initialOpen={ false } >
                        <ColumnSetting
                            offset={ offset }
                            setAttributes={ setAttributes }
                        />
                    </PanelBody>
                </Panel>
        </InspectorControls>
    )
}

export default Inspector;
