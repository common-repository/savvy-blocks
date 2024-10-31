import { __ } from "@wordpress/i18n";
import { createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import {
	dispatch,
	useDispatch,
	useSelect
} from '@wordpress/data';
import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';
import { plus } from '@wordpress/icons';

import Inspector from './inspector';

const Edit = ( props ) => {
    const {
        attributes: {
        	blockId,
			activeTabIndex,
            tabs = [],
        },
        setAttributes,
        clientId
    } = props;

	const ALLOWED_BLOCKS = [ 'savvy-blocks/tab' ];
	const TAB_TEMPLATE = [['savvy-blocks/tab', {tabLabel: 'Tab 1', isActive: true}]];
	const { insertBlock } = useDispatch("core/block-editor");
    const { innerBlocks, selectedInnerBlock, blockInserted } = useSelect( ( select ) => {
        return {
            innerBlocks: select("core/block-editor").getBlocks(props.clientId),
            selectedInnerBlock: select( 'core/block-editor' ).hasSelectedInnerBlock( props.clientId ) ?
                select( 'core/block-editor' ).getSelectedBlockClientId() : null,
			blockInserted: select('core/block-editor').wasBlockJustInserted(props.clientId)
        };
    } );

	const TabBar = (props) => {
		const { tabs } = props;
		return (
			<ul className="nav nav-tabs" role="tablist">
				{
					tabs?.map((tab, index) => {
						const activeTab = tab.clientId === selectedInnerBlock || wp.data.select( 'core/block-editor' ).hasSelectedInnerBlock( tab.clientId );
						return (
							<li
								className={`nav-item ${activeTab ? 'active' : ''} ${activeTabIndex === index ? 'default-active' : ''}`}
								role="tab"
								aria-selected="true"
								tabIndex={tab.index}
								onClick={ () => { dispatch('core/block-editor').selectBlock(tab.clientId) } }
							>
								<span>{tab.attributes.tabLabel}</span>
							</li>
						)
					} )
				}
				<li className="nav-item" role="tab" aria-selected="true" onClick={ handleAddTab }>
					<span><Icon icon={plus}/></span>
				</li>
			</ul>
		)
	}

    const handleAddTab = () => {
        const newTab =  createBlock('savvy-blocks/tab', {tabLabel: `Tab ${tabs.length + 1}`, isActive: false});
		insertBlock(newTab, tabs.length, clientId);
	};

	useEffect( () => {
		if(blockInserted) {
			setAttributes( { blockId: clientId } )
			innerBlocks.map((innerTab, index) => {
				dispatch('core/block-editor').updateBlockAttributes(innerTab.clientId, {tabPaneId: clientId + '-' + index})
			})
		}
	}, [] );

	useEffect(() => {
		const tempTabs = [];

		(activeTabIndex >= innerBlocks.length) && setAttributes({activeTabIndex: 0});

		innerBlocks.map((innerTab, index) => {
			tempTabs[index] = {
				...tabs[index],
				title: innerTab?.attributes.tabLabel,
				tabPaneId : (blockInserted ? clientId : blockId) + '-' + index,
				isActive: activeTabIndex === index
			}
			dispatch('core/block-editor').updateBlockAttributes(innerTab.clientId, {isActive: activeTabIndex === index})
		})
		tempTabs && JSON.stringify(tempTabs) !== JSON.stringify(tabs) && setAttributes( { tabs: tempTabs });
	}, [innerBlocks]);


    const blockProps = useBlockProps({
        className : 'savvy-tabs'
    });

    return (
        <>
            <Inspector { ...props } />
            <div { ...blockProps }>
				<TabBar tabs={innerBlocks}/>
                <div className="tab-content">
                    <InnerBlocks
                        allowedBlocks={ ALLOWED_BLOCKS }
						template={ TAB_TEMPLATE }
                    />
                </div>
            </div>
        </>
    );
}

export default Edit;
