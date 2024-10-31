import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import BlockTypeSelector from '/components/editor/block-type-selector';

function GeneralSetting ( props ) {
    const {
        blockType,
        settings,
        listType,
        setAttributes
    } = props;

    const LIST_TYPE_OPTIONS = [
        { label: 'Bullet List', value: 'ul' },
        { label: 'Numbered List', value: 'ol' },
    ]

    return (
        <>
            <SelectControl
                label={ __('List Items Type', 'savvy-blocks') }
                value={ listType }
                options={ LIST_TYPE_OPTIONS }
                onChange={ ( value ) => setAttributes( { listType: value } ) }
            />

            <BlockTypeSelector
                blockName='savvy-blocks/list'
                label={ __('List Type', 'savvy-blocks') }
                blockType={ blockType }
                settings={ settings }
                setAttributes={ setAttributes }
            />
        </>
    )
}

export default GeneralSetting;
