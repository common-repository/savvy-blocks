import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { listItem as icon } from '@wordpress/icons';
import { registerBlockType } from "@wordpress/blocks";
import { useSelect } from '@wordpress/data';
import { useEffect } from "@wordpress/element";

import { gapClassGenerator } from './editor/gap';

registerBlockType( 'savvy-blocks/list-item', {
	title: __( 'List Item', 'savvy-blocks' ),
	icon: {
		foreground: '#af5bfd',
		src: icon
	},
	parent: [ 'savvy-blocks/list' ],
	category: 'savvy-blocks',
	attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'li'
        },
		gap: {
			"type": "object"
		},
		flexAlignment: {
			type: 'string',
			default: 'start',
		},
    },
	supports: {
		remove: false,
		lock: false,
		toolbar: false,
	},
    keywords: [
		__( 'List Items', 'savvy-blocks' ),
	],

	deprecated: [
        {
            attributes: {
				content: {
					type: 'array',
					source: 'children',
					selector: 'li'
				},
			},

            save( ) {
				const blockProps = useBlockProps.save({
					className: 'savvy-list-item'
				});
		
				return (
					<li { ...blockProps }>
						<InnerBlocks.Content />
					</li>
				);            
			},
        },
		{
			attributes: {
				content: {
					type: 'array',
					source: 'children',
					selector: 'li'
				},
				gap: {
					"type": "object"
				},
				flexAlignment: {
					type: 'string',
					default: 'start',
				},
			},

            save( ) {
				const {
					attributes: {
						flexAlignment,
						gap
					}
				} = props;
		
				const blockProps = useBlockProps.save({
					className: [
						'savvy-list-item flex-row ps-0',
						'align-items-' + (flexAlignment || 'start'),
						...( gap ? [ gapClassGenerator( gap ) ] : [] ),
					].join( ' ' )
				});
		
				return (
					<li { ...blockProps }>
						<div><InnerBlocks.Content /></div>
					</li>
				);        
			},
		}
    ],
	edit: (props) => {
		const {
			attributes: {
				flexAlignment,
				gap
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
		})

		useEffect(() => {
			parentAttributes?.bullet?.flexAlignment && parentAttributes?.bullet?.flexAlignment !== flexAlignment && setAttributes( { flexAlignment:  parentAttributes?.bullet?.flexAlignment })
			parentAttributes?.bullet?.gap && JSON.stringify(parentAttributes?.bullet?.gap) !== JSON.stringify(gap) && setAttributes({ gap: parentAttributes?.bullet?.gap });

		}, [parentAttributes]);

        const blockProps = useBlockProps({
			className: [
				'savvy-list-item flex-row ps-0',
				'align-items-' + (flexAlignment || 'start'),
				...( gap ? [ gapClassGenerator( gap ) ] : [] ),
			].join( ' ' )
		});

			return (
				<li { ...blockProps }>
					<div><InnerBlocks /></div>
				</li>
			);

	},

	save: (props) => {
		const {
			attributes: {
				flexAlignment,
				gap
			}
		} = props;

		const blockProps = useBlockProps.save({
			className: [
				'savvy-list-item flex-row ps-0',
				'align-items-' + (flexAlignment || 'start'),
				...( gap ? [ gapClassGenerator( gap ) ] : [] ),
			].join( ' ' )
		});

		return (
			<li { ...blockProps }>
            	<div><InnerBlocks.Content /></div>
			</li>
		);
	},
} );
