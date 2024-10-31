import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';

import { DisplayTypeTabs } from '/components/editor';

import { Offset } from '/blocks/column/src/editor'

function SpacingSetting ( props ) {
    const {
        offset,
        maxSpace, /* < Object > */
        setAttributes
    } = props;

    return (
        <BaseControl label={ __('Offset', 'savvy-blocks') }>
            <DisplayTypeTabs>
                <Offset
                    value={ offset }
                    maxSpace = { maxSpace }
                    nullable={ false }
                    onChange={ ( value ) => { setAttributes( { offset: value } ) } }
                />
            </DisplayTypeTabs>
        </BaseControl>
    )
}

export default SpacingSetting;
