import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import {
    marginClassGenerator,
    paddingClassGenerator,
    textAlignClassGenerator,
} from '/components/editor';
const Save = (props) => {
    const {
        attributes: {
            endVal,
            startVal,
            separator,
            prefix,
            suffix,
            duration,
            size,
            weight,
            margin,
            padding,
            textAlign,
            textColor
        },
    } = props

    const blockProps = useBlockProps.save({
        className: [
            ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
            ...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
            ...( textColor ? [ `text-${ textColor }` ] : [] ),
            ...( textAlign ? [ textAlignClassGenerator( textAlign ) ] : [] )
        ].join(' '),
        style: { fontSize: size, fontWeight: weight }
    });

    return (
        <div {...blockProps}>
            <div
                class="Savvy-counter"
                data-separator={ separator }
                data-prefix={ prefix }
                data-suffix={ suffix }
                data-duration={ duration }
                data-start-val={ startVal }
                data-end-val={ endVal }>
                { endVal }
            </div>
        </div>
    )
}

export default Save
