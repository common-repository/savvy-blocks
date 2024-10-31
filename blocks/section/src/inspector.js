import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
} from '@wordpress/components';


import {
    AnimationSetting,
    BackgroundResponsiveSetting,
    EffectSetting,
    effectChangedOptions,
    ShowClassList,
    SpacingSetting,
    StateTabs,
    TypographySetting,
} from '/components/editor';

const Inspector = (props) => {
    const {
        attributes: {
            animation,
            background,
            effects,
            margin,
            padding,
            textColor,
        },
        setAttributes,
    } = props;

    return (
        <InspectorControls>
                <Panel>
                    <PanelBody title={ __('Background', 'savvy-blocks') } initialOpen={ false } >
                        <BackgroundResponsiveSetting
                            background={ background }
                            onChange={ setAttributes }
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
        </InspectorControls>
    )
}

export default Inspector;