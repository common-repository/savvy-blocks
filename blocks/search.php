<?php

function savvy_blocks_search_register_block()
{
    $assets = include_once SAVVY_PATH . 'blocks/search/build/index.asset.php';

    wp_register_script(
        'savvy-blocks-search',
        plugins_url('/search/build/index.js', __FILE__),
        $assets['dependencies'],
        $assets['version']
    );

    wp_register_style(
        'savvy-blocks-search',
        plugins_url('/search/build/style-index.css', __FILE__),
        array(),
        $assets['version']
    );

    register_block_type(
        SAVVY_PATH . 'blocks/search',
        array(
            'api_version' => 2,
            'editor_script' => 'savvy-blocks-search',
            'render_callback' => 'savvy_blocks_search_render_callback',
            'skip_inner_blocks' => false,
        )
    );
}
add_action('init', 'savvy_blocks_search_register_block');

function savvy_renderSearchForm($text_content, $category_content, $tag_content, $custom_meta_content)
{
    $output = '';

    $output .= '<div class="savvy-search parent-search">';
    $output .= '<div class="autocomplete position-relative">';
    $output .= '<form method="get" id="search-form">';
    $output .= '<div class="row">';
    $output .= $text_content;
    $output .= $category_content;
    $output .= $tag_content;
    $output .= $custom_meta_content;
    $output .= '<div class="col">';
    $output .= '<div id="submit-filter" name="search_text" class="form-fields button-search d-flex flex-column justify-content-center">' . 'Search' . '</div>';
    $output .= '</div>';
    $output .= '</div>';
    $output .= '</form>';
    $output .= '</div>';
    $output .= '</div>';

    return $output;
}

function savvy_render_category_field($search_category_value) {
    // CATEGORY
    $default_category = get_option('default_category');
    $categories = get_categories([
        'orderby' => 'term_order',
        'order'   => 'ASC',
        // 'exclude' => $default_category,
    ]);
    $search_category_values = $search_category_value ? explode(',', $search_category_value) : [];
    $search_category_name = [];
    foreach ( $search_category_values as $cat) {
        if (get_cat_name($cat)) {
            array_push($search_category_name, get_cat_name($cat));
        }
    }

    $category_options = '';
    foreach ($categories as $category) {
        setup_postdata($category);
        $category_options .= '<li class="option' . (in_array($category->term_id, $search_category_values) ? ' selected' : '') . '"><span class="option-text" data-id="' . $category->term_id . '" name="' . $category->term_id . '">' . $category->name . '</span></li>';
    }
    wp_reset_postdata();

    $category_content = '';

    $category_content .= '<div class="col">';
    $category_content .= '<div class="scrollbar select-menu position-relative">';
    $category_content .= '<div class="form-fields select-btn d-flex flex-row justify-content-between align-items-center">';
    $category_content .= '<span class="input-name">' . implode(', ', $search_category_name) . '</span>';
    $category_content .= '<input type="hidden" name="category" class="input-value" value="' . $search_category_value . '">';
    $category_content .= '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4" fill="none"><path d="M8 0L0 0L4 4L8 0Z" fill="currentColor"/></svg>';
    $category_content .= '</div>';
    $category_content .= '<div class="options">';
    $category_content .= '<ul class="scroll-ul">';
    $category_content .= $category_options;
    $category_content .= '</ul>';
    $category_content .= '</div>';
    $category_content .= '</div>';
    $category_content .= '</div>';

    return $category_content;
}

