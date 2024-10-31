import BlockTypeSelector from "/components/editor/block-type-selector";
const GeneralSetting = (props) => {
    const {
        blockType,
        setAttributes,
        settings,
    } = props;

    return (
     <BlockTypeSelector
         blockName="savvy-blocks/paragraph"
         label="Paragraph Type"
         blockType={ blockType }
         settings={ settings }
         setAttributes={ setAttributes }
     />
    )
}

export default GeneralSetting;
