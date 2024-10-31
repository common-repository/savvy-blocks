import { __ } from '@wordpress/i18n';
import {
    BaseControl,
} from '@wordpress/components';

import {
    DisplayTypeTabs,
    Margin,
    Color,
} from '/components/editor'

const ScrollbarSetting = (props) => {

    const {
        scrollbar,
        onChange,
    } = props;

    return (
        <>
            <BaseControl label={__('Color', 'savvy-blocks')}>
                <Color
                    value={scrollbar?.color}
                    onChange={(value) => {
                        onChange({
                            ...scrollbar,
                            color: value.color // correct this
                        })
                    }}
                />
            </BaseControl>
            <BaseControl label={__('Margin', 'savvy-blocks')}>
                <DisplayTypeTabs>
                    <Margin
                        value={scrollbar?.margin}
                        onChange={(value) => {
                            onChange({
                                ...scrollbar,
                                margin: value
                            })
                        }}
                    />
                </DisplayTypeTabs>
            </BaseControl>
        </>

    )
}

export {
    ScrollbarSetting as default,
};
