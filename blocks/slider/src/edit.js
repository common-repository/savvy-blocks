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
            slider,
            blockId
        },
        setAttributes,
        clientId,
    } = props;

    // console.log(props.attributes);

    const { wasBlockJustInserted } = useSelect("core/block-editor");

    useEffect( () => { 
        wasBlockJustInserted(clientId) && setAttributes( { blockId: clientId } )
    }, [] );

    const MY_TEMPLATE = [['savvy-blocks/slider-child']];
    const ALLOWED_BLOCKS = ['savvy-blocks/slider-child'];

    const blockProps = useBlockProps({
        className: [
            'savvy-slider',
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
