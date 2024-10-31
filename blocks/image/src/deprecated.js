import { useBlockProps } from '@wordpress/block-editor';
import {
    marginClassGenerator,
    animationClassGenerator,
    animationStyleGenerator,
    effectClassGenerator,
    effectStyleGenerator,
    textAlignClassGenerator,
} from '/components/editor';
import FlipSVG from "./FlipSvg";



const v1 = {
    attributes:{
        "blockType" : {
            "type" : "string",
            "default": "custom"
        },
        "image": {
            "type": "object"
        },
        "size": {
            "type": "object"
        },
        "overlay": {
            "type": "object",
            "default": {
                "opacity": "25"
            }
        },
        "border": {
            "type": "object"
        },
        "margin": {
            "type": "object"
        }
    },
    save( props ) {
        const {
            attributes: {
                border,
                image,
                margin,
                overlay,
                size,
            },
        } = props
        const overlayClassName = [
            "savvy-image-overlay",
            ...(overlay?.color ? [`bg-${overlay?.color}`] : []),
            ...(overlay?.opacity !== undefined ? [`opacity-${overlay?.opacity}`] : []),
        ].join(" ");
        const blockProps = useBlockProps.save({
            className: [
                'savvy-image',
                ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
            ].join(' '),
            style: {
                width: size?.width !== '' ? size?.width : undefined,
                maxWidth: size?.maxWidth !== '' ? size?.maxWidth : undefined,
                height: size?.height !== '' ? size?.height : undefined,
                minHeight: size?.minHeight !== '' ? size?.minHeight : undefined,
                maxHeight: size?.maxHeight !== '' ? size?.maxHeight : undefined,
                borderRadius: border?.radius || undefined,
                borderWidth: border?.width || undefined,
                borderColor: border?.color || undefined,
            }
        });
        return (
            <picture {...blockProps}>
                {
                    overlay?.color || overlay?.gradient ? (
                        <span className={overlayClassName} style={{backgroundImage: overlay?.gradient}}/>
                    ) : (
                        ''
                    )
                }
                <img
                    src={image ? image.url : require('../../../blocks-assets/default.jpg')}
                    alt={image?.alt}
                    className={[
                        `object-fit-${size?.objectFit || 'none'}`,
                        `object-position-${size?.objectPosition || 'center'}`
                    ].join(' ')
                    }
                />
            </picture>
        )
    }
}

