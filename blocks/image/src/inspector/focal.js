import { FocalPointPicker, Dashicon, Button } from "@wordpress/components";
import classnames from "classnames";

const Focal = (props) => {
    const { url , imageSettings , setAttributes } = props;
    const icon = <Dashicon icon="image-rotate" />;
    const className = classnames(["savvy_reset_button"]);

    return (
        <>
            <FocalPointPicker
                url={url}
                value={imageSettings?.focalPoint}
                onDragStart={(value) => {
                    setAttributes({
                        imageSettings: { ...imageSettings, focalPoint: value },
                    });
                }}
                onDrag={(value) => {
                    setAttributes({
                        imageSettings: { ...imageSettings, focalPoint: value },
                    });
                }}
                onChange={(value) => {
                    setAttributes({
                        imageSettings: { ...imageSettings, focalPoint: value },
                    });
                }}
            />
            <Button
                icon={icon}
                iconSize={18}
                className={className}
                onClick={() => {
                    setAttributes({
                        imageSettings: { ...imageSettings, focalPoint: { x: 0.5, y: 0.5 } },
                    });
                }}
            ></Button>
        </>
    );
};


export { Focal as default };
