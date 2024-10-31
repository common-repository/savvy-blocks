import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor'
import Flex from "./flex";

const Display = ( props ) => {
    const displayItems = [ 'none', 'block', 'flex', 'inline-block', 'inline-flex' ];

    const {
        value: display,
        onChange,
        tabName
    } = props;

    const { settings } = useContext( Settings )

    if (display === undefined || display.length === 0) {
        const initDisplay = settings?.breakpoints.reduce(
            ( obj, item ) => {
                obj[item] = { type: '' };
                return obj;
            }, {
                '_': { type: '' }
            }
        );
        onChange({ display: initDisplay });
    }


    return (
        <>
            <SelectControl
                label={ __('Display', 'savvy-blocks') }
                value={ display && display[tabName]?.type }
                options={
                    [
                        { label: '-', value: '' },
                        ...displayItems.map((space) => {
                            return { label: `${ space }`, value: space }
                        })
                    ]
                }
                onChange={ (value) => {
                    onChange({ display: { ...display, [tabName]: { ...display?.[tabName], ...{ type: value } } } })
                }}
            />
            {
                ['flex', 'inline-flex'].includes( display?.[tabName]?.type ) &&
                <Flex
                    value={ display && display[tabName].flexSettings }
                    onChange={
                        (value) => {
                            const displayClone = JSON.parse( JSON.stringify(display) );
                            displayClone[tabName].flexSettings = { ...displayClone[tabName].flexSettings, ...value }
                            onChange({ display: displayClone })
                        }
                    }
                    flexSettings={ ['direction', 'align-items', 'justify-content'] }
                />
            }
            <ShowClassList
                attr = { display }
                classGenerator  = { displayClassGenerator }
            />
        </>
    )
}

const displayClassGenerator = (display) => {
    const classList = [];

    for (const breakpoint in display) {
        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : ''

        if (display[breakpoint].type) {
            classList.push(`d-${ breakpointCss }${ display[breakpoint].type }`);
            if ( ['flex', 'inline-flex'].includes( display[breakpoint].type ) ) {
                const flexSettings = display[breakpoint].flexSettings;
                flexSettings?.['direction'] && classList.push( `flex-${ breakpointCss }${ flexSettings['direction'] }` )
                flexSettings?.['align-items'] && classList.push( `align-items-${ breakpointCss }${ flexSettings['align-items'] }` )
                flexSettings?.['justify-content'] && classList.push( `justify-content-${ breakpointCss }${ flexSettings['justify-content'] }` )
            }
        }
    }

    return classList.join(' ');
}

export {
    Display as default,
    displayClassGenerator
};
