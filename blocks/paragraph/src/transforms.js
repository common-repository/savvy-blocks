import { createBlock } from '@wordpress/blocks';

const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'savvy-blocks/heading' ],
			transform: ( { text, textAlign, textColor } ) => {
				return createBlock(
					'savvy-blocks/heading',
					{ 
						headingText : text,
						textAlign,
						textColor
					}
				);
			},
		},
	],
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content, align } ) => {
				let newAlign;
				if ( align === 'left' ) newAlign = 'start';
				if ( align === 'right' ) newAlign = 'end';
				if ( align === 'center' ) newAlign = 'center';
				return createBlock( 'savvy-blocks/paragraph', {
					text: content,
					textAlign: { _: newAlign }
				} );
			},
		},
	]
};

export default transforms;
