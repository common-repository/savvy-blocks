import { __ } from '@wordpress/i18n';
import {useEffect, useState} from '@wordpress/element';
import {
    TabPanel,
    ToggleControl,
} from '@wordpress/components';

import getSettings from '/utils/settings';
import { ShowClassList } from '/components/editor'

import {
    AlignmentsSetting,
    ColSetting,
    GapSetting,
    SliderItems
} from './index';

const ColumnGroupSetting = (props) => {

    const {
        columnGroup,
        onChange,
    } = props;

    const [ settings, setSettings ] = useState();
    useEffect( () => {
        getSettings().then((data) => {
            setSettings(data)
        });
    }, [] );

    if (!columnGroup) {
        const initColumnGroup = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = '';
                return obj;
            }, {
                '_': ''
            }
        );
        onChange(initColumnGroup);
    }

    const tabs = [
        {name: '_', title: 'None'},
        ...(settings ? settings.breakpoints.map((breakpoint) => {
            return {name: breakpoint, title: breakpoint}
        }) : [])
    ];

    return (
        <>
            <TabPanel
                className='display-type-tabs'
                activeClass='active-tab'
                initialTabName='_'
                tabs={ tabs }
            >
                { ( tab ) => (
                <>
                    { [tab.name][0] !== '_' &&
                        <ToggleControl
                            label="Is Slider?"
                            checked={ columnGroup && columnGroup[tab.name]?.hasSlider || false }
                            onChange={ ( state ) => {
                                onChange({ ...columnGroup, [tab.name]: { hasSlider :  state} })
                            } }
                        />
                    }
                    {
                        columnGroup?.[tab.name]?.hasSlider === true
                    ?
                        <SliderItems
                            columnGroup={ columnGroup && columnGroup?.[tab.name] }
                            onChange={ (value) => {
                                onChange({ ...columnGroup, [tab.name]:  value })}
                            }
                        />
                    :
                        <>
                            <ColSetting
                                columnGroup={ columnGroup && columnGroup?.[tab.name] }
                                onChange={ (value) => {
                                    onChange({ ...columnGroup, [tab.name]:  value })}
                                }
                            />
                            <GapSetting
                                columnGroup={ columnGroup && columnGroup?.[tab.name] }
                                onChange={ (value) => {
                                    onChange({ ...columnGroup, [tab.name]:  value })}
                                }
                            />
                            <AlignmentsSetting
                                columnGroup={ columnGroup && columnGroup?.[tab.name] }
                                onChange={ (value) => {
                                    onChange({ ...columnGroup, [tab.name]:  value })}
                                }
                            />
                        </>
                    }
                </>
                )}
            </TabPanel>
            <ShowClassList
                attr = { columnGroup && columnGroup }
                classGenerator  = { (attr) =>
                    [
                        columnGroupColClassGenerator(attr),
                        columnGroupGapClassGenerator(attr),
                        columnGroupAlignmentsClassGenerator(attr),
                    ].join("\n")
                }
            />
        </>

    )
}

const columnGroupClassGenerator = (columnGroup) => {
    const classList = [];
    for (const breakpoint in columnGroup) {
        const columnGroupValue = columnGroup[breakpoint]?.display;

        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : '';

        if(columnGroupValue){
            classList.push(`column-group-${breakpointCss}${columnGroupValue}`);
        }

    }
    return classList.join(' ');
}

const columnGroupAlignmentsClassGenerator = (columnGroup) => {
    const classList = [];
    for (const breakpoint in columnGroup) {
        const columnGroupAlignmentValue = columnGroup[breakpoint]?.alignment;
        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : '';

        if(columnGroupAlignmentValue){
            classList.push(`justify-content-${breakpointCss}${columnGroupAlignmentValue}`);
        }

    }
    return classList.join(' ');
}

const columnGroupGapClassGenerator = (columnGroup) => {
    const classList = [];
    for (const breakpoint in columnGroup) {
        const columnGroupGapValue = columnGroup[breakpoint]?.gap;
        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : '';

        if(columnGroupGapValue){
            classList.push(`row-gap-${breakpointCss}${columnGroupGapValue}`);
        }

    }
    return classList.join(' ');
}

const columnGroupColClassGenerator = (columnGroup) => {
    const classList = [];
    for (const breakpoint in columnGroup) {
        const columnGroupColValue = columnGroup[breakpoint]?.col;
        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : '';

        if(columnGroupColValue){
            classList.push(`col-${breakpointCss}${columnGroupColValue}`);
        }

    }
    return classList.join(' ');
}

export {
    ColumnGroupSetting as default,
    columnGroupClassGenerator,
    columnGroupAlignmentsClassGenerator,
    columnGroupGapClassGenerator,
    columnGroupColClassGenerator
};
