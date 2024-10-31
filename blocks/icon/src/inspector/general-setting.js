import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';

import { IconSelector } from '/components/editor';

import BlockTypeSelector from "/components/editor/block-type-selector";
function GeneralSetting ( props ) {
    const {
        blockType,
        settings,
        icon, 
        setAttributes, 
    } = props;

    return (
        <>
            <BaseControl label= {__('Select Icon', 'savvy-blocks')} >
                <IconSelector 
                    selectedIcon={ icon }
                    onClick={ (name, type) => setAttributes( { icon:{ name, type } } ) }
                />
                
            </BaseControl>

            <BlockTypeSelector
                blockName="savvy-blocks/icon"
                label="Icon Type"
                blockType={ blockType }
                settings={ settings }
                setAttributes={ setAttributes }
            />
        </>
    )
}

export default GeneralSetting;