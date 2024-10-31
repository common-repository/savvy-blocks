import { __ } from '@wordpress/i18n';

import { DisplayTypeTabs } from '/components/editor';
import { AlignSelf } from '../editor';

function AlignSelfSetting ( props ) {
    const { 
        alignSelf,
        setAttributes,
    } = props;

    return (
        <>
            <DisplayTypeTabs>
                <AlignSelf
                    value={ alignSelf }
                    onChange={ ( value ) => { setAttributes( { alignSelf: value } ) } }
                />
            </DisplayTypeTabs>
        </>
    )
}

export default AlignSelfSetting;