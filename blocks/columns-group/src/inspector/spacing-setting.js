import { __ } from '@wordpress/i18n';
import {
    BaseControl,
} from '@wordpress/components';

import {
    DisplayTypeTabs,
    Margin,
} from '/components/editor';

function SpacingSetting ( props ) {
    const { 
        margin, 
        setAttributes,
    } = props;

    return (
        <>
            <BaseControl label={ __('Margin', 'savvy-blocks') }>
                <DisplayTypeTabs>
                    <Margin
                        value={ margin }
                        onChange={ ( value ) => { setAttributes( { margin: value } ) } }
                    />
                </DisplayTypeTabs>
            </BaseControl>
        </>
    )
}

export default SpacingSetting;