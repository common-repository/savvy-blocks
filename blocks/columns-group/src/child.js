import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEffect } from "@wordpress/element";

registerBlockType( 'savvy-blocks/column-child', {

	title: __( 'Column Child' ),
	icon: {
		foreground: '#af5bfd',
		src: 'welcome-add-page'
	},
	parent: [ 'savvy-blocks/columns-group' ],
	category: 'savvy-blocks',
	attributes: {
		column: {
			type: 'object'
		},
    },
	keywords: [
		__( 'column' ),
	],

	edit: ( props ) => {

		const {
			attributes: {
				column
			},
			setAttributes,
			clientId
		} = props;

		const { parentAttributes } = useSelect((select) => {
			let parent = select('core/block-editor').getBlockParents(clientId, true)[0];
			const parentAttributes = select('core/block-editor').getBlockAttributes(parent);
			return {
				isInserted: select('core/block-editor').wasBlockJustInserted(clientId),
				parentAttributes: parentAttributes
			}
		});

		useEffect(() => {
			if (parentAttributes) {
				const colData = {};
		
				for (const breakpoint in parentAttributes.columnGroup) {
					if (parentAttributes.columnGroup[breakpoint].col !== undefined) {
						const colValue = parentAttributes.columnGroup[breakpoint].col;
						colData[breakpoint] = colValue;
					}
				}
				if ( colData && JSON.stringify(colData) !== JSON.stringify(column)) {
					setAttributes({
						column: colData
					});
				}
			}
		}, [parentAttributes]);
		
		let colClassName = '';
		for (const breakpoint in column) {
			if (column.hasOwnProperty(breakpoint)) {
				if ( breakpoint === '_'){
					colClassName += `col-${column[breakpoint]} `;
				} else {
					colClassName += `col-${breakpoint}-${column[breakpoint]} `;
				}
			}
		}

		const blockProps = useBlockProps();

		// const blockProps = useBlockProps({
		// 	className: [
		// 		colClassName.trim()
		// 	].join( ' ' )
		// });

		return (
			<div { ...blockProps }>
				<InnerBlocks
					templateLock={ false }
					templateInsertUpdatesSelection={ true }
				/>
			</div>
		);
	},

	save: ( props ) => {

		const {
			attributes: {
				column
			},
		} = props;

		let colClassName = '';
		for (const breakpoint in column) {
			if (  column.hasOwnProperty(breakpoint) && column[breakpoint] ) {
				if ( breakpoint === '_'){
					colClassName += `col-${column[breakpoint]} `;
				} else {
					colClassName += `col-${breakpoint}-${column[breakpoint]} `;
				}
			}
		}
		
		return (
			<div className={ `swiper-slide ${colClassName}` }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

