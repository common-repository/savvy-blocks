import {__} from "@wordpress/i18n";
import {
    SelectControl,
    __experimentalText as Text,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

const SelectMetaSidebar = ( props ) => {
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
    const options = svCustomFields?.[`select_meta_${ metaKey }`] ? svCustomFields[`select_meta_${ metaKey }`]?.split(',') : [];

    return (
        <>
            { editable ?
                <SelectControl
                    label={ __( label, 'savvy-blocks' ) }
                    value={ metaValue }
                    options={
                        [
                            { label: '-', value: '' },
                            ...( options.map( ( item ) => {
                                return { label: item, value: item }
                            } ) )
                        ]
                    }
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

export default SelectMetaSidebar;
