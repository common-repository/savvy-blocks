import { registerBlockType } from '@wordpress/blocks';
import { image as icon } from '@wordpress/icons';
import deprecated from './deprecated';

import edit from './edit';
import save from './save';

import './style.scss'
import './edit.scss'

registerBlockType('savvy-blocks/image', {
    edit,
    save,
    deprecated,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
});
