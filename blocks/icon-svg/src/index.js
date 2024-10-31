import { registerBlockType } from '@wordpress/blocks'
import { starFilled as icon } from '@wordpress/icons';

import Edit from "./edit";

import './edit.scss';
import './style.scss';

registerBlockType('savvy-blocks/icon-svg', {
    edit: Edit,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
})
