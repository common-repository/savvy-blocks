import {__} from "@wordpress/i18n";
import { useEffect } from '@wordpress/element';
import {
    SelectControl,
} from '@wordpress/components';

const BlockTypeSelector = (props) => {

    const {
        blockType,
        setAttributes,
        settings,
        label,
        blockName
    } = props;

    const blockSettings = settings?.blocks?.[ blockName ];
    let TYPE_OPTIONS = blockSettings && blockSettings?.blockTypes ? Object.keys( blockSettings.blockTypes ) : [];
    TYPE_OPTIONS = [
        ...( TYPE_OPTIONS.length ?
            TYPE_OPTIONS.map(( type ) => ({
                label: __( `${ type }` ), value: type
            }) )  : []),
        { label: 'Custom', value: 'custom' },
    ];

    useEffect(() => {
        if(blockSettings?.blockTypes === undefined) {
            setAttributes({ blockType: 'custom' });
        }
    },[])

    return (
        <>
            {
                blockSettings?.blockTypes &&
                    <SelectControl
                        label={ __( label, 'savvy-blocks' ) }
                        options={ TYPE_OPTIONS }
                        onChange={ ( selectedItem ) => {
                            setAttributes({ ...blockSettings.blockTypes?.[selectedItem] })
                            setAttributes({ blockType: selectedItem })
                        } }
                        value={ blockType }
                    />
            }
        </>
    )
}

export default BlockTypeSelector;