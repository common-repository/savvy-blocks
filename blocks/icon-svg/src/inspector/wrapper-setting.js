import { __ } from '@wordpress/i18n';
import {
    BaseControl, 
    TabPanel 
} from '@wordpress/components';


import { Color, Gradient } from '/components/editor';

function WrapperSetting ( props ) {
    const { 
        background,
        elementStates,
        setAttributes,
    } = props;

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
        <BaseControl label= { __( 'Background Color', 'savvy-blocks' ) }>
            <TabPanel
                className='tabs'
                activeClass='active-tab'
                tabs= { TABS_COLOR }
            >
                { ( tab ) => (

                    tab.name === 'default' ? (
                        <>
                            <BaseControl>
                                <Color
                                    value={ background?.color }
                                    onChange={ (color) => 
                                        setAttributes({
                                            background: {
                                                ...background,
                                                color: color.slug
                                            }
                                        })
                                    }
                                />
                            </BaseControl>
                            <BaseControl label={ __( 'Gradient', 'savvy-blocks' ) }>
                                <Gradient 
                                    value={ background?.gradient }
                                    onChange={ ( value ) => {
                                        setAttributes({
                                            background: {
                                                ...background,
                                                gradient: value
                                            }
                                        })
                                    } }
                                />
                            </BaseControl>
                        </>
                    ) : (
                        <>
                            <Color
                                value={ elementStates?.[tab.name]?.background?.color }
                                onChange={ ( color ) => { setAttributes(
                                    { elementStates:
                                        {
                                            ...elementStates ,
                                            [tab.name] :
                                                {
                                                    ...elementStates?.[tab.name],
                                                    background: {
                                                        ...background,
                                                        color: color.slug
                                                    }
                                                }
                                        }
                                    }
                                ) }}
                            />
                            <BaseControl label={ __( 'Gradient', 'savvy-blocks' ) }>
                                <Gradient 
                                    value={ elementStates?.[tab.name]?.background?.gradient }
                                    onChange={ ( value ) => { setAttributes(
                                        { elementStates:
                                            {
                                                ...elementStates ,
                                                [tab.name] :
                                                {
                                                    ...elementStates?.[tab.name],
                                                    background: {
                                                        ...elementStates?.[tab.name]?.background,
                                                        gradient: value
                                                    }
                                                }
                                            }
                                        }
                                    ) }}
                                />
                            </BaseControl>  
                        </>
                    )
                )}
            </TabPanel>
        </BaseControl>
        </>
    )
}

export default WrapperSetting;