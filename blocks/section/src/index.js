import { registerBlockType } from '@wordpress/blocks';
import { stretchWide as icon } from '@wordpress/icons';

import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import './style.scss'
import './edit.scss'

registerBlockType( 'savvy-blocks/section' , {
    edit,
    save,
    deprecated,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
});
