import { __ } from "@wordpress/i18n";
import { useContext } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import {
    Panel,
    PanelBody,
    ToggleControl,
    TextControl,
    BaseControl,
    __experimentalDivider as Divider,
    Notice
} from "@wordpress/components";
import { Settings } from "/components/context";

import { Overlay, DisplayTypeTabs } from "/components/editor";

import {
    BorderSetting,
    SpacingSetting,
    SizingSetting,
    PanelProSettings,
    TypographySetting,
    Color,
    AnimationSetting,
    StateTabs,
    EffectSetting,
    effectChangedOptions,
    ShowClassList,
} from "/components/editor";

import {
    GeneralSetting,
    LayoutSetting,
    Focal,
    IconSelector,
} from "./inspector/";

const Inspector = (props) => {
    const {
        attributes: {
            blockType,
            border,
            image,
            margin,
            overlay,
            size,
            imageSettings,
            textAlign,
            textColor,
            animation,
            background,
            effects,
        },
        setAttributes,
    } = props;

    /**
     * the savvy-setting data setAttributes in first load , is in edit.js and function useDefault()
     * with useDefault() in edit.js in first load the savvy-setting data goes to attributes with useDefault()
     */
    const { settings } = useContext(Settings);

    return (
        <InspectorControls>
            <Panel>
                <PanelBody>
                    <GeneralSetting
                        blockType={blockType}
                        settings={settings}
                        image={image}
                        size={size}
                        setAttributes={setAttributes}
                    />
                </PanelBody>
            </Panel>
            {blockType === "custom" && (
                <>

                        <Panel>
                            <PanelBody title={__("Size", "savvy-blocks")} initialOpen={false}>
                                <LayoutSetting size={size} setAttributes={setAttributes} />
                                <Divider />
                                <ToggleControl
                                    label={__("use Aspect Ratio ?", "savvy-blocks")}
                                    checked={imageSettings?.ratio}
                                    onChange={(state) => {
                                        setAttributes({
                                            imageSettings: { ...imageSettings, ratio: state },
                                        });
                                    }}
                                />
                                {imageSettings?.ratio && (
                                    <TextControl
                                        label={__("Enter Ratio", "savvy-blocks")}
                                        value={imageSettings?.ratioSize}
                                        help="like : 2/3 OR 6/4 and .."
                                        onChange={(state) => {
                                            setAttributes({
                                                imageSettings: { ...imageSettings, ratioSize: state },
                                            });
                                        }}
                                    />
                                )}
                                <SizingSetting size={size} setAttributes={setAttributes} />
                            </PanelBody>
                        </Panel>
                        <Panel>
                            <PanelBody
                                title={__("Overlay", "savvy-blocks")}
                                initialOpen={false}
                            >
                                    <Overlay
                                        overlay={overlay}
                                        onChange={(value) => {
                                            setAttributes({ overlay: value });
                                        }}
                                    />
                            </PanelBody>
                        </Panel>
                        <Panel>
                            <PanelBody
                                title={__("Spacing", "savvy-blocks")}
                                initialOpen={false}
                            >
                                <SpacingSetting margin={margin} setAttributes={setAttributes} />
                            </PanelBody>
                        </Panel>
                        <Panel>
                            <PanelBody
                                title={__("Border", "savvy-blocks")}
                                initialOpen={false}
                            >
                                <BorderSetting border={border} setAttributes={setAttributes} />
                            </PanelBody>
                        </Panel>
                    <Panel>
                        <PanelBody title="Lazy Load">
                            <ToggleControl
                                label={__("Is Lazy?", "savvy-blocks")}
                                checked={imageSettings?.lazy}
                                onChange={(state) => {
                                    setAttributes({
                                        imageSettings: { ...imageSettings, lazy: state },
                                    });
                                }}
                            />
                        </PanelBody>
                        <PanelBody
                            title={__("Animation", "savvy-blocks")}
                            initialOpen={false}
                        >
                            <AnimationSetting
                                animation={animation}
                                setAttributes={setAttributes}
                            />
                        </PanelBody>

                            <Panel>
                                <PanelBody
                                    title={__("Effects", "savvy-blocks")}
                                    initialOpen={false}
                                >
                                    <StateTabs>
                                        <EffectSetting
                                            value={effects}
                                            setAttributes={setAttributes}
                                        />
                                    </StateTabs>
                                </PanelBody>
                                {effectChangedOptions(effects) && (
                                    <ShowClassList
                                        attr={effects}
                                        classGenerator={effectChangedOptions}
                                        themeClass="savvy-changed-options"
                                    />
                                )}
                            </Panel>
                    </Panel>

                    <PanelProSettings
                        title="focal point"
                        hasToggle={true}
                        checked={imageSettings?.focal}
                        onChange={(value) => {
                            setAttributes({
                                imageSettings: { ...imageSettings, focal: value },
                            });
                        }}
                    >
                            <Focal
                                url={image?.url}
                                imageSettings={imageSettings}
                                setAttributes={setAttributes}
                            />


                        {!image?.selectedSize && (
                            <Notice isDismissible={false} status="error">
                                Please Select a Image Size or Define Width & height for image from size options to can work with Focal Point
                            </Notice>
                        )}
                    </PanelProSettings>
                    <PanelProSettings
                        title="Mask Image"
                        hasToggle={true}
                        checked={imageSettings?.shapeShow}
                        onChange={(value) => {
                            setAttributes({
                                imageSettings: { ...imageSettings, shapeShow: value },
                            });
                        }}
                    >
                        <IconSelector
                            imageSettings={imageSettings}
                            setAttributes={setAttributes}
                            settings={settings}
                        />
                    </PanelProSettings>
                    <PanelProSettings
                        title="Caption"
                        hasToggle={true}
                        checked={imageSettings?.Caption}
                        onChange={(value) => {
                            setAttributes({
                                imageSettings: { ...imageSettings, Caption: value },
                            });
                        }}
                    >
                        <TextControl
                            label={__("Caption Text", "savvy-blocks")}
                            value={imageSettings?.TextCaption}
                            className="caption-image-text"
                            onChange={(text) =>
                                setAttributes({
                                    imageSettings: { ...imageSettings, TextCaption: text },
                                })
                            }
                        />
                        <TypographySetting
                            textAlign={textAlign}
                            textColor={textColor}
                            setAttributes={setAttributes}
                        />

                        <BaseControl label={__("Background Color", "savvy-blocks")}>
                            <Color
                                value={ background?.color || ""}
                                onChange={(color) =>
                                    setAttributes({
                                        background: { ...background, color: color.slug },
                                    })
                                }
                            />
                        </BaseControl>
                    </PanelProSettings>
                </>
            )}
        </InspectorControls>
    );
};

export default Inspector;
