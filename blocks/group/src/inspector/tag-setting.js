import { __ } from '@wordpress/i18n';
import { SelectControl} from '@wordpress/components';

const TagSetting = ( props ) => {
    const {
        tagName,
        setAttributes,
    } = props;

    const TAG_NAME_OPTIONS = [
        { label: __( 'Aside' ), value: 'aside' },
        { label: __( 'Article' ), value: 'article' },
        { label: __( 'Div' ), value: 'div' },
        { label: __( 'Section' ), value: 'section' },
    ];

    return (
        <>
            <SelectControl
                options={ TAG_NAME_OPTIONS }
                onChange={ ( value ) => { setAttributes( { tagName: value } ) } }
                value={ tagName }
            />
        </>
    )
}

export {
    TagSetting as default,
};