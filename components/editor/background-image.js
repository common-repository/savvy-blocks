import { __ } from "@wordpress/i18n";
import {
    SelectControl,
} from "@wordpress/components";
import ImageSelector from "./image-selector";
import Overlay from "./overlay";

const BackgroundImage = (props) => {
    const {
        image: {
            id: imageId,
            url: imageUrl,
            backgroundProperties: backgroundProperties
        },
        overlay,
        setAttributes,
        onChange
    } = props;

    return (
        <>
            <ImageSelector
                image = {{id: imageId, url: imageUrl} }
                onSelectImage={ ( media ) => {
                    onChange ( {
                        id: media.id,
                        url: media.url,
                        ...(backgroundProperties && { backgroundProperties: backgroundProperties })
                    } )
                } }
            />
            <Overlay
                overlay={ overlay }
                setAttributes={ setAttributes }
            />
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
                    id: imageId,
                    url: imageUrl,
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
                    id: imageId,
                    url: imageUrl,
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
                        { label: 'Center', value: 'center' },
                        { label: 'Bottom', value: 'bottom' },
                    ]
                }
                onChange={ (value) => onChange( {
                    id: imageId,
                    url: imageUrl,
                    backgroundProperties: {...backgroundProperties, position: value}
                })}
            />
        </>
    )
}

export default BackgroundImage;
