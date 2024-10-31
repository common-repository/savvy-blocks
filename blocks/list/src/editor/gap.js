import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import {
    SelectControl,
} from '@wordpress/components';

import getSettings from '/utils/settings';
import { ShowClassList } from '/components/editor'

const Gap = (props) => {
    const {
        gap,
        onChange,
        tabName
    } = props;

    const [ settings, setSettings ] = useState(  );
    useEffect( ( ) => {
        getSettings().then((data) => {
            setSettings(data)
        });
    }, [  ] );

    if (settings && gap === undefined) {
        const initGap = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = '';
                return obj;
            }, {
                '_': ''
            }
        );
        onChange(initGap);
    }

    return (
        <>
            <SelectControl
                value={ gap && gap[tabName] }
                options={
                    [
                        { label: '-', value: '' },
                        ...(settings ? settings.spaces.map((space) => {
                            return {label: `${space}px`, value: space}
                        }) : [])
                    ]
                }
                onChange={ (value) => { onChange({ ...gap, [tabName]: value }) } }
            />
            <ShowClassList
                attr={ gap }
                classGenerator={ gapClassGenerator }
            />
        </>
    )
}

const gapClassGenerator = (gap) => {
    const classList = [];
    for (const breakpoint in gap) {
        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : ''
        gap[breakpoint] && classList.push(`gap-${breakpointCss}${gap[breakpoint]}`);
    }

    return classList.join(' ');
}

export {
    Gap as default,
    gapClassGenerator
};
