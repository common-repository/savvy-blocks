import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import save from './save';

import './style.scss'
import './edit.scss'

registerBlockType( 'savvy-blocks/tab' , {
    edit,
    save,
    icon: {
        foreground: '#af5bfd',
        src: 'welcome-add-page'
    },
    parent: ['savvy-blocks/tabs'],
});
