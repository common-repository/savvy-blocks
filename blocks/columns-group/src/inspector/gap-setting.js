import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import {
    BaseControl,
    SelectControl,
} from '@wordpress/components';

import getSettings from '/utils/settings';

function GapSetting (props) {
    const {
        columnGroup,
        onChange
    } = props;

    const [ settings, setSettings ] = useState(  );
    useEffect( ( ) => {
        getSettings().then((data) => {
            setSettings(data)
        });
    }, [  ] );

    return (
        <BaseControl>
            <SelectControl
                label={ __( 'Gap', 'savvy-blocks' ) }
                help={ __( 'Vertical space between columns', 'savvy-blocks' ) }
                value={ columnGroup?.gap }
                options={
                    [
                        { label: '-', value: '' },
                        ...(settings ? settings.spaces.map((space) => {
                            return {label: `${space}px`, value: space}
                        }) : [])
                    ]
                }
                onChange={(value) => onChange({
                    ...columnGroup,
                    gap: value
            })}
            />
        </BaseControl>
    )
}

export {
    GapSetting as default,
};
