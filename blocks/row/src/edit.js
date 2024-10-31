import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import Inspector from './inspector';

import { gapClassGenerator } from '/components/editor';
import  { 
    flexAlignmentClassGenerator,
    gutterClassGenerator,
    rowColsClassGenerator, 
}  from './editor/index';

const Edit = (props) => {
    const INNER_TEMPLATE = [[ 'savvy-blocks/column' ]];
    const ALLOWED_BLOCKS = [ 'savvy-blocks/column' ];

    const {
        attributes: {
            flexAlignment,
            gap,
            gutter,
            rowColumns,
        }
    } = props;

    const blockProps = useBlockProps({
        className: [
            'savvy-row row',
            ...( flexAlignment ? [ flexAlignmentClassGenerator( flexAlignment ) ] : [] ),
            ...( gap ? [ gapClassGenerator( gap ) ] : [] ),
            ...( gutter ? [ gutterClassGenerator( gutter ) ] : [] ),
            ...( rowColumns ? [ rowColsClassGenerator( rowColumns ) ] : [] ),
        ].join(' '),
    });

    return (
        <>
            <Inspector { ...props } />
            <div { ...blockProps }>
                <InnerBlocks
                    allowedBlocks={ ALLOWED_BLOCKS }
                    template={ INNER_TEMPLATE }
                    templateInsertUpdatesSelection={ true }
                />
            </div>
        </>
    )
}

export default Edit
