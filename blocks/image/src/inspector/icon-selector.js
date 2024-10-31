import { mediaUpload } from "@wordpress/editor";
import { __ } from "@wordpress/i18n";
import {
    Icon,
    FormFileUpload,
    CheckboxControl,
    SelectControl,
    __experimentalGrid as Grid,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

import blobURL from "./default/blob.svg";
import circleURL from "./default/circle.svg";
import squareURL from "./default/square.svg";
import uploadSvg from "./default/upload.svg";
import defaultPng from "./default/default.png";


import blobSVG from "!!raw-loader!./default/blob.svg";
import circleSVG from "!!raw-loader!./default/circle.svg";
import squareSVG from "!!raw-loader!./default/square.svg";

function IconSelector(props) {
    const { imageSettings, setAttributes } = props;
    const [icons, setIcons] = useState([]);

    const svgOptions = imageSettings?.shapeIcon?.svg == true ? "" : "svg_options";
    useEffect(() => {
        const storedIcons = JSON.parse(localStorage.getItem("imageShape"));
        if (storedIcons) {
            setIcons(storedIcons);
        }
    }, []);

    const updateIconsInLocalStorage = (updatedIcons) => {
        localStorage.setItem("imageShape", JSON.stringify(updatedIcons));
        setIcons(updatedIcons);
    };

    const maskPositions = [

        { label: "left top", value: "left top" },
        { label: "left center", value: "left center" },
        { label: "left bottom", value: "left bottom" },
        { label: "right top", value: "right top" },
        { label: "right center", value: "right center" },
        { label: "right bottom", value: "right bottom" },
        { label: "right bottom", value: "right bottom" },
        { label: "center top", value: "center top" },
        { label: "center center", value: "center center" },
        { label: "center bottom", value: "center bottom" },

    ];

    const iconsDefault = [
        { ID: 0, guid: defaultPng, title: "default", svgContent: '' , svg : true },
        { ID: 1, guid: blobURL, title: "blob", svgContent: blobSVG , svg : true },
        { ID: 2, guid: circleURL, title: "circle", svgContent: circleSVG , svg : true},
        { ID: 3, guid: squareURL, title: "square", svgContent: squareSVG , svg : true },
    ];

    const combinedIcons = iconsDefault.concat(icons);

    const IconItems = combinedIcons.map((icon) => (
        <span
            key={icon.ID}
            className={
                icon.ID === imageSettings?.shapeIcon?.ID
                    ? "icon-item icon-mask is-selected"
                    : "icon-item icon-mask"
            }
            onClick={() => {
                setAttributes({ imageSettings: { ...imageSettings, shapeIcon: icon } });
            }}
        >
      <img src={icon.guid} />
            {iconsDefault.find((defaultIcon) => defaultIcon?.ID === icon?.ID) ? null : (
                <Icon
                    style={{ color: "#cc1818" }}
                    className="savvy-icon-svg-remove"
                    icon="remove"
                    size="12"
                    onClick={(e) => {
                        e.stopPropagation();
                        removeIcon(icon.ID);
                    }}
                />
            )}
            <p>{icon?.title}</p>
    </span>
    ));

    const upload = async (files) => {
        mediaUpload({
            filesList: files,
            onFileChange: async (images) => {
                const updatedIcons = await Promise.all(images.map(async (image) => {
                    const response = await fetch(image.url);
                    let imgJson = [];
                    if (image?.mime_type == "image/svg+xml"){
                        const svgContent = await response.text();
                        imgJson = { ID: image.id, guid: image.url, svgContent: svgContent , svg : true}
                    } else {
                        imgJson = { ID: image.id, guid: image.url, svgContent: "" , svg : false}
                    }
                    return imgJson;
                }));
                updateIconsInLocalStorage([...icons, ...updatedIcons]);
            },
            onError: (error) => {
                console.log("onError", error);
            },
        });
    };


    const removeIcon = (id) => {
        const updatedIcons = icons.filter((icon) => icon?.ID !== id);
        updateIconsInLocalStorage(updatedIcons);
    };

    return (
        <>
            <div className="shape_mask">
                <div className="shape-mask-list">
                    <p>Shape</p>
                    <Grid className="icon-list " alignment="bottom" columns={3}>
                        {IconItems}
                    </Grid>
                </div>
                <FormFileUpload
                    isLarge
                    className="block-library-gallery-add-item-button shape-upload"
                    icon={<img src={uploadSvg} alt="Upload Icon" />}
                    accept="image"
                    onChange={(event) => {
                        upload(event.currentTarget.files);
                    }}
                >
                    Upload Shape
                </FormFileUpload>
                <SelectControl
                    label="Mask Position"
                    value={imageSettings?.maskPosition}
                    options={maskPositions.map((pos) => {
                        return { label: pos.label, value: pos.value };
                    })}
                    onChange={(position) => {
                        setAttributes({
                            imageSettings: {
                                ...imageSettings,
                                maskPosition: position
                            },
                        });
                    }}
                />
                <div className={svgOptions}>
                <CheckboxControl
                    label={__("Flip shape horizontally", "savvy-blocks")}
                    checked={imageSettings?.flipHorizontally}
                    onChange={(state) => {
                        setAttributes({
                            imageSettings: { ...imageSettings, flipHorizontally: state },
                        });
                    }}
                />
                <CheckboxControl
                    label={__("Flip shape vertically", "savvy-blocks")}
                    checked={imageSettings?.flipVertically}
                    onChange={(state) => {
                        setAttributes({
                            imageSettings: { ...imageSettings, flipVertically: state },
                        });
                    }}
                />
                </div>
            </div>
        </>
    );
}

export default IconSelector;
