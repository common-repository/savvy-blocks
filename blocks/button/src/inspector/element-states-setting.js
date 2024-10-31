import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    ToggleControl,
    RangeControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';

import {
    Color,
    Gradient
} from '/components/editor';

function ElementStatesSetting ( props ) {
    const { 
        elementStates,
        tabName,
        setAttributes,
    } = props;

    return (
        <>
            <BaseControl label= { __( 'Background Colorrrr', 'savvy-blocks' ) }>
                <Color
                    value={ elementStates?.[tabName]?.backgroundColor }
                    onChange={ ( value ) => { setAttributes(
                        { elementStates:
                            {
                                ...elementStates ,
                                [tabName] :
                                    {
                                        ...elementStates?.[tabName],
                                        backgroundColor: value.slug
                                    }
                            }
                        }
                    ) }}
                />
            </BaseControl>
            <Divider />
            <BaseControl label={ __( 'Text Color', 'savvy-blocks' ) }>
                <Color
                    value={ elementStates?.[tabName]?.textColor }
                    onChange={ ( value ) => { setAttributes(
                        { elementStates:
                            {
                                ...elementStates ,
                                [tabName] :
                                {
                                    ...elementStates?.[tabName],
                                    textColor: value.slug
                                }
                            }
                        }
                    ) }}
                />
            </BaseControl>
            <Divider />
            <ToggleControl
                label='Gradients Overlay'
                checked={ elementStates?.[tabName]?.overlay?.hasGradientOverlay } 
                onChange={ ( value ) => {
                setAttributes(
                        { elementStates:
                            {
                                ...elementStates ,
                                [tabName] :
                                {
                                    ...elementStates?.[tabName],
                                    overlay: {
                                        ...elementStates?.[tabName]?.overlay,
                                        hasGradientOverlay: value
                                    }
                                }
                            }
                        }
                    )
                    
                } }
            />
            {
                elementStates?.[tabName]?.overlay?.hasGradientOverlay === true ? (
                <BaseControl label={ __( 'Gradient', 'savvy-blocks' ) }>
                    <Gradient 
                        value={ elementStates?.[tabName]?.overlay?.gradient }
                        onChange={ ( value ) => { setAttributes(
                            { elementStates:
                                {
                                    ...elementStates ,
                                    [tabName] :
                                    {
                                        ...elementStates?.[tabName],
                                        overlay: {
                                            ...elementStates?.[tabName]?.overlay,
                                            gradient: value
                                        }
                                    }
                                }
                            }
                        ) }}
                    />
                </BaseControl>
                ) : (
                <BaseControl label={ __( 'Color', 'savvy-blocks' ) }>
                    <Color
                        value={ elementStates?.[tabName]?.overlay?.color }
                        onChange={ ( value ) => { setAttributes(
                            { elementStates:
                                {
                                    ...elementStates ,
                                    [tabName] :
                                    {
                                        ...elementStates?.[tabName],
                                        overlay: {
                                            ...elementStates?.[tabName]?.overlay,
                                            color: value.slug
                                        }
                                    }
                                }
                            }
                        ) }}
                    />
                </BaseControl>
                )
            }
            <RangeControl
                label={ __( 'Opacity', 'savvy-blocks' ) }
                value={ elementStates?.[tabName]?.overlay?.opacity }
                onChange={ ( value ) => { setAttributes(
                    { elementStates:
                        {
                            ...elementStates ,
                            [tabName] :
                            {
                                ...elementStates?.[tabName],
                                overlay: {
                                    ...elementStates?.[tabName]?.overlay,
                                    opacity: value
                                }
                            }
                        }
                    }
                ) }}
                step = { 25 }
                min={ 0 }
                max={ 100 }
                currentInput = { 25 }
            />
        </>
    )
}

export default ElementStatesSetting;