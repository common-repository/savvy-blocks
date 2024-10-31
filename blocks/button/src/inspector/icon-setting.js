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
                <BaseControl label={ __( 'Left Side', 'savvy-blocks' ) } >
                    <IconSelector
                        selectedIcon={{ name:icons.left, type:'font' }}
                        onClick={ ( name ) => setAttributes({ icons : { ...icons,left:name } }) }
                        blockName = 'savvy-blocks/button'
                    />
                </BaseControl>
            <Divider />
                <BaseControl label={ __( 'Right Side', 'savvy-blocks' ) } >
                    <IconSelector
                        selectedIcon={{ name:icons.right, type:'font' }}
                        onClick={ ( name ) => setAttributes({ icons : { ...icons,right:name } }) }
                        blockName = 'savvy-blocks/button'
                    />
                </BaseControl>
        </>
    )
}

export default IconSetting;