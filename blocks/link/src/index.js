import {registerBlockType} from '@wordpress/blocks';
import { link as icon } from '@wordpress/icons';

import edit from './edit';
import save from './save';

import './edit.scss'
import './style.scss'

registerBlockType( 'savvy-blocks/link', {
    edit,
    save,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
} );
