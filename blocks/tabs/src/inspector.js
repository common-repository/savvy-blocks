import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor'
import {
    Panel,
    PanelBody,
    SelectControl
} from '@wordpress/components';
import {
    dispatch,
    useDispatch,
    useSelect
} from '@wordpress/data';

function Inspector( props ) {

    const {
        attributes: {
            activeTabIndex,
            tabs
        },
        setAttributes,
    } = props

    const { innerBlocks } = useSelect( ( select ) => {
        return {
            innerBlocks: select("core/block-editor").getBlocks(props.clientId)
        };
    } );

    const setActiveTab = (tabIndex) => {
        dispatch('core/block-editor').updateBlockAttributes(innerBlocks[activeTabIndex].clientId, {isActive: false})
        dispatch('core/block-editor').updateBlockAttributes(innerBlocks[tabIndex].clientId, {isActive: true})
        setAttributes({ activeTabIndex: tabIndex });
    };

    const tabsCount = tabs?.length || 0;

    return (
        <InspectorControls>
            <Panel>
                <PanelBody title="Tabs Settings">
                    <SelectControl
                        label={ __('Initial active tab', 'savvy-blocks') }
                        value={ activeTabIndex }
                        options={
                            Array.from({ length: tabsCount }, (v, i) => ({ label: props.attributes.tabs[i].title, value: i }))
                        }
                        onChange={ (value) => setActiveTab( parseInt(value))}
                    />
                </PanelBody>
            </Panel>
        </InspectorControls>
    );
}

export default Inspector;
