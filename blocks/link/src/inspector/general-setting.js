import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element'
import { SelectControl } from '@wordpress/components';
import {  __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';


function GeneralSetting ( props ) {
    const { 
        link,
        setAttributes, 
    } = props;

    const Rel_OPTIONS = [
        { label: '-', value: '' },
        { label: __( 'No Opener', 'savvy-blocks' ), value: 'noopener', disabled: link?.opensInNewTab },
        { label: __( 'No Follow', 'savvy-blocks' ), value: 'nofollow' },
    ];

    useEffect(() => {
        if( link?.opensInNewTab === true ) {
            if (link?.rel && link?.rel.indexOf('noopener') === -1) {
                setAttributes({ link: { ...link, rel: [...link?.rel, 'noopener'] }})
            }
        } 
    }, [link?.opensInNewTab])

    console.log('link', link)
    return (
        <>
            <LinkControl
                searchInputPlaceholder='Search here...'
                value={ link }
                settings={ [
                    {
                        id: 'opensInNewTab',
                        title: 'New tab?',
                    },
                    {
                        id: 'downloadLink',
                        title: 'Download link?',
                    }
                ]}
                onChange={ ( link ) => setAttributes( { link: link } ) }
                withCreateSuggestion={ true }
                createSuggestion={ (inputValue) => setAttributes({
                    post: {
                        ...link,
                        title: inputValue,
                        type: 'custom-url',
                        id: Date.now(),
                        url: inputValue
                    }
                }) }
                createSuggestiosvuttonText={ (newValue) => `${ __('Create:', 'savvy-blocks') } ${ newValue }` }
            />
            <SelectControl
                multiple
                label = { __( 'Rel', 'savvy-blocks' ) }
                options = { Rel_OPTIONS }
                onChange = { ( selectedItem ) => setAttributes({ link: { ...link, rel: [...selectedItem] }})}
                value = { link?.rel ? [...link?.rel] : [] }
            />
        </>
    )
}

export default GeneralSetting;