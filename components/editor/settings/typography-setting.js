import { __ } from '@wordpress/i18n';
import { 
    BaseControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

import { 
    Color,
    DisplayTypeTabs,
    TextAlign
} from '/components/editor';


function TypographySetting ( props ) {
    const { 
        textAlign,
        textColor, 
        setAttributes,
    } = props;

    return (
        <>
        {
            props.hasOwnProperty('textColor') &&

                <BaseControl label={ __('Text Color', 'savvy-blocks') }>
                    <Color
                        value={ textColor }
                        onChange={ ( color ) => { setAttributes( { textColor: color.slug } ) } }
                    />
                </BaseControl>

        }
        {
            props.hasOwnProperty('textAlign') &&

                <BaseControl label={ __('Text Align', 'savvy-blocks') }>
                    <DisplayTypeTabs>
                        <TextAlign
                            value={ textAlign }
                            onChange={ ( value ) => { setAttributes( { textAlign: value } ) } }
                        />
                    </DisplayTypeTabs>
                </BaseControl>

        }
        </>
    )
}

export default TypographySetting;