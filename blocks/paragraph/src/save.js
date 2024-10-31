import { useBlockProps } from '@wordpress/block-editor';

import { Paragraph } from '/components/ui'
import {
    effectClassGenerator,
    effectStyleGenerator,
    marginClassGenerator,
    paddingClassGenerator,
    textAlignClassGenerator,
} from '/components/editor';

const Save = ( props ) => {
    const {
        attributes: {
            effects,
            margin,
            padding,
            text,
            textAlign,
            textColor
        },
    } = props

    const blockProps = useBlockProps.save({
        className: [
            'savvy-paragraph',
            ...( effects? [ effectClassGenerator( effects ) ] : [] ),
            ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
            ...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
            ...( textColor ? [ `text-${ textColor }` ] : [] ),
            ...( textAlign ? [ textAlignClassGenerator( textAlign ) ] : [] )
        ].join(' '),
        style: {
            ...(effects && effectStyleGenerator(effects))
        }
    });

    return (
        <Paragraph
            { ...blockProps }
            text={ text }
        />
    )
}

export default Save
