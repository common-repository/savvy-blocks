import { registerBlockType } from '@wordpress/blocks';
import { mediaAndText as icon } from '@wordpress/icons';
import edit from './edit';
import save from './save';

import './style.scss'
import './edit.scss'

registerBlockType( 'savvy-blocks/two-part-section', {
    edit,
    save,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
});
