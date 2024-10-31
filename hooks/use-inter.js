/**
 * WordPress dependencies
 */
import { useRefEffect } from '@wordpress/compose';
import { ENTER } from '@wordpress/keycodes';
import { useSelect, useDispatch, useRegistry } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { hasBlockSupport, createBlock } from '@wordpress/blocks';

export function useOnEnter( props ) {
	const { batch } = useRegistry();
	const {
		moveBlocksToPosition,
		replaceInnerBlocks,
		duplicateBlocks,
		insertBlock,
	} = useDispatch( blockEditorStore );
	const {
		getBlockRootClientId,
		getBlockIndex,
		getBlockOrder,
		getBlockName,
		getBlock,
		getNextBlockClientId,
	} = useSelect( blockEditorStore );

	return useRefEffect( ( element ) => {
		function onKeyDown( event ) {
			if ( event.defaultPrevented ) {
				return;
			}

			if ( event.keyCode !== ENTER ) {
				return;
			}

			const { content, clientId } = props;

			// The paragraph should be empty.
			if ( content.length ) {
				return;
			}

			const wrapperClientId = getBlockRootClientId( clientId );

			if (
				! hasBlockSupport(
					getBlockName( wrapperClientId ),
					'__experimentalOnEnter',
					false
				)
			) {
				return;
			}

			const order = getBlockOrder( wrapperClientId );

			event.preventDefault();

			const position = order.indexOf( clientId );

			// If it is the last block, exit.
			if ( position === order.length - 1 ) {
				moveBlocksToPosition(
					[ clientId ],
					wrapperClientId,
					getBlockRootClientId( wrapperClientId ),
					getBlockIndex( wrapperClientId ) + 1
				);
				return;
			}

			// If it is in the middle, split the block in two.
			const wrapperBlock = getBlock( wrapperClientId );
			const blockName = wp.data.select( 'core/block-editor' ).getBlock(clientId).name;
			batch( () => {
				duplicateBlocks( [ wrapperClientId ] );
				const blockIndex = getBlockIndex( wrapperClientId );

				replaceInnerBlocks(
					wrapperClientId,
					wrapperBlock.innerBlocks.slice( 0, position )
				);
				replaceInnerBlocks(
					getNextBlockClientId( wrapperClientId ),
					wrapperBlock.innerBlocks.slice( position + 1 )
				);
				insertBlock(
					createBlock( blockName ),
					blockIndex + 1,
					getBlockRootClientId( wrapperClientId ),
					true
				);
			} );
		}

		element.addEventListener( 'keydown', onKeyDown );
		return () => {
			element.removeEventListener( 'keydown', onKeyDown );
		};
	}, [] );
}