function savvy_render_tag_field($search_tag_value) {
    // TAG
    $tags = get_tags([
        'orderby' => 'term_order',
        'order'   => 'ASC',
    ]);

    $search_tag_values = $search_tag_value ? explode(',', $search_tag_value) : [];
    $search_tag_name = [];
    foreach ( $search_tag_values as $tag) {
        if (get_tag($tag)) {
            array_push($search_tag_name, get_tag($tag)->name);
        }
    }

    $tag_options = '';
    foreach ($tags as $tag) {
        setup_postdata($tag);
        $tag_options .= '<li class="option' . (in_array($tag->term_id, $search_tag_values) ? ' selected' : '') . '"><span class="option-text" data-id="' . $tag->term_id . '" name="' . $tag->term_id . '">' . $tag->name . '</span></li>';
    }
    wp_reset_postdata();

    $tag_content = '';
    $tag_content .= '<div class="col">';
    $tag_content .= '<div class="scrollbar select-menu position-relative">';
    $tag_content .= '<div class="form-fields select-btn d-flex flex-row justify-content-between align-items-center">';
    $tag_content .= '<span class="input-name">' . implode(', ', $search_tag_name) . '</span>';
    $tag_content .= '<input type="hidden" name="tag" class="input-value" value="' . $search_tag_value . '">';
    $tag_content .= '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4" fill="none"><path d="M8 0L0 0L4 4L8 0Z" fill="currentColor"/></svg>';
    $tag_content .= '</div>';
    $tag_content .= '<div class="options">';
    $tag_content .= '<ul class="scroll-ul">';
    $tag_content .= $tag_options;
    $tag_content .= '</ul>';
    $tag_content .= '</div>';
    $tag_content .= '</div>';
    $tag_content .= '</div>';

    return $tag_content;
}

function savvy_render_custom_taxonomy_field($post_type, $taxonomy) {
    $terms = get_terms($taxonomy);
    $search_taxonomy_value = isset($_GET[$taxonomy]) ? sanitize_text_field($_GET[$taxonomy]) : '';
    $search_taxonomy_values = $search_taxonomy_value ? explode(',', $search_taxonomy_value) : [];
    $search_taxonomy_names = [];
    foreach ( $search_taxonomy_values as $taxonomy_values) {
        if (get_term($taxonomy_values)) {
            array_push($search_taxonomy_names, get_term($taxonomy_values)->name);
        }
    }

    $term_options = '';
    foreach ($terms as $term) {
        $term_options .= '<li class="option' . (in_array($term->term_id, $search_taxonomy_values) ? ' selected' : '') . '"><span class="option-text" data-id="' . $term->term_id . '" name="' . $term->term_id . '">' . $term->name . '</span></li>';
    }
    $term_content = '';
    $term_content .= '<div class="col">';
    $term_content .= '<div class="scrollbar select-menu position-relative">';
    $term_content .= '<div class="form-fields select-btn d-flex flex-row justify-content-between align-items-center">';
    $term_content .= '<span class="input-name' . (empty($search_taxonomy_names) ? ' input-name-placeholder' : '') . '">' . (!empty($search_taxonomy_names) ? implode(', ', $search_taxonomy_names) : 'Select')  . '</span>';
    $term_content .= '<input type="hidden" name="' . $taxonomy . '" class="input-value" value="' . $search_taxonomy_value . '">';
    $term_content .= '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4" fill="none"><path d="M8 0L0 0L4 4L8 0Z" fill="currentColor"/></svg>';
    $term_content .= '</div>';
    $term_content .= '<div class="options">';
    $term_content .= '<ul class="scroll-ul">';
    $term_content .= $term_options;
    $term_content .= '</ul>';
    $term_content .= '</div>';
    $term_content .= '</div>';
    $term_content .= '</div>';

    return $term_content;
}

