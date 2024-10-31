import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    RangeControl,
} from '@wordpress/components';

function IconSetting ( props ) {
    const {  
        size,
        setAttributes, 
    } = props;

    return (
        <>
            <BaseControl>
                <RangeControl
                    label={ __('Size', 'savvy-blocks') }
                    value={ size }
                    onChange={ (value) => setAttributes({ size: value }) }
                    min={ 16 }
                    max={ 256 }
                />
            </BaseControl>
        </>
    )
}

export default IconSetting;