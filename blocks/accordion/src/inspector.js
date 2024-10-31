import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    dispatch,
    useSelect
} from '@wordpress/data';
import {
    BaseControl,
    PanelBody,
    SelectControl,
    ToggleControl,
    __experimentalUnitControl as UnitControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

import {
    DisplayTypeTabs,
    Gap,
} from '/components/editor';

import  {
    SpacingSetting,
    TypographySetting
}  from '/components/editor';

import {
    GeneralSetting,
    IconSetting,
} from './inspector/';

const Inspector = (props) => {
    const {
        attributes: {
            expand,
            gap,
            minHeight,
            icons,
            level,
            padding,
            textColor,
            blockType,
            openItemId,
        },
        setAttributes,
    } = props;

    const LEVEL_OPTIONS = [
        { label: __( 'H1' ), value: 'h1' },
        { label: __( 'H2' ), value: 'h2' },
        { label: __( 'H3' ), value: 'h3' },
        { label: __( 'H4' ), value: 'h4' },
        { label: __( 'H5' ), value: 'h5' },
        { label: __( 'H6' ), value: 'h6' },
        { label: __( 'P' ), value: 'p' },
    ];

    const { innerBlocks } = useSelect( ( select ) => {
        return {
            innerBlocks: select("core/block-editor").getBlocks(props.clientId)
        };
    } );

    const setActive = (itemIndex) => {
        openItemId !== -1 && dispatch('core/block-editor').updateBlockAttributes(innerBlocks[openItemId].clientId, {expanded: false})
        itemIndex !== -1 && dispatch('core/block-editor').updateBlockAttributes(innerBlocks[itemIndex].clientId, {expanded: true})
        setAttributes({ openItemId: itemIndex });
    };

    return (
        <InspectorControls>
            <GeneralSetting
                expand={ expand }
                blockType={ blockType }
                setAttributes={ setAttributes }
            />
            {
                !blockType || blockType === 'custom' &&
                <>
                    <PanelBody title={ __('Accordion', 'savvy-blocks') } initialOpen={ false } >
                        <UnitControl
                            label={ __('Min Height', 'savvy-blocks') }
                            units={[
                                { value: 'px', label: 'px', default: 0 },
                                { value: '%', label: '%', default: 0 },
                            ]}
                            value={ minHeight }
                            onChange={ ( value ) => { setAttributes( { minHeight: value } ) } }
                            help="Min height of each accordion items body"
                        />
                            <TypographySetting
                                textColor= { textColor }
                                setAttributes={ setAttributes }
                            />
                            <Divider/>
                            <BaseControl label={ __( 'Gap', 'savvy-blocks' ) }>
                                <DisplayTypeTabs>
                                    <Gap
                                        value={ gap }
                                        onChange={ ( value ) => { setAttributes( { gap: value } ) } }
                                    />
                                </DisplayTypeTabs>
                            </BaseControl>
                        <ToggleControl
                            label={ __('Is Expand?', 'savvy-blocks') }
                            checked={ expand }
                            onChange={ ( state ) => {
                                setAttributes( { expand: state } )
                            } }
                        />
                        <SelectControl
                            label={ __('Initial Open Item', 'savvy-blocks') }
                            value={ openItemId }
                            options={
                                [{ label: '-', value: -1 }, ...Array.from({ length: innerBlocks?.length }, (v, i) => ({ label: innerBlocks[i].attributes.title, value: i }))]
                            }
                            onChange={ (value) => setActive(parseInt(value))}
                        />
                    </PanelBody>
                    <PanelBody title={ __('Header', 'savvy-blocks') } initialOpen={ false } >
                        <SelectControl
                            label={ __( 'Level', 'savvy-blocks' ) }
                            options={ LEVEL_OPTIONS }
                            onChange={ ( value ) => { setAttributes( { level: value } ) } }
                            value={ level }
                        />
                            <SpacingSetting
                                padding={ padding }
                                setAttributes={ setAttributes }
                            />
                        <Divider/>
                            <IconSetting
                                icons={ icons }
                                setAttributes={ setAttributes }
                            />
                    </PanelBody>
                </>
            }
        </InspectorControls>
    )
}

export default Inspector;
