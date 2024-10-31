import { __ } from "@wordpress/i18n";
import { useContext } from '@wordpress/element';

import { Settings } from '/components/context';

import './styles.scss'

import {
    BaseControl,
    Flex,
    FocalPointPicker,
    SelectControl,
    TextControl,
    __experimentalDivider as Divider,
    __experimentalUnitControl as UnitControl
} from "@wordpress/components";
import {
    Color,
    MediaSelector,
} from '/components/editor';

import ImageSelector from "./image-selector";
import Overlay from "./overlay";

const BackgroundResponsive = (props) => {

    const {
        value: background,
        onChange,
        tabName
    } = props;

    const { settings } = useContext(Settings)

    //background is array as default
    if (background === undefined || background.length === 0) {
        const initBackgroundResponsive = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = '';
                return obj;
            }, {
            '_': ''
        }
        );
        onChange(initBackgroundResponsive);
    }

    const units = [
        { value: 'px', label: 'px', default: 0 },
        { value: '%', label: '%', default: 0 },
    ];

    const focalPoint = (value) => {
        onChange({
            ...background,
            [tabName]: {
                ...background?.[tabName],
                focalPoint: value || 0
            }
        });
    };

    // console.log(background);

    return (
        <>
            <SelectControl
                label={__('Background Type', 'savvy-blocks')}
                value={background?.[tabName]?.type || ''}
                options={
                    [
                        { label: '-', value: '' },
                        { label: 'Image', value: 'image' },
                        { label: 'Video', value: 'video' },
                        { label: 'Color', value: 'color' },
                        // { label: 'Gradient', value: 'gradient' },
                    ]
                }
                onChange={(value) => {
                    onChange({
                        ...background,
                        [tabName]: {
                            // ...background?.[tabName],
                            type: value
                        }
                    })
                }}
            />
            {background?.[tabName]?.type === 'image' &&
                <>
                    <ImageSelector
                        image={{ id: background?.[tabName]?.image?.id, url: background?.[tabName]?.image?.url }}
                        onSelectImage={(media) => {
                            if (media?.id) {
                                onChange({
                                    ...background,
                                    [tabName]: {
                                        ...background?.[tabName],
                                        image: {
                                            id: media.id,
                                            url: media.url,
                                        }
                                    }
                                })
                            } else {
                                delete background[tabName].image
                                delete background[tabName].focalPoint
                                onChange({
                                    ...background,
                                })
                            }
                        }}
                    />
                    <Divider />
                    <SelectControl
                        label={__('Background Size', 'savvy-blocks')}
                        value={background?.[tabName]?.backgroundProperties && background?.[tabName]?.backgroundProperties?.size || ''}
                        options={
                            [
                                { label: '-', value: '' },
                                { label: 'Auto', value: 'auto' },
                                { label: 'Cover', value: 'cover' },
                                { label: 'Contain', value: 'contain' },
                                { label: 'Inherit', value: 'inherit' },
                                { label: 'Initial', value: 'initial' },
                                { label: 'Custom', value: 'custom' },
                            ]
                        }
                        onChange={(value) => {
                            onChange({
                                ...background,
                                [tabName]: {
                                    ...background?.[tabName],
                                    backgroundProperties: {
                                        size: value
                                    }
                                }
                            })
                        }}
                    />
                    {background?.[tabName]?.backgroundProperties?.size === 'custom' &&
                        <Flex align="top">
                            <UnitControl
                                units={units}
                                value={background?.[tabName]?.backgroundProperties && background?.[tabName]?.backgroundProperties?.customSize?.left || ''}
                                onChange={(value) => onChange({
                                    ...background,
                                    [tabName]: {
                                        ...background?.[tabName],
                                        backgroundProperties: {
                                            ...background?.[tabName]?.backgroundProperties,
                                            customSize: {
                                                ...background?.[tabName]?.backgroundProperties?.customSize,
                                                left: value
                                            }
                                        }
                                    }
                                })}
                            />
                            <UnitControl
                                units={units}
                                value={background?.[tabName]?.backgroundProperties && background?.[tabName]?.backgroundProperties?.customSize?.right || ''}
                                onChange={(value) => onChange({
                                    ...background,
                                    [tabName]: {
                                        ...background?.[tabName],
                                        backgroundProperties: {
                                            ...background?.[tabName]?.backgroundProperties,
                                            customSize: {
                                                ...background?.[tabName]?.backgroundProperties?.customSize,
                                                right: value
                                            }
                                        }
                                    }
                                })}
                            />
                        </Flex>
                    }
                    <SelectControl
                        label={__('Background Repeat', 'savvy-blocks')}
                        value={background?.[tabName]?.backgroundProperties && background?.[tabName]?.backgroundProperties?.repeat || ''}
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
                        onChange={(value) => onChange({
                            ...background,
                            [tabName]: {
                                ...background?.[tabName],
                                backgroundProperties: {
                                    ...background?.[tabName]?.backgroundProperties,
                                    repeat: value
                                }
                            }
                        })}
                    />
                    {/* <h3>{__('Background Position Vertically', 'savvy-blocks')}</h3>
                    <Flex align="top">
                        <SelectControl
                            value={background?.[tabName]?.backgroundProperties && background?.[tabName]?.backgroundProperties?.position?.vertical?.text || 'top'}
                            options={
                                [
                                    { label: 'Top', value: 'top' },
                                    { label: 'Center', value: 'center' },
                                    { label: 'Bottom', value: 'bottom' },
                                ]
                            }
                            onChange={(value) => onChange({
                                ...background,
                                [tabName]: {
                                    ...background?.[tabName],
                                    backgroundProperties: {
                                        ...background?.[tabName]?.backgroundProperties,
                                        position: {
                                            ...background?.[tabName]?.backgroundProperties?.position,
                                            vertical: {
                                                ...background?.[tabName]?.backgroundProperties?.position?.vertical,
                                                text: value
                                            }
                                        }
                                    }
                                }
                            })}
                        />
                        {background?.[tabName]?.backgroundProperties?.position?.vertical?.text !== 'center' &&
                            <UnitControl
                                units={units}
                                value={background?.[tabName]?.backgroundProperties && background?.[tabName]?.backgroundProperties?.position?.vertical?.custom || ''}
                                onChange={(value) => onChange({
                                    ...background,
                                    [tabName]: {
                                        ...background?.[tabName],
                                        backgroundProperties: {
                                            ...background?.[tabName]?.backgroundProperties,
                                            position: {
                                                ...background?.[tabName]?.backgroundProperties?.position,
                                                vertical: {
                                                    ...background?.[tabName]?.backgroundProperties?.position?.vertical,
                                                    custom: value
                                                }
                                            }
                                        }
                                    }
                                })}
                            />
                        }
                    </Flex>
                    <h3>{__('Background Position Horizontally', 'savvy-blocks')}</h3>
                    <Flex align="top">
                        <SelectControl
                            value={background?.[tabName]?.backgroundProperties && background?.[tabName]?.backgroundProperties?.position?.horizontal?.text || 'left'}
                            options={
                                [
                                    { label: 'Right', value: 'right' },
                                    { label: 'Center', value: 'center' },
                                    { label: 'Left', value: 'left' },
                                ]
                            }
                            onChange={(value) => onChange({
                                ...background,
                                [tabName]: {
                                    ...background?.[tabName],
                                    backgroundProperties: {
                                        ...background?.[tabName]?.backgroundProperties,
                                        position: {
                                            ...background?.[tabName]?.backgroundProperties?.position,
                                            horizontal: {
                                                ...background?.[tabName]?.backgroundProperties?.position?.horizontal,
                                                text: value
                                            }
                                        }
                                    }
                                }
                            })}
                        />
                        {background?.[tabName]?.backgroundProperties?.position?.horizontal?.text !== 'center' &&
                            <UnitControl
                                units={units}
                                value={background?.[tabName]?.backgroundProperties && background?.[tabName]?.backgroundProperties?.position?.horizontal?.custom || ''}
                                onChange={(value) => onChange({
                                    ...background,
                                    [tabName]: {
                                        ...background?.[tabName],
                                        backgroundProperties: {
                                            ...background?.[tabName]?.backgroundProperties,
                                            position: {
                                                ...background?.[tabName]?.backgroundProperties?.position,
                                                horizontal: {
                                                    ...background?.[tabName]?.backgroundProperties?.position?.horizontal,
                                                    custom: value
                                                }
                                            }
                                        }
                                    }
                                })}
                            />
                        }
                    </Flex>  */}
                    <Divider />
                </>
            }
            {background?.[tabName]?.type === 'image' && background?.[tabName]?.image?.url &&
                <>
                    <h3>{__('Background Position', 'savvy-blocks')}</h3>
                    <FocalPointPicker
                        url={background?.[tabName]?.image?.url}
                        value={background?.[tabName]?.focalPoint || ''}
                        onDragStart={(value) => focalPoint(value)}
                        onDrag={(value) => focalPoint(value)}
                        onChange={(value) => focalPoint(value)}
                    />
                    <Divider />
                </>
            }
            {background?.[tabName]?.type === 'color' &&
                <>
                    <BaseControl label={__('Background Color', 'savvy-blocks')}>
                        <Color
                            value={background?.[tabName]?.color || ''}
                            onChange={(color) => onChange({
                                ...background,
                                [tabName]: {
                                    ...background?.[tabName],
                                    color: color.slug
                                }
                            })}
                        />
                    </BaseControl>
                    <Divider />
                </>
            }
            {background?.[tabName]?.type === 'video' &&
                <>
                    <SelectControl
                        label={__('Video Source', 'savvy-blocks')}
                        value={background?.[tabName]?.videoSource || ''}
                        options={
                            [
                                { label: '-', value: '' },
                                { label: 'Upload', value: 'upload' },
                                { label: 'Youtube', value: 'youtube' },
                                { label: 'Vimeo', value: 'vimeo' },
                            ]
                        }
                        onChange={(value) => {
                            onChange({
                                ...background,
                                [tabName]: {
                                    ...background?.[tabName],
                                    videoSource: value
                                }
                            })
                        }}
                    />
                    {background?.[tabName]?.videoSource === 'youtube' &&
                        <>
                            <TextControl
                                label={__('Video URL', 'savvy-blocks')}
                                value={background?.[tabName]?.url || ''}
                                onChange={(value) => {
                                    delete background[tabName].video,
                                        onChange({
                                            ...background,
                                            [tabName]: {
                                                ...background?.[tabName],
                                                url: value
                                            }
                                        })
                                }}
                            />
                            <span style={{color: '#fff', display: 'block', padding: '5px', margisvottom: '5px', marginTop: '-20px', backgroundColor: '#f4a2a2'}}>
                                Please use youtube ID.<br/>https://www.youtube.com/embed/<b>ID</b>
                            </span>
                        </>
                    }
                    {background?.[tabName]?.videoSource === 'vimeo' &&
                        <>
                            <TextControl
                                label={__('Video URL', 'savvy-blocks')}
                                value={background?.[tabName]?.url || ''}
                                onChange={(value) => {
                                    delete background[tabName].video,
                                        onChange({
                                            ...background,
                                            [tabName]: {
                                                ...background?.[tabName],
                                                url: value
                                            }
                                        })
                                }}
                            />
                            <span style={{color: '#fff', display: 'block', padding: '5px', margisvottom: '20px', marginTop: '-20px', backgroundColor: '#f4a2a2'}}>
                                Please use vimeo ID.<br/>https://vimeo.com/<b>ID</b>
                            </span>
                        </>
                    }
                    {background?.[tabName]?.videoSource === 'upload' &&
                        <>
                            <MediaSelector
                                media={{ 
                                    id: background?.[tabName]?.media?.id, 
                                    url: background?.[tabName]?.media?.url 
                                }}
                                onSelectMedia={(media) => {
                                    delete background[tabName].url,
                                        onChange({
                                            ...background,
                                            [tabName]: {
                                                ...background?.[tabName],
                                                media: {
                                                    id: media.id,
                                                    url: media.url,
                                                }
                                            }
                                        })
                                }}
                            />
                        </>
                    }
                </>
            }
            <Divider />
            <Overlay
                overlay={background?.[tabName]?.overlay || ''}
                onChange={(overlay) => onChange({
                    ...background,
                    [tabName]: {
                        ...background?.[tabName],
                        overlay
                    }
                })}
            />
        </>
    )
}

