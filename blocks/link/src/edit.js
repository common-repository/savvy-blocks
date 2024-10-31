import { __ } from '@wordpress/i18n'
import {
    InnerBlocks,
    store as blockEditorStore,
    useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

import Inspector from './inspector';

const Edit = ( props ) => {
    const {
        clientId
    } = props;

    const { hasInnerBlocks } = useSelect(
        ( select ) => {
            const { getBlock } = select( blockEditorStore );
            const block = getBlock( clientId );
            return {
                hasInnerBlocks: !! ( block && block.innerBlocks.length ),
            };
        },
        [ clientId ]
    );

    const blockProps = useBlockProps({
        className: 'savvy-link'
    });

    return (
        <>
            <Inspector { ...props }/>
            <div { ...blockProps }>
                <InnerBlocks
                    renderAppender={ hasInnerBlocks ? undefined : InnerBlocks.ButtosvlockAppender }
                />
            </div>
        </>
    )
}

export default Edit
