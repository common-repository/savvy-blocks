import { __ } from '@wordpress/i18n';

import {
    BaseControl
} from '@wordpress/components';

import {
    DisplayTypeTabs,
} from '/components/editor'

import {
    SliderItems
} from './index';

const SliderSetting = (props) => {

    const {
        slider,
        onChange,
    } = props;


    return (
        <>
            <BaseControl label={__('Slider Setting', 'savvy-blocks')}>
                <DisplayTypeTabs>
                    <SliderItems
                        value={slider}
                        onChange={(value) => {
                            onChange({
                                slider: value
                            })
                        }}
                    />
                </DisplayTypeTabs>
            </BaseControl>
        </>

    )
}

export {
    SliderSetting as default,
};
