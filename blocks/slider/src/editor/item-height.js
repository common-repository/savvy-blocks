import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor';

const ItemHeight = (props) => {
    const {
        value: itemHeight,
        onChange,
        tabName
    } = props;

    const { settings } = useContext(Settings);

    // Check and initialize itemHeight if necessary
    if (!itemHeight) {
        const initItemHeight = settings?.breakpoints.reduce(
            (obj, breakpoint) => {
                obj[breakpoint] = '';
                return obj;
            }, {
                '_': ''
            }
        );
        onChange(initItemHeight);
    }

    const units = [
        { value: 'px', label: 'px', default: 0 },
        { value: '%', label: '%', default: 0 },
        { value: 'em', label: 'em', default: 0 },
    ];

    const setValue = (value) => {
        onChange({ ...itemHeight, [tabName]: `${value}` });
    };

    return (
        <>
            <UnitControl
                onChange={setValue}
                value={itemHeight && itemHeight[tabName]}
                units={units}
            />
            <ShowClassList
                attr={itemHeight}
                classGenerator={itemHeightClassGenerator}
            />
        </>
    );
};

const itemHeightClassGenerator = (itemHeight) => {
    const cssVariables = [];

    for (const breakpoint in itemHeight) {
        const heightValue = itemHeight[breakpoint];

        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : ''

        if (heightValue) {
            const variableName = `--height${breakpointCss}`;
            cssVariables.push(`${variableName}:${heightValue}`);
        }
    }

    return cssVariables.join(';');
};

export {
    ItemHeight as default,
    itemHeightClassGenerator
};
