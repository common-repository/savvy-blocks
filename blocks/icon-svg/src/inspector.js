import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
    BaseControl,
    Panel,
    PanelBody,
    __experimentalDivider as Divider,
} from '@wordpress/components'

import { Settings } from '/components/context';

import  {
    SpacingSetting,
    DisplayTypeTabs,
    Gap,
}  from '/components/editor';

import {
    BorderSetting,
    GeneralSetting,
    FlexAlignment,
    WrapperSetting,
    IconSelector,
    BoxShadowSetting,
} from './inspector/index.js';



function Inspector( props ) {
    const {
        attributes: {
            blockType,
            background,
            border,
            boxShadow,
            flexAlignment,
            gap,
            icon,
            padding,
            elementStates
        },
        attributes,
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
                <PanelBody title={ __('Icon', 'savvy-blocks') }>
                    <IconSelector
                        icon={ icon }
                        blockType = { blockType }
                        setAttributes={ setAttributes }
                        settings = { settings }
                    />
                </PanelBody>
                <PanelBody title={ __('General Setting', 'savvy-blocks') } initialOpen={ false }>
                    <GeneralSetting
                        icon={ icon }
                        blockType = { blockType }
                        attributes= { attributes}
                        setAttributes={ setAttributes }
                        settings = { settings }
                    />
                </PanelBody>
            </Panel>
            {
                blockType === 'custom' &&
                <>
                <Panel>
                    <PanelBody title={ __('SVG Wrapper Setting', 'savvy-blocks') } initialOpen={ false} >
                        <WrapperSetting
                            background = { background }
                            elementStates = { elementStates }
                            setAttributes={ setAttributes }
                        />
                    </PanelBody>
                    <PanelBody title={ __('Border', 'savvy-blocks') } initialOpen={ false }>
                        <DisplayTypeTabs>
                            <BorderSetting
                                border={ border }
                                elementStates = { elementStates }
                                setAttributes={ setAttributes }
                                supports = { ['radius', 'width','color', 'style'] }
                            />
                        </DisplayTypeTabs>
                    </PanelBody>
                        <PanelBody title={ __('Box Shadow', 'savvy-blocks') } initialOpen={ false } >
                            <BoxShadowSetting
                                boxShadow={ boxShadow }
                                elementStates = { elementStates }
                                setAttributes={ setAttributes }
                            />
                        </PanelBody>

                    <PanelBody title={ __( 'Alignment', 'savvy-blocks' ) } initialOpen={ false }>
                        <DisplayTypeTabs>
                            <FlexAlignment
                                value={ flexAlignment }
                                onChange={ ( value ) => { setAttributes( { flexAlignment: value } ) } }
                            />
                        </DisplayTypeTabs>
                    </PanelBody>
                        <PanelBody title={ __('Spacing', 'savvy-blocks') } initialOpen={ false } >
                            <SpacingSetting
                                padding={ padding }
                                setAttributes={ setAttributes }
                            />
                                <Divider/>
                                <BaseControl label={ __( 'Gap', 'savvy-blocks' ) }>
                                    <DisplayTypeTabs>
                                        <Gap
                                            value={ gap }
                                            onChange={ ( value ) => { setAttributes( { gap: value } ) } }
                                        />
                                    </DisplayTypeTabs>
                                </BaseControl>
                        </PanelBody>
                </Panel>
                </>
            }
        </InspectorControls>
    );
}

export default Inspector;
