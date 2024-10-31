import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import { Row } from '/components/ui';

import { gapClassGenerator } from '/components/editor';
import  {
    flexAlignmentClassGenerator,
    gutterClassGenerator,
    rowColsClassGenerator,
}  from './editor/index';

const Save = (props) => {
    const {
        attributes: {
            flexAlignment,
            gap,
            gutter,
            rowColumns,
        }
    } = props;

    const blockProps = useBlockProps.save({
        className: [
            'savvy-row row',
            ...( flexAlignment ? [ flexAlignmentClassGenerator( flexAlignment ) ] : [] ),
            ...( gap ? [ gapClassGenerator( gap ) ] : [] ),
            ...( gutter ? [ gutterClassGenerator( gutter ) ] : [] ),
            ...( rowColumns ? [ rowColsClassGenerator( rowColumns ) ] : [] ),
        ].join(' '),
    });

    return (
        <Row id={ blockProps.id } className={ blockProps.className }>
            <InnerBlocks.Content />
        </Row>
    )
}

export default Save
