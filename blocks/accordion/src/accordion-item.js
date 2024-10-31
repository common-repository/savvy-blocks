import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect, select } from '@wordpress/data';
import { useEffect } from "@wordpress/element";
import { TextControl, Panel, PanelBody } from '@wordpress/components';
import {
    paddingClassGenerator,
} from '/components/editor';

import { Icon } from '/components/ui'

registerBlockType( 'savvy-blocks/accordion-item', {

	title: __( 'Accordion Item' ),
	icon: {
		foreground: '#af5bfd',
		src: 'welcome-add-page'
	},
	parent: [ 'savvy-blocks/accordion' ],
	category: 'savvy-blocks',
	attributes: {
		itemId: {
			type: 'string',
		},
		icons : {
			type : 'object',
			default: {
				expanded: '',
				collapsed: ''
			}
		},
		level: {
			type: 'string',
		},
		parentId: {
			type: 'string',
		},
		padding: {
			type: 'object'
		},
		title: {
			type: 'string',
		},
		textColor: {
			type: 'string'
		},
		minHeight: {
			type: 'string'
		},
		expanded: {
			type: "boolean",
			default: false
		}
    },
	keywords: [
		__( 'Accordion Item' ),
	],

	edit: ( props ) => {

		const MY_TEMPLATE = [['savvy-blocks/paragraph']];

		const {
			attributes: {
				itemId,
				icons,
				level,
				minHeight,
				parentId,
				padding,
				title,
				textColor,
			},
			setAttributes,
			clientId,
		} = props;

		const { parentAttributes } = useSelect((select) => {
			let parent = select('core/block-editor').getBlockParents(clientId, true)[0];
			const parentAttributes = select('core/block-editor').getBlockAttributes(parent);

			return {
				isInserted: select('core/block-editor').wasBlockJustInserted(clientId),
				parentAttributes: parentAttributes,
			};
		});

		const { wasBlockJustInserted } = useSelect("core/block-editor");

		useEffect(() => {
			parentAttributes.icons && JSON.stringify(parentAttributes.icons) !== JSON.stringify(icons) && setAttributes({ icons: parentAttributes.icons });
			parentAttributes?.level && parentAttributes?.level !== level && setAttributes( { level:  parentAttributes?.level })
			parentAttributes.padding && JSON.stringify(parentAttributes.padding) !== JSON.stringify(padding) && setAttributes({ padding: parentAttributes.padding });
			parentAttributes?.parentId && parentAttributes?.parentId !== parentId && setAttributes( { parentId:  parentAttributes?.parentId })
			parentAttributes?.textColor && parentAttributes?.textColor !== textColor && setAttributes( { textColor:  parentAttributes?.textColor })
			parentAttributes?.minHeight && parentAttributes?.minHeight !== minHeight && setAttributes( { minHeight:  parentAttributes?.minHeight })

			wasBlockJustInserted(clientId) && setAttributes({ itemId: clientId })
		}, [parentAttributes]);

		const blockProps = useBlockProps();

		return (
			<div { ...blockProps }>
				<InspectorControls>
					<Panel>
						<PanelBody>
							<TextControl
								label={ __('Accordion Title', 'savvy-blocks') }
								value={ title }
								onChange={ ( value ) => setAttributes( { title: value } ) }
							/>
						</PanelBody>
					</Panel>
				</InspectorControls>
				{ itemId !== undefined &&
					<>
						{
							React.createElement(level, { className: `accordion-edit-title text-${ textColor }` }, title)
						}
						<div className={ `text-${ textColor }` } style={ { minHeight : minHeight} }>
							<InnerBlocks
								template={ MY_TEMPLATE }
								templateLock={ false }
								templateInsertUpdatesSelection={ true }
							/>
						</div>
					</>
				}
			</div>
		);
	},

	save: ( props ) => {

		const {
			attributes: {
				itemId,
				icons,
				level,
				minHeight,
				parentId,
				padding,
				title,
				textColor,
				expanded
			},
		} = props;

		const blockProps = useBlockProps.save({
			className: 'accordion-item',
		});

		const paddingClass =  [
			...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
		].join(' ');

		return (
			<div {...blockProps}>
				{
					React.createElement(level, { className: `accordion-header` },
						<>
							<button className={`accordion-button collapsed ${paddingClass} text-${ textColor }`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-${itemId}`} aria-expanded={expanded} aria-controls={`flush-${itemId}`}>
								{title}
								<div className='icons'>
									<span className='savvy-btn-icon icon-collapsed'>
										<Icon icon={ {name: icons.collapsed, type: 'font'} }/>
									</span>
									<span className='savvy-btn-icon icon-expanded'>
										<Icon icon={ {name: icons.expanded, type: 'font'} }/>
									</span>
								</div>
							</button>
						</>
					)
				}
				<div id={ `flush-${ itemId }` } className={`accordion-collapse position-relative collapse ${expanded ? 'show' : ''}`} data-bs-parent={ `#accordion${ parentId }` } >
					<div className={ `accordion-body text-${ textColor }` } style={ { minHeight : minHeight } }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );

