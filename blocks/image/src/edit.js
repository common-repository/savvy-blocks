import { useBlockProps } from "@wordpress/block-editor";
import  FlipSVG  from './FlipSvg';
import {
    marginClassGenerator,
    Controls,
    getBackgroundBlockClasses,
    generateBackgroundStyles,
    animationClassGenerator,
    animationStyleGenerator,
    effectClassGenerator,
    effectStyleGenerator,
    textAlignClassGenerator,
} from "/components/editor";
import { useDefault } from "/utils/settings";
import Inspector from "./inspector";
const Edit = (props) => {
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
        attributes,
        setAttributes,
        clientId,
    } = props;

    useDefault(clientId, setAttributes);
    const captionProps = {
        className: [
            "fig-caption-block-img",
            `bg-${background?.color}`,
            ...(textAlign ? [textAlignClassGenerator(textAlign)] : []),
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

    const blockProps = useBlockProps({
        className: [
            "savvy-image",
            "savvy-mask",
            imageSettings?.focal && "focal-picture",
            imageSettings?.Caption && "block-img-figcaption",
            ...(margin ? [marginClassGenerator(margin)] : []),
            ...(animation ? [animationClassGenerator(animation)] : []),
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

    const overlayClassName = [
        "savvy-image-overlay",
        ...(overlay?.color ? [`bg-${overlay?.color}`] : []),
        ...(overlay?.opacity !== undefined ? [`opacity-${overlay?.opacity}`] : []),
    ].join(" ");

    return (
        <>
            <Inspector {...props} />
            <Controls name={props.name} attributes={attributes} />

            <picture {...blockProps}>
                {overlay?.color || overlay?.gradient ? (
                    <span
                        className={overlayClassName}
                        style={{ backgroundImage: overlay?.gradient }}
                    />
                ) : (
                    ""
                )}
                <img
                    src={
                        image ? image.url : require("../../../blocks-assets/default.jpg")
                    }
                    loading={ imageSettings?.lazy === true ? "lazy" : "eager" }
                    alt={image?.alt}
                    className={[
                        `object-fit-${size?.objectFit || "none"}`,
                        `object-position-${size?.objectPosition || "center"}`,
                        imageSettings?.focal && "focal-img",
                    ].join(" ")}
                    style={
                        imageSettings?.focal && imageSettings?.focalPoint
                            ? {
                                left: `${imageSettings?.focalPoint?.x * 100}%`,
                                top: `${imageSettings?.focalPoint?.y * 100}%`
                            }
                            : null
                    }
                    srcSet={[
                        image?.sizes?.full?.url && image?.sizes?.full?.width ? `${image.sizes.full.url} ${image.sizes.full.width}w` : '',
                        image?.sizes?.large?.url && image?.sizes?.large?.width ? `${image.sizes.large.url} ${image.sizes.large.width}w` : '',
                        image?.sizes?.thumbnail?.url && image?.sizes?.thumbnail?.width ? `${image.sizes.thumbnail.url} ${image.sizes.thumbnail.width}w` : '',
                        image?.sizes?.medium?.url && image?.sizes?.medium?.width ? `${image.sizes.medium.url} ${image.sizes.medium.width}w` : '',
                    ].filter(Boolean).join(", ") || null}
                    sizes={size?.width ? `(max-width: ${size?.width}) 100vw, ${size?.width}` : null}
                />
                {imageSettings?.Caption && (
                    <div {...captionProps}>
                        <p className="m-0 p-8">{imageSettings?.TextCaption}</p>
                    </div>
                )}
            </picture>
        </>
    );
};

export default Edit;
