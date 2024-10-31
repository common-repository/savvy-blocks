import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';

import { IconSelector } from '/components/editor';

function IconSetting ( props ) {
    const { 
        icons,
        setAttributes,
    } = props;

    return (
        <>
            <BaseControl label={ __( 'Collapsed Icon', 'savvy-blocks' ) } >
                <IconSelector
                    icon={{ name:icons.collapsed, type:'font' }}
                    onClick={ ( name ) => setAttributes({ icons : { ...icons,collapsed:name } }) }
                />
            </BaseControl>
        <Divider />
            <BaseControl label={ __( 'Expanded Icon', 'savvy-blocks' ) } >
                <IconSelector
                    icon={{ name:icons.expanded, type:'font' }}
                    onClick={ ( name ) => setAttributes({ icons : { ...icons,expanded:name } }) }
                />
            </BaseControl>
        </>
    )
}

export default IconSetting;