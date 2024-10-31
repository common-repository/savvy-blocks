import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEffect } from "@wordpress/element";

import {
	sliderHeightClassGenerator,
} from './editor/index';

registerBlockType('savvy-blocks/slider-child', {

	title: __('Slider Child'),
	icon: {
		foreground: '#af5bfd',
		src: 'welcome-add-page'
	},
	parent: ['savvy-blocks/slider'],
	category: 'savvy-blocks',
	attributes: {
		slideHeight: {
			type: 'object'
		},
	},
	keywords: [
		__('slider'),
	],

	edit: (props) => {

		const {
			attributes: {
				slideHeight
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
			if ( parentAttributes ) {
				parentAttributes?.swiperHeight?.height && JSON.stringify(parentAttributes?.swiperHeight?.height) !== JSON.stringify(slideHeight) && (
					setAttributes({
						slideHeight: parentAttributes?.swiperHeight?.height
					})
				)
			}
		}, [parentAttributes]);

		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<InnerBlocks
					templateLock={false}
					templateInsertUpdatesSelection={true}
				/>
			</div>
		);
	},

	save: (props) => {

		const {
			attributes: {
				slideHeight
			},
		} = props;

		//Height
		const sliderHeight = [
			...(slideHeight ? [sliderHeightClassGenerator(slideHeight)] : []),
		].join(' ');

		return (
			<div className={`swiper-slide`}>
				<div className='savvy-responsive-height overflow-hidden' style={`${sliderHeight}`}>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});

