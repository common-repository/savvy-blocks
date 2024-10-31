import { __ } from '@wordpress/i18n';

import {
    BaseControl,
    SelectControl,
} from '@wordpress/components';

import {
    DisplayTypeTabs,
    Color,
    IconSelector,
} from '/components/editor'

import {
    ArrowFontSize,
} from '../editor/index';

const ArrowSetting = (props) => {

    const {
        arrow,
        onChange,
    } = props;

    const ARROW_VERTICAL_ALIGNMENT = [
        { label: "-", value: "" },
        { label: "Top", value: "top-0" },
        { label: "Center", value: "top-50" },
        { label: "Bottom", value: "top-100" },
    ];

    const ARROW_HORIZONTAL_ALIGNMENT = [
        { label: "-", value: "" },
        { label: "Inside", value: "arrow-inside" },
        { label: "Outside", value: "arrow-outside" },
        { label: "Under Narrow", value: "arrow-under" },
    ];

    return (
        <>
            <BaseControl label={__('Color', 'savvy-blocks')}>
                <Color
                    value={arrow?.color}
                    onChange={(value) => {
                        onChange({
                            ...arrow,
                            color: value.slug
                        })
                    }}
                />
            </BaseControl>
            <BaseControl label={__('Icon', 'savvy-blocks')}>
                <IconSelector
                    selectedIcon={{ name: arrow?.icon, type: 'font' }}
                    onClick={(name) => {
                        onChange({
                            ...arrow,
                            icon: name
                        })
                    }}
                />
            </BaseControl>
            <BaseControl label={__('Vertical Alignment', 'savvy-blocks')}>
                <SelectControl
                    options={ARROW_VERTICAL_ALIGNMENT}
                    onChange={(value) => {
                        onChange({
                            ...arrow,
                            verticalPosition: value
                        })
                    }}
                    value={arrow?.verticalPosition || ''}
                />
            </BaseControl>
            <BaseControl label={__('Horizontal Alignment', 'savvy-blocks')}>
                <SelectControl
                    options={ARROW_HORIZONTAL_ALIGNMENT}
                    onChange={(value) => {
                        onChange({
                            ...arrow,
                            horizontalPosition: value
                        })
                    }}
                    value={arrow?.horizontalPosition || ''}
                />
            </BaseControl>
            <BaseControl label={__('Icon Size', 'savvy-blocks')}>
                <DisplayTypeTabs>
                    <ArrowFontSize
                        value={arrow?.fontSize}
                        onChange={(value) => {
                            onChange({
                                ...arrow,
                                fontSize: value
                            })
                        }}
                    />
                </DisplayTypeTabs>
            </BaseControl>
        </>
    )
}

export {
    ArrowSetting as default,
};
