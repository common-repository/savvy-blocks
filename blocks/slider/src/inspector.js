import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';

import {
    Panel,
    PanelBody,
    TextControl,
    BaseControl,
    CheckboxControl,
    SelectControl,
} from '@wordpress/components';

import {
    SliderSetting,
    SpacingSetting,
    PaginationSetting,
    ScrollbarSetting,
    ArrowSetting,
} from './inspector/index';

import {
    DisplayTypeTabs,
} from '/components/editor';

import {
    SliderHeight,
} from './editor/index';

const Inspector = (props) => {
    const {
        attributes: {
            slider,
            margin,
            swiperId,
            swiperModule,
            pagination,
            scrollbar,
            swiperHeight,
            arrow,
            swiperAlignment,
        },
        setAttributes,
    } = props;

    const SLIDER_ALIGNMENT = [
        { label: "-", value: "" },
        { label: "Top", value: "align-items-start" },
        { label: "Center", value: "align-items-center" },
        { label: "Bottom", value: "align-items-end" },
    ];

    return (
        <InspectorControls>
            <Panel>
                <PanelBody title={__('Main Settings', 'savvy-blocks')} initialOpen={false} >
                    <TextControl
                        label={__('ID', 'savvy-blocks')}
                        help={__('an id for Main swiper wrapper', 'savvy-blocks')}
                        onChange={(value) => setAttributes({
                            swiperId: value
                        })}
                        value={swiperId || ''}
                    />
                    <BaseControl label={__('Slider Alignment', 'savvy-blocks')}>
                        <SelectControl
                            options={SLIDER_ALIGNMENT}
                            onChange={(value) => {
                                setAttributes({
                                    swiperAlignment: value
                                })
                            }}
                            value={swiperAlignment || ''}
                        />
                    </BaseControl>
                    <BaseControl label={__('Slider Height', 'savvy-blocks')}>
                        <DisplayTypeTabs>
                            <SliderHeight
                                value={swiperHeight?.height}
                                onChange={(value) => {
                                    setAttributes({
                                        swiperHeight: {
                                            ...swiperHeight,
                                            height: value
                                        }
                                    })
                                }}
                            />
                        </DisplayTypeTabs>
                    </BaseControl>
                    <CheckboxControl
                        label={__('Navigation', 'savvy-blocks')}
                        checked={swiperModule?.navigation}
                        onChange={(value) => {
                            setAttributes({
                                swiperModule: {
                                    ...swiperModule,
                                    navigation: value
                                }
                            })
                        }}
                    />
                    <CheckboxControl
                        label={__('Pagination', 'savvy-blocks')}
                        checked={swiperModule?.pagination}
                        onChange={(value) => {
                            setAttributes({
                                swiperModule: {
                                    ...swiperModule,
                                    pagination: value
                                }
                            })
                        }}
                    />
                    <CheckboxControl
                        label={__('Scrollbar', 'savvy-blocks')}
                        checked={swiperModule?.scrollbar}
                        onChange={(value) => {
                            setAttributes({
                                swiperModule: {
                                    ...swiperModule,
                                    scrollbar: value
                                }
                            })
                        }}
                    />
                </PanelBody>
                <PanelBody title={__('Slider Settings', 'savvy-blocks')} initialOpen={false} >
                    <SliderSetting
                        slider={slider}
                        onChange={setAttributes}
                    />
                </PanelBody>
                {swiperModule?.navigation === true && (
                    <PanelBody title={__('Arrow Settings', 'savvy-blocks')} initialOpen={false} >
                        <ArrowSetting
                            arrow={arrow}
                            onChange={(value) => { setAttributes({ arrow: value }) }}
                        />
                    </PanelBody>
                )}
                {swiperModule?.pagination === true && (
                    <PanelBody title={__('Pagination Settings', 'savvy-blocks')} initialOpen={false} >
                        <PaginationSetting
                            pagination={pagination}
                            onChange={(value) => { setAttributes({ pagination: value }) }}
                        />
                    </PanelBody>
                )}
                {swiperModule?.scrollbar === true && (
                    <PanelBody title={__('Scrollbar Settings', 'savvy-blocks')} initialOpen={false} >
                        <ScrollbarSetting
                            scrollbar={scrollbar}
                            onChange={(value) => { setAttributes({ scrollbar: value }) }}
                        />
                    </PanelBody>
                )}
                <PanelBody title={__('Spacing', 'savvy-blocks')} initialOpen={false} >
                    <SpacingSetting
                        margin={margin}
                        setAttributes={setAttributes}
                    />
                </PanelBody>
            </Panel>
        </InspectorControls>
    )
}

export default Inspector;