import { __ } from "@wordpress/i18n";
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import ImageMetaSidebar from './image-meta-sidebar';
import IntegerMetaSidebar from './integer-meta-sidebar';
import NumberMetaSidebar from './number-meta-sidebar';
import SelectMetaSidebar from './select-meta-sidebar';
import StringMetaSidebar from './string-meta-sidebar';
import ToggleMetaSidebar from './toggle-meta-sidebar';
import PostTypeMetaSidebar from './post-type-meta-sidebar';
import MediaMetaSidebar from './media-meta-sidebar';

const METABOX_TYPES = {
    'string': StringMetaSidebar,
    'boolean': ToggleMetaSidebar,
    'number': NumberMetaSidebar,
    'integer': IntegerMetaSidebar,
    'image': ImageMetaSidebar,
    'media': MediaMetaSidebar,
    'select': SelectMetaSidebar,
    'post_type': PostTypeMetaSidebar,
}

let MetaSidebarSettingPanel = () => {
    const metasElements = [];
    const [ metas, setMetas ] = useState( [] );
    const postType = useSelect( ( select ) => {
        return select( 'core/editor' ).getCurrentPostType();
    }, [] );

    useEffect( () => {
        apiFetch( { path: `/savvy/v1/post-metas/${postType}` } )
            .then (
                ( data ) => {
                    setMetas( data )
                }
            );
    }, [] );

    metas.map((meta) => {
        const MetaBox = METABOX_TYPES[ meta.type ];

        meta.show_in_sidebar && metasElements.push(
            <BaseControl label={ __(meta.name, 'savvy-blocks') } >
                <MetaBox
                    metaKey={ meta.meta_key }
                    postType={ postType }
                    editable={ meta.editable }
                />
            </BaseControl>
        )
    });

    return (
        metasElements.length &&
        <PluginDocumentSettingPanel className='meta-sidebar-setting-panel' title='Custom Meta'>
            { metasElements }
        </PluginDocumentSettingPanel>
    )
};

registerPlugin('savvy-blocks-meta-sidebar-panel', { icon: '', render: MetaSidebarSettingPanel });
