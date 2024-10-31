import { __ } from '@wordpress/i18n';

import { useContext } from '@wordpress/element';

import {
    BaseControl,
    TextControl,
    ToggleControl,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components';

import { Settings } from '/components/context';

function SliderItems(props) {
    const {
        value: slider,
        onChange,
        tabName
    } = props;

    // console.log(slider);

    const { settings } = useContext(Settings);

    if (!slider) {
        const initSlider = settings?.breakpoints.reduce(
            (obj, breakpoint) => {
                obj[breakpoint] = '';
                return obj;
            }, {
            '_': ''
        }
        );
        onChange(initSlider);
    }

    return (
        <>
            <BaseControl>
                <TextControl
                    label={__('Slide Per View', 'savvy-blocks')}
                    help={__('"auto" View Also Available', 'savvy-blocks')}
                    onChange={(value) => onChange({
                        ...slider,
                        [tabName]: {
                            ...slider[tabName],
                            slidesPerView: value
                        }
                    })}
                    value={slider?.[tabName]?.slidesPerView || ''}
                />
                <NumberControl
                    label={__('Space Between', 'savvy-blocks')}
                    help={__('Space between slides', 'savvy-blocks')}
                    isShiftStepEnabled={true}
                    onChange={(value) => onChange({
                        ...slider,
                        [tabName]: {
                            ...slider[tabName],
                            spaceBetween: value
                        }
                    })}
                    shiftStep={1}
                    min={0}
                    max={100}
                    value={slider?.[tabName]?.spaceBetween || ''}
                />
                <NumberControl
                    label={__('Offset Before', 'savvy-blocks')}
                    help={__('Add (in px) additional slide offset in the beginning of the container (before all slides)', 'savvy-blocks')}
                    isShiftStepEnabled={true}
                    onChange={(value) => onChange({
                        ...slider,
                        [tabName]: {
                            ...slider[tabName],
                            slidesOffsetBefore: value
                        }
                    })}
                    shiftStep={1}
                    value={slider?.[tabName]?.slidesOffsetBefore || ''}
                />
                {!slider?.loop &&
                    <>
                        <NumberControl
                            label={__('Grid Rows', 'savvy-blocks')}
                            help={__('Number of slides rows, for multirow layout', 'savvy-blocks')}
                            isShiftStepEnabled={true}
                            onChange={(value) => onChange({
                                ...slider,
                                [tabName]: {
                                    ...slider[tabName],
                                    grid: {
                                        ...slider.grid,
                                        rows: value
                                    }
                                }
                            })}
                            shiftStep={1}
                            value={slider?.[tabName]?.grid?.rows || ''}
                        />
                    </>
                }
                <ToggleControl
                    label={__('Loop', 'savvy-blocks')}
                    checked={slider?.[tabName]?.loop}
                    onChange={(value) => {
                        const newSlider = JSON.parse(JSON.stringify(slider)) || {}
                        delete newSlider[tabName].grid
                        newSlider[tabName].loop = value;
                        onChange(newSlider)
                    }}
                />
                <ToggleControl
                    label={__('Center Slides', 'savvy-blocks')}
                    checked={slider?.[tabName]?.centeredSlides}
                    onChange={(value) => onChange({
                        ...slider,
                        [tabName]: {
                            ...slider[tabName],
                            centeredSlides: value
                        }
                    })}
                />
                <ToggleControl
                    label={__('Free Mode', 'savvy-blocks')}
                    checked={slider?.[tabName]?.freeMode}
                    onChange={(value) => onChange({
                        ...slider,
                        [tabName]: {
                            ...slider[tabName],
                            freeMode: value
                        }
                    })}
                />
                <ToggleControl
                    label={__('Auto Play', 'savvy-blocks')}
                    checked={slider?.[tabName]?.autoPlay}
                    onChange={(value) => onChange({
                        ...slider,
                        [tabName]: {
                            ...slider[tabName],
                            autoPlay: value
                        }
                    })}
                />
                {slider?.[tabName]?.autoPlay === true &&
                    <>
                        <NumberControl
                            label={__('Speed (MS)', 'savvy-blocks')}
                            isShiftStepEnabled={true}
                            shiftStep={1}
                            onChange={(value) => onChange({
                                ...slider,
                                [tabName]: {
                                    ...slider[tabName],
                                    speed: value
                                }
                            })}
                            value={slider?.[tabName]?.speed || ''}
                        />
                        <NumberControl
                            label={__('Delay (MS)', 'savvy-blocks')}
                            isShiftStepEnabled={true}
                            shiftStep={1}
                            onChange={(value) => onChange({
                                ...slider,
                                [tabName]: {
                                    ...slider[tabName],
                                    delay: value
                                }
                            })}
                            value={slider?.[tabName]?.delay || ''}
                        />
                    </>
                }
            </BaseControl>
        </>
    )
}

export default SliderItems;