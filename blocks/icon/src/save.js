import { useBlockProps } from '@wordpress/block-editor';
import { Icon } from '/components/ui'

const Save = (props) => {
    const {
        attributes: {
            border,
            icon,
            size,
        }
    } = props;

    const blockProps = useBlockProps.save({
        className: 'savvy-icon',
        style:{
            borderRadius: border?.radius,
        }
    });
    
    return (
        <span { ...blockProps }>
            <Icon icon={ icon } size={ size }/>
        </span>
    )
}

export default Save;
