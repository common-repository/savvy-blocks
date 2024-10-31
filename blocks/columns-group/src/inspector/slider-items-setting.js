import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    TextControl,
    ToggleControl,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components';

function SliderItems ( props ) {
    const { 
        columnGroup,
        onChange
    } = props;

    return (
        <>
            <BaseControl>
                <TextControl
                    label={ __('Slide Per View', 'savvy-blocks') }
                    help={ __('"auto" View Also Available', 'savvy-blocks') }
                    onChange={(value) => onChange({
                        ...columnGroup, slider: {
                            ...columnGroup.slider,
                            slidesPerView: value
                        }
                    })}
                    value={ columnGroup?.slider?.slidesPerView}
                />
                <NumberControl
                    label={ __('Space Between', 'savvy-blocks') }
                    help={ __('Space between slides', 'savvy-blocks') }
                    isShiftStepEnabled={ true }
                    onChange={(value) => onChange({
                        ...columnGroup, slider: {
                            ...columnGroup.slider,
                            spaceBetween: value
                        }
                    })}
                    shiftStep={ 1 }
                    value={ columnGroup?.slider?.spaceBetween }
                />
                <NumberControl
                    label={ __('Offset Before', 'savvy-blocks') }
                    help={ __('Add (in px) additional slide offset in the beginning of the container (before all slides)', 'savvy-blocks') }
                    isShiftStepEnabled={ true }
                    onChange={(value) => onChange({
                        ...columnGroup, slider: {
                            ...columnGroup.slider,
                            slidesOffsetBefore: value
                        }
                    })}
                    shiftStep={ 1 }
                    value={ columnGroup?.slider?.slidesOffsetBefore }
                />
                <NumberControl
                    label={ __('Offset After', 'savvy-blocks') }
                    help={ __('Add (in px) additional slide offset in the beginning of the container (after all slides)', 'savvy-blocks') }
                    isShiftStepEnabled={ true }
                    onChange={(value) => onChange({
                        ...columnGroup, slider: {
                            ...columnGroup.slider,
                            slidesOffsetAfter: value
                        }
                    })}
                    shiftStep={ 1 }
                    value={ columnGroup?.slider?.slidesOffsetAfter }
                />
                { !columnGroup?.slider?.loop  &&
                    <>
                        <NumberControl
                            label={ __('Grid Rows', 'savvy-blocks') }
                            help={  __('Number of slides rows, for multirow layout', 'savvy-blocks')}
                            isShiftStepEnabled={ true }
                            onChange={(value) => onChange({
                                ...columnGroup, slider: {
                                    ...columnGroup.slider,
                                    grid: {
                                        ...columnGroup.slider.grid,
                                        rows: value
                                    }
                                }
                            })}
                            shiftStep={ 1 }
                            value={ columnGroup?.slider?.grid?.rows }
                        />
                    </>
                }
                <ToggleControl
                    label={ __('Loop', 'savvy-blocks') }
                    checked={ columnGroup?.slider?.loop }
                    onChange={(value) => {
                        const newColumnGroupSlider = JSON.parse(JSON.stringify(columnGroup))
                        delete newColumnGroupSlider.slider.grid
                        newColumnGroupSlider.slider.loop = value;
                        onChange(newColumnGroupSlider)
                    }}
                />
                <ToggleControl
                    label={ __('Center Slides', 'savvy-blocks') }
                    checked={ columnGroup?.slider?.centeredSlides }
                    onChange={(value) => onChange({
                        ...columnGroup, slider: {
                            ...columnGroup.slider,
                            centeredSlides: value
                        }
                    })}
                />
                <ToggleControl
                    label={ __('Free Mode', 'savvy-blocks') }
                    checked={ columnGroup?.slider?.freeMode }
                    onChange={(value) => onChange({
                        ...columnGroup, slider: {
                            ...columnGroup.slider,
                            freeMode: value
                        }
                    })}
                />
                <ToggleControl
                    label={ __('Auto Play', 'savvy-blocks') }
                    checked={ columnGroup?.slider?.autoPlay }
                    onChange={(value) => onChange({
                        ...columnGroup, slider: {
                            ...columnGroup.slider,
                            autoPlay: value
                        }
                    })}
                />
                { columnGroup?.slider?.autoPlay === true &&
                    <>
                        <NumberControl
                            label={ __('Speed', 'savvy-blocks') }
                            isShiftStepEnabled={ true }
                            onChange={(value) => onChange({
                                ...columnGroup, slider: {
                                    ...columnGroup.slider,
                                    speed: value
                                }
                            })}
                            shiftStep={ 1 }
                            value={ columnGroup?.slider?.speed }
                        />
                        <NumberControl
                            label={ __('Delay', 'savvy-blocks') }
                            isShiftStepEnabled={ true }
                            onChange={(value) => onChange({
                                ...columnGroup, slider: {
                                    ...columnGroup.slider,
                                    delay: value
                                }
                            })}
                            shiftStep={ 1 }
                            value={ columnGroup?.slider?.delay }
                        />
                    </>
                }
            </BaseControl>
        </>
    )
}

export default SliderItems;