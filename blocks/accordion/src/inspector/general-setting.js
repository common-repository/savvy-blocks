import { __ } from '@wordpress/i18n';
import { useContext } from "@wordpress/element";
import { PanelBody } from '@wordpress/components';

import BlockTypeSelector from "/components/editor/block-type-selector";
import { Settings } from "/components/context";

const GeneralSetting = (props) => {
    const {
        blockType,
        setAttributes,
    } = props;

    const { settings } = useContext( Settings );

    return (
        <>
            { settings?.blocks?.[ "savvy-blocks/accordion" ]?.blockTypes &&
            <PanelBody>
                <BlockTypeSelector
                    blockName="savvy-blocks/accordion"
                    label="Accordion Type"
                    blockType={blockType}
                    settings={settings}
                    setAttributes={setAttributes}
                />
            </PanelBody>
            }
        </>
    )
}

export default GeneralSetting;
