import { 
    useBlockProps, 
    InnerBlocks 
} from '@wordpress/block-editor';

const Save = ( props ) => {
    const {
        attributes: { 
            link 
        },
    } = props

    const blockAttributes = {};
    if ( link?.rel && link?.rel.length > 0){
        blockAttributes['rel'] = (link?.rel.filter(function (el) { return el != "" })).join(' ');
    }

    const blockProps = useBlockProps.save({
        className: 'savvy-link'
    });

    return (
        <a { ...blockProps }
           href={ link.url }
           target={ link.opensInNewTab ? '_blank' : null }
           {...blockAttributes}
        //    rel={ link.opensInNewTab && 'noopener' }
           download={ link.downloadLink }
        >
            <InnerBlocks.Content/>
        </a>
    )
}

export default Save
