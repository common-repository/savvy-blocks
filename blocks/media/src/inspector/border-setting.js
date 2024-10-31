import { __ } from '@wordpress/i18n';
import { useContext } from "@wordpress/element";
import {
    BaseControl,
    RangeControl,
    SelectControl,
    TabPanel,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';

import { Settings } from '/components/context';
import { Color, ShowClassList } from '/components/editor';

function BorderSetting ( props ) {
    const {
        border,
        elementStates,
        setAttributes,
        tabName,
        supports,
    } = props;

    const { settings } = useContext(Settings);
    // Check and initialize size if necessary
    if (!border?.width) {
        const initIconSize = settings?.breakpoints.reduce(
            (obj, breakpoint) => {
                obj[breakpoint] = '';
                return obj;
            }, {
                '_': ''
            }
        );
        // onChange(initIconSize);
    }

    const BORDER_STYLE_OPTIONS = [
        { label:'Select', value:'' },
        { label:'None', value:'none' },
        { label:'Solid', value:'solid' },
        { label:'Dotted', value:'dotted' },
        { label:'Dashed', value:'dashed' }
    ];

    const TABS_STATE = [
        {
            name: 'default',
            title: 'Default',
            className: 'tab-color',
            attrSlug: ''
        },
        {
            name: 'hover',
            title: 'Hover',
            className: 'tab-hover',
            attrSlug: 'hover'
        }
    ]

    return (
        props.hasOwnProperty('border') &&
        <>
            {
                ( supports === undefined || supports !== undefined && supports.includes('style') ) &&
                <BaseControl>
                    <SelectControl
                        label={ __( 'Style', 'savvy-blocks' ) }
                        value = { border?.[tabName]?.style || ''}
                        options = { BORDER_STYLE_OPTIONS }
                        onChange = { (value) => setAttributes({border: {...border, [tabName]: {...border?.[tabName], style: value}}})}
                    />
                </BaseControl>
            }
            {
                ( supports === undefined || supports !== undefined && supports.includes('radius') ) &&
                <BaseControl>
                    <UnitControl
                        label={ __( 'Radius', 'savvy-blocks' ) }
                        labelPostion={ __( 'edge', 'savvy-blocks' ) }
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: '%', label: '%', default: 0 },
                        ]}
                        value = { border?.[tabName]?.radius }
                        onChange = { (unit) => setAttributes({border: {...border, [tabName]: {...border?.[tabName], radius: unit}}})}
                    />
                </BaseControl>
            }
            {
                ( supports === undefined || supports !== undefined && supports.includes('width') ) &&
                <BaseControl label={ __( 'width', 'savvy-blocks' ) }>
                    <TabPanel
                        className='tabs'
                        activeClass='active-tab'
                        tabs= { TABS_STATE }
                    >
                        { ( tab ) => (
                            tab.name === 'default' ? (
                                <>
                                    <RangeControl
                                        value={ parseInt(border?.[tabName]?.width) }
                                        onChange = { (unit) => {
                                            setAttributes({border: {...border, [tabName]: {...border?.[tabName], width: unit ? `${unit}px` : ''}}})
                                        }}
                                        step = { 1 }
                                        min={ 0 }
                                        max={ 10 }
                                        currentInput = { 1 }
                                        allowReset = { true }
                                    />
                                </>
                            ) : (
                                <RangeControl
                                    value={ parseInt(elementStates?.[tab.name]?.border?.[tabName]?.width) }
                                    onChange={ ( unit ) => setAttributes(
                                        { elementStates:
                                            {
                                                ...elementStates ,
                                                [tab.name] :
                                                    {
                                                        ...elementStates?.[tab.name],
                                                        border: {
                                                            ...elementStates?.[tab.name]?.border,
                                                            [tabName]: {...elementStates?.[tab.name]?.border?.[tabName], width: `${unit}px`}
                                                        }
                                                    }
                                            }
                                        }
                                    ) }
                                    step = { 1 }
                                    min={ 0 }
                                    max={ 10 }
                                    currentInput = { 0 }
                                    allowReset = { true }
                                />
                            )
                        )}
                    </TabPanel>
                </BaseControl>
            }
            {
                ( supports === undefined || supports !== undefined && supports.includes('color') ) &&
                <BaseControl label={ __( 'Color', 'savvy-blocks' ) } >
                    <TabPanel
                        className='tabs'
                        activeClass='active-tab'
                        tabs= { TABS_STATE }
                    >
                        { ( tab ) => (
                            tab.name === 'default' ? (
                                <Color
                                    value={ border?.[tabName]?.color }
                                    onChange = {
                                        (value) => {
                                            setAttributes( { border: { ...border, [tabName]: { ...border?.[tabName], color: value.slug } } } )
                                        }
                                    }
                                />
                            ) : (
                                <Color
                                    value={ elementStates?.[tab.name]?.border?.[tabName]?.color }
                                    onChange={ ( value ) => setAttributes(
                                        { elementStates:
                                            {
                                                ...elementStates ,
                                                [tab.name] :
                                                    {
                                                        ...elementStates?.[tab.name],
                                                        border: {
                                                            ...elementStates?.[tab.name]?.border,
                                                            [tabName]: {...elementStates?.[tab.name]?.border?.[tabName], color: value.slug}
                                                        }
                                                    }
                                            }
                                        }
                                    ) }
                                />
                            )
                        )}
                    </TabPanel>
                </BaseControl>
            }
        </>
    )
}

