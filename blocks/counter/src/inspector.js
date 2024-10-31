import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor'
import {
    Panel,
    PanelBody,
    TextControl,
    BaseControl,
    RangeControl
} from '@wordpress/components';

import  {
    SpacingSetting,
    TypographySetting
}  from '/components/editor';


const marks = [
    {
        value: 200,
        label: '200',
    },
    {
        value: 300,
        label: '300',
    },
    {
        value: 400,
        label: '400',
    },
    {
        value: 500,
        label: '500',
    },
    {
        value: 600,
        label: '600',
    },
    {
        value: 700,
        label: '700',
    },
    {
        value: 800,
        label: '800',
    },
    {
        value: 900,
        label: '900',
    },
];


function Inspector(props) {
    const {
        attributes: {
            endVal,
            startVal,
            separator,
            prefix,
            suffix,
            duration,
            size,
            weight,
            margin,
            padding,
            textAlign,
            textColor,
        },
        setAttributes,
    } = props;



    return (
        <InspectorControls>
            <Panel>
                <PanelBody
                    title={ __( 'Global settings', 'savvy-blocks' ) }
                    initialOpen={ true }
                >
                    <TextControl
                        type="number"
                        label="End"
                        value={endVal}
                        onChange={(value) => setAttributes({ endVal: parseInt(value) })}
                    />
                    <TextControl
                        type="number"
                        label="Start"
                        value={startVal}
                        onChange={(value) => setAttributes({ startVal: parseInt(value) })}
                    />
                    <TextControl
                        label="Separator"
                        value={separator}
                        onChange={(value) => setAttributes({ separator: value })}
                    />
                    <TextControl
                        label="Prefix"
                        value={prefix}
                        onChange={(value) => setAttributes({ prefix: value })}
                    />
                    <TextControl
                        label="Suffix"
                        value={suffix}
                        onChange={(value) => setAttributes({ suffix: value })}
                    />
                    <BaseControl>
                        <RangeControl
                            label={ __("Duration", "savvy-blocks") }
                            value={ duration }
                            onChange={ ( value ) => setAttributes({ duration: value }) }
                            min={ 1 }
                            max={ 30 }
                        />
                    </BaseControl>
                    <BaseControl>
                        <RangeControl
                            label={ __("Size", "savvy-blocks") }
                            value={ size }
                            onChange={ ( value ) => setAttributes({ size: value }) }
                            min={ 10 }
                            max={ 128 }
                        />
                    </BaseControl>
                    <BaseControl>
                        <RangeControl
                            label={ __("Weight", "savvy-blocks") }
                            value={ weight }
                            onChange={ ( value ) => setAttributes({ weight: value }) }
                            min={ 200 }
                            max={ 900 }
                            step={ 100 }
                            marks={ marks }
                            withInputField={ false }
                        />
                    </BaseControl>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody title={ __('Typography', 'savvy-blocks') } initialOpen={ false } >
                    <TypographySetting
                        textAlign={ textAlign }
                        textColor= { textColor }
                        setAttributes={ setAttributes }
                    />
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody title={ __('Spacing', 'savvy-blocks') } initialOpen={ false } >
                    <SpacingSetting
                        margin={ margin }
                        padding={ padding }
                        setAttributes={ setAttributes }
                    />
                </PanelBody>
            </Panel>



        </InspectorControls>
    );
}

export default Inspector;
