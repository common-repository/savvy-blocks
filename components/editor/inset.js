import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { Flex } from '@wordpress/components';

import { Settings } from '/components/context';
import { 
    BoxController,
    ShowClassList 
} from '/components/editor'
import './styles.scss'

const Inset = (props) => {
    const {
        value: inset,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings )

    //inset is array as default
    if (inset === undefined || inset.length === 0) {
        const initInset = settings?.breakpoints.reduce(
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
        onChange(initInset);
    }

    return (
        <>
            <Flex> 
                {
                    inset &&
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
                        boxValues={ inset && inset[tabName] }
                        onChange={ (value) => {
                            onChange({ ...inset, [tabName]: value })
                        }}
                    />
                }
            </Flex>
            <ShowClassList
                attr = { inset }
                classGenerator  = { insetClassGenerator }
            />
        </>
    )
}

const insetClassGenerator = (inset) => {
    const classList = [];

    for (const breakpoint in inset) {
        const mt = inset[breakpoint]['top'];
        const me = inset[breakpoint]['right'];
        const mb = inset[breakpoint]['bottom'];
        const ms = inset[breakpoint]['left'];
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
    Inset as default,
    insetClassGenerator
};
