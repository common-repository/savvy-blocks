import {
    InnerBlocks,
    useBlockProps
} from "@wordpress/block-editor";

const Save = (props) => {
    const {
        attributes: {
            isActive,
            tabPaneId,
        },
    } = props

    const blockProps = useBlockProps.save({
        className : [
            'savvy-tab',
            `tab-pane fade`,
            isActive ? 'active show' : ''
        ].join(' ')
    });
    return (
        <div
            className={ blockProps.className }
            id={ 'tab-pane-' + tabPaneId }
            role="tabpanel"
        >
            <InnerBlocks.Content/>
        </div>
    );
}

export default Save
