import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    RangeControl,
    TabPanel,
    __experimentalDivider as Divider,
} from '@wordpress/components'
import {
    getColorObjectByColorValue,
} from '@wordpress/block-editor';

import BlockTypeSelector from "/components/editor/block-type-selector";

import  {
    Color,
    DisplayTypeTabs,
}  from '/components/editor';

import { IconSize } from './index';
import { getAllColors } from '/utils/settings';

function GeneralSetting ( props ) {
    const {
        blockType,
        settings,
        attributes : {
            color,
            minHeight,
            opacity,
            rotation,
            size,
            elementStates,
        },
        setAttributes
    } = props;

    const colors = getAllColors()

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
                <BaseControl label={ __( 'Text Color', 'savvy-blocks' ) }>
                <TabPanel
                    className='tabs'
                    activeClass='active-tab'
                    tabs= { TABS_COLOR }
                >
                    { ( tab ) => (
                        
                    tab.name === 'default' ? (
                        <Color
                            value={getColorObjectByColorValue(colors, color)?.slug}
                            // value={ color }
                            onChange={ ( value ) => { setAttributes( { color: value.color } ) 
                        }}
                        />
                    ) : (
                        <Color
                            value={ getColorObjectByColorValue(colors, elementStates?.[tab.name]?.color)?.slug}
                            onChange={ ( value ) => { setAttributes(
                                { elementStates:
                                    {
                                        ...elementStates ,
                                        [tab.name] :
                                        {
                                            ...elementStates?.[tab.name],
                                            color: value.color
                                        }
                                    }
                                }
                            ) }}
                        />
                    )
                    )}
                </TabPanel>
                </BaseControl>
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
                                        value={ opacity }
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
                                    value={ elementStates?.[tab.name]?.opacity }
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
                                        value={ rotation }
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
                                    value={ elementStates?.[tab.name]?.rotation }
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
        </>
    )
}

export default GeneralSetting;
