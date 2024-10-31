import {
    useBlockProps,
    InnerBlocks
} from '@wordpress/block-editor';

import { Row } from '/components/ui'
import { reverseClassGenerator } from "./inspector/general-setting";

const Save = (props) => {
    const {
        attributes: {
            colsLayout,
            reverse
        },
    } = props

    const blockProps = useBlockProps.save({
        className: [
            `savvy-two-part-section row row-cols-1 row-cols-lg-2`,
            ...( reverse && colsLayout ? [ reverseClassGenerator(reverse, colsLayout) ] : [] ),
        ].join(' '),
    });

    return (
        <Row id={ blockProps.id } className={ blockProps.className }>
            <InnerBlocks.Content />
        </Row>
    )
}

export default Save
