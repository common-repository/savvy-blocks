import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps
} from '@wordpress/block-editor';

import {
    BaseControl,
    Panel,
    PanelBody,
    __experimentalDivider as Divider,
} from '@wordpress/components';

import { page as icon } from '@wordpress/icons';

import {
	FlexAlignment,
	flexAlignmentClassGenerator,
	Color,
	DisplayTypeTabs
} from '/components/editor';

import {
	colClassGenerator,
	offsetClassGenerator
} from '/blocks/column/src/editor';

import { SpacingSetting } from '../src/inspector/index';

registerBlockType( 'savvy-blocks/column-content', {
	apiVersion: 2,
	title: __( 'Column Content' ),
	icon: {
		foreground: '#af5bfd',
		src: icon
	},
	parent: [ 'savvy-blocks/two-part-section' ],
	category: 'savvy-blocks',
	attributes: {
		backgroundColor: {
			'type': 'string'
		},
		col: {
			type: 'object'
		},
		flexAlignment: {
			type: 'object'
		},
		offset: {
			type: 'object'
		},
		textColor: {
			'type': 'string'
		},
	},
	supports: {
		remove: false,
		lock: false,
		toolbar: false,
		inserter: false,
	},
    keywords: [
		__( 'Column Content' ),
	],

	edit: ( props ) => {
        const {
			attributes: {
				backgroundColor,
				col,
				flexAlignment,
				offset,
				textColor
			},
			setAttributes
		} = props;

		const blockProps = useBlockProps({
			className: [
				'savvy-column-content col d-flex flex-column',
				...( col ? [ colClassGenerator( calculateCol( col, offset ) ) ] : [] ),
				...( backgroundColor ? [ `bg-${ backgroundColor }` ] : [] ),
				...( flexAlignment ? [ flexAlignmentClassGenerator( flexAlignment ) ] : [] ),
				...( offset ? [ offsetClassGenerator( offset ) ] : [] ),
				...( textColor ? [ `text-${ textColor }` ] : [] )
			].join( ' ' )
		});

		return (
            <>
                <InspectorControls>
					<Panel>
						<PanelBody title={ __( 'Alignment', 'savvy-blocks' ) } initialOpen={ false }>
							<DisplayTypeTabs>
								<FlexAlignment
									value={ flexAlignment }
									onChange={ ( value ) => { setAttributes( { flexAlignment: value } ) } }
								/>
							</DisplayTypeTabs>
						</PanelBody>
						<PanelBody title={ __( 'Color', 'savvy-blocks' ) } initialOpen={ false }>
							<BaseControl
								label= {__( 'Background Color', 'savvy-blocks' )}
							>
								<Color
									value={ backgroundColor }
									onChange={ ( value ) => { setAttributes( { backgroundColor: value.slug } ) } }
								/>
							</BaseControl>
							<Divider />
							<BaseControl
								label={__( 'Text Color', 'savvy-blocks' )}
							>
								<Color
									value={ textColor }
									onChange={ ( value ) => { setAttributes( { textColor: value.slug } ) } }
								/>
							</BaseControl>
						</PanelBody>
					</Panel>
					<Panel>
						<PanelBody title={ __('Spacing', 'savvy-blocks') } initialOpen={ false } >
							<SpacingSetting
								offset={ offset }
								maxSpace = { col }
								setAttributes={ setAttributes }
							/>
						</PanelBody>
					</Panel>
                </InspectorControls>
                <div { ...blockProps }>
                    <InnerBlocks />
                </div>
            </>
		);
	},

	save: ( props ) => {
        const {
        	attributes: {
				backgroundColor,
				col,
				flexAlignment,
				offset,
				textColor
			}
		} = props;

		const blockProps = useBlockProps.save({
			className: [
				'savvy-column-content col d-flex flex-column',
				...( col ? [ colClassGenerator( calculateCol( col, offset ) ) ] : [] ),
				...( backgroundColor ? [ `bg-${ backgroundColor }` ] : [] ),
				...( flexAlignment ? [ flexAlignmentClassGenerator( flexAlignment ) ] : [] ),
				...( offset ? [ offsetClassGenerator( offset ) ] : [] ),
				...( textColor ? [ `text-${ textColor }` ] : [] )
			].join( ' ' )
		});

		return (
            <div { ...blockProps }>
            	<InnerBlocks.Content />
			</div>
		);
	},
} );

function calculateCol( col , offset ){
	let newCol = {}

	if (offset === undefined ) {
		newCol = { ...col }
	} else {
		for( const item in col ) {
			newCol[item] = col[item] - Number(offset[item]);
		}
	}

	return newCol;
}
