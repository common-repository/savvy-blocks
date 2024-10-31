import { registerBlockType } from '@wordpress/blocks';
import { paragraph as icon } from '@wordpress/icons';

import edit from './edit';
import save from './save';
import transforms from './transforms';

import './style.scss'
import './edit.scss'

registerBlockType( 'savvy-blocks/paragraph', {
    edit,
    save,
    transforms,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
} );