const backgroundResponsiveStyleGenerator = (background) => {
    const cssVariables = {};

    for (const breakpoint in background) {
        const bgImage = background[breakpoint]?.image?.url;
        const bgVideo = background[breakpoint]?.video?.url;
        const focalPointX = background[breakpoint]?.focalPoint?.x ? Math.round(background[breakpoint]?.focalPoint?.x * 100) + '%' : '';
        const focalPointY = background[breakpoint]?.focalPoint?.y ? Math.round(background[breakpoint]?.focalPoint?.y * 100) + '%' : '';
        const bgSize = background[breakpoint]?.backgroundProperties?.size;
        const bgCustomSizeLeft = background[breakpoint]?.backgroundProperties?.customSize?.left;
        const bgCustomSizeRight = background[breakpoint]?.backgroundProperties?.customSize?.right;
        const bgRepeat = background[breakpoint]?.backgroundProperties?.repeat;
        // const bgPositionVerticalText = background[breakpoint]?.backgroundProperties?.position?.vertical?.text || 'top';
        // const bgPositionVerticalCustom = background[breakpoint]?.backgroundProperties?.position?.vertical?.custom || '';
        // const bgPositionHorizontalText = background[breakpoint]?.backgroundProperties?.position?.horizontal?.text || 'left';
        // const bgPositionHorizontalCustom = background[breakpoint]?.backgroundProperties?.position?.horizontal?.custom || '';

        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : ''

        if (bgImage) {
            const variableName = `--background-image${breakpointCss}`;
            cssVariables[variableName] = `url(${bgImage})`;
        }

        if (bgVideo) {
            const variableName = `--background-video${breakpointCss}`;
            cssVariables[variableName] = `${bgVideo}`;
        }

        if (bgSize === 'custom' || bgCustomSizeLeft || bgCustomSizeRight) {
            const variableName = `--background-size${breakpointCss}`;
            cssVariables[variableName] = (typeof bgCustomSizeLeft !== 'undefined' ? bgCustomSizeLeft : '') + ' ' + (typeof bgCustomSizeRight !== 'undefined' ? bgCustomSizeRight : '');
        } else {
            const variableName = `--background-size${breakpointCss}`;
            cssVariables[variableName] = bgSize;
        }

        if (bgRepeat) {
            const variableName = `--background-repeat${breakpointCss}`;
            cssVariables[variableName] = bgRepeat;
        }

        // if (bgPositionVerticalText, bgPositionVerticalCustom, bgPositionHorizontalText, bgPositionHorizontalCustom){
        //     const variableName = `--background-position${breakpointCss}`;
        //     cssVariables[variableName] = [bgPositionVerticalText, bgPositionVerticalCustom, bgPositionHorizontalText, bgPositionHorizontalCustom].join(' ');    
        // }

        if (focalPointX, focalPointY) {
            const variableName = `--background-position${breakpointCss}`;
            cssVariables[variableName] = [focalPointX, focalPointY].join(' ');
        }
    }

    return cssVariables;
};

