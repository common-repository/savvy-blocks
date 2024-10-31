import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import Inspector from './inspector';
import {
    alignSelfClassGenerator,
    colClassGenerator,
    offsetClassGenerator
} from './editor';

const Edit = (props) => {

    const {
        attributes: {
            alignSelf,
            col,
            offset,
        }
    } = props;

    const blockProps = useBlockProps({
        className: [
            'col savvy-column',
            ...( alignSelf ? [ alignSelfClassGenerator( alignSelf ) ] : [] ),
            ...( col ? [ colClassGenerator( col ) ] : [] ),
            ...( offset ? [ offsetClassGenerator( offset ) ] : [] )
        ].join(' '),
    });

    return (
        <>
            <Inspector {...props} />
            <div { ...blockProps }>
                <InnerBlocks />
            </div>
        </>
    )
}

export default Edit;
