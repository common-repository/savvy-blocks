import { __ } from "@wordpress/i18n";
import {
    BaseControl,
    SelectControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";

function LayoutSetting(props) {
    const { size, setAttributes } = props;

    const OBJECT_FIT_OPTIONS = [
        { label: "-", value: "none" },
        { label: "Cover", value: "cover" },
        { label: "Contain", value: "contain" },
    ];

    const OBJECT_POSITION_OPTIONS = [
        { label: "Center", value: "center" },
        { label: "Top", value: "top" },
        { label: "Bottom", value: "bottom" },
    ];

    return (
        <>
            <BaseControl label={__("Object Fit", "savvy-blocks")}>
                <SelectControl
                    value={size?.objectFit || "none"}
                    options={OBJECT_FIT_OPTIONS}
                    onChange={(value) =>
                        setAttributes({ size: { ...size, objectFit: value } })
                    }
                />
            </BaseControl>
            <Divider />
            <BaseControl label={__("Object Position", "savvy-blocks")}>
                <SelectControl
                    value={size?.objectPosition || "center"}
                    options={OBJECT_POSITION_OPTIONS}
                    onChange={(value) =>
                        setAttributes({ size: { ...size, objectPosition: value } })
                    }
                />
            </BaseControl>
        </>
    );
}

export default LayoutSetting;
