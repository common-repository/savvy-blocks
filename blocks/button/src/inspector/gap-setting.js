import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';

import { DisplayTypeTabs } from '/components/editor';

import { Gap } from '../editor/index';

function GapSetting ( props ) {
    const { 
        gap,
        setAttributes,
    } = props;

    return (
        <>
                <BaseControl label={ __( 'Gap', 'savvy-blocks' ) } >
                    <DisplayTypeTabs>
                        <Gap
                            value={ gap }
                            onChange={ ( value ) => { setAttributes( { gap: value } ) } }
                        />
                    </DisplayTypeTabs>
                </BaseControl>
        </>
    )
}

export default GapSetting;