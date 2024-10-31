import { useBlockProps } from '@wordpress/block-editor';

import { Heading } from '/components/ui';

import {
    animationClassGenerator,
    animationStyleGenerator,
    effectClassGenerator,
    effectStyleGenerator,
    marginClassGenerator,
    paddingClassGenerator,
    textAlignClassGenerator,
} from '/components/editor';

const Save = ( props ) => {
    const {
        attributes: {
            animation,
            cursor,
            effects,
            headingText,
            headingType,
            margin,
            padding,
            textAlign,
            textColor,
        },
    } = props

    const blockProps = useBlockProps.save( {
        className: [
            `savvy-heading savvy-cursor-${cursor?.value}`,
            ...( headingType ? [ `savvy-heading-${ headingType }` ] : [] ),
            ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
            ...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
            ...( textAlign ? [ textAlignClassGenerator( textAlign ) ] : [] ),
            ...( textColor ? [ `text-${ textColor }` ] : [] ),
            ...(animation ? [animationClassGenerator(animation)] : []),
            ...( effects? [ effectClassGenerator( effects ) ] : [] )
        ].join(' '),
        style: {
            ...(animation && animationStyleGenerator(animation)),
            ...(cursor?.image?.url !== '' && cursor?.image?.url !== null ? { '--cursor-image': `url('${cursor.image.url}'), auto` } : {}),
            ...(effects && effectStyleGenerator(effects))
        }
        
    } );

    return (
        <Heading
            { ...blockProps }
            headingType={ headingType }
            headingText={ headingText }
        />
    )
}

export default Save;
