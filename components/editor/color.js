import { useSetting } from '@wordpress/block-editor';
import { ColorPalette } from '@wordpress/components';
import {
    getColorObjectByColorValue,
    getColorObjectByAttributeValues,
} from '@wordpress/block-editor';

import { mergeArrOfObj } from '/utils';

const Color = (props) => {
    const {
        value: color,
        onChange
    } = props;

    const paletteColors = []
    const themePalette = useSetting('color.palette.theme') || [];
    const userPalette = useSetting('color.palette.custom') || [];
    const allColors = mergeArrOfObj(userPalette, themePalette);

    themePalette.length > 0 && paletteColors.push(
        {
            "name": "Theme",
            "colors": themePalette
        }
    )
    
    userPalette.length > 0 && paletteColors.push(
        {
            "name": "Custom",
            "colors": userPalette
        }
    )
    
    return (
        <ColorPalette
            colors={paletteColors}
            disableCustomColors={true}
            clearable={ false }
            value={ getColorObjectByAttributeValues(allColors, color).color }
            onChange={ (color) => {
                onChange(color ? getColorObjectByColorValue(allColors, color) : '') }
            }
        />
    )
}

export {
    Color as default
};
