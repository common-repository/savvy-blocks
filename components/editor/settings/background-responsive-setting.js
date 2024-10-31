import { __ } from "@wordpress/i18n";
import {
    BaseControl,
} from "@wordpress/components";
import {
    DisplayTypeTabs
} from '/components/editor';

import {
    BackgroundResponsive
} from '../index';

const BackgroundResponsiveSetting = (props) => {

    const {
        background,
        onChange
    } = props;

    return (
        <>
            <BaseControl label={__('Background Setting', 'savvy-blocks')}>
                <DisplayTypeTabs>
                    <BackgroundResponsive
                        value={background}
                        onChange={(value) => {
                            onChange({
                                background: value
                            })
                        }}
                    />
                </DisplayTypeTabs>
            </BaseControl>
        </>
    )
}

export default BackgroundResponsiveSetting;
