import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';

import {
    DisplayTypeTabs,
    Margin,
    Padding,
} from '/components/editor';

function SpacingSetting ( props ) {
    const { 
        margin, 
        padding, 
        setAttributes,
    } = props;

    return (
        <>
        {   
            props.hasOwnProperty('padding') &&
                <BaseControl label={ __( 'Padding', 'savvy-blocks' ) }>
                    <DisplayTypeTabs>
                        <Padding
                            value={ padding }
                            onChange={ ( value ) => { setAttributes( { padding: value } ) } }
                        />
                    </DisplayTypeTabs>
                </BaseControl>
        }
        {
            props.hasOwnProperty('margin') &&
                <BaseControl label={ __( 'Margin', 'savvy-blocks' ) }>
                    <DisplayTypeTabs>
                        <Margin
                            value={ margin }
                            onChange={ ( value ) => { setAttributes( { margin: value } ) } }
                        />
                    </DisplayTypeTabs>
                </BaseControl>
        }
        </>
    )
}

export default SpacingSetting;