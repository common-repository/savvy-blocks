import { useEntityProp } from '@wordpress/core-data';
import { ResponsiveWrapper } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from '@wordpress/core-data';

import MediaSelector from '/components/editor/media-selector';

const MediaMetaSidebar = ( props ) => {
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

    const media = useSelect(
        ( select ) => metaValue?.id && select( coreStore ).getMedia( metaValue?.id ),
        [ metaValue?.id ]
    );

    return (
        <>
            { editable ?
                <MediaSelector
                    allowedTypes ={ ['video', 'image'] }
                    media= { {
                        id: metaValue?.id,
                        url: metaValue?.url
                    } }
                    onSelectMedia={ ( media ) => updateMetaValue( { id: media.id, url: media.url } ) }
                /> :
                <>
                    {
                        media?.mime_type?.match('video.*') &&
                        <ResponsiveWrapper
                            naturalWidth={ media.media_details.width }
                            naturalHeight={ media.media_details.height }
                        >
                            <video controls>
                                <source src={ media?.source_url } type={ media?.mime_type } />
                            </video>
                        </ResponsiveWrapper>
                    }
                    {
                        media?.mime_type?.match('image.*') &&
                        <ResponsiveWrapper
                            naturalWidth={ media.media_details.width }
                            naturalHeight={ media.media_details.height }
                        >
                            <img src={ media?.source_url } alt="image"/>
                        </ResponsiveWrapper>
                    }
                    {
                        !media?.mime_type?.match('image.*|video.*') &&
                        <span style={{color: '#fff', display: 'block', padding: '5px', margisvottom: '5px', backgroundColor: '#007cba'}}>{ media?.title?.rendered }</span>

                    }
                </>

            }
        </>
    )
}

export default MediaMetaSidebar;
