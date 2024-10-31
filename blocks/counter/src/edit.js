import {
    useBlockProps
} from "@wordpress/block-editor";


import { useDefault } from '/utils/settings';
import Inspector from './inspector';
import {
    marginClassGenerator,
    paddingClassGenerator,
    textAlignClassGenerator
} from '/components/editor';

const Edit = (props) => {
    const {
        attributes: {
            endVal,
            prefix,
            suffix,
            size,
            weight,
            margin,
            padding,
            textAlign,
            textColor
        },
        setAttributes,
        clientId
    } = props;

    useDefault(clientId, setAttributes)
    const blockProps = useBlockProps({
        className: [
            ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
            ...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
            ...( textColor ? [ `text-${ textColor }` ] : [] ),
            ...( textAlign ? [ textAlignClassGenerator( textAlign ) ] : [] )
        ].join(' '),
        style: { fontSize: size, fontWeight: weight }
    });

    return (
        <>
            <Inspector { ...props }/>
            <div {...blockProps}>
                <div>{ prefix }{ endVal }{ suffix }</div>
            </div>
        </>
    )
}
export default Edit
