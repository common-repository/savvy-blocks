import { __ } from '@wordpress/i18n';
import { mediaUpload } from '@wordpress/editor';
import {
    Button,
    Flex,
    Icon,
    FormFileUpload,
    Modal,
    __experimentalGrid as Grid,
    __experimentalDivider as Divider,
} from '@wordpress/components'
import { addQueryArgs } from '@wordpress/url';
import { 
    useState, 
    useEffect 
} from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch';


function IconSelector ( props ) {
    const {
        icon: selectedIcon,
        setAttributes
    } = props;

    const [ icons, setIcons ] = useState([]); // Array of svg File Names in the custom forlder
    const [ isOpen, setOpen ] = useState( false );
    const [ selectedToRemove, setSelectedToRemove ] = useState();
    const openModal = () => setOpen( true );
    const closeModal = () => setOpen( false );
    const IconItems = [];

    useEffect( () => {
        apiFetch( { path: `/savvy/v1/icon-svg-block-list/list` } )
            .then (
                ( data ) => {
                    setIcons( data )
                }
            );
    }, [] );

    icons.map(icon => {
        IconItems.push(
            <span 
                key={icon.ID} className={ icon.ID === selectedIcon?.id ? 'icon-item is-selected' : 'icon-item' }
                onClick={ () => { 
                    icon.ID !== selectedIcon?.id ? setAttributes({ icon:{ ...selectedIcon, id: icon.ID, url: icon?.guid }}) :  setAttributes({ icon:{ ...selectedIcon, id: null, url: null }}) 
                }
            }
            >
                <img
                    src={icon.guid}
                />
                <Icon style={{color: "#cc1818"}} className="savvy-icon-svg-remove" icon="remove" size="12" onClick={(e) => {e.stopPropagation();removeIconModal(icon.ID);}}/>
            </span>
        )
    });

    const upload = ( files ) => {
        mediaUpload( {
            allowedTypes: [ 'image/svg+xml' ],
            filesList: files,
            onFileChange: ( images ) => {
                apiFetch( { path: addQueryArgs( `/savvy/v1/icon-svg-block-list/add`, {id: images[0].id} ) } )
                    .then (
                        ( data ) => {
                            apiFetch( { path: `/savvy/v1/icon-svg-block-list/list` } )
                                .then (
                                    ( data ) => {
                                        setIcons( data )
                                    }
                                );
                        }
                    );
            },
            onError: (error) => {
                console.log('onError', error)
            },
        } );
    }

    const removeIconModal = (id) => {
        openModal();
        setSelectedToRemove(id)
    }

    const removeIcon = (id) => {
        apiFetch( { path: addQueryArgs( `/savvy/v1/icon-svg-block-list/remove`, {id: id} ) } )
            .then (
                ( data ) => {
                    apiFetch( { path: `/savvy/v1/icon-svg-block-list/list` } )
                        .then (
                            ( data ) => {
                                closeModal();
                                setIcons( data )
                            }
                        );
                }
            );
    }
    
    return (
        <>
            <Grid className="icon-list" alignment="bottom" columns={ 3 }>
                { IconItems }
            </Grid>
            <FormFileUpload
                isLarge
                className="block-library-gallery-add-item-button"
                icon="insert"
                accept="image/svg+xml"
                onChange={ ( event ) => {
                    upload(event.currentTarget.files)
                } }

            >
                Add Icon
            </FormFileUpload>
            { isOpen && (
                <Modal title="Remove Icon?" onRequestClose={ closeModal }>
                    <p>All icon-svg blocks that used this icon no longer show anything.</p>
                    <Flex justify="end">
                        <Button variant="secondary" onClick={ closeModal }>
                            Cancel
                        </Button>
                        <Button variant="secondary" isDestructive onClick={ () => removeIcon(selectedToRemove) }>
                            Remove
                        </Button>
                    </Flex>
                </Modal>
            ) }
        </>
    )
}

export default IconSelector;
