import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor'
import {
    BaseControl,
    PanelBody,
    RangeControl,
    TextControl,
    ComboboxControl,
} from '@wordpress/components'
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

function SearchAddress(props) {
    const {
        onChange,
    } = props

    const [ query, setQuery ] = useState('');
    const [ options, setOptions ] = useState([]);

    useEffect(() => {
        if (query) {
            const timeOut = setTimeout(function() {
                fetch(`https://nominatim.openstreetmap.org/search.php?q=${query}&format=jsonv2&limit=3`, {
                    method: "GET",
                    cache: "no-cache",
                }).then((response) => {
                    response.json().then((data) => {
                        setOptions(data.map(item => {
                            return {label: item.display_name, value: [item.lat, item.lon]}
                        }))
                    })
                });
            }, 500);

            return () => clearTimeout(timeOut);
        }
    }, [query]);
    return (
        <ComboboxControl
            label="Address"
            value={ query }
            onChange={ (value) => {
                value && onChange(value);
                setQuery('');
                setOptions([])
            }  }
            options={ options }
            onFilterValueChange={ setQuery }
            help={'Find coordinates by address'}
        />
    );
}

function Inspector( props ) {
    const {
        attributes: {
            coordinates,
            label,
            tooltip
        },
        setAttributes,
        clientId
    } = props

    const { isInserted, parentAttributes } = useSelect((select) => {
        let parent = select('core/block-editor').getBlockParents(clientId, true)[0];
        const parentAttributes = select('core/block-editor').getBlockAttributes(parent);

        return {
            isInserted: select('core/block-editor').wasBlockJustInserted(clientId),
            parentAttributes: parentAttributes
        }
    })

    useEffect(() => {
        isInserted && setAttributes({ coordinates : {...coordinates, lat: parentAttributes.coordinates.lat, long: parentAttributes.coordinates.long } });
    }, [])

    return (
        <InspectorControls>
            <PanelBody>
                <SearchAddress
                    onChange={ (value) => setAttributes({ coordinates:{ lat: Number(value[0]), long: Number(value[1]) } }) }
                />
                <BaseControl>
                    <RangeControl
                        label={ __('Long', 'savvy-blocks') }
                        value={ coordinates?.long }
                        onChange={ ( value ) => setAttributes({ coordinates: { ...coordinates,long: value } }) }
                        step={ 0.001 }
                        min={ -180 }
                        max={ 180 }
                    />
                </BaseControl>
                <BaseControl>
                    <RangeControl
                        label={ __('Lat', 'savvy-blocks') }
                        value={ coordinates?.lat }
                        onChange={ ( value ) => setAttributes({ coordinates: { ...coordinates, lat: value } }) }
                        step={ 0.001 }
                        min={ -180 }
                        max={ 180 }
                    />
                </BaseControl>
                <BaseControl>
                    <TextControl
                        label={ __('Label', 'savvy-blocks') }
                        value={ label }
                        onChange={ ( value ) => setAttributes({ label: value }) }
                    />
                </BaseControl>
                <BaseControl>
                    <TextControl
                        label={ __('Hover Text', 'savvy-blocks') }
                        value={ tooltip }
                        onChange={ ( value ) => setAttributes({ tooltip: value }) }
                    />
                </BaseControl>
            </PanelBody>
        </InspectorControls>
    );
}

export default Inspector;
