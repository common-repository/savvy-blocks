import { __ } from "@wordpress/i18n"
import {
    useBlockProps,
    InnerBlocks
} from "@wordpress/block-editor";
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect, dispatch } from '@wordpress/data';

import Inspector from "./inspector";

const Edit = (props) => {
    const {
        attributes: { tabPaneId, isActive },
        setAttributes,
        clientId,
        isSelected,
    } = props;

    const { isSelectedOrChild, parentBlock, blockIndex, parentBlockId, isInserted } = useSelect( ( select ) => {
        const parentBlock = select('core/block-editor').getBlockParents(clientId)[0];
        return {
            isSelectedOrChild: select('core/block-editor').hasSelectedInnerBlock(clientId),
            selectedInnerBlock: select( 'core/block-editor' ).hasSelectedInnerBlock( clientId ) ?
                select( 'core/block-editor' ).getSelectedBlockClientId() : null,
            parentBlock: parentBlock,
            parentBlockAttributes: select('core/editor').getBlockAttributes(parentBlock),
            parentBlockId: select('core/editor').getBlockAttributes(parentBlock).blockId,
            blockIndex: select('core/block-editor').getBlockIndex( clientId ),
            isInserted: select('core/block-editor').wasBlockJustInserted(clientId)
        };
    } );

    const blockProps = useBlockProps({
        className : [
            'savvy-tab',
            'tab-pane fade',
            (isSelected || isSelectedOrChild || (!wp.data.select('core/block-editor').hasSelectedInnerBlock(parentBlock) && isActive)) ? 'show' : '',
        ].join(' ')
    });
    
    useEffect(() => {
        // isInserted && parentBlockId && setAttributes({ tabPaneId: parentBlockId + '-' + blockIndex })
        setAttributes({ tabPaneId: parentBlockId + '-' + blockIndex })
    },[])

    return (
        <>
            <Inspector { ...props } />
            <div
                className={ blockProps.className }
                id={ 'tab-pane-' + tabPaneId }
                role="tabpanel"
            >
                <InnerBlocks
                    renderAppender={ InnerBlocks.ButtosvlockAppender }
                />
            </div>
        </>
    );
}

export default Edit
