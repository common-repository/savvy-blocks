import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor'
import {
    BaseControl,
    Panel,
    PanelBody,
} from '@wordpress/components';


import  { 
    BackgroundSetting,
    TypographySetting
}  from '/components/editor';
import {
    GeneralSetting,
} from './inspector/index'

function Inspector(props) {
    const {
        attributes: {
            background,
            containerType,
            textColor,
        },
        setAttributes,
    } = props;



    return (
        <InspectorControls>
            <Panel>
                <PanelBody>
                    <GeneralSetting
                        containerType={ containerType }
                        setAttributes={ setAttributes }
                        />
                </PanelBody>
            </Panel>
                <Panel>
                    <PanelBody title={ __('Background', 'savvy-blocks') } initialOpen={ false } >
                        <BaseControl label={ __('Background Image', 'savvy-blocks') }>
                            <BackgroundSetting
                                background = { background }
                                setAttributes={ setAttributes }
                                onChange={ ( background ) => {
                                    setAttributes ( { background: background } )
                                } }
                            />
                        </BaseControl>
                    </PanelBody>
                </Panel>
                <Panel>
                    <PanelBody title={ __('Typography', 'savvy-blocks') } initialOpen={ false } >
                        <TypographySetting 
                            textColor={ textColor }
                            setAttributes={ setAttributes }
                        />
                    </PanelBody>
                </Panel>
        </InspectorControls>
    );
}

export default Inspector;
