import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
} from '@wordpress/components';

import {
    DisplayTypeTabs,
    Gap,
} from '/components/editor';


import { 
    FlexAlignment,
    Gutter,
    RowColumns 
} from './editor';

const Inspector = (props) => {
    const {
        attributes: {
            flexAlignment,
            gap,
            gutter,
            rowColumns,
        },
        setAttributes,
    } = props;

    return (
    <InspectorControls>
            <Panel>
                <PanelBody title={ __('Flex Alignment', 'savvy-blocks') } initialOpen={ false }>
                        <DisplayTypeTabs>
                            <FlexAlignment
                                value={ flexAlignment }
                                onChange={ ( value ) => { setAttributes( { flexAlignment: value } ) } }
                            />
                        </DisplayTypeTabs>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody title={ __('Gap', 'savvy-blocks') } initialOpen={ false }>
                        <DisplayTypeTabs>
                            <Gap
                                value={ gap }
                                onChange={ ( value ) => { setAttributes( { gap: value } ) } }
                            />
                        </DisplayTypeTabs>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody title={ __('Gutter', 'savvy-blocks') } initialOpen={ false }>
                        <DisplayTypeTabs>
                            <Gutter
                                value={ gutter }
                                onChange={ ( value ) => { setAttributes( { gutter: value } ) } }
                            />
                        </DisplayTypeTabs>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody title={ __('Row Columns', 'savvy-blocks') } initialOpen={ false }>
                        <DisplayTypeTabs>
                            <RowColumns
                                value={ rowColumns }
                                onChange={ ( value ) => { setAttributes( { rowColumns: value } ) } }
                            />
                        </DisplayTypeTabs>
                </PanelBody>
            </Panel>
    </InspectorControls>
    )
}

export default Inspector;
