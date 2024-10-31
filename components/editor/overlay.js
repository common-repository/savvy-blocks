import { __ } from '@wordpress/i18n';

import {
    BaseControl,
    RangeControl,
    ToggleControl,
    __experimentalDivider as Divider
} from '@wordpress/components';
    
import {
    Color,
    Gradient,
} from '/components/editor';

function Overlay ( props ) {
    
    const { 
        overlay,
        onChange,
    } = props;

    return (
        <>
            <BaseControl label={ __( 'Overlay Type', 'savvy-blocks' ) }>
                <ToggleControl
                    label={ __( 'Color or Gradient', 'savvy-blocks' ) }
                    checked={ overlay?.type }
                    help={
                        overlay?.type
                            ? 'Gradient'
                            : 'Color'
                    }
                    onChange={ ( value ) => {
                        onChange ( {
                        ...overlay, 
                        type: value,
                        } )
                } }
                />
            </BaseControl>
            <Divider />
            { overlay?.type
            ?
                <>
                    <BaseControl label={ __( 'Overlay Gradient', 'savvy-blocks' ) }>
                        <Gradient
                            value={ overlay?.gradient }
                            onChange={ ( value ) => {
                                    onChange ( {
                                    ...overlay, 
                                    gradient: value,
                                    } )
                            } }
                        />
                    </BaseControl>
                    <Divider />
                </>
            :
                <>
                    <BaseControl label={ __( 'Overlay Color', 'savvy-blocks' ) }>
                        <Color 
                            value={ overlay?.color }
                            onChange={ ( color ) => {
                                onChange ( {
                                    ...overlay, 
                                    color: color.slug,
                                } )
                            } }
                        />
                    </BaseControl>
                    <Divider />
                </>
            }
            <BaseControl>
                <RangeControl
                    label={ __( 'Overlay Opacity', 'savvy-blocks' ) }
                    value={ parseInt( overlay?.opacity ) || 0 }
                    onChange={ ( unit ) => {
                        onChange ( {
                           ...overlay, 
                           opacity: unit,
                        } )
                   } }
                    step = { 25 }
                    min={ 0 }
                    max={ 100 }
                    currentInput = { 25 }
                />
            </BaseControl>
        </>
    )
}

export default Overlay;