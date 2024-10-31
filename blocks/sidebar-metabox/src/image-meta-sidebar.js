import { useEntityProp } from '@wordpress/core-data';
import { ResponsiveWrapper } from "@wordpress/components";

import ImageSelector from '/components/editor/image-selector';

const ImageMetaSidebar = ( props ) => {
    const {
        label,
        metaKey,
        postType,
        editable,
    } = props;

    const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );
    const metaValue = meta?.[ metaKey ] ?? false;
    const updateMetaValue = ( newValue ) => {
        setMeta( { ...meta, [ metaKey ]: newValue } );
    };

    return (
        <>
            { editable ?
                <ImageSelector
                    image= { {
                        id: metaValue?.id,
                        url: metaValue?.url
                    } }
                    onSelectImage={ (media) => updateMetaValue({ id: media.id, url: media.url }) }
                /> :
                <ResponsiveWrapper>
                    <img src={ metaValue.url } alt="image"/>
                </ResponsiveWrapper>
            }
        </>
    )
}

export default ImageMetaSidebar;
