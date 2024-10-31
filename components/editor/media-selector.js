import { __ } from "@wordpress/i18n";
import {
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";
import {
    BaseControl,
    Button,
    Flex,
    ResponsiveWrapper,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from '@wordpress/core-data';

const MediaSelector = (props) => {
    const {
        media: {
            id: mediaId,
            url: mediaUrl,
        },
        allowedTypes,
        onSelectMedia
    } = props;

    const media = useSelect(
        ( select ) => mediaId && select( coreStore ).getMedia( mediaId ),
        [ mediaId ]
    );

    return (
        <BaseControl>
            <div className="editor-post-featured-media">
                <MediaUploadCheck>
                    { !media &&
                        <MediaUpload
                            onSelect={ onSelectMedia }
                            value={ mediaId }
                            allowedTypes={ allowedTypes || ['video', 'audio'] }
                            render={ ({ open }) => (
                                <Button
                                    onClick={ open }
                                    isDefault
                                    isLarge
                                >
                                    { !mediaId && __('Choose a media', 'savvy-blocks') }
                                </Button>
                            )}
                        />
                    }
                    {
                        !!mediaId && media &&
                        <>
                            {
                                media?.mime_type?.match('video.*') &&
                                <ResponsiveWrapper
                                    naturalWidth={ media.media_details.width }
                                    naturalHeight={ media.media_details.height }
                                >
                                    <video controls>
                                        <source src={ mediaUrl } type={ media?.mime_type } />
                                    </video>
                                </ResponsiveWrapper>
                            }
                            {
                                media?.mime_type?.match('image.*') &&
                                <ResponsiveWrapper
                                    naturalWidth={ media.media_details.width }
                                    naturalHeight={ media.media_details.height }
                                >
                                    <img src={ mediaUrl } alt="image"/>
                                </ResponsiveWrapper>
                            }
                            {
                                !media?.mime_type?.match('image.*|video.*') &&
                                <span style={{color: '#fff', display: 'block', padding: '5px', margisvottom: '5px', backgroundColor: '#007cba'}}>{ media?.title?.rendered }</span>

                            }
                        </>

                    }
                    { !!mediaId &&
                        <Flex style={{marginTop: 16}}>
                            <MediaUpload
                                title={ __('Replace media', 'savvy-blocks') }
                                value={ mediaId }
                                onSelect={ onSelectMedia }
                                allowedTypes={ allowedTypes || ['video', 'audio'] }
                                render={ ({ open } ) => (
                                    <Button onClick={ open } isDefault isLarge>
                                        { __('Replace media', 'savvy-blocks') }
                                    </Button>
                                )}
                            />
                            <Button
                                onClick={ () => onSelectMedia({ id: 0, url: '' }) }
                                isLink
                                isDestructive
                            >
                                { __('Remove media', 'savvy-blocks') }
                            </Button>
                        </Flex>
                    }
                </MediaUploadCheck>
            </div>
        </BaseControl>
    )
}

export default MediaSelector;
