import { __ } from "@wordpress/i18n";
import {
    ToggleControl,
    __experimentalText as Text,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

const ToggleMetaSidebar = ( props ) => {
    const {
        label,
        metaKey,
        postType,
        editable,
    } = props;

    const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );
    const metaValue = meta?.[ metaKey ] ?? false;
    const updateMetaValue = ( newValue ) => {
        setMeta( { ...meta, [ metaKey ]: newValue } );
    };

    return (
        <>
            { editable ?
                <ToggleControl
                    label={ __( label, "savvy-blocks" ) }
                    checked={ metaValue }
                    onChange={ updateMetaValue }
                /> :
                <Text
                    color="#888888"
                    isBlock={ true }
                >{ metaValue ? 'True' : 'False' }</Text>
            }
        </>
    )
}

export default ToggleMetaSidebar;