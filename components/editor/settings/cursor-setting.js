import { __ } from '@wordpress/i18n';
import {
    BaseControl,
} from '@wordpress/components';

import {
    Cursor,
} from '/components/editor';


function CursorSetting(props) {
    const {
        cursor,
        setAttributes,
    } = props;

    return (
        <>
            {
                props.hasOwnProperty('cursor') &&
                    <BaseControl label={__('Cursor', 'savvy-blocks')}>
                        <Cursor
                            value={cursor}
                            onChange={setAttributes}
                        />
                    </BaseControl>
            }
        </>
    )
}

export default CursorSetting;