import {registerBlockType} from "@wordpress/blocks";
import { backup as icon } from '@wordpress/icons';

import edit from "./edit";
import save from "./save";

import "./style.scss"
import "./edit.scss"

registerBlockType("savvy-blocks/counter", {
    edit,
    save,
    icon: {
        foreground: '#af5bfd',
        src: icon
    },
});