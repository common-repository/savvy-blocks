import {
    InnerBlocks,
    useBlockProps,
} from "@wordpress/block-editor";

const Save=( props ) => {
    const {
        attributes: {
            tagName,
            htmlAttributes
        },
    } = props

    const HtmlTag = tagName;
    const blockProps = useBlockProps.save({
        className: 'savvy-html-tag'
    });

    return (
        <HtmlTag { ...blockProps } { ...htmlAttributes } >
            <InnerBlocks.Content />
        </HtmlTag>
    )
}

export default Save
