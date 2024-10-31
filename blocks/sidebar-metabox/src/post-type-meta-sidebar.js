import {__} from "@wordpress/i18n";
import {
    ComboboxControl,
    ExternalLink,
    Flex,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import {
    useState,
    useEffect,
} from '@wordpress/element';
const { useSelect } = wp.data;

const PostTypeMetaSidebar = ( props ) => {
    const {
        label,
        metaKey,
        postType,
        editable,
    } = props;

    const [ filteredOptions, setFilteredOptions ] = useState( [] )
    const [ options, setOptions ] = useState( [] )
    const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );
    const metaValue = meta?.[ metaKey ] ?? false;
    const updateMetaValue = ( newValue ) => {
        setMeta( { ...meta, [ metaKey ]: newValue } );
    };
    const pagesPosts = useSelect( ( select ) => {
        return select( 'core' ).getEntityRecords( 'postType', metaKey )
    } )

    const selectedPost = useSelect( ( select ) => {
        return select( 'core' ).getEntityRecord('postType','post', metaValue)
    }, [ metaValue ] )

    useEffect( () => {
        setOptions(pagesPosts?.map( ( post ) => ( { value: post.id, label: post.title?.raw || 'no title'} ) ))
    }, [ pagesPosts ] )

    useEffect( () => {
        options?.length && setFilteredOptions( options )
    }, [ options ] )

    return (
        <>
            { editable ?
                <ComboboxControl
                    label={ __( label, 'savvy-blocks' ) }
                    value={ metaValue }
                    onChange={ updateMetaValue }
                    options={ filteredOptions }
                    onFilterValueChange={ ( inputValue ) =>
                        setFilteredOptions(
                            options.filter( ( option ) =>
                                option.label
                                    .toLowerCase()
                                    .includes( inputValue.toLowerCase() )
                            )
                        )
                    }
                /> :
                <Flex>
                    <ExternalLink href={ selectedPost?.link }>
                        { selectedPost?.title?.rendered }
                    </ExternalLink>
                </Flex>
            }
        </>
    )
}

export default PostTypeMetaSidebar;
