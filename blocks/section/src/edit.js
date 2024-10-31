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
    effectStyleGenerator
} from '/components/editor';

import {
    getBackgroundBlockClasses,
    generateBackgroundStyles,
    renderBackgroundOverlay,
    renderEditBackgroundVideo
} from '../../../components/editor';

import Inspector from './inspector';

const Edit = (props) => {
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

    const INNER_TEMPLATE = [['savvy-blocks/container']];
    const ALLOWED_BLOCKS = ['savvy-blocks/container'];

    const blockProps = useBlockProps({
        className: [
            'savvy-section position-relative',
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
                {renderEditBackgroundVideo(background)}
                <InnerBlocks
                    allowedBlocks={ALLOWED_BLOCKS}
                    template={INNER_TEMPLATE}
                    templateInsertUpdatesSelection={true}
                />
            </div>
        </>
    )
}

export default Edit
