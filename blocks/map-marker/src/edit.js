import { 
    useBlockProps, 
    InnerBlocks 
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

import Inspector from './inspector';

const Edit = ( props ) => {
    const {
        attributes: {
            label,
        },
        clientId
    } = props;

    const { markerType } = useSelect((select) => {
        let parent = select('core/block-editor').getBlockParents(clientId, true)[0];
        return {
            markerType: select('core/block-editor').getBlockAttributes(parent)?.markerType
        }
    })

    const ALLOWED_BLOCKS = [ 'savvy-blocks/button', 'savvy-blocks/icon' ];
    const INNER_TEMPLATE = markerType === 'pin' ? [ ['savvy-blocks/icon'] ] : [ ['savvy-blocks/button'] ];
    const blockProps = useBlockProps({
        className: 'savvy-map-marker fw-bold'
    });

    return (
        <>
            <Inspector { ...props } />
            <div { ...blockProps }>
                <div className='marker-label'>
                    { label || `Marker` }
                </div>
                <InnerBlocks
                    allowedBlocks={ ALLOWED_BLOCKS }
                    template={ INNER_TEMPLATE }
                    templateLock = 'insert'
                />
            </div>
        </>
    )
}

export default Edit
