import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    SelectControl,
    Notice,
    __experimentalInputControl as InputControl,
} from '@wordpress/components';

import { ImageSelector } from "/components/editor";

function GeneralSetting ( props ) {
    const {
        url,
        source,
        poster,
        setAttributes
    } = props;

    const SOURCE_OPTIONS = [
        { label: '-', value: '' },
        { label: 'Audio', value: 'audio' },
        { label: 'Video', value: 'video' },
        { label: 'Youtube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' }
    ]

    return (
        <>
            <SelectControl
                label={ __('source Type', 'savvy-blocks') }
                value={ source }
                options={ SOURCE_OPTIONS }
                onChange={ ( value ) => setAttributes( { 
                    source: value,
                    // mediaSettings: undefined,
                    // media: undefined,
                    // url: undefined,
                } ) }
            />
            {
                (source === 'youtube' || source === 'vimeo') &&
                <InputControl
                    type="text"
                    label={ __('Url', 'savvy-blocks') }
                    value={ url }
                    onChange={ (url) => setAttributes({ url: url }) }
                />
            }
            { source === 'youtube' && (
                <span style={{color: '#fff', display: 'block', padding: '5px', margisvottom: '5px', marginTop: '-20px', backgroundColor: '#f4a2a2'}}>
                    Please use youtube ID.<br/>https://www.youtube.com/embed/<b>ID</b>
                </span>
            )}
            { source === 'vimeo' && (
                <span style={{color: '#fff', display: 'block', padding: '5px', margisvottom: '20px', marginTop: '-20px', backgroundColor: '#f4a2a2'}}>
                    Please use vimeo ID.<br/>https://vimeo.com/<b>ID</b>
                </span>
            )}

            {
                (source === 'video' || source === 'youtube' || source === 'vimeo') &&
                <BaseControl label={ __('Thumbnail', 'savvy-blocks') }>
                    <ImageSelector
                        image={ { id: poster?.id, url: poster?.url } }
                        onSelectImage={
                            ( img ) => {
                                setAttributes( { poster: { id: img.id, url: img.url } } )
                            }
                        }
                    />
                </BaseControl>
            }

        </>
    )
}

export default GeneralSetting;