const v2 = {
    attributes: {
        "blockType": {
            "type": "string",
            "default": "custom"
        },
        "image": {
            "type": "object"
        },
        "imageSettings": {
            "type": "object",
            "default": {
                "focalPoint": {
                    "-": {"x": 0.5, "y": 0.5}
                }
            }
        },
        "size": {
            "type": "object"
        },
        "overlay": {
            "type": "object",
            "default": {
                "opacity": "25"
            }
        },
        "textAlign": {
            "type": "object"
        },
        "textColor": {
            "type": "string"
        },
        "background": {
            "type": "object"
        },
        "animation": {
            "type": "object"
        },
        "effects": {
            "type": "object"
        },
        "text": {
            "type": "string",
            "default": ""
        },
        "border": {
            "type": "object",
            "default": {
                "width": 0
            }
        },
        "margin": {
            "type": "object"
        }
    },
    save( props ) {
        const {
            attributes: {
                border,
                image,
                margin,
                overlay,
                size,
                imageSettings,
                background,
                animation,
                effects,
                textAlign,
            },
        } = props
        const overlayClassName = [
            "savvy-image-overlay",
            ...(overlay?.color ? [`bg-${overlay?.color}`] : []),
            ...(overlay?.opacity !== undefined ? [`opacity-${overlay?.opacity}`] : []),
        ].join(" ");
        const captionProps = {
            className: [
                ...(textAlign ? [textAlignClassGenerator(textAlign)] : []),
                "fig-caption-block-img",
                `bg-${background?.color}`,
            ].join(" "),
            style: {},
        };

        const fliptypes = [];
        imageSettings?.flipHorizontally && fliptypes.push("flip_shape_horizontally");
        imageSettings?.flipVertically && fliptypes.push("flip_shape_vertically");

        const MaskUrl =
            imageSettings?.shapeIcon?.svg == true ?
                `url('data:image/svg+xml;utf8,${encodeURIComponent(
                    FlipSVG({ svgUrl: imageSettings?.shapeIcon?.svgContent, types: fliptypes })
                )}')` :
                `url('${imageSettings?.shapeIcon?.guid}')`
        ;

        const blockProps = useBlockProps.save({
            className: [
                "savvy-mask",
                "savvy-image",
                imageSettings?.focal && "focal-picture",
                imageSettings?.Caption && "block-img-figcaption",
                ...(animation ? [animationClassGenerator(animation)] : []),
                ...(margin ? [marginClassGenerator(margin)] : []),
                ...(effects ? [effectClassGenerator(effects)] : []),
            ].join(" "),
            style: {
                maskImage:
                    imageSettings?.shapeIcon &&
                    imageSettings?.shapeShow === true &&
                    imageSettings?.shapeIcon?.ID !== 0 &&
                    MaskUrl,
                maskPosition : imageSettings?.maskPosition && imageSettings?.maskPosition,
                width: size?.width !== "" ? size?.width : undefined,
                maxWidth: size?.maxWidth !== "" ? size?.maxWidth : undefined,
                height: size?.height !== "" ? size?.height : undefined,
                minHeight: size?.minHeight !== "" ? size?.minHeight : undefined,
                maxHeight: size?.maxHeight !== "" ? size?.maxHeight : undefined,
                borderRadius: border?.radius || undefined,
                borderWidth: border?.width || undefined,
                borderColor: border?.color || undefined,
                ...(animation && animationStyleGenerator(animation)),
                ...(effects && effectStyleGenerator(effects)),
                aspectRatio: imageSettings?.ratio
                    ? imageSettings?.ratioSize !== ""
                        ? imageSettings?.ratioSize
                        : undefined
                    : undefined,
            },
        });
        return (
            <picture {...blockProps}>
                {overlay?.color || overlay?.gradient ? (
                    <span
                        className={overlayClassName}
                        style={{backgroundImage: overlay?.gradient}}
                    />
                ) : (
                    ""
                )}
                <img
                    src={
                        image ? image.url : require("../../../blocks-assets/default.jpg")
                    }
                    loading={imageSettings?.lazy === true ? "lazy" : "eager"}
                    alt={image?.alt}
                    className={[
                        imageSettings?.focal && "focal-img",
                        `object-fit-${size?.objectFit || "none"}`,
                        `object-position-${size?.objectPosition || "center"}`,
                    ].join(" ")}
                    style={
                        imageSettings?.focal && imageSettings?.focalPoint
                            ? {
                                left: `${imageSettings?.focalPoint?._?.x * 100}%`,
                                top: `${imageSettings?.focalPoint?._?.y * 100}%`
                            }
                            : null
                    }
                    srcSet={[
                        image?.sizes?.full && `${image?.sizes?.full?.url} ${image.sizes?.full?.width}w`,
                        image?.sizes?.large?.url && image?.sizes?.large?.url.length && image?.sizes?.large?.width ? `${image.sizes.large.url} ${image.sizes.large.width}w` : '', image?.sizes?.thumbnail && `${image?.sizes?.thumbnail?.url} ${image.sizes?.thumbnail?.width}w`,
                        image?.sizes?.medium && `${image?.sizes?.medium?.url} ${image.sizes?.medium?.width}w`
                    ].filter(Boolean).join(", ")}
                    sizes={`(max-width: ${size?.width}) 100vw, ${size?.width}`}
                />
                {imageSettings?.Caption && (
                    <div {...captionProps}>
                        <p className="m-0 p-8">{imageSettings?.TextCaption}</p>
                    </div>
                )}
            </picture>
        )
    }
}


export default [v2, v1];
