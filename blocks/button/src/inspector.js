import { __ } from '@wordpress/i18n';
import { 
    useContext
} from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor'
import {
    Panel,
    PanelBody,
    TabPanel,
    __experimentalDivider as Divider,
} from '@wordpress/components';


import  { 
    Accessibility,
    BorderSetting,
    EffectSetting,
    effectChangedOptions,
    ShowClassList,
    SpacingSetting,
    StateTabs,    
    TypographySetting
}  from '/components/editor';
import  { 
    BackgroundSetting,
    ElementStatesSetting,
    GapSetting,
    GeneralSetting,
    IconSetting,
}  from './inspector/index';

import { Settings } from '/components/context';

function Inspector( props ) {
    const {
        attributes: {
            accessibility,
            text,
            url,
            target,
            icons,
            border,
            blockType,
            effects,
            padding,
            margin,
            gap,
            rel,
            textColor,
            backgroundColor,
            elementStates
        },
        setAttributes,
    } = props;

    const { settings } = useContext( Settings )
    const TABS_COLOR = [
        {
            name: 'default',
            title: 'Default',
            className: 'tab-color',
            attrSlug: ''
        },
        {
            name: 'hover',
            title: 'Hover',
            className: 'tab-hover',
            attrSlug: 'hover'
        },
        {
            name: 'active',
            title: 'Active',
            className: 'tab-active',
            attrSlug: 'active'
        },
    ]
    const ARIA_FIELDS = [
        'description'
    ]

    return (
        <InspectorControls>
            <Panel>
                <PanelBody>
                    <GeneralSetting 
                        text = { text }
                        url = { url }
                        rel = { rel }
                        target = { target }
                        blockType = { blockType }
                        setAttributes = { setAttributes }
                        settings = { settings }
                    />
                </PanelBody>
            </Panel>
            {
                blockType === 'custom' &&
                <>
                        <Panel header= { __( 'Custom Setting', 'savvy-blocks' ) }>
                                <PanelBody title={ __( 'Icons', 'savvy-blocks' ) } initialOpen={ false }>
                                    <IconSetting
                                        icons={ icons }
                                        setAttributes={ setAttributes }
                                    />
                                </PanelBody>
                        </Panel>
                    <Panel>
                        <PanelBody title={ __( 'Color', 'savvy-blocks' ) } initialOpen={ false }>
                            <TabPanel
                                className='tabs'
                                activeClass='active-tab'
                                tabs= { TABS_COLOR }
                            >
                                { ( tab ) => (

                                    tab.name === 'default' ? (
                                        <>
                                                <BackgroundSetting
                                                    backgroundColor={ backgroundColor }
                                                    setAttributes={ setAttributes }
                                                />
                                            <Divider />
                                                <TypographySetting
                                                    textColor={ textColor }
                                                    setAttributes={ setAttributes }
                                                />
                                        </>
                                    ) : (
                                            <ElementStatesSetting
                                                elementStates={ elementStates }
                                                tabName={ tab.attrSlug }
                                                setAttributes={ setAttributes }
                                            />
                                    )
                                )}
                            </TabPanel>
                        </PanelBody>
                    </Panel>
                        <PanelBody title={ __('Gap', 'savvy-blocks') } initialOpen={ false }>
                            <GapSetting
                                gap={ gap }
                                setAttributes={ setAttributes }
                            />
                        </PanelBody>
                        <Panel>
                            <PanelBody title={ __( 'Spacing', 'savvy-blocks' ) } initialOpen={ false }>
                                <SpacingSetting
                                    padding={ padding }
                                    margin={ margin }
                                    setAttributes={ setAttributes }
                                />
                            </PanelBody>
                        </Panel>
                        <Panel>
                            <PanelBody title={ __('Border', 'savvy-blocks') } initialOpen={ false }>
                                <BorderSetting
                                    border={ border }
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
                        <PanelBody title={ __('Accessibility', 'savvy-blocks') } initialOpen={ false } >
                            <Accessibility
                                fields = { ARIA_FIELDS }
                                value={ accessibility }
                                onChange={ ({ fieldValue, fieldName } )=> {
                                        setAttributes({ accessibility :  { ...accessibility, [fieldName] : fieldValue } })
                                } }
                            />
                        </PanelBody>
                </>
            }
        </InspectorControls>
    );
}

export default Inspector;
