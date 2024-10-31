import { registerBlockType } from '@wordpress/blocks';
import { group as icon } from '@wordpress/icons';

import edit from './edit';
import save from './save';

import './style.scss'
import './edit.scss'

registerBlockType( 'savvy-blocks/group' , {
    edit,
    save,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
});