function savvy_blocks_search_render_callback($attributes, $content)
{
    $auto_complete = isset($attributes['autoComplete']) ? $attributes['autoComplete'] : '';
    $custom_search = isset($attributes['customSearch']) ? $attributes['customSearch'] : '';
    $advanced_custom_search = isset($attributes['advancedCustomSearch']) ? $attributes['advancedCustomSearch'] : false;
    $search_inputs = isset($attributes['searchFields']) ? $attributes['searchFields'] : '';
    $selectedPostType = isset($attributes['postType']) ? $attributes['postType'] : '';
    $text_input = isset($search_inputs['text']) ? $search_inputs['text'] : '';
    $category_input = isset($search_inputs['category']) ? $search_inputs['category'] : '';
    $tag_input = isset($search_inputs['tag']) ? $search_inputs['tag'] : '';

    $search_text_value = isset($_GET['search_text']) ? sanitize_text_field($_GET['search_text']) : '';
    $search_category_value = isset($_GET['category']) ? sanitize_text_field($_GET['category']) : '';
    $search_tag_value = isset($_GET['tag']) ? sanitize_text_field($_GET['tag']) : '';
    $custom_taxonomies = isset($search_inputs['customTaxonomies']) ? $search_inputs['customTaxonomies'] : [];
    $input_search_classes = ['savvy-input-search'];
    /* Check AutoComplete CheckBoxes*/
    $auto_complete === true ? array_push($input_search_classes, 'savvy-input-search-suggestion') : '';
    $custom_search === true ? array_push($input_search_classes, 'savvy-input-search-custom') : '';

    $placeHolder = $auto_complete === true
                ? ( $custom_search === true ? 'Select Post Or Search...' : 'Select Post' )
                : 'Search...';

    $text_content = '';
    if (filter_var($text_input, FILTER_VALIDATE_BOOLEAN)) {
        if ($advanced_custom_search['active']) {
            $text_content .= '<div class="col">';
            $text_content .= '<input type="text" autocomplete="off" id="input-search" class="form-fields savvy-input-search savvy-input-search-advanced" name="search_text" data-post-type="' . $selectedPostType . '" data-taxonomies="' . htmlspecialchars(wp_json_encode($advanced_custom_search['fields']), ENT_QUOTES, 'UTF-8') . '" value="' . $search_text_value . '" placeholder="' . $placeHolder . '">';
            $text_content .= '</div>';
        } else {
            $text_content .= '<div class="col">';
            $text_content .= '<input type="text" autocomplete="off"  id="input-search" class="form-fields ' . implode(' ', $input_search_classes) . '" name="search_text" data-post-type="'. $selectedPostType .'" value="' . $search_text_value . '" placeholder="' . $placeHolder . '">';
            $text_content .= '</div>';
        }
    }

    $category_content = '';
    /*if (filter_var($category_input, FILTER_VALIDATE_BOOLEAN)) {
        $category_content = savvy_render_category_field($search_category_value);
    }*/

    $tag_content = '';
    /*if (filter_var($tag_input, FILTER_VALIDATE_BOOLEAN)) {
        $tag_content = savvy_render_tag_field($search_tag_value);
    }*/

    $custom_taxonomies_content = '';
    foreach ($custom_taxonomies as $taxonomy) {
        $custom_taxonomies_content .= savvy_render_custom_taxonomy_field($selectedPostType, $taxonomy);
    }

    $searchFormHTML = savvy_renderSearchForm($text_content, $category_content, $tag_content, $custom_taxonomies_content);

    if (!is_admin()) {
        ob_start();
        echo esc_attr($searchFormHTML);
        return ob_get_clean();
    }
}

add_action( 'rest_api_init', 'savvy_autocomplete_search_rest_api' );
function savvy_autocomplete_search_rest_api()
{
    register_rest_route( 'savvy/v1', '/search', [
        'methods' => 'POST',
        'callback' => 'savvy_autocomplete_search_callback',
    ]);
}

function savvy_autocomplete_search_callback(WP_REST_Request $request) {
    $params = $request->get_params();
    $search_text = $params['search_text'] ?? '';
    $post_type = $params['post_type'] ?? '';
    $taxonomies = $params['taxonomies'] ?? '';
    $post_per_page = $params['count'] ?? '';
    $post_type_label = get_post_type_object($post_type)->label;

    $posts = get_posts([
        'post_type' => $post_type,
        'posts_per_page' => $post_per_page,
        's' => $search_text
    ]);

    $post_result = array_map(function($post) use ($post_type_label) {
        return [
            'id' => $post->ID,
            'title' => $post->post_title,
            'type' => 'post_type',
            'type_value' => $post->post_type,
            'type_name' => $post_type_label,
            'link' => get_permalink($post->ID)
        ];
    }, $posts);

    $terms_result = [];
    if ($taxonomies) {
        $terms = get_terms([
            'taxonomy'   => $taxonomies,
            'hide_empty' => false,
            'name__like' => '1',
            'search' => $search_text,
            'number' => 2
        ]);
        $terms_result = array_map(function ($term) {
            return [
                'id' => $term->term_id,
                'title' => $term->name,
                'type' => 'taxonomy',
                'type_value' => $term->taxonomy,
                'type_name' => get_taxonomy($term->taxonomy)->label
            ];
        }, $terms);
    }

    $result = array_merge($post_result, $terms_result);
    echo wp_json_encode($result);
}
