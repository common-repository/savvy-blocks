import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    RangeControl,
    TabPanel,
    __experimentalDivider as Divider,
    ToggleControl,
} from '@wordpress/components'

import BlockTypeSelector from "/components/editor/block-type-selector";

import  {
    Color,
    DisplayTypeTabs,
}  from '/components/editor';

import { IconSize } from './index';

function GeneralIconSetting ( props ) {
    const {
        blockType,
        settings,
        attributes : {
            opacity,
            rotation,
            size,
            elementStates,
            iconSettings,
        },
        setAttributes
    } = props;

    const TABS_COLOR = [
        {
            name: 'default',
            title: 'Default',
            className: 'tab-color',
            attrSlug: ''
        },
    ]

    return (
        <>
            <BlockTypeSelector
                blockName="savvy-blocks/icon"
                label="Icon Type"
                blockType={ blockType }
                settings={ settings }
                setAttributes={ setAttributes }
            />

            <Divider />
                <DisplayTypeTabs>
                    <IconSize
                        value={size}
                        onChange={(value) => {
                            setAttributes({size: value})
                        }}
                    />
                </DisplayTypeTabs>
            <Divider />
                <BaseControl label={ __("Opacity", "savvy-blocks")}>
                    <TabPanel
                        className='tabs'
                        activeClass='active-tab'
                        tabs= { TABS_COLOR }
                    >
                        { ( tab ) => (

                            tab.name === 'default' ? (
                                <>
                                    <RangeControl
                                        value={ opacity || 100 }
                                        onChange={ ( value ) => setAttributes({ opacity: value }) }
                                        step={ 5 }
                                        min={ 0 }
                                        max={ 100 }
                                        currentInput={ 100 }
                                        allowReset = { true }
                                    />
                                </>
                            ) : (
                                <RangeControl
                                    value={ elementStates?.[tab.name]?.opacity || 100 }
                                    onChange={ ( value ) => { setAttributes(
                                        { elementStates:
                                            {
                                                ...elementStates ,
                                                [tab.name] :
                                                {
                                                    ...elementStates?.[tab.name],
                                                    opacity: value
                                                }
                                            }
                                        }
                                    ) }}
                                    step={ 5 }
                                    min={ 0 }
                                    max={ 100 }
                                    currentInput={ 100 }
                                    allowReset = { true }
                                />
                            )
                        )}
                    </TabPanel>
                </BaseControl>
            <Divider />
                <BaseControl label={ __("Rotation", "savvy-blocks")}>
                    <TabPanel
                        className='tabs'
                        activeClass='active-tab'
                        tabs= { TABS_COLOR }
                    >
                        { ( tab ) => (

                            tab.name === 'default' ? (
                                <>
                                    <RangeControl
                                        value={ rotation || 0 }
                                        onChange={ ( value ) => setAttributes({ rotation: value }) }
                                        step={ 5 }
                                        min={ 0 }
                                        max={ 360 }
                                        currentInput={ 0 }
                                        allowReset = { true }
                                    />
                                </>
                            ) : (
                                <RangeControl
                                    value={ elementStates?.[tab.name]?.rotation || 0 }
                                    onChange={ ( value ) => { setAttributes(
                                        { elementStates:
                                            {
                                                ...elementStates ,
                                                [tab.name] :
                                                {
                                                    ...elementStates?.[tab.name],
                                                    rotation: value
                                                }
                                            }
                                        }
                                    ) }}
                                    step={ 5 }
                                    min={ 0 }
                                    max={ 360 }
                                    currentInput={ 0 }
                                    allowReset = { true }
                                />
                            )
                        )}
                    </TabPanel>
                </BaseControl>
            <ToggleControl
                label={ __( 'Icon Background', 'savvy-blocks' ) }
                checked={ iconSettings?.icosvackground || false }
                onChange={ ( value ) => { setAttributes( {
                    iconSettings: {
                        ...iconSettings,
                        icosvackground: value 
                    }
                } ) } }
            />
            { iconSettings?.icosvackground && 
                <>
                    <BaseControl label= { __( 'Background Color', 'savvy-blocks' ) } >
                        <Color 
                            value={ iconSettings?.icosvackground?.color || '' }
                            onChange={ ( color ) => { setAttributes( {
                                iconSettings: {
                                    ...iconSettings,
                                    icosvackground: {
                                        ...iconSettings?.icosvackground,
                                        color: color.slug 
                                    }
                                }
                            } ) } }
                        />
                    </BaseControl>
                </>
            }
        </>
    )
}

export default GeneralIconSetting;
