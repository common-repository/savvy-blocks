import { registerBlockType } from '@wordpress/blocks';
import { mapMarker as icon } from '@wordpress/icons';

import edit from './edit';
import save from './save';

import './style.scss'
import './edit.scss'

registerBlockType('savvy-blocks/map-marker', {
    edit,
    save,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
    parent: ['savvy-blocks/map']
});
