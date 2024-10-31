import { useBlockProps } from '@wordpress/block-editor';

import { Button } from '/components/ui'

import { getBlockProps } from './utils';

const Save = ( props ) => {
    const {
        attributes: {
            accessibility,
            backgroundColor,
            border,
            blockType,
            effects,
            elementStates,
            gap,
            icons,
            margin,
            padding,
            rel,
            target,
            text,
            textColor,
            url,
        }
    } = props;

    const blockProps = useBlockProps.save(
        getBlockProps({
            backgroundColor,
            border,
            blockType,
            effects,
            elementStates,
            gap,
            margin,
            padding,
            textColor,
        })
    );

    return (
        <Button
            accessibility= { accessibility }
            id={ blockProps.id }
            text={ text }
            url={ url }
            target={ target }
            icons={ icons }
            rel = { rel }
            className={ blockProps.className }
            style={ blockProps.style }
        />
    )
}

export default Save
