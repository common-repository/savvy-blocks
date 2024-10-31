import { useBlockProps } from '@wordpress/block-editor'
import { Icon } from '/components/ui'
import Inspector from './inspector';

import { useDefault } from '/utils/settings';
const Edit = ( props ) => {
    const {
        attributes: {
            border,
            icon,
            size,
        },
        setAttributes,
        clientId
    } = props;

    useDefault(clientId, setAttributes)
    const blockProps = useBlockProps({
        className: 'savvy-icon',
        style:{
            borderRadius: border?.radius,
        }
    });
    return (
        <>
            <Inspector { ...props } />
            <div { ...blockProps }>
                {
                    icon ? (
                        <Icon icon={ icon } size={ size }/>
                    ) : (
                        <span>Select Icon</span>
                    )
                }
            </div>
        </>
    )
}

export default Edit;
