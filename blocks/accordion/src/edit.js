import { __ } from '@wordpress/i18n';
import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

import {
    useEffect
} from '@wordpress/element';

import Inspector from './inspector';

import './accordion-item';

const Edit = (props) => {
    const {
        attributes: {
            blockId,
        },
        setAttributes,
        clientId,
    } = props;

    const { wasBlockJustInserted } = useSelect("core/block-editor");

    useEffect( () => {
        const currentBlock = wp.data.select( 'core/block-editor' ).getBlock(clientId);
        if ( currentBlock ){
            wasBlockJustInserted(clientId) && setAttributes( { blockId: clientId } )
        }
    }, [] );

    const MY_TEMPLATE = [['savvy-blocks/accordion-item']];
    const ALLOWED_BLOCKS = ['savvy-blocks/accordion-item'];

    const blockProps = useBlockProps({
        className: [
            'accordion accordion-flush row w-100 m-0',
        ].join(' '),
    });

    return (
        <>
            <Inspector {...props} />
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

export default Edit;
