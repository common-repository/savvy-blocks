import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor';

const ArrowFontSize = (props) => {
    const {
        value: fontSize,
        onChange,
        tabName
    } = props;

    const { settings } = useContext(Settings);

    // Check and initialize fontSize if necessary
    if (!fontSize) {
        const initFontSize = settings?.breakpoints.reduce(
            (obj, breakpoint) => {
                obj[breakpoint] = '';
                return obj;
            }, {
                '_': ''
            }
        );
        onChange(initFontSize);
    }

    const units = [
        { value: 'px', label: 'px', default: 0 },
        { value: '%', label: '%', default: 0 },
        { value: 'em', label: 'em', default: 0 },
    ];

    const setValue = (value) => {
        onChange({ ...fontSize, [tabName]: `${value}` });
    };

    return (
        <>
            <UnitControl
                onChange={setValue}
                value={fontSize && fontSize[tabName]}
                units={units}
            />
            <ShowClassList
                attr={fontSize}
                classGenerator={arrowFontSizeClassGenerator}
            />
        </>
    );
};

const arrowFontSizeClassGenerator = (fontSize) => {
    const cssVariables = [];

    for (const breakpoint in fontSize) {
        const widthValue = fontSize[breakpoint];

        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : ''

        if (widthValue) {
            const variableName = `--font-size${breakpointCss}`;
            cssVariables.push(`${variableName}:${widthValue}`);
        }
    }

    return cssVariables.join(';');
};

export {
    ArrowFontSize as default,
    arrowFontSizeClassGenerator
};
