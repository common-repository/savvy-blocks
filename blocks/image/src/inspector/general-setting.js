import { __ } from "@wordpress/i18n";
import {
    BaseControl,
    TextControl,
    SelectControl,
    Notice,
} from "@wordpress/components";

import { ImageSelector } from "/components/editor";
import BlockTypeSelector from "/components/editor/block-type-selector";

function GeneralSetting(props) {
    const { blockType, image, size, setAttributes, settings } = props;

    const fetchImageSizes = (imagedata) => {
        wp.apiFetch({
            path: "/wp/v2/media/" + imagedata.id,
        })
            .then((response) => {
                const sizes = {
                    thumbnail: {
                        url: response.media_details?.sizes.thumbnail?.source_url,
                        width: response.media_details?.sizes.thumbnail?.width,
                        height: response.media_details?.sizes.thumbnail?.height,
                    },
                    medium: {
                        url: response.media_details?.sizes?.medium?.source_url,
                        width: response.media_details?.sizes?.medium?.width,
                        height: response.media_details?.sizes?.medium?.height,
                    },
                    large: {
                        url: response.media_details?.sizes?.large?.source_url,
                        width: response.media_details?.sizes?.large?.width,
                        height: response.media_details?.sizes?.large?.height,
                    },
                    full: {
                        url: response.media_details?.sizes?.full?.source_url,
                        width: response.media_details?.width,
                        height: response.media_details?.height,
                    },
                    mime_type: response?.mime_type,
                };
                setAttributes({
                    image: { id: imagedata.id, url: response.source_url, sizes: sizes },
                });
            })
            .catch((error) => {
                console.error("Error fetching image sizes", error);
            });
    };

    const imageSizes = [
        { label: "_", value: "_" },
        { label: "Full size", value: "full" },
        { label: "Large", value: "large" },
        { label: "Medium", value: "medium" },
        { label: "Thumbnail", value: "thumbnail" },
    ];

    return (
        <>
            {image?.sizes?.mime_type == "image/webp" && (
                <Notice isDismissible={false}>
                    Web page images may not take image size ( large ) settings well
                </Notice>
            )}
            <BaseControl label={__("Select Image", "savvy-blocks")}>
                <ImageSelector
                    image={{ id: image?.id, url: image?.url }}
                    onSelectImage={fetchImageSizes}
                />
            </BaseControl>
            <SelectControl
                label="Image Size"
                value={image?.selectedSize}
                options={imageSizes.map((imgsizes) => {
                    return { label: imgsizes.label, value: imgsizes.value };
                })}
                onChange={(sizeselected) => {
                    setAttributes({
                        size: {
                            ...size,
                            width: image?.sizes[sizeselected]?.width ? image?.sizes[sizeselected]?.width + "px" : image?.sizes["full"]?.width + "px",
                            height: image?.sizes[sizeselected]?.height ? image?.sizes[sizeselected]?.height + "px" : image?.sizes["full"]?.height + "px",
                        },
                    });
                    setAttributes({
                        image: {
                            ...image,
                            url: image?.sizes[sizeselected]?.url ? image?.sizes[sizeselected]?.url : image?.url,
                            selectedSize: sizeselected,
                        },
                    });
                }}
            />
            <BaseControl>
                <TextControl
                    label={__("Image Alt", "savvy-blocks")}
                    value={image?.alt}
                    onChange={(text) => setAttributes({ image: { ...image, alt: text } })}
                />
            </BaseControl>
            <BlockTypeSelector
                blockName="savvy-blocks/image"
                label="image Type"
                blockType={blockType}
                settings={settings}
                setAttributes={setAttributes}
            />
        </>
    );
}

export default GeneralSetting;
