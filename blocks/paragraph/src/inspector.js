import { __ } from '@wordpress/i18n';
import { useContext } from "@wordpress/element";
import { InspectorControls } from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
} from '@wordpress/components';


import  { 
    EffectSetting,
    effectChangedOptions,
    ShowClassList,
    SpacingSetting,
    StateTabs,    
    TypographySetting
}  from '/components/editor';
import  {
    GeneralSetting,
}  from './inspector/index';
import { Settings } from '/components/context';

const Inspector = (props) => {
    const {
        attributes: {
            blockType,
            effects,
            margin,
            padding,
            textAlign,
            textColor,
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
                        blockType = { blockType }
                        setAttributes = { setAttributes }
                        settings = { settings }
                    />
                </PanelBody>
            </Panel>
            {
                blockType === 'custom' &&
                <>
                        <Panel>
                            <PanelBody title={ __('Typography', 'savvy-blocks') } initialOpen={ false } >
                                <TypographySetting
                                    textAlign={ textAlign }
                                    textColor= { textColor }
                                    setAttributes={ setAttributes }
                                />
                            </PanelBody>
                        </Panel>
                        <Panel>
                            <PanelBody title={ __('Spacing', 'savvy-blocks') } initialOpen={ false } >
                                <SpacingSetting
                                    margin={ margin }
                                    padding={ padding }
                                    setAttributes={ setAttributes }
                                />
                            </PanelBody>
                        </Panel>
                        <Panel>
                            <PanelBody title={ __('Effects', 'savvy-blocks') } initialOpen={ false } >
                                <StateTabs>
                                    <EffectSetting
                                        value={ effects }
                                        setAttributes={ setAttributes }
                                    />
                                </StateTabs>
                            </PanelBody>
                            { effectChangedOptions(effects) &&                   
                                <ShowClassList
                                    attr = { effects }
                                    classGenerator  = { effectChangedOptions }
                                    themeClass = 'savvy-changed-options'
                                /> 
                            }
                        </Panel>
                </>
            }
        </InspectorControls>
    )
}

export default Inspector;
