import { useBlockProps } from '@wordpress/block-editor';

import { Controls } from '/components/editor';
import {useDefault} from '/utils/settings';
import { getBlockProps } from './utils';
import Inspector from './inspector';
import Button from './edit/button'

const Edit = ( props ) => {
    const {
        attributes : {
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
        },
        attributes,
        setAttributes,
        clientId,
    } = props;

    useDefault(clientId, setAttributes)
    const blockProps = useBlockProps(         
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
        <>
            <Inspector { ...props } />
            {/* <Controls { ...props } /> */}
            <Controls  name = {props.name} setAttributes = { setAttributes } attributes={(({text, url, blockType, ...others}) => ({...others}))(attributes)} />
            <Button
                accessibility= { accessibility }
                text = { text }
                target = { target }
                icons = { icons }
                rel = { rel }
                textHandler = { ( value ) => setAttributes( { text: value } ) }
                blockProps = { blockProps }
            />
        </>
    )
}

export default Edit
