import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/heading' ],
			transform: ( { level, content, textAlign } ) => {
				let newAlign;
				if ( textAlign === 'left' ) newAlign = 'start';
				if ( textAlign === 'right' ) newAlign = 'end';
				if ( textAlign === 'center' ) newAlign = 'center';
				return createBlock( 'savvy-blocks/heading', {
					headingType: `h${level}`,
					headingText: content,
					textAlign: { _: newAlign }
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'savvy-blocks/paragraph' ],
			transform: ( { headingText, textAlign, textColor } ) => {
				return createBlock( 'savvy-blocks/paragraph', {
					text : headingText,
					textAlign,
					textColor
				} )
			},
		}
	],
};

export default transforms;
