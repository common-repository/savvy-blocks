import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import {
    BaseControl,
    RangeControl,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';
import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor';

const IconSize = (props) => {
    const {
        value : size,
        onChange,
        tabName
    } = props;

    const { settings } = useContext(Settings);

    // Check and initialize size if necessary
    if (!size) {
        const initIconSize = settings?.breakpoints.reduce(
            (obj, breakpoint) => {
                obj[breakpoint] = '';
                return obj;
            }, {
                '_': ''
            }
        );
        onChange(initIconSize);
    }

    const setValue = (value) => {
        onChange({ ...size, [tabName]: `${!isNaN(parseInt(value)) ? `${parseInt(value)}px` : ''}` });
    };

    return (
        <>
            <BaseControl>
                <RangeControl
                    label={ __('Size', 'savvy-blocks') }
                    onChange = { setValue }
                    value={size && parseInt(size[tabName])}
                    min={ 0 }
                    max={ 100 }
                    currentInput = { 16 }
                    allowReset = { true }
                />
            </BaseControl>
            <ShowClassList
                attr={size}
                classGenerator={itemWidthClassGenerator}
            />
        </>
    );
};

const itemWidthClassGenerator = (itemWidth) => {
    const cssVariables = [];

    for (const breakpoint in itemWidth) {
        const widthValue = itemWidth[breakpoint];

        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : ''

        if (widthValue) {
            const variableName = `--width${breakpointCss}`;
            cssVariables.push(`${variableName}:${widthValue}`);
        }
    }

    return cssVariables.join(';');
};

export {
    IconSize as default,
    itemWidthClassGenerator
};
