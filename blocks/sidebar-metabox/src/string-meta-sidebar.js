import { __ } from '@wordpress/i18n';
import {
    TextControl,
    __experimentalText as Text,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

const StringMetaSidebar = ( props ) => {
    const {
        label,
        metaKey,
        postType,
        editable,
    } = props;
    const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );
    const metaValue = meta?.[ metaKey ] ?? '';
    const updateMetaValue = ( newValue ) => {
        setMeta( { ...meta, [ metaKey ]: newValue } );
    };

    return (
        <>
            { editable ?
                <TextControl
                    label={ __(label, "savvy-blocks") }
                    value={ metaValue }
                    onChange={ updateMetaValue }
                /> :
                <Text
                    color="#888888"
                    upperCase={ true }
                    isBlock={ true }
                >{ metaValue || '-' }</Text>
            }
        </>
    )
}

export default StringMetaSidebar;
