import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import {
    marginClassGenerator,
    paddingClassGenerator,
    animationClassGenerator,
    animationStyleGenerator,
    effectClassGenerator,
    effectStyleGenerator,
    getBackgroundBlockClasses,
    generateBackgroundStyles,
    renderBackgroundOverlay,
    renderBackgroundVideo
} from '/components/editor';

const Save = (props) => {
    const {
        attributes: {
            animation,
            background,
            effects,
            margin,
            padding,
            textColor,
        }
    } = props;

    const blockProps = useBlockProps.save({
        className: [
            'savvy-section position-relative',
            ...(margin ? [marginClassGenerator(margin)] : []),
            ...(padding ? [paddingClassGenerator(padding)] : []),
            ...(textColor ? [`text-${textColor}`] : []),
            ...(animation ? [animationClassGenerator(animation)] : []),
            ...(background ? [getBackgroundBlockClasses(background)] : []),
        ].join( ' ' ),
        style: {
            ...(animation && animationStyleGenerator(animation)),
            ...(background && generateBackgroundStyles(background)),
        }
    });

    return (
        <section {...blockProps}>
            {renderBackgroundOverlay(background)}
            {renderBackgroundVideo(background)}
            <InnerBlocks.Content />
        </section>
    )
}

export default Save