const borderWidthClassGenerator = (border, includePrefix = true) => {
    const cssVariables = [];

    for (const breakpoint in border) {
        const widthValue = border[breakpoint].width;

        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : '';

        if (widthValue) {
            const variableName = includePrefix ? `--border-width${breakpointCss}` : `${breakpointCss}`;
            if (includePrefix) {
                cssVariables.push(`${variableName}:${widthValue}`);
            } else {
                cssVariables.push(`${variableName}${widthValue}`);
            }
        }
    }

    return cssVariables.join(';');
};

const borderWidthHoverClassGenerator = (elementStates, includePrefix = true) => {
    const cssVariables = [];
    
    for (const breakpoint in elementStates.hover.border) {
        const widthValue = elementStates.hover.border[breakpoint]?.width;

        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : '';

        if (widthValue) {
            const variableName = includePrefix ? `--border-width-hover${breakpointCss}` : `${breakpointCss}`;
            if (includePrefix) {
                cssVariables.push(`${variableName}:${widthValue}`);
            } else {
                cssVariables.push(`${variableName}${widthValue}`);
            }
        }
    }

    return cssVariables.join(';');
};

const borderStyleClassGenerator = (border, includePrefix = true) => {
    const cssVariables = [];

    for (const breakpoint in border) {
        const styleValue = border[breakpoint].style;

        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : '';

        if (styleValue) {
            const variableName = includePrefix ? `--border-style${breakpointCss}` : `${breakpointCss}`;
            if (includePrefix) {
                cssVariables.push(`${variableName}:${styleValue}`);
            } else {
                cssVariables.push(`${variableName}${styleValue}`);
            }
        }
    }

    return cssVariables.join(';');
};

const borderRadiusClassGenerator = (border, includePrefix = true) => {
    const cssVariables = [];

    for (const breakpoint in border) {
        const radiusValue = border[breakpoint].radius;

        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : '';

        if (radiusValue) {
            const variableName = includePrefix ? `--border-radius${breakpointCss}` : `${breakpointCss}`;
            if (includePrefix) {
                cssVariables.push(`${variableName}:${radiusValue}`);
            } else {
                cssVariables.push(`${variableName}${radiusValue}`);
            }
        }
    }

    return cssVariables.join(';');
};

const borderColorClassGenerator = (border) => {
    const cssVariables = [];

    for (const breakpoint in border) {
        const colorValue = border[breakpoint].color;

        const breakpointCss = breakpoint !== '_' ? `-${breakpoint}` : ''

        if (colorValue) {
            const variableName = `border-color${breakpointCss}`;
            cssVariables.push(`${variableName}-${colorValue}`);
        }
    }

    return cssVariables.join(' ');
};

export {
    BorderSetting as default,
    borderWidthClassGenerator,
    borderWidthHoverClassGenerator,
    borderStyleClassGenerator,
    borderRadiusClassGenerator,
    borderColorClassGenerator
};