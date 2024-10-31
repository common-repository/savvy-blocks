import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element'
import {
    SelectControl,
    TextControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';

import BlockTypeSelector from "/components/editor/block-type-selector";

const GeneralSetting = (props) => {
    const {
        text,
        url,
        rel,
        target,
        blockType,
        setAttributes,
        settings,
    } = props;

    const TARGET_OPTIONS = [
        { label: '-', value: '' },
        { label: __( 'New Tab', 'savvy-blocks' ), value: '_blank' },
        { label: __( 'Default', 'savvy-blocks' ), value: '_self' },
    ];

    const Rel_OPTIONS = [
        { label: '-', value: '' },
        { label: __( 'No Opener', 'savvy-blocks' ), value: 'noopener', disabled: !!target },
        { label: __( 'No Follow', 'savvy-blocks' ), value: 'nofollow' },
    ];

    useEffect(() => {
        if( target === '_blank' || target === '_self') {
            if (rel && rel.indexOf('noopener') === -1) {
                setAttributes({ rel: [...rel, 'noopener'] })
            }
        } 
    }, [target])

    return (
        <>
            <TextControl
                label = { __( 'Button Text', 'savvy-blocks' ) }
                value = { text }
                onChange = { ( text ) => setAttributes({ text: text }) }
            />
            <TextControl
                label = { __( 'Link Url', 'savvy-blocks' ) }
                value = { url }
                onChange = { ( url ) => setAttributes({ url: url }) }
            />
            <SelectControl
                label = { __( 'Target', 'savvy-blocks' ) }
                options = { TARGET_OPTIONS }
                onChange = { ( selectedItem ) => {
                    setAttributes({ target: selectedItem });
                } }
                value = { target }
            />
            <SelectControl
                multiple
                label = { __( 'Rel', 'savvy-blocks' ) }
                options = { Rel_OPTIONS }
                onChange = { ( selectedItem ) => { setAttributes({ rel: [...selectedItem] }) } }
                value = { rel ? [...rel] : [] } // [] is default value of selectControl type multiple
            />
            <BlockTypeSelector
                blockName="savvy-blocks/button"
                label="Button Type"
                blockType={ blockType }
                settings={ settings }
                setAttributes={ setAttributes }
            />
        </>
    )
}

export default GeneralSetting;
