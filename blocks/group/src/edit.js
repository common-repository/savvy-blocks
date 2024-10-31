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

import Inspector from './inspector';
import { displayClassGenerator } from './editor/index';

const Edit = (props) => {
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

    const blockProps = useBlockProps({
        className: [
            'savvy-group',
            ...(display ? [displayClassGenerator(display)] : []),
            ...(gap ? [gapClassGenerator(gap)] : []),
            ...(margin ? [marginClassGenerator(margin)] : []),
            ...(padding ? [paddingClassGenerator(padding)] : []),
            ...(textColor ? [`text-${textColor}`] : []),
            ...( animation? [ animationClassGenerator( animation ) ] : [] ),
            ...( background? [ getBackgroundBlockClasses( background ) ] : [] ),
        ].join( ' ' ),
        style: {
            ...(animation && animationStyleGenerator(animation)),
            ...(background && generateBackgroundStyles(background)),
        }
    });

    return (
        <>
            <Inspector {...props} />
            <div {...blockProps}>
                {renderBackgroundOverlay(background)}
                {renderBackgroundVideo(background)}
                <InnerBlocks
                    templateInsertUpdatesSelection={true}
                />
            </div>
        </>
    )
}

export default Edit;
