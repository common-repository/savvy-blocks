import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';

import { DisplayTypeTabs } from '/components/editor';

import  { Gap }  from '../editor';

function GapSetting ( props ) {
    const {
        gap,
        onChange,
        title ='Items Gap'
    } = props;
    return (
            <BaseControl label={ __(title, 'savvy-blocks') }>
                <DisplayTypeTabs>
                    <Gap
                        gap={ gap }
                        onChange={ onChange }
                    />
                </DisplayTypeTabs>
            </BaseControl>
    )
}

export default GapSetting;