const backgroundResponsiveClassGenerator = (background) => {
    const classList = [];

    for (const breakpoint in background) {
        const color = background[breakpoint]['color'];

        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : ''

        if (color) {
            classList.push(`bg-${breakpointCss}${color}`)
        }
    }

    return classList.join(' ');
}

const overlayStyleGenerator = (background) => {
    const cssVariables = {};

    for (const breakpoint in background) {
        const bgOverlayGradient = background[breakpoint]?.overlay?.gradient;

        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : ''

        if (bgOverlayGradient) {
            const variableName = `--background${breakpointCss}`;
            cssVariables[variableName] = bgOverlayGradient;
        }
    }

    return cssVariables;
};

const overlayClassGenerator = (background) => {
    const classList = [];

    for (const breakpoint in background) {
        const opacity = background[breakpoint]?.overlay?.opacity;
        const color = background[breakpoint]?.overlay?.color;

        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : ''

        if (opacity) {
            classList.push(`opacity-${breakpointCss}${opacity}`)
        }

        if (color) {
            if (!opacity) {
                classList.push(`opacity-${breakpointCss}0`);
            }
            classList.push(`bg-${breakpointCss}${color}`)
        }
    }

    return classList.join(' ');
}

const hasProperty = (attribute, gradientPropertyName) => {
    if (attribute && typeof attribute === 'object') {
        return Object.keys(attribute).some((key) => {
            const breakpointData = attribute[key];
            return breakpointData && getProperty(breakpointData, gradientPropertyName);
        });
    }
    return false;
};

