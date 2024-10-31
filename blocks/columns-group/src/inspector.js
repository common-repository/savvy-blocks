import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';

import {
    Panel,
    PanelBody,
} from '@wordpress/components';

import {
    ColumnGroupSetting,
    SpacingSetting,
} from './inspector/index';

const Inspector = (props) => {
    const {
        attributes: {
            columnGroup,
            margin,
        },
        setAttributes,
    } = props;

    return (
        <InspectorControls>
            <PanelBody title={ __('Column Group Settings', 'savvy-blocks') } initialOpen={ false } >
                <ColumnGroupSetting
                    columnGroup= { columnGroup }
                    onChange={ ( value ) => { setAttributes( { columnGroup: value } ) } }
                />
            </PanelBody>
            <PanelBody title={ __('Spacing', 'savvy-blocks') } initialOpen={ false } >
                <SpacingSetting
                    margin={ margin }
                    setAttributes={ setAttributes }
                />
            </PanelBody>
        </InspectorControls>
    )
}

export default Inspector;