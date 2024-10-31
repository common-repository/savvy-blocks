
const { __ } = wp.i18n;
import { useState, useEffect } from '@wordpress/element';
const { BlockControls } = wp.blockEditor;
const { 
	Button, 
	DropdownMenu, 
	Flex,
	MenuGroup, 
	MenuItem, 
	TextControl, 
	ToolbarGroup, 
	Modal
} = wp.components;
import apiFetch from '@wordpress/api-fetch';

const Controls = (props) => {
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	const [ textvalue, setTextValue ] = useState( 'primary' );
	const { setAttributes, attributes, name } = props;	

	const addBlockType = () => {
		const blockTypeData = {
			blockName: name,
			blockTypeName: textvalue,
			attributes,
		}

		apiFetch( {
			path: '/savvy/v1/block-type/add',
			method: 'POST',
			data: blockTypeData,
		} ).then( ( res ) => {
			setAttributes({ ...attributes, blockType : textvalue })
		});
	}

	// const removeBlockType = () => {
	// 	const blockType = {
	// 		blockName: props.name,
	// 		blockTypeName: textvalue,
	// 		attributes: props.attributes
	// 	}

	// 	apiFetch( {
	// 		path: '/savvy/v1/block-type/remove',
	// 		method: 'POST',
	// 		data: blockType,
	// 	} ).then( ( res ) => {
	// 		console.log( res );
	// 	});
	// }

	return (
		<BlockControls group="other">
			<ToolbarGroup>
				<DropdownMenu
					icon={<span>{__('Block Template', 'savvy-blocks')}</span>}
					label={__('Switch Theme', 'savvy-blocks')}
				>
					{({ onClose }) => (
						<MenuGroup>
								<MenuItem
									icon={'yes'}
									onClick={() => {
										setOpen( true )
										onClose();
									}}
								>
									{__('Add', 'savvy-blocks')}
								</MenuItem>
						</MenuGroup>
					)}
				</DropdownMenu>
			</ToolbarGroup>
			{ isOpen && (
				<Modal title={__('Block Template', 'savvy-blocks')} onRequestClose={ closeModal }>
					<TextControl
						label={__('Block Template Name', 'savvy-blocks')}
						value={ textvalue }
						onChange={ ( value ) => setTextValue( value ) }
					/>
					<Flex justify="end">
						<Button variant="primary" onClick={ () => { addBlockType(); setOpen( false ); } }>
							{__('Create', 'savvy-blocks')}
						</Button>
						<Button variant="secondary" onClick={ () => { removeBlockType(); setOpen( false ); } }> 
							{__('Cancel', 'savvy-blocks')}
						</Button>
					</Flex>
				</Modal>
			) }
		</BlockControls>
	);
};

export default Controls;