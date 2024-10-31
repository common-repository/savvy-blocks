import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    PanelBody,
    RangeControl,
    SelectControl,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';

import { Color, DisplayTypeTabs } from '/components/editor';

import { Top } from '../editor/index';

function BulletSetting (props ) {
    const {
       bullet,
       listType,
       top,
       setAttributes
    } = props;

    return (
        <>
            <PanelBody title={ __('Bullet', 'savvy-blocks') } initialOpen={ false }>
                <BaseControl label={ __('Bullet Color', 'savvy-blocks') }>
                    <Color
                        value={ bullet?.bgColor }
                        onChange={ (color) => setAttributes({ bullet: { ...bullet, bgColor: color?.slug } }) }
                    />
                </BaseControl>
                <RangeControl
                    label={ __('Bullet Size', 'savvy-blocks') }
                    value={ bullet?.size }
                    onChange={ (value) => setAttributes({ bullet: { ...bullet, size: value } }) }
                    min={ 2 }
                    max={ 96 }
                />
                <UnitControl
                    label={ __('Border Radius', 'savvy-blocks') }
                    labelPostion={ 'edge' }
                    units={[
                        { value: 'px', label: 'px', default: 0 },
                        { value: '%', label: '%', default: 0 },
                    ]}
                    value={ bullet?.radius }
                    onChange={ (unit) => setAttributes({ bullet: { ...bullet, radius: unit } }) }
                />
                {
                    listType === 'ol' &&
                    <>
                        <BaseControl
                            label={__('Text Color', 'savvy-blocks')}
                            help={__('Use for number of Numbered list', 'savvy-blocks')}
                        >
                            <Color
                                value={  bullet?.color }
                                onChange={ (color) => setAttributes({ bullet: { ...bullet, color: color?.slug } }) }

                            />
                        </BaseControl>
                        <BaseControl
                            label={ __('Font size', 'savvy-blocks') }
                            help={ __('Use for Numbered list', 'savvy-blocks') }
                        >
                            <UnitControl
                                labelPostion={ __('edge', 'savvy-blocks') }
                                units={[
                                    { value: 'px', label: 'px', default: 0 }
                                ]}
                                value={  bullet?.fontSize }
                                onChange={ (unit) => setAttributes({ bullet:{ ...bullet,fontSize: unit }}) }
                            />
                        </BaseControl>
                    </>
                }
                <SelectControl
                    label={ __('Alignment', 'savvy-blocks') }
                    value={ bullet?.flexAlignment }
                    options={
                        [
                            { label: '-', value: '' },
                            { label: 'start', value: 'start' },
                            { label: 'center', value: 'center' },
                            { label: 'end', value: 'end' },
                        ]
                    }
                    onChange={ (value) => setAttributes({ bullet: { ...bullet, flexAlignment: value } }) }
                />
                            
                <DisplayTypeTabs>
                    <Top
                        value = { top }
                        onChange = { setAttributes }
                    />
                </DisplayTypeTabs>
                

            </PanelBody>
        </>
    );
}

export default BulletSetting;
