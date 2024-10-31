import { __ } from "@wordpress/i18n";

import {
    Button,
    SelectControl,
    CheckboxControl,
    Flex,
    TextControl,
    BaseControl,
    RangeControl,
    ToggleControl,
    TabPanel,
    __experimentalNumberControl as NumberControl,
    __experimentalDivider as Divider,
    __experimentalUnitControl as UnitControl
} from "@wordpress/components";
import { useContext } from '@wordpress/element';

import {
    getColorObjectByColorValue,
} from '@wordpress/block-editor';

import { Settings } from '/components/context';
import {
    Color,
    Gradient
} from '/components/editor';

const AnimationSetting = (props) => {

    const {
        animation,
        setAttributes
    } = props;

    const { settings } = useContext(Settings);
    const colors = settings && settings.colors;

    const TABS_COLOR = [
        {
            name: 'first',
            title: 'First Color',
            className: 'tab-first-color',
            attrSlug: ''
        },
        {
            name: 'second',
            title: 'Second Color',
            className: 'tab-second-color',
            attrSlug: 'second-color'
        },
    ]

    const TABS_POINTS = [
        {
            name: 'first-point',
            title: 'First',
            className: 'tab-first-point',
            attrSlug: 'first-point'
        },
        animation?.togglePoints === true && {
            name: 'middle-point',
            title: 'Middle',
            className: 'tab-middle-point',
            attrSlug: 'middle-point'
        },
        {
            name: 'last-point',
            title: 'Last',
            className: 'tab-last-point',
            attrSlug: 'last-point'
        },
    ].filter(Boolean);
    

    const initialFirstAnimation = {
        animation: {
            ...animation,
            name: {
                value: 'custom'
            },
            points: {
                ...animation?.points,
                first: {},
            },
        }
    };

    const initialMiddleAnimation = {
        animation: {
            ...animation,
            name: {
                value: 'custom'
            },
            points: {
                ...animation?.points,
                middle: {},
            },
        }
    };

    const initialLastAnimation = {
        animation: {
            ...animation,
            name: {
                value: 'custom'
            },
            points: {
                ...animation?.points,
                last: {},
            },
        }
    };

    const resetFirstAttributes = () => {
        setAttributes(initialFirstAnimation);
    };

    const resetMiddleAttributes = () => {
        setAttributes(initialMiddleAnimation);
    };

    const resetLastAttributes = () => {
        setAttributes(initialLastAnimation);
    };

    return (
        <>
            {
                props.hasOwnProperty('animation') &&
                <>
                    <SelectControl
                        label={__('Name', 'savvy-blocks')}
                        value={animation?.name?.value}
                        options={
                            [
                                { label: '-', value: '' },
                                ...(settings && settings?.animations ? settings.animations.map((name) => {
                                    return { label: `${name}`, value: name }
                                }) : [])
                            ]
                        }
                        onChange={(name) => setAttributes({
                            animation: {
                                ...animation,
                                name: {
                                    ...animation?.name,
                                    value: name
                                }
                            }
                        })}
                    />
                    {animation?.name?.value === 'custom' &&
                        <>
                            <ToggleControl
                                label={__('3 points?', 'savvy-blocks')}
                                checked={animation?.togglePoints}
                                onChange={(unit) => setAttributes({
                                    animation: {
                                        ...animation,
                                        togglePoints: unit
                                    }
                                })}
                            />
                            <TabPanel
                                className='tabs'
                                activeClass='active-tab'
                                tabs={TABS_POINTS}
                            >
                                {(tab) => (
                                    <>
                                        {tab.name === 'first-point' && (
                                            <>
                                                <RangeControl
                                                    label={__('Opacity', 'savvy-blocks')}
                                                    value={animation?.points?.first?.opacity || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                first: {
                                                                    ...animation?.points?.first,
                                                                    opacity: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    // step={0.1}
                                                    min={0}
                                                    max={10}
                                                    currentInput={0}
                                                />
                                                <RangeControl
                                                    label={__('Horizontal Position', 'savvy-blocks')}
                                                    value={animation?.points?.first?.horizontal || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                first: {
                                                                    ...animation?.points?.first,
                                                                    horizontal: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={-300}
                                                    max={300}
                                                    currentInput={0}
                                                />
                                                <RangeControl
                                                    label={__('Vertical Position', 'savvy-blocks')}
                                                    value={animation?.points?.first?.vertical || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                first: {
                                                                    ...animation?.points?.first,
                                                                    vertical: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={-300}
                                                    max={300}
                                                    currentInput={0}
                                                />
                                                <RangeControl
                                                    label={__('Rotate', 'savvy-blocks')}
                                                    value={animation?.points?.first?.rotate || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                first: {
                                                                    ...animation?.points?.first,
                                                                    rotate: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={-360}
                                                    max={360}
                                                    currentInput={0}
                                                />
                                                <SelectControl
                                                    label={__('Transform', 'savvy-blocks')}
                                                    value={animation?.points?.first?.transformOrigin || 'center center'}
                                                    options={
                                                        [
                                                            { label: '-', value: '' },
                                                            { label: 'Top Left', value: 'top left' },
                                                            { label: 'Top Center', value: 'top center' },
                                                            { label: 'Top Right', value: 'top right' },
                                                            { label: 'Center Left', value: 'center left' },
                                                            { label: 'Center Center', value: 'center center' },
                                                            { label: 'Center Right', value: 'center right' },
                                                            { label: 'Bottom Left', value: 'bottom left' },
                                                            { label: 'Bottom Center', value: 'bottom center' },
                                                            { label: 'Bottom Right', value: 'bottom right' },
                                                        ]
                                                    }
                                                    onChange={(value) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                first: {
                                                                    ...animation?.points?.first,
                                                                    transformOrigin: value
                                                                }
                                                            }
                                                        }
                                                    })}
                                                />
                                                <RangeControl
                                                    label={__('Scale', 'savvy-blocks')}
                                                    value={animation?.points?.first?.scale || 1}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                first: {
                                                                    ...animation?.points?.first,
                                                                    scale: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={0.01}
                                                    min={0}
                                                    max={3}
                                                    currentInput={1}
                                                />
                                                <RangeControl
                                                    label={__('Blur', 'savvy-blocks')}
                                                    value={animation?.points?.first?.blur || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                first: {
                                                                    ...animation?.points?.first,
                                                                    blur: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={0}
                                                    max={10}
                                                    currentInput={0}
                                                />
                                                <Button variant="secondary" onClick={resetFirstAttributes}>
                                                    {__('Reset First Point', 'savvy-blocks')}
                                                </Button>
                                            </>
                                        )}
                                        {tab.name === 'middle-point' && (
                                            <>
                                                <RangeControl
                                                    label={__('Opacity', 'savvy-blocks')}
                                                    value={animation?.points?.middle?.opacity || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                middle: {
                                                                    ...animation?.points?.middle,
                                                                    opacity: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    // step={0.1}
                                                    min={0}
                                                    max={10}
                                                    currentInput={0}
                                                />
                                                <RangeControl
                                                    label={__('Horizontal Position', 'savvy-blocks')}
                                                    value={animation?.points?.middle?.horizontal || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                middle: {
                                                                    ...animation?.points?.middle,
                                                                    horizontal: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={-300}
                                                    max={300}
                                                    currentInput={0}
                                                />
                                                <RangeControl
                                                    label={__('Vertical Position', 'savvy-blocks')}
                                                    value={animation?.points?.middle?.vertical || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                middle: {
                                                                    ...animation?.points?.middle,
                                                                    vertical: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={-300}
                                                    max={300}
                                                    currentInput={0}
                                                />
                                                <RangeControl
                                                    label={__('Rotate', 'savvy-blocks')}
                                                    value={animation?.points?.middle?.rotate || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                middle: {
                                                                    ...animation?.points?.middle,
                                                                    rotate: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={-360}
                                                    max={360}
                                                    currentInput={0}
                                                />
                                                <SelectControl
                                                    label={__('Transform', 'savvy-blocks')}
                                                    value={animation?.points?.middle?.transformOrigin || 'center center'}
                                                    options={
                                                        [
                                                            { label: '-', value: '' },
                                                            { label: 'Top Left', value: 'top left' },
                                                            { label: 'Top Center', value: 'top center' },
                                                            { label: 'Top Right', value: 'top right' },
                                                            { label: 'Center Left', value: 'center left' },
                                                            { label: 'Center Center', value: 'center center' },
                                                            { label: 'Center Right', value: 'center right' },
                                                            { label: 'Bottom Left', value: 'bottom left' },
                                                            { label: 'Bottom Center', value: 'bottom center' },
                                                            { label: 'Bottom Right', value: 'bottom right' },
                                                        ]
                                                    }
                                                    onChange={(value) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                middle: {
                                                                    ...animation?.points?.middle,
                                                                    transformOrigin: value
                                                                }
                                                            }
                                                        }
                                                    })}
                                                />
                                                <RangeControl
                                                    label={__('Scale', 'savvy-blocks')}
                                                    value={animation?.points?.middle?.scale || 1}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                middle: {
                                                                    ...animation?.points?.middle,
                                                                    scale: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={0.01}
                                                    min={0}
                                                    max={3}
                                                    currentInput={1}
                                                />
                                                <RangeControl
                                                    label={__('Blur', 'savvy-blocks')}
                                                    value={animation?.points?.middle?.blur || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                middle: {
                                                                    ...animation?.points?.middle,
                                                                    blur: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={0}
                                                    max={10}
                                                    currentInput={0}
                                                />
                                                <Button variant="secondary" onClick={resetMiddleAttributes}>
                                                    {__('Reset Middle Point', 'savvy-blocks')}
                                                </Button>
                                            </>
                                        )}
                                        {tab.name === 'last-point' && (
                                            <>
                                                <RangeControl
                                                    label={__('Opacity', 'savvy-blocks')}
                                                    value={animation?.points?.last?.opacity || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                last: {
                                                                    ...animation?.points?.last,
                                                                    opacity: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    // step={0.1}
                                                    min={0}
                                                    max={10}
                                                    currentInput={0}
                                                />
                                                <RangeControl
                                                    label={__('Horizontal Position', 'savvy-blocks')}
                                                    value={animation?.points?.last?.horizontal || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                last: {
                                                                    ...animation?.points?.last,
                                                                    horizontal: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={-300}
                                                    max={300}
                                                    currentInput={0}
                                                />
                                                <RangeControl
                                                    label={__('Vertical Position', 'savvy-blocks')}
                                                    value={animation?.points?.last?.vertical || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                last: {
                                                                    ...animation?.points?.last,
                                                                    vertical: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={-300}
                                                    max={300}
                                                    currentInput={0}
                                                />
                                                <RangeControl
                                                    label={__('Rotate', 'savvy-blocks')}
                                                    value={animation?.points?.last?.rotate || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                last: {
                                                                    ...animation?.points?.last,
                                                                    rotate: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={-360}
                                                    max={360}
                                                    currentInput={0}
                                                />
                                                <SelectControl
                                                    label={__('Transform', 'savvy-blocks')}
                                                    value={animation?.points?.last?.transformOrigin || 'center center'}
                                                    options={
                                                        [
                                                            { label: '-', value: '' },
                                                            { label: 'Top Left', value: 'top left' },
                                                            { label: 'Top Center', value: 'top center' },
                                                            { label: 'Top Right', value: 'top right' },
                                                            { label: 'Center Left', value: 'center left' },
                                                            { label: 'Center Center', value: 'center center' },
                                                            { label: 'Center Right', value: 'center right' },
                                                            { label: 'Bottom Left', value: 'bottom left' },
                                                            { label: 'Bottom Center', value: 'bottom center' },
                                                            { label: 'Bottom Right', value: 'bottom right' },
                                                        ]
                                                    }
                                                    onChange={(value) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                last: {
                                                                    ...animation?.points?.last,
                                                                    transformOrigin: value
                                                                }
                                                            }
                                                        }
                                                    })}
                                                />
                                                <RangeControl
                                                    label={__('Scale', 'savvy-blocks')}
                                                    value={animation?.points?.last?.scale || 1}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                last: {
                                                                    ...animation?.points?.last,
                                                                    scale: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={0.01}
                                                    min={0}
                                                    max={3}
                                                    currentInput={1}
                                                />
                                                <RangeControl
                                                    label={__('Blur', 'savvy-blocks')}
                                                    value={animation?.points?.last?.blur || 0}
                                                    onChange={(unit) => setAttributes({
                                                        animation: {
                                                            ...animation,
                                                            points: {
                                                                ...animation?.points,
                                                                last: {
                                                                    ...animation?.points?.last,
                                                                    blur: unit
                                                                }
                                                            }
                                                        }
                                                    })}
                                                    step={1}
                                                    min={0}
                                                    max={10}
                                                    currentInput={0}
                                                />
                                                <Button variant="secondary" onClick={resetLastAttributes}>
                                                    {__('Reset Last Point', 'savvy-blocks')}
                                                </Button>
                                            </>
                                        )}
                                    </>
                                )}
                            </TabPanel>
                            <Divider />
                        </>
                    }
                    {animation?.name?.value === 'fade' &&
                        <SelectControl
                            label={__('Action', 'savvy-blocks')}
                            value={animation?.name?.action}
                            options={
                                [
                                    { label: '-', value: '' },
                                    { label: 'In', value: 'in' },
                                    { label: 'Out', value: 'out' },
                                ]
                            }
                            onChange={(value) => setAttributes({
                                animation: {
                                    ...animation,
                                    name: {
                                        ...animation?.name,
                                        action: value
                                    }
                                }
                            })}
                        />
                    }
                    {animation?.name?.value === 'slide' &&
                        <SelectControl
                            label={__('Action', 'savvy-blocks')}
                            value={animation?.name?.action}
                            options={
                                [
                                    { label: '-', value: '' },
                                    { label: 'Left to Right', value: 'left-to-right' },
                                    { label: 'Right to Left', value: 'right-to-left' },
                                    { label: 'Top to Bottom', value: 'top-to-bottom' },
                                    { label: 'Bottom to Top', value: 'bottom-to-top' },
                                ]
                            }
                            onChange={(value) => setAttributes({
                                animation: {
                                    ...animation,
                                    name: {
                                        ...animation?.name,
                                        action: value
                                    }
                                }
                            })}
                        />
                    }
                    {animation?.name?.value === 'scale' &&
                        <BaseControl>
                            <TextControl
                                label={__('Scale', 'savvy-blocks')}
                                value={animation?.scale}
                                onChange={(unit) => setAttributes({ animation: { ...animation, scale: unit } })}
                            />
                        </BaseControl>
                    }
                    {(animation?.name?.value === 'fill') &&
                        <>
                            <SelectControl
                                label={__('Type', 'savvy-blocks')}
                                value={animation?.type}
                                options={
                                    [
                                        { label: '-', value: '' },
                                        { label: 'Color', value: 'type-color' },
                                        { label: 'Gradient', value: 'type-gradient' },
                                    ]
                                }
                                onChange={(value) => setAttributes({
                                    animation: {
                                        ...animation,
                                        type: value
                                    }
                                })}
                            />

                            {animation?.type === 'type-color' &&
                                <TabPanel
                                    className='tabs'
                                    activeClass='active-tab'
                                    tabs={TABS_COLOR}
                                >
                                    {(tab) => (
                                        <>
                                            {tab.name === 'first' && (
                                                <>
                                                    <Color
                                                        value={getColorObjectByColorValue(colors, animation?.color?.first)?.slug}
                                                        onChange={(color) => {
                                                            setAttributes({
                                                                animation: {
                                                                    ...animation,
                                                                    color: {
                                                                        ...animation.color,
                                                                        first: color.color
                                                                    },
                                                                    gradient: null,
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    <Divider />
                                                </>
                                            )}
                                            {tab.name === 'second' && (
                                                <>
                                                    <Color
                                                        value={getColorObjectByColorValue(colors, animation?.color?.second)?.slug}
                                                        onChange={(color) => {
                                                            setAttributes({
                                                                animation: {
                                                                    ...animation,
                                                                    color: {
                                                                        ...animation.color,
                                                                        second: color.color
                                                                    },
                                                                    gradient: null,
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    <Divider />
                                                </>
                                            )}
                                        </>
                                    )}
                                </TabPanel>
                            }

                            {animation?.type === 'type-gradient' &&
                                <>
                                    <Gradient
                                        value={animation?.gradient?.value}
                                        onChange={(value) => {
                                            setAttributes({
                                                animation: {
                                                    ...animation,
                                                    gradient: {
                                                        ...animation.gradient,
                                                        value: value
                                                    },
                                                    color: null,
                                                }
                                            })
                                        }}
                                    />
                                    <Divider />
                                    <NumberControl
                                        label={__('Gradient Size (%)', 'savvy-blocks')}
                                        isShiftStepEnabled={ true }
                                        onChange={(value) => {
                                            setAttributes({
                                                animation: {
                                                    ...animation,
                                                    gradient: {
                                                        ...animation.gradient,
                                                        size: value
                                                    },
                                                }
                                            })
                                        }}
                                        shiftStep={ 10 }
                                        min={ 0 }
                                        value={ animation?.gradient?.size }
                                    />
                                    <Divider />
                                    <Flex align="top">
                                        <SelectControl
                                            label={__('From', 'savvy-blocks')}
                                            options={
                                                [
                                                    { label: '-', value: '' },
                                                    { label: 'Left', value: 'left' },
                                                    { label: 'Right', value: 'right' },
                                                ]
                                            }
                                            value={animation?.gradient?.from}
                                            onChange={(value) => {
                                                setAttributes({
                                                    animation: {
                                                        ...animation,
                                                        gradient: {
                                                            ...animation.gradient,
                                                            from: value
                                                        },
                                                    }
                                                })
                                            }}
                                        />
                                        <Divider />
                                        <SelectControl
                                            label={__('To', 'savvy-blocks')}
                                            options={
                                                [
                                                    { label: '-', value: '' },
                                                    { label: 'Left', value: 'left' },
                                                    { label: 'Right', value: 'right' },
                                                ]
                                            }
                                            value={animation?.gradient?.to}
                                            onChange={(value) => {
                                                setAttributes({
                                                    animation: {
                                                        ...animation,
                                                        gradient: {
                                                            ...animation.gradient,
                                                            to: value
                                                        },
                                                    }
                                                })
                                            }}
                                        />
                                    </Flex>
                                    <Divider />
                                </>
                            }
                        </>
                    }
                    <SelectControl
                        label={__('Event', 'savvy-blocks')}
                        value={animation?.eventName}
                        options={
                            [
                                { label: '-', value: '' },
                                { label: 'Init', value: 'init' },
                                { label: 'Mouse Over', value: 'hover' },
                                { label: 'Mouse Out', value: 'leave' },
                                { label: 'Focus', value: 'focus' },
                                { label: 'Press', value: 'press' },
                                { label: 'Release', value: 'release' },
                                { label: 'Click', value: 'click' },
                            ]
                        }
                        onChange={(event) => setAttributes({ animation: { ...animation, eventName: event } })}
                    />
                    <CheckboxControl
                        label="Disable in reverse?"
                        help="The animation will stop with the reverse action?"
                        checked={animation?.stopReverse}
                        onChange={(checked) => setAttributes({ animation: { ...animation, stopReverse: checked } })}
                    />
                    {!animation?.infinite &&
                        <BaseControl>
                            <RangeControl
                                label={__('Iterations', 'savvy-blocks')}
                                value={animation?.iterations || 1}
                                onChange={(unit) => setAttributes({ animation: { ...animation, iterations: unit } })}
                                step={1}
                                min={1}
                                max={10}
                                currentInput={1}
                            />
                        </BaseControl>
                    }
                    <CheckboxControl
                        label="Infinite?"
                        help="The animation goes forever?"
                        checked={animation?.infinite}
                        onChange={(checked) => setAttributes({ animation: { ...animation, infinite: checked } })}
                    />
                    <BaseControl>
                        <UnitControl
                            label={__('Duration', 'savvy-blocks')}
                            labelPostion={__('edge', 'savvy-blocks')}
                            units={[
                                { value: 'ms', label: 'ms', default: 0 },
                            ]}
                            value={animation?.duration}
                            onChange={(unit) => setAttributes({ animation: { ...animation, duration: unit } })}
                        />
                    </BaseControl>
                    <SelectControl
                        label={__('Timing Function', 'savvy-blocks')}
                        value={animation?.timingFunction}
                        options={
                            [
                                { label: '-', value: '' },
                                { label: 'Linear', value: 'linear' },
                                { label: 'Ease', value: 'ease' },
                                { label: 'Ease In', value: 'ease-in' },
                                { label: 'Ease Out', value: 'ease-out' },
                                { label: 'Ease In Out', value: 'ease-in-out' },
                                { label: 'Step Start', value: 'step-start' },
                                { label: 'Step End', value: 'step-end' },
                            ]
                        }
                        onChange={(value) => setAttributes({ animation: { ...animation, timingFunction: value } })}
                    />
                    <BaseControl>
                        <UnitControl
                            label={__('Delay', 'savvy-blocks')}
                            labelPostion={__('edge', 'savvy-blocks')}
                            units={[
                                { value: 'ms', label: 'ms', default: 0 },
                            ]}
                            value={animation?.delay}
                            onChange={(unit) => setAttributes({ animation: { ...animation, delay: unit } })}
                        />
                    </BaseControl>
                    <SelectControl
                        label={__('Direction', 'savvy-blocks')}
                        value={animation?.direction}
                        options={
                            [
                                { label: '-', value: '' },
                                { label: 'Normal', value: 'normal' },
                                { label: 'Reverse', value: 'reverse' },
                                { label: 'Alternate', value: 'alternate' },
                                { label: 'Alternate Reverse', value: 'alternate-reverse' },
                            ]
                        }
                        onChange={(direction) => setAttributes({ animation: { ...animation, direction: direction } })}
                    />
                    <SelectControl
                        label={__('Fill Mode', 'savvy-blocks')}
                        value={animation?.fillMode}
                        options={
                            [
                                { label: '-', value: 'none' },
                                { label: 'Forwards', value: 'forwards' },
                                { label: 'Backwards', value: 'backwards' },
                                { label: 'Both', value: 'both' },
                            ]
                        }
                        onChange={(fillMode) => setAttributes({ animation: { ...animation, fillMode: fillMode } })}
                    />
                </>
            }
        </>
    );
};

export default AnimationSetting;
