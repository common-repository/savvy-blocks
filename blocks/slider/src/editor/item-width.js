import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor';

const ItemWidth = (props) => {
    const {
        value: itemWidth,
        onChange,
        tabName
    } = props;

    const { settings } = useContext(Settings);

    // Check and initialize itemWidth if necessary
    if (!itemWidth) {
        const initItemWidth = settings?.breakpoints.reduce(
            (obj, breakpoint) => {
                obj[breakpoint] = '';
                return obj;
            }, {
                '_': ''
            }
        );
        onChange(initItemWidth);
    }

    const units = [
        { value: 'px', label: 'px', default: 0 },
        { value: '%', label: '%', default: 0 },
        { value: 'em', label: 'em', default: 0 },
    ];

    const setValue = (value) => {
        onChange({ ...itemWidth, [tabName]: `${value}` });
    };

    return (
        <>
            <UnitControl
                onChange={setValue}
                value={itemWidth && itemWidth[tabName]}
                units={units}
            />
            <ShowClassList
                attr={itemWidth}
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
    ItemWidth as default,
    itemWidthClassGenerator
};
