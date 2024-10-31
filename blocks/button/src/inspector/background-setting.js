import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';


import { Color } from '/components/editor';

function BackgroundSetting ( props ) {
    const { 
        backgroundColor,
        setAttributes,
    } = props;

    return (
        <>
            <BaseControl label= { __( 'Background Color', 'savvy-blocks' ) } >
                <Color 
                    value={ backgroundColor }
                    onChange={ ( value ) => { setAttributes( { backgroundColor: value.slug } ) } }
                />
            </BaseControl>
        </>
    )
}

export default BackgroundSetting;