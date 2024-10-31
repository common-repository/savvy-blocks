import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    BaseControl,
    Panel,
    PanelBody,
    __experimentalDivider as Divider,
} from '@wordpress/components';


import  { 
    AnimationSetting,
    BackgroundResponsiveSetting,
    DisplayTypeTabs,
    Gap,
    SpacingSetting,
    TypographySetting,
}  from '/components/editor';

import { 
    GeneralSetting,
    TagSetting,
} from './inspector/index';

const Inspector = (props) => {
    const {
        attributes: {
            animation,
            background,
            display,
            gap,
            margin,
            padding,
            textColor,
            tagName
        },
        setAttributes,
    } = props;

    return (
        <InspectorControls>
            <Panel>
                <PanelBody>
                    <GeneralSetting
                        display={ display }
                        setAttributes={ setAttributes }
                    />
                </PanelBody>
            </Panel>
                <Panel>
                    <PanelBody title={ __('Background', 'savvy-blocks') } initialOpen={ false } >
                        <BackgroundResponsiveSetting
                            background={ background }
                            onChange={ setAttributes }
                        />
                    </PanelBody>
                </Panel>
            <Panel>
                <PanelBody title={ __('Animation', 'savvy-blocks') } initialOpen={ false } >
                    <AnimationSetting
                        animation={ animation }
                        setAttributes={ setAttributes }
                    />
                </PanelBody>
            </Panel>
                <Panel>
                    <PanelBody title={ __('Tag Name', 'savvy-blocks') } initialOpen={ false } >
                        <TagSetting
                            tagName={ tagName }
                            setAttributes={ setAttributes }
                        />
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
                <Panel>
                    <PanelBody title={ __('Spacing', 'savvy-blocks') } initialOpen={ false } >
                        <SpacingSetting
                            padding={ padding }
                            margin={ margin }
                            setAttributes={ setAttributes }
                        />
                            <Divider/>
                            <BaseControl label={ __( 'Gap', 'savvy-blocks' ) }>
                                <DisplayTypeTabs>
                                    <Gap
                                        value={ gap }
                                        onChange={ ( value ) => { setAttributes( { gap: value } ) } }
                                        // display = { display }
                                    />
                                </DisplayTypeTabs>
                            </BaseControl>
                    </PanelBody>
                </Panel>
        </InspectorControls>
    )
}

export default Inspector;
