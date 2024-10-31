import { __ } from '@wordpress/i18n';
import { 
    TextControl,
    __experimentalDivider as Divider
} from '@wordpress/components';
const Accessibility = (props) => {
    const {
        fields = [],
        value: accessibility,
        onChange
    } = props

    return (
        <>
            {
                fields.map((fieldName) => {
                    return (
                        <TextControl
                            label={ __(`ARIA ${fieldName}`, 'savvy-blocks') }
                            value={ accessibility?.[fieldName] }
                            onChange={ (value) => onChange({ fieldValue: value, fieldName }) }
                        />
                    )
                })
            }
        </>
    )

}

const accessibilityAttrGenerator = ( accessibility ) => {
    const cssVariables = {};
    for (const fieldName in accessibility) {
        const fieldValue = accessibility[fieldName];

        if (fieldValue) {
            const variableName = `aria-${fieldName}`;
            cssVariables[variableName] = fieldValue
        }
    }
    return cssVariables;
};

export {
    Accessibility as default,
    accessibilityAttrGenerator
};