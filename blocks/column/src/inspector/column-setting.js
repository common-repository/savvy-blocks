import { __ } from '@wordpress/i18n';

import { DisplayTypeTabs } from '/components/editor';

import { Offset } from '../editor';

function ColumnSetting ( props ) {
    const { 
        offset,
        setAttributes
    } = props;

    return (
        <>
                <DisplayTypeTabs>
                    <Offset
                        value={ offset }
                        onChange={ ( value ) => { setAttributes( { offset: value } ) } }
                    />
                </DisplayTypeTabs>
        </>
    )
}

export default ColumnSetting;