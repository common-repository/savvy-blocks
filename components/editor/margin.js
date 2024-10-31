import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { Flex } from '@wordpress/components';

import { Settings } from '/components/context';
import { 
    BoxController,
    ShowClassList 
} from '/components/editor'
import './styles.scss'

const Margin = (props) => {
    const {
        value: margin,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings )

    //margin is array as default
    if (margin === undefined || margin.length === 0) {
        const initMargin = settings?.breakpoints.reduce(
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
        onChange(initMargin);
    }

    return (
        <>
            <Flex> 
                {
                    margin &&
                    <BoxController
                        options={
                            [
                                {label: '-', value: ''},
                                { label: 'Auto', value: 'auto' },
                                {label: '0', value: '0'},
                                ...(settings ? settings.spaces.map((space) => {
                                    return {label: `${space}px`, value: space}
                                }) : [])
                            ]
                        }
                        boxValues={ margin && margin[tabName] }
                        onChange={ (value) => {
                            onChange({ ...margin, [tabName]: value })
                        }}
                    />
                }
            </Flex>
            <ShowClassList
                attr = { margin }
                classGenerator  = { marginClassGenerator }
            />
        </>
    )
}

const marginClassGenerator = (margin) => {
    const classList = [];

    for (const breakpoint in margin) {
        const mt = margin[breakpoint]['top'];
        const me = margin[breakpoint]['right'];
        const mb = margin[breakpoint]['bottom'];
        const ms = margin[breakpoint]['left'];
        const my = (mt === mb) ? mt : '';
        const mx = (me === ms) ? me : '';

        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : ''

        if (mx === my && mx) {
            classList.push(`m-${breakpointCss}${mx}`);
        } else {
            if (mx) {
                classList.push(`mx-${breakpointCss}${mx}`)
            } else {
                if (me) {
                    classList.push(`me-${breakpointCss}${me}`)
                }

                if (ms) {
                    classList.push(`ms-${breakpointCss}${ms}`)
                }
            }
            if (my) {
                classList.push(`my-${breakpointCss}${my}`)
            } else {
                if (mt) {
                    classList.push(`mt-${breakpointCss}${mt}`)
                }

                if (mb) {
                    classList.push(`mb-${breakpointCss}${mb}`)
                }
            }
        }
    }

    return classList.join(' ');
}

export {
    Margin as default,
    marginClassGenerator
};
