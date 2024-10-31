import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor'
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

import Inspector from './inspector';

const Edit = (props) => {
    const {
        attributes,
        setAttributes,
        clientId
    } = props;

    const { wasBlockJustInserted } = useSelect('core/block-editor');
    useEffect(() => {
        wasBlockJustInserted(clientId) && (function(){
            //set default values for objective attributes
            setAttributes({ size: { ...attributes?.size, '_': '48px' } })
        })()
    },[])

    const blockProps = useBlockProps();

    return (
        <>
            <Inspector { ...props } />
            <div { ...blockProps }>
                <ServerSideRender
                    block="savvy-blocks/icon-svg"
                    attributes= { {...attributes} }
                />
            </div>
        </>
    )
}

export default Edit;