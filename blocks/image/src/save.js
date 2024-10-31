import { useBlockProps } from "@wordpress/block-editor";
import  FlipSVG  from './FlipSvg';
import { Image } from "/components/ui";
import {
    marginClassGenerator,
    animationClassGenerator,
    animationStyleGenerator,
    effectClassGenerator,
    effectStyleGenerator,
    textAlignClassGenerator,
} from "/components/editor";

const Save = (props) => {
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
    } = props;

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
        <Image
            id={blockProps.id}
            className={blockProps.className}
            style={blockProps.style}
            image={image}
            loading={imageSettings?.lazy}
            overlay={overlay}
            size={size}
            imageSettings={imageSettings}
            captionProps={captionProps}
        />
    );
};

export default Save;
