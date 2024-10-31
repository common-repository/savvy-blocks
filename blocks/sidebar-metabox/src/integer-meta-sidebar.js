import { __ } from '@wordpress/i18n';
import {
    NumberControl,
    __experimentalText as Text,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

const IntegerMetaSidebar = (props) => {
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
                <NumberControl
                    label={ __( label, "savvy-blocks" ) }
                    value={ metaValue }
                    onChange={ updateMetaValue }
                /> :
                <Text
                    color="#888888"
                    isBlock={ true }
                >{ metaValue || '-' }</Text>
            }
        </>
    )
}

export default IntegerMetaSidebar;
