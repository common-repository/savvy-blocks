import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    __experimentalDivider as Divider,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';

function SizingSetting ( props ) {
    const { 
        size,
        setAttributes,
    } = props;

    return (
        <>
        {
            props.hasOwnProperty('size') &&
            <>
                <BaseControl label={ __( 'Width', 'savvy-blocks' ) }>
                    <UnitControl 
                        labelPosition={ __( 'edge', 'savvy-blocks' ) }
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: '%', label: '%', default: 0 },
                        ]}
                        value={ size?.width || 'initial'}
                        onChange= { ( unit ) => setAttributes( { size: { ...size, width : unit } } ) }
                    />
                </BaseControl>
                <Divider />
                <BaseControl label={ __( 'Max Width', 'savvy-blocks' ) }>
                    <UnitControl 
                        labelPosition= 'edge'
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: '%', label: '%', default: 0 },
                        ]}
                        value={ size?.maxWidth || 'initial'}
                        onChange= { ( unit ) => setAttributes( { size: { ...size, maxWidth : unit } } ) }
                    />
                </BaseControl>
                <Divider />
                <BaseControl label={ __('Height', 'savvy-blocks') }>
                    <UnitControl 
                        labelPosition= 'edge'
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: '%', label: '%', default: 0 },
                        ]}
                        value={ size?.height || 'initial' }
                        onChange= { ( unit ) => setAttributes( { size: { ...size, height : unit } } ) }
                    />
                </BaseControl>
                <Divider />
                <BaseControl label={ __( 'Min Height', 'savvy-blocks' ) }>
                    <UnitControl 
                        labelPosition= { __( 'edge', 'savvy-blocks' ) }
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: '%', label: '%', default: 0 },
                        ]}
                        value={ size?.minHeight || 'initial'}
                        onChange= { ( unit ) => setAttributes( { size: { ...size, minHeight : unit } } ) }
                    />
                </BaseControl>
                <Divider />
                <BaseControl label={ __( 'Max Height', 'savvy-blocks' ) }>
                    <UnitControl
                        labelPosition= 'edge'
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: '%', label: '%', default: 0 },
                        ]}
                        value={ size?.maxHeight || 'initial'}
                        onChange= { ( unit ) => setAttributes( { size: { ...size, maxHeight : unit } } ) }
                    />
                </BaseControl>
            </>
        }
        </>
    )
}

export default SizingSetting;