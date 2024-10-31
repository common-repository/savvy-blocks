import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor'
import {
    Panel,
    PanelBody,
} from '@wordpress/components'

import { Settings } from '/components/context';

import {
    BorderSetting,
    GeneralSetting,
    IconSetting,
} from './inspector/';

function Inspector( props ) {
    const {
        attributes: {
            blockType,
            border,
            icon,
            size,
        },
        setAttributes,
    } = props;

    /**
     * the savvy-setting data setAttributes in first load , is in edit.js and function useDefault()
     * with useDefault() in edit.js in first load the savvy-setting data goes to attributes with useDefault()
     */
    const { settings } = useContext( Settings )

    return (
        <InspectorControls>
            <Panel>
                <PanelBody>
                    <GeneralSetting
                        icon={ icon }
                        blockType = { blockType }
                        setAttributes={ setAttributes }
                        settings = { settings }
                    />
                </PanelBody>
            </Panel>
            {
                blockType === 'custom' &&
                <>
                        <Panel>
                            <PanelBody title={ __('Icon size', 'savvy-blocks') } initialOpen={ false }>
                                <IconSetting
                                    size={ size }
                                    setAttributes={ setAttributes }
                                />
                            </PanelBody>
                        </Panel>
                        <Panel>
                            <PanelBody title={ __('Border', 'savvy-blocks') } initialOpen={ false }  >
                                <BorderSetting
                                    border={ border }
                                    setAttributes={ setAttributes }
                                />
                            </PanelBody>
                        </Panel>
                </>
            }
        </InspectorControls>
    );
}

export default Inspector;
