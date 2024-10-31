import { registerBlockType } from '@wordpress/blocks';
import { heading as icon } from '@wordpress/icons';

import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';

import './style.scss'
import './edit.scss'

registerBlockType( 'savvy-blocks/heading', {
    edit,
    save,
    deprecated,
    transforms,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
});
