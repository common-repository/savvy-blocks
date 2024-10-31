import { useBlockProps } from '@wordpress/block-editor';
import { Icon } from '/components/ui'

const v1 = {
    attributes: {
        icon: {
            "type": "object"
        },
        fullWidth: {
            "type": "boolean",
            "default": false
        },
        size: {
            "type": "number",
            "default": 48
        },
        border: {
            "type": "object"
        }
    },

    migrate( { icon, size, border } ) {
        return {
            icon: icon,
            size: size,
            border: border
        };
    },

    save( props ) {
        const {
            attributes: {
                border,
                fullWidth,
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
                <Icon icon={ icon } fullWidth={ fullWidth } size={ size }/>
            </span>
        )
    }
}

export default [ v1 ];
