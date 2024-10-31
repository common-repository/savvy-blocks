import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from '@wordpress/server-side-render';
import Inspector from './inspector';

const Edit = ( props ) => {
    const {
        attributes: {
            autoComplete,
            customSearch,
            searchFields
        },
        setAttributes,
    } = props;

    const blockProps = useBlockProps();

    return (
        <>
            <Inspector { ...props } />
            <div { ...blockProps }>
                <ServerSideRender 
                    block="savvy-blocks/search"
                    attributes= {{
                        autoComplete,
                        customSearch,
                        searchFields
                    }}
                />
            </div>
        </>
    )
}

export default Edit