const getProperty = (obj, path) => {
    const properties = path.split('.');
    try {
        return properties.reduce((acc, prop) => (acc !== undefined && acc !== null) ? acc[prop] : undefined, obj);
    } catch (error) {
        console.error("Error accessing property:", error);
        return undefined;
    }
};

const hasPropertyBackground = (background) => {

    const hasColor = hasProperty(background, 'color');
    const hasOverlay = hasProperty(background, 'overlay');
    const hasVideo = hasProperty(background, 'media');
    const hasVideoUrl = hasProperty(background, 'url');
    const hasOverlayGradient = hasProperty(background, 'overlay.gradient');
    const hasImage = hasProperty(background, 'image');
    const hasBackgroundPropertiesRepeat = hasProperty(background, 'backgroundProperties.repeat');
    const hasBackgroundPropertiesSize = hasProperty(background, 'backgroundProperties.size');
    const hasBackgroundPropertiesPosition = hasProperty(background, 'focalPoint');

    const classes = [
        ...(hasColor ? [backgroundResponsiveClassGenerator(background)] : []),
        ...(hasOverlay ? ['has-overlay'] : []),
        ...(hasImage ? ['savvy-responsive-background-image'] : []),
        ...(hasBackgroundPropertiesRepeat ? ['savvy-responsive-background-repeat'] : []),
        ...(hasBackgroundPropertiesSize ? ['savvy-responsive-background-size'] : []),
        ...(hasBackgroundPropertiesPosition ? ['savvy-responsive-background-position'] : []),
    ];

    return {
        hasColor,
        hasOverlay,
        hasVideo,
        hasVideoUrl,
        hasOverlayGradient,
        hasImage,
        hasBackgroundPropertiesRepeat,
        hasBackgroundPropertiesSize,
        hasBackgroundPropertiesPosition,
        classes
    };
};

