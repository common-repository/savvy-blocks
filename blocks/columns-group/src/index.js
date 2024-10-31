import { registerBlockType } from '@wordpress/blocks';
import { column as icon } from '@wordpress/icons';

import edit from './edit';
import save from './save';

import 'swiper/css/bundle';
import './style.scss'
import './edit.scss'

registerBlockType( 'savvy-blocks/columns-group' , {
    edit,
    save,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
});
