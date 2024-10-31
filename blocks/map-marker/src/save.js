import { 
    useBlockProps, 
    InnerBlocks 
} from '@wordpress/block-editor';

const Save = (props) => {
    const {
        attributes: {
            coordinates,
            label,
            tooltip
        },
    } = props

    const blockProps = useBlockProps.save({
        className: 'savvy-map-marker',
        'data-lat': coordinates.lat,
        'data-long': coordinates.long,
        'data-label': label,
        'data-tooltip': tooltip || '',
    });

    return (
        <div { ...blockProps } >
            <InnerBlocks.Content />
        </div>
    )
}

export default Save
