import { registerBlockType } from "@wordpress/blocks";
import { media as icon } from '@wordpress/icons';

import edit from "./edit";
import save from "./save";
import deprecated from './deprecated';

import 'video.js/dist/video-js.min.css';
import "./style.scss"
import "./edit.scss"

registerBlockType("savvy-blocks/media", {
    edit,
    save,
    deprecated,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
});
