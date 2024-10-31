import { __ } from "@wordpress/i18n";
import {
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";
import {
    BaseControl,
    Button,
    ResponsiveWrapper,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from '@wordpress/core-data';

const ImageSelector = (props) => {
    const {
        image: {
            id: imageId,
            url: imageUrl,
        },
        mimtype = 'image',
        onSelectImage
    } = props;

    const image = useSelect(
        ( select ) => imageId && select( coreStore ).getMedia( imageId, { context: 'view' } ),
        [ imageId ]
    );

    return (
        <BaseControl>
            <div className="editor-post-featured-image">
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={ onSelectImage }
                        value={ imageId }
                        allowedTypes={ [mimtype] }
                        render={ ({ open }) => (
                            <Button
                                className={ !imageId ?
                                    'editor-post-featured-image__toggle' :
                                    'editor-post-featured-image__preview'
                                }
                                onClick={ open }
                            >
                                { !imageId && __('Choose an image', 'savvy-blocks') }
                                { !!imageId && image &&
                                <ResponsiveWrapper
                                    naturalWidth={ image.media_details.width }
                                    naturalHeight={ image.media_details.height }
                                >
                                    <img src={ imageUrl } alt="image"/>
                                </ResponsiveWrapper>
                                }
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
                { !!imageId &&
                <MediaUploadCheck>
                    <MediaUpload
                        title={ __('Replace image', 'savvy-blocks') }
                        value={ imageId }
                        onSelect={ onSelectImage }
                        allowedTypes={ [mimtype] }
                        render={ ({ open } ) => (
                            <Button onClick={ open } isDefault isLarge>
                                { __('Replace image', 'savvy-blocks') }
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
                }
                { !!imageId &&
                <MediaUploadCheck>
                    <Button
                        onClick={ () => onSelectImage({ id: 0, url: '' }) }
                        isLink
                        isDestructive
                    >
                        { __('Remove image', 'savvy-blocks') }
                    </Button>
                </MediaUploadCheck>
                }
            </div>
        </BaseControl>
    )
}

export default ImageSelector;
