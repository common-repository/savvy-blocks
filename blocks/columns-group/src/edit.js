import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
    useEffect
} from '@wordpress/element';

import Inspector from './inspector';
import './child';

const Edit = (props) => {
    const {
        attributes: {
            columnGroup,
            blockId
        },
        setAttributes,
        clientId,
    } = props;

    const { wasBlockJustInserted } = useSelect("core/block-editor");

    useEffect( () => { 
        wasBlockJustInserted(clientId) && setAttributes( { blockId: clientId } )
    }, [] );

    const MY_TEMPLATE = [['savvy-blocks/column-child']];
    const ALLOWED_BLOCKS = ['savvy-blocks/column-child'];

    const blockProps = useBlockProps({
        className: [
            'savvy-columns-group',
        ].join(' '),
    } );

    return (
        <>
            <Inspector { ...props } />
            <div { ...blockProps }>
                <InnerBlocks
                    allowedBlocks={ ALLOWED_BLOCKS }
                    template={ MY_TEMPLATE }
                    templateInsertUpdatesSelection={ true }
                />
            </div>
        </>
    )
}

export default Edit
