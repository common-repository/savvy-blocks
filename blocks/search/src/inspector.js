import { __ } from '@wordpress/i18n';
import {useEffect, useState} from '@wordpress/element';
import { useSelect, select } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import {
    InspectorControls,
} from '@wordpress/block-editor';
import {
    CheckboxControl,
    Panel,
    PanelBody,
    SelectControl,
    ToggleControl,
} from '@wordpress/components';

function Inspector(props) {
    const {
        attributes: {
            autoComplete,
            customSearch,
            advancedCustomSearch,
            postType,
            searchFields
        },
        setAttributes,
    } = props;

    const [postTypes, setPostTypes] = useState([{"name":"Post","slug":"post"}]);
    const [taxonomies, setTaxonomies] = useState([]);

    useSelect((select) => {
        const types = select('core').getPostTypes();
        const excludedSlugs = ['attachment'];
        if (types) {
            const contentPostTypes = types.filter(
                (type) => type.viewable === true && !excludedSlugs.includes(type.slug)
            );
            setPostTypes(contentPostTypes);
        }
    }, []);

    useEffect( () => {
        apiFetch( { path: `/savvy/v1/post-taxonomies/${postType}` } )
            .then (
                ( data ) => {
                    let postTypeTaxonomies = data.map((taxonomy) => ({label: taxonomy.name, value: taxonomy.taxonomy_key}))
                    setTaxonomies(postTypeTaxonomies);
                }
            );
    }, [postType] );

    const SEARCH_OPTIONS = [
        { label: 'Text', value: 'text' }
    ];

    const handleOptionSearchChange = (optionValue) => (value) => {
        setAttributes({ searchFields: { ...searchFields, [optionValue]: value } });
    };

    return (
        <InspectorControls>
            <PanelBody>
                <SelectControl
                    label="Select Post Type"
                    value={ postType || 'post'}
                    options={
                        [
                            ...postTypes.map((type) => ({
                                label: type?.labels?.singular_name || type.name,
                                value: type.slug,
                            }))
                        ]
                    }
                    onChange={ (data) => {
                        setAttributes({ postType: data, searchFields: {...searchFields, customMeta: []} }) }
                    }
                />
            </PanelBody>
            <PanelBody title={ __('Auto Complete', 'savvy-blocks') } initialOpen={ false }>
                <ToggleControl
                    label={__('Auto Complete With Post Title', 'savvy-blocks')}
                    checked={autoComplete}
                    onChange={(value) => setAttributes({ autoComplete: value })}
                />
                {
                    autoComplete && (
                        <ToggleControl
                            label={__('Custom Search', 'savvy-blocks')}
                            checked={customSearch}
                            onChange={(value) => setAttributes({ customSearch: value })}
                        />
                    )
                }
                {
                    autoComplete && customSearch && (
                        <ToggleControl
                            label={__('Advanced Custom Search', 'savvy-blocks')}
                            checked={advancedCustomSearch?.active}
                            onChange={(value) => setAttributes({ advancedCustomSearch: { ...advancedCustomSearch, active: value } })}
                        />
                    )
                }
                {
                    autoComplete && customSearch && advancedCustomSearch?.active &&
                        <>
                            {
                                taxonomies?.map( option => (
                                    <CheckboxControl
                                        label={option.label}
                                        checked={advancedCustomSearch?.fields?.includes(option.value) || false}
                                        onChange={(value) => {
                                            let fields = advancedCustomSearch?.fields || [];
                                            if (value) {
                                                fields.push(option.value)
                                            } else {
                                                const i = fields.indexOf(option.value)
                                                if (i > -1) {
                                                    fields.splice(i, 1)
                                                }
                                            }
                                            setAttributes( { advancedCustomSearch: { ...advancedCustomSearch, fields: fields} } )
                                        }}
                                    />
                                ))
                            }
                        </>
                }
            </PanelBody>
            <PanelBody title={ __('Search Inputs', 'savvy-blocks') } initialOpen={ false }>
                {
                    SEARCH_OPTIONS?.map(option => (
                        <CheckboxControl
                            label={option.label}
                            checked={searchFields[option?.value] || false}
                            onChange={handleOptionSearchChange(option.value)}
                        />
                    ))
                }
                {
                    taxonomies?.map( option => (
                        <CheckboxControl
                            label={option.label}
                            checked={searchFields?.customTaxonomies?.includes(option.value) || false}
                            onChange={(value) => {
                                let customTaxonomies = searchFields?.customTaxonomies || [];
                                if (value) {
                                    customTaxonomies.push(option.value)
                                } else {
                                    const i = customTaxonomies.indexOf(option.value)
                                    if (i > -1) {
                                        customTaxonomies.splice(i, 1)
                                    }
                                }
                                setAttributes({searchFields: {...searchFields, customTaxonomies: customTaxonomies}})
                            }}
                        />
                    ))
                }
            </PanelBody>
        </InspectorControls>
    );
}

export default Inspector;
