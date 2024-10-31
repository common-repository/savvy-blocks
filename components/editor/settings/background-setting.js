import { __ } from "@wordpress/i18n";
import {
    BaseControl,
    SelectControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";
import {
    Color,
} from '/components/editor';
import ImageSelector from "../image-selector";
import Overlay from "../overlay";

const BackgroundSetting = (props) => {

    const {
        background,
        onChange
    } = props;

    const {
        image: {
            id: imageId,
            url: imageUrl,
        },
        backgroundProperties,
        color,
        overlay
    } = background

    return (
        <>
        {
            props.hasOwnProperty('background') &&
            <>
                <ImageSelector
                    image = {{id: imageId || 0, url: imageUrl} }
                    onSelectImage={ ( media ) => {
                        onChange ( {
                            ...background,
                            image: {
                                ...background.image,
                                id: media.id || 0,
                                url: media.url,
                            },
                        } )
                    } }
                />
                <Divider />
                <BaseControl label={ __('Background Color', 'savvy-blocks') }>
                    <Color
                        value={ color}
                        onChange={ (color) => onChange({
                            ...background,
                            color: color.slug
                        })}
                    />
                </BaseControl>
                <Divider />
                <SelectControl
                    label={ __('Background Size', 'savvy-blocks') }
                    value={ backgroundProperties && backgroundProperties.size }
                    options={
                        [
                            { label: '-', value: '' },
                            { label: 'Auto', value: 'auto' },
                            { label: 'Cover', value: 'cover' },
                            { label: 'Contain', value: 'contain' },
                            { label: 'Inherit', value: 'inherit' },
                            { label: 'Initial', value: 'initial' },
                        ]
                    }
                    onChange={ (value) => onChange( {
                        ...background,
                        backgroundProperties: {...backgroundProperties, size: value}
                    })}
                />
                <SelectControl
                    label={ __('Background Repeat', 'savvy-blocks') }
                    value={ backgroundProperties && backgroundProperties.repeat }
                    options={
                        [
                            { label: '-', value: '' },
                            { label: 'Repeat Horizontally', value: 'repeat-x' },
                            { label: 'Repeat Vertically', value: 'repeat-y' },
                            { label: 'Repeat', value: 'repeat' },
                            { label: 'Space', value: 'space' },
                            { label: 'Round', value: 'round' },
                            { label: 'No Repeat', value: 'no-repeat' },
                            { label: 'Unset', value: 'unset' },
                            { label: 'Revert', value: 'revert' },
                            { label: 'Inherit', value: 'inherit' },
                            { label: 'Initial', value: 'initial' },
                        ]
                    }
                    onChange={ (value) => onChange( {
                        ...background,
                        backgroundProperties: {...backgroundProperties, repeat: value}
                    })}
                />
                <SelectControl
                    label={ __('Background Position', 'savvy-blocks') }
                    value={ backgroundProperties && backgroundProperties.position }
                    options={
                        [
                            { label: '-', value: '' },
                            { label: 'Top', value: 'top' },
                            { label: 'Right', value: 'right' },
                            { label: 'Center', value: 'center' },
                            { label: 'Bottom', value: 'bottom' },
                            { label: 'Left', value: 'left' },
                        ]
                    }
                    onChange={ (value) => onChange( {
                        ...background,
                        backgroundProperties: {...backgroundProperties, position: value}
                    })}
                />
                <Divider />
                <Overlay
                    overlay={ overlay }
                    onChange={ ( overlay ) => { 
                        onChange ( {
                            ...background,
                            overlay
                        } )
                    } }
                />
            </>
        }
        </>
    )
}

export default BackgroundSetting;