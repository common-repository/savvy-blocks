import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    ToggleControl,
} from '@wordpress/components';

import { Settings } from '/components/context';

import  {
    SpacingSetting,
}  from '/components/editor';

import {
    BulletSetting,
    GapSetting,
    GeneralSetting,
    ListStyleSetting
} from './inspector/';

const Inspector = (props) => {
    const {
        attributes: {
            blockType,
            bullet,
            listType,
            listStyle,
            icon,
            isAdvanced = true,
            gap,
            margin,
            padding,
            top
        },
        setAttributes,
    } = props;

    const { settings } = useContext( Settings )
    
    return (
    <InspectorControls>
        <PanelBody>
            <GeneralSetting
                listType={ listType }
                blockType = { blockType }
                settings = { settings }
                setAttributes={ setAttributes }
            />
            <ToggleControl
                label={ __('Is advanced Bullet ?', 'savvy-blocks') }
                checked={ isAdvanced }
                onChange={ ( state ) => {
                    setAttributes( { isAdvanced: state } )
                } }
            />
        </PanelBody>
        {
            blockType === 'custom' &&
            <>

                    <PanelBody title={ __('Spacing', 'savvy-blocks') } initialOpen={ false }>
                        <SpacingSetting
                            padding={ padding }
                            margin={ margin }
                            setAttributes={ setAttributes }
                        />
                        <GapSetting
                            gap={ gap }
                            onChange={ (value) =>setAttributes({ gap: value}) }
                        />
                        {
                            isAdvanced === true &&
                            <GapSetting
                                title={ __('Gap Betwwen Bullet & Content', 'savvy-blocks') }
                                gap={ bullet?.gap }
                                onChange={ (value) => setAttributes({ bullet: { ...bullet, gap: value } }) }
                            />
                        }
                    </PanelBody>
                {    isAdvanced === true ? 
                    ( 
                        <BulletSetting
                            bullet = { bullet }
                            listType={ listType }
                            top = { top }
                            setAttributes={ setAttributes }
                        />
                    ) : ( 
                        <PanelBody title={ __('List Style', 'savvy-blocks') } initialOpen={ false }>
                            <ListStyleSetting
                                listStyle = { listStyle }
                                icon = { icon }
                                setAttributes = { setAttributes }
                            />
                        </PanelBody>
                    ) 
                }
            </>
        }
    </InspectorControls>
    )
}

export default Inspector;
