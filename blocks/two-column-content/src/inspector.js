import { __ } from '@wordpress/i18n'
import { InspectorControls } from '@wordpress/block-editor';
import {
    Panel,
    PanelBody
} from '@wordpress/components';

import {
    GeneralSetting,
    COLUMNS_OPTIONS,
} from './inspector/index';

const Inspector = ( props ) => {
    const {
        attributes: {
            colsLayout,
            reverse,
        },
        setAttributes,
        isHiddenLayout,
        setIsHiddenLayout
    } = props;

    function setDefaultColAttribute( col1 ){
        setAttributes({ colsLayout: {
                ...colsLayout,
                _: 12, sm:12, md:col1, lg:col1
            }
        });
        setIsHiddenLayout( true )
    }

    return (
        <>
            <InspectorControls>
                <Panel>
                    <PanelBody>
                        <GeneralSetting
                            colsLayout={ colsLayout }
                            reverse= { reverse }
                            setAttributes = { setAttributes }
                        />
                    </PanelBody>
                </Panel>
            </InspectorControls>
            {!isHiddenLayout && <div>
                <div className='select-layout'>
                    <p>Select Two columns Layout:</p>
                    <ul className='block-editor-block-variation-picker__variations'>
                        { COLUMNS_OPTIONS.map(( option, index ) => {
                            return <li key={ index }>
                                <button
                                    type='button'
                                    className='components-button block-editor-block-variation-picker__variation is-secondary has-icon'
                                    onClick={ () => setDefaultColAttribute( option.value ) }
                                >
                                    { COLUMNS_OPTIONS[index]?.svg }
                                </button>
                                <span>{ COLUMNS_OPTIONS[index]?.label }</span>
                            </li>
                        })}
                    </ul>
                </div>
            </div>}
        </>
    )
}

export default Inspector
