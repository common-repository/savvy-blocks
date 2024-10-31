import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import {
    gapClassGenerator,
    marginClassGenerator,
    paddingClassGenerator,
    animationClassGenerator,
    animationStyleGenerator,
    getBackgroundBlockClasses,
    generateBackgroundStyles,
    renderBackgroundOverlay,
    renderBackgroundVideo
} from '/components/editor';

import { displayClassGenerator } from './editor/index';

const Save = (props) => {
    const {
        attributes: {
            animation,
            background,
            display,
            gap,
            margin,
            padding,
            textColor,
            tagName
        }
    } = props;

    const blockProps = useBlockProps.save({
        className: [
            'savvy-group',
            ...(display ? [displayClassGenerator(display)] : []),
            ...(gap ? [gapClassGenerator(gap)] : []),
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

    const TagName = tagName;

    return (
        <TagName {...blockProps}>
            {renderBackgroundOverlay(background)}
            {renderBackgroundVideo(background)}
            <InnerBlocks.Content />
        </TagName>
    )
}

export default Save;
