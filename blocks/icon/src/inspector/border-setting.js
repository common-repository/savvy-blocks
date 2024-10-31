import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';

function BorderSetting ( props ) {
    const {  
        border,
        setAttributes, 
    } = props;

    return (
        <>
            <BaseControl>
                <UnitControl
                    label={ __('Border Radius', 'savvy-blocks') }
                    labelPostion={ __('edge', 'savvy-blocks') }
                    units={[
                        { value: 'px', label: 'px', default: 0 },
                        { value: '%', label: '%', default: 0 },
                    ]}
                    value={ border?.radius }
                    onChange={ (unit) => setAttributes({ border:{ ...border,radius: unit }}) }
                />
            </BaseControl>
        </>
    )
}

export default BorderSetting;