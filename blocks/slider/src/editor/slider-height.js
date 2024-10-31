import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor';

const SliderHeight = (props) => {
    const {
        value: sliderHeight,
        onChange,
        tabName
    } = props;

    const { settings } = useContext(Settings);

    // Check and initialize sliderHeight if necessary
    if (!sliderHeight) {
        const initSliderHeight = settings?.breakpoints.reduce(
            (obj, breakpoint) => {
                obj[breakpoint] = '';
                return obj;
            }, {
                '_': ''
            }
        );
        onChange(initSliderHeight);
    }

    const units = [
        { value: 'px', label: 'px', default: 0 },
        { value: '%', label: '%', default: 0 },
    ];

    const setValue = (value) => {
        onChange({ ...sliderHeight, [tabName]: `${value}` });
    };

    return (
        <>
            <UnitControl
                onChange={setValue}
                value={sliderHeight && sliderHeight[tabName]}
                units={units}
            />
            <ShowClassList
                attr={sliderHeight}
                classGenerator={sliderHeightClassGenerator}
            />
        </>
    );
};

const sliderHeightClassGenerator = (sliderHeight) => {
    const cssVariables = [];

    for (const breakpoint in sliderHeight) {
        const widthValue = sliderHeight[breakpoint];

        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : ''

        if (widthValue) {
            const variableName = `--height${breakpointCss}`;
            cssVariables.push(`${variableName}:${widthValue}`);
        }
    }

    return cssVariables.join(';');
};

export {
    SliderHeight as default,
    sliderHeightClassGenerator
};
