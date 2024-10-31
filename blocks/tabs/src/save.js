import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
	RichText,
    InnerBlocks
} from '@wordpress/block-editor';

export default function save( props ) {
	const {
		attributes: {
			activeTabIndex,
			tabs
		},
	} = props;

	const blockProps = useBlockProps.save({
		className : 'savvy-tabs'
	});
	const tabBar = (tabs) => {
		return (
			tabs.map(
				(tab, index) => {
					return (
						<li
							className={ `nav-item ${ index === activeTabIndex ? 'active' : '' }` }
							role="tab"
							aria-selected={ index === activeTabIndex ? true : "false" }
							tabIndex={ index }

							data-bs-toggle="tab"
							data-bs-target={ `#tab-pane-${ tab?.tabPaneId }` }
						>
							<RichText.Content
								tagName="span"
								value={ tab.title }
							/>
						</li>
					)
				}
			)
		)
	}
	return (
		<div { ...blockProps }>
			<ul className="nav nav-tabs" role="tablist">
				{ tabs && tabBar(tabs) }
			</ul>
			<div className="tab-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
