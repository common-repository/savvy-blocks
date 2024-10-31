import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element'
import { 
    BaseControl, 
    SelectControl, 
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';

import { Color } from '/components/editor';

import {
    IconSelector,
} from './index';

function ListStyleSetting ( props ) {
    const {
        icon,
        listStyle,
        setAttributes
    } = props;

    const LIST_STYLE_TYPE = [
        { label: '-', value: '-' },
        { label: 'Disc', value: 'disc' },
        { label: 'Circle', value: 'circle' },
        { label: 'Square', value: 'square' },
        { label: 'Decimal', value: 'decimal' },
        { label: 'Decimal Leading Zero', value: 'decimal-leading-zero' },
        { label: 'Lower Alpha', value: 'lower-alpha' },
        { label: 'Upper Alpha', value: 'upper-alpha' }, 
        { label: 'Lower Roman', value: 'lower-roman' },
        { label: 'Upper Roman', value: 'upper-roman' },         
        { label: 'Lower Latin', value: 'lower-latin' },
        { label: 'Upper Latin', value: 'upper-latin' },         
        { label: 'Lower Greek', value: 'lower-greek' },
        { label: 'Armenian', value: 'armenian' },
        { label: 'Georgian', value: 'georgian' },
        { label: 'Custom Icon', value: 'custom-icon' },
        { label: 'None', value: 'none' },
    ]

    const LIST_STYLE_POSITION = [
        { label: 'inside', value: 'inside' },
        { label: 'outside', value: 'outside' },
    ]

    useEffect(()=> {
        if ( icon?.id !== null && listStyle?.type && listStyle?.type !== 'custom-icon' ) {
            setAttributes({ icon:{ ...icon, id: null, url: null }})
        }
    },[listStyle?.type])
    return (
        <>
            <BaseControl>
                <SelectControl
                    label={ __('List Style Type', 'savvy-blocks') }
                    value={ listStyle?.type }
                    options={ LIST_STYLE_TYPE }
                    onChange={ ( value ) => { 
                        setAttributes( { listStyle: { ...listStyle, type: value }} ) 
                    } }
                />
            </BaseControl>
            <BaseControl>
                <SelectControl
                    label={ __('List Style Position', 'savvy-blocks') }
                    value={ listStyle?.position }
                    options={ LIST_STYLE_POSITION }
                    onChange={ ( value ) => setAttributes( { listStyle :{ ...listStyle, position: value }} ) }
                />
            </BaseControl>
            {
                listStyle?.type !== 'custom-icon' &&
                <BaseControl label={__('Text Color', 'savvy-blocks')}>
                    <Color
                        value={  listStyle?.color }
                        onChange={ (value) => {
                            setAttributes({ listStyle: { ...listStyle, color: value?.color } }) }
                        }

                    />
                </BaseControl>
            }
            <BaseControl label={ __('Font size', 'savvy-blocks') }>
                <UnitControl
                    labelPostion={ __('edge', 'savvy-blocks') }
                    units={[
                        { value: 'px', label: 'px', default: 0 }
                    ]}
                    value={  listStyle?.fontSize }
                    onChange={ (unit) => setAttributes({ listStyle:{ ...listStyle,fontSize: unit }}) }
                />
            </BaseControl>
            {
                listStyle?.type === 'custom-icon' &&
                <IconSelector
                    icon={ icon }
                    setAttributes={ setAttributes }
                />
            }
        </>
    )
}

export default ListStyleSetting;
