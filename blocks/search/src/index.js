import { registerBlockType } from '@wordpress/blocks';
import { search as icon } from '@wordpress/icons';

import edit from './edit';

import './style.scss'
import './edit.scss'

registerBlockType( 'savvy-blocks/search', {
    edit,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
} );
