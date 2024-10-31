import {
    InnerBlocks,
    useBlockProps,
} from '@wordpress/block-editor'

import Inspector from './inspector';

const Edit=( props ) => {
    const {
        attributes: {
            tagName,
        },
    } = props;

    const HtmlTag = tagName;
    const blockProps = useBlockProps({
        className: 'savvy-html-tag'
    });

    return (
        <>
            <Inspector {...props} />
            <HtmlTag { ...blockProps }>
                <InnerBlocks />
            </HtmlTag>
        </>
    )
}

export default Edit
