import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
    SelectControl,
    BaseControl,
} from '@wordpress/components';

import {
    DisplayTypeTabs,
    Margin,
    Gap,
    Color,
} from '/components/editor'

import {
    FlexAlignment,
    ItemWidth,
    ItemHeight
} from '../editor/index';

const PaginationSetting = (props) => {

    const {
        pagination,
        onChange,
    } = props;

    const PAGINATION_TYPES = [
        { label: "-", value: "" },
        { label: "Bullets", value: "bullets" },
        { label: "Fraction", value: "fraction" },
        { label: "Progressbar", value: "progressbar" },
        { label: "Custom", value: "custom" },
    ];

    const PAGINATION_STYLES = [
        { label: "-", value: "" },
        { label: "Round", value: "round" },
        { label: "Square", value: "square" },
        // { label: "Numbers", value: "numbers" },
        // { label: "Lines", value: "lines" },
        // { label: "Scollbar", value: "scollbar" },
    ];

    useEffect(() => {
        if (pagination?.type !== 'bullets') {
            onChange({
                ...pagination,
                style: '-'
            });
        }
    }, [pagination?.type]);


    return (
        <>
            <BaseControl label={__('Color', 'savvy-blocks')}>
                <Color
                    value={pagination?.color}
                    onChange={(value) => {
                        onChange({
                            ...pagination,
                            color: value.slug
                        })
                    }}
                />
            </BaseControl>
            <BaseControl label={__('Pagination Type', 'savvy-blocks')}>
                <SelectControl
                    options={PAGINATION_TYPES}
                    onChange={(value) => {
                        onChange({
                            ...pagination,
                            type: value
                        })
                    }}
                    value={pagination?.type || ''}
                />
            </BaseControl>
            {pagination?.type == 'bullets'
                ?
                <>
                    <BaseControl label={__('Pagination Style', 'savvy-blocks')}>
                        <SelectControl
                            options={PAGINATION_STYLES}
                            onChange={(value) => {
                                onChange({
                                    ...pagination,
                                    style: value
                                })
                            }}
                            value={pagination?.style || ''}
                        />
                    </BaseControl>
                </>
                :
                ''
            }
            <BaseControl label={__('Width', 'savvy-blocks')}>
                <DisplayTypeTabs>
                    <ItemWidth
                        value={pagination?.width}
                        onChange={(value) => {
                            onChange({
                                ...pagination,
                                width: value
                            })
                        }}
                    />
                </DisplayTypeTabs>
            </BaseControl>
            <BaseControl label={__('Height', 'savvy-blocks')}>
                <DisplayTypeTabs>
                    <ItemHeight
                        value={pagination?.height}
                        onChange={(value) => {
                            onChange({
                                ...pagination,
                                height: value
                            })
                        }}
                    />
                </DisplayTypeTabs>
            </BaseControl>
            <BaseControl label={__('Alignment', 'savvy-blocks')}>
                <DisplayTypeTabs>
                    <FlexAlignment
                        value={pagination?.alignment}
                        onChange={(value) => {
                            onChange({
                                ...pagination,
                                alignment: value
                            })
                        }}
                    />
                </DisplayTypeTabs>
            </BaseControl>
            <BaseControl label={__('Margin', 'savvy-blocks')}>
                <DisplayTypeTabs>
                    <Margin
                        value={pagination?.margin}
                        onChange={(value) => {
                            onChange({
                                ...pagination,
                                margin: value
                            })
                        }}
                    />
                </DisplayTypeTabs>
            </BaseControl>
            <BaseControl label={__('Gap', 'savvy-blocks')}>
                <DisplayTypeTabs>
                    <Gap
                        value={pagination?.gap}
                        onChange={(value) => {
                            onChange({
                                ...pagination,
                                gap: value
                            })
                        }}
                    />
                </DisplayTypeTabs>
            </BaseControl>
        </>

    )
}

export {
    PaginationSetting as default,
};
