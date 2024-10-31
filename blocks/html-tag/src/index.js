import { registerBlockType } from '@wordpress/blocks';
import { code as icon } from '@wordpress/icons';

import edit from './edit';
import save from './save';

import './edit.scss'
import './style.scss'

registerBlockType( 'savvy-blocks/html-tag', {
    edit,
    save,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
});
