import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { Flex } from '@wordpress/components';

import { Settings } from '/components/context';
import { 
    BoxController,
    ShowClassList
} from "/components/editor";
import './styles.scss';

const Padding = (props) => {
    const {
        value: padding,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings )

    //padding is array as default
    if (padding === undefined || padding.length === 0) {
        const initPadding = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = {
                    'top': '',
                    'right': '',
                    'bottom': '',
                    'left': '',
                };
                return obj;
            }, {
                '_': {
                    'top': '',
                    'right': '',
                    'bottom': '',
                    'left': '',
                }
            }
        );
        onChange(initPadding);
    }

    return (
        <>
            <Flex>
                {
                    padding &&
                    <BoxController
                        options={
                            [
                                {label: '-', value: ''},
                                {label: '0', value: '0'},
                                ...(settings ? settings.spaces.map((space) => {
                                    return {label: `${space}px`, value: space}
                                }) : [])
                            ]
                        }
                        boxValues={ padding && padding[tabName] }
                        onChange={ (value) => {
                            onChange({ ...padding, [tabName]: value })
                        }}
                    />
                }
            </Flex>
            <ShowClassList
                attr = { padding }
                classGenerator  = { paddingClassGenerator }
            />
        </>
    )
}

const paddingClassGenerator = (padding) => {
    const classList = [];

    for (const breakpoint in padding) {
        const pt = padding[breakpoint]['top'];
        const pe = padding[breakpoint]['right'];
        const pb = padding[breakpoint]['bottom'];
        const ps = padding[breakpoint]['left'];
        const py = (pt === pb) ? pt : '';
        const px = (pe === ps) ? pe : '';

        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : ''

        if (px === py && px) {
            classList.push(`p-${breakpointCss}${px}`);
        } else {
            if (px) {
                classList.push(`px-${breakpointCss}${px}`)
            } else {
                if (pe) {
                    classList.push(`pe-${breakpointCss}${pe}`)
                }

                if (ps) {
                    classList.push(`ps-${breakpointCss}${ps}`)
                }
            }
            if (py) {
                classList.push(`py-${breakpointCss}${py}`)
            } else {
                if (pt) {
                    classList.push(`pt-${breakpointCss}${pt}`)
                }

                if (pb) {
                    classList.push(`pb-${breakpointCss}${pb}`)
                }
            }
        }
    }

    return classList.join(' ');
}

export {
    Padding as default,
    paddingClassGenerator
};
