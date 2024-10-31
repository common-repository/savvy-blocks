import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    RangeControl,
    __experimentalDivider as Divider,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';

import { Color } from '/components/editor';


function BorderSetting ( props ) {
    const { 
        border,
        setAttributes,
    } = props;

    return (
        <>
        {
            props.hasOwnProperty('border') &&
            <>
                <BaseControl label={ __( 'Color', 'savvy-blocks' ) } >
                    <Color
                        value={ border?.color }
                        onChange={ ( value ) => { setAttributes( { border: { ...border, color: value.slug } } ) } }
                    />
                </BaseControl>
                <BaseControl>
                    <UnitControl
                        label={ __( 'Radius', 'savvy-blocks' ) }
                        labelPostion={ __( 'edge', 'savvy-blocks' ) }
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: '%', label: '%', default: 0 },
                        ]}
                        value={ border?.radius }
                        onChange={ ( unit ) => setAttributes( { border:{ ...border,radius: unit } } ) }
                    />
                </BaseControl>
                <BaseControl>
                    <RangeControl
                        label={ __( 'width', 'savvy-blocks' ) }
                        value={ border?.width }
                        onChange={ ( unit ) => setAttributes( { border:{ ...border,   width: unit } } ) }
                        step = { 1 }
                        min={ 0 }
                        max={ 10 }
                        currentInput = { 0 }
                    />
                </BaseControl>
            </>
        }
        </>
    )
}

export default BorderSetting;