const generateOverlayClassName = (attribute, result) => {
    return [
        'savvy-background-overlay',
        ...(result.hasOverlay ? [overlayClassGenerator(attribute)] : []),
        ...(result.hasOverlayGradient ? ['savvy-responsive-background'] : []),
    ].join(' ');
};

const getBackgroundBlockClasses = (background) => {
    const responsiveClasses = hasPropertyBackground(background) ? hasPropertyBackground(background).classes : [];
    return [...responsiveClasses].join(' ');
}

const generateBackgroundStyles = (background) => {
    return backgroundResponsiveStyleGenerator(background);
}

const renderBackgroundOverlay = (background) => {
    if (hasPropertyBackground(background) && hasPropertyBackground(background).hasOverlay) {
        return (
            <span className={generateOverlayClassName(background, hasPropertyBackground(background))} style={overlayStyleGenerator(background)} />
        );
    } else {
        return null;
    }
}

const renderBackgroundVideo = (background) => {
    if (hasPropertyBackground(background) && hasPropertyBackground(background).hasVideo) {
        const videoSrc = background?._?.media?.url || '';
        return (
            <video class="bgVideo" autoplay="" muted="" loop="">
                <source src={videoSrc} type="video/mp4" />
            </video>
        );
    } else if (hasPropertyBackground(background) && hasPropertyBackground(background).hasVideoUrl) {
        const videoSrc = background?._?.url || '';
        const source = background?._?.videoSource;

        if (source === 'youtube') {
            return (
                <>
                    <div class="youtube-wrapper"><div id="youtubeEmbed" class="youtube-wrapper_video" data-video-id={videoSrc}></div></div>
                </>
            );
        } else {
            return (
                <>
                    <div class="vimeo-wrapper"><iframe src={`https://player.vimeo.com/video/${videoSrc}?background=1&autoplay=1&loop=1&byline=0&title=0`} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>
                </>
            );
        }
    } else {
        return null;
    }
}

const renderEditBackgroundVideo = (background) => {
    if (hasPropertyBackground(background) && hasPropertyBackground(background).hasVideo) {
        const videoSrc = background?._?.media?.url || '';
        return (
            <div className="bg-edit-video"></div>
        );
    } else if (hasPropertyBackground(background) && hasPropertyBackground(background).hasVideoUrl) {
        const videoSrc = background?._?.url || '';
        const source = background?._?.videoSource;

        if (source === 'youtube') {
            return (
                <>
                    <div className="bg-edit-youtube"><iframe width="100%" height="100%" src={ `https://www.youtube.com/embed/${ videoSrc }` }></iframe></div>
                </>
            );
        } else {
            return (
                <>
                    <div className="bg-edit-vimeo"><iframe src={`https://player.vimeo.com/video/${videoSrc}`}></iframe></div>
                </>
            );
        }
    } else {
        return null;
    }
}

export {
    BackgroundResponsive as default,
    getBackgroundBlockClasses,
    generateBackgroundStyles,
    renderBackgroundOverlay,
    renderBackgroundVideo,
    renderEditBackgroundVideo
};
