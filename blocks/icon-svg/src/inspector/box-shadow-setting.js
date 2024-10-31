import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    SelectControl,
    TabPanel
} from '@wordpress/components';


function BoxShadowSetting ( props ) {
    const { 
        boxShadow,
        elementStates,
        setAttributes,
    } = props;

    const SHADOW_OPTIONS = [
        { label:'none', value:'none' },
        { label:'Small', value:'sm' },
        { label:'Regular', value:'' },
        { label:'Larger', value:'lg' }
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
        <>
        {
            props.hasOwnProperty('boxShadow') &&
            <>
                {
                    <BaseControl label={ __('Shadow', 'savvy-blocks') }>
                        <TabPanel
                            className='tabs'
                            activeClass='active-tab'
                            tabs= { TABS_STATE }
                        >
                            { ( tab ) => (

                                tab.name === 'default' ? (
                                    <SelectControl
                                        value = { boxShadow }
                                        options = { SHADOW_OPTIONS }
                                        onChange = { (value) => { setAttributes({ boxShadow: value })} }
                                    />
                                ) : (
                                    <SelectControl
                                        value = { elementStates?.[tab.name]?.boxShadow }
                                        options = { SHADOW_OPTIONS }
                                        onChange = { (value) => { setAttributes(
                                            { elementStates:
                                                {
                                                    ...elementStates ,
                                                    [tab.name] :
                                                    {
                                                        ...elementStates?.[tab.name],
                                                        boxShadow: value 
                                                    }
                                                }
                                            }
                                        )} }
                                    />
                                )
                            )}
                        </TabPanel>
                    </BaseControl>
                }         
            </>
        }
        </>
    )
}

export default BoxShadowSetting;