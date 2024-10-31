<?php

add_action( 'rest_api_init', 'savvy_icon_svg_register_rest_api' );
function savvy_icon_svg_register_rest_api()
{
    register_rest_route( 'savvy/v1', '/icon-svg/list', [
        'methods' => 'GET',
        'callback' => 'savvy_icon_svg_list',
    ]);

    register_rest_route( 'savvy/v1', '/icon-svg/add', [
        'methods' => 'GET',
        'callback' => 'savvy_icon_svg_add',
        'permission_callback' => function () {
            return current_user_can( 'manage_options' );
        }
    ]);

    register_rest_route( 'savvy/v1', '/icon-svg/remove', [
        'methods' => 'GET',
        'callback' => 'savvy_savvy_icon_svg_hide_from_media_library',
        'permission_callback' => function () {
            return current_user_can( 'manage_options' );
        }
    ]);
}

function savvy_icon_svg_list( $data )
{


    $ids = get_option('savvy_svg_icons', []);

    if (empty($ids)) {
        return [];
    }

    $args = array(
        'post__in' => $ids,
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'no_found_rows' => true,
        'posts_per_page' => -1,
        'post_status' => 'any'
    );

    $icons = get_posts($args);

    return $icons;
}

function savvy_icon_svg_add( $data )
{
    $id = $data->get_param('id');
    if( get_option( 'savvy_svg_icons' ) === false ) {
        add_option( 'savvy_svg_icons', [$id], '', true );
    } else {
        $ids = get_option('savvy_svg_icons');
        if(!in_array($id, $ids, true)){
            array_push($ids, $id);
        }
        update_option( 'savvy_svg_icons', $ids );
    }

    /* */
    $args = array(
        'post__in' => $ids,
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'no_found_rows' => true,
        'posts_per_page' => -1,
        'post_status' => 'any'
    );

    $icons = get_posts($args);

    return $icons;
}

function savvy_savvy_icon_svg_hide_from_media_library( $data )
{
    $id = $data->get_param('id');
    if( get_option( 'savvy_svg_icons' ) !== false ) {
        $ids = array_diff( get_option('savvy_svg_icons'), [$id] );
        wp_delete_attachment($id);
        update_option( 'savvy_svg_icons', $ids );
    }

    return $id;
}

add_filter( 'ajax_query_attachments_args', 'icon_svg_hide_from_media_library' );
function icon_svg_hide_from_media_library( $args ) {
    if ( ! is_admin() ) {
        return;
    }

    $args[ 'post__not_in' ] = get_option( 'savvy_svg_icons' );

    return $args;
}


function savvy_blocks_icon_svg_register_block()
{
    $assets = include_once SAVVY_PATH . 'blocks/icon-svg/build/index.asset.php';

    wp_register_script(
        'savvy-blocks-icon-svg',
        plugins_url('/icon-svg/build/index.js', __FILE__),
        $assets['dependencies'],
        $assets['version']
    );

    wp_register_style(
        'savvy-blocks-icon-svg',
        plugins_url('/icon-svg/build/style-index.css', __FILE__),
        array(),
        $assets['version']
    );

    register_block_type(
        SAVVY_PATH . 'blocks/icon-svg',
        array(
            'api_version' => 2,
            'editor_script' => 'savvy-blocks-icon-svg',
            'render_callback' => 'savvy_blocks_icon_svg_render_callback',
            'attributes'      => array(
                'blockType' => [
                    'type' => 'string',
                    'default'=> 'custom'
                ],
                'border'=> [
                    'type'=> 'object'
                ],
                'boxShadow'=> [
                    'type'=> 'string'
                ],
                'icon' => [
                    'type' => 'number'
                ],
                'background'=> [
                    'type'=> 'object',
                ],
                'color'=> [
                    'type'=> 'string'
                ],
                'elementStates'=> [
                    'type'=> 'object'
                ],
                'opacity'=> [
                    'type'=> 'number'
                ],
                'size'=> [
                    'type'=> 'object'                
                ],
                'padding'=> [
                    'type'=> 'object'
                ],
                'flexAlignment'=> [
                    'type'=> 'object'
                ],
                'rotation'=> [
                    'type'=> 'number'
                ],
                'gap'=> [
                    'type'=> 'object'
                ],
                'blockImage'=> [
                    'type' => 'object'
                ]
            ),
            'skip_inner_blocks' => false,
        )
    );
}

add_action('init', 'savvy_blocks_icon_svg_register_block');

function savvy_blocks_icon_svg_render_callback($attributes, $content, $block)
{
    $icon = $attributes['icon'] ?? '';
    $svg = $icon && get_attached_file($icon) ? file_get_contents(get_attached_file($icon)) : '';
    $classList = [];
    isset( $attributes['className'] ) && array_push($classList,$attributes['className']);
    isset( $attributes['gap'] ) && array_push($classList,savvy_gap_class_generator($attributes['gap'] ?? []));
    isset( $attributes['padding'] ) && array_push($classList,savvy_padding_class_generator($attributes['padding'] ?? []));
    isset( $attributes['flexAlignment'] ) && array_push($classList,savvy_flex_alignment_class_generator($attributes['flexAlignment'] ?? []));
    isset( $attributes['background']['color'] ) && array_push($classList, "bg-{$attributes['background']['color']}");
    isset( $attributes['elementStates']['hover']['background']['color'] ) &&  array_push($classList, "bg-hover-{$attributes['elementStates']['hover']['background']['color']}");
    isset( $attributes['boxShadow'] ) &&  array_push($classList, "shadow-{$attributes['boxShadow']}");
    isset( $attributes['elementStates']['hover']['boxShadow'] ) &&  array_push($classList, "shadow-hover-{$attributes['elementStates']['hover']['boxShadow']}");

    $style = [];
    isset( $attributes['color'] ) && array_push($style, " --savvy-icon-svg-color: {$attributes['color']};" ?? []);
    isset( $attributes['elementStates']['hover']['color'] ) && array_push($style, " --savvy-icon-svg-hover-color: {$attributes['elementStates']['hover']['color']};" ?? []);
    isset( $attributes['size'] ) && !savvy_check_empty($attributes['size']) && array_push($style,savvy_item_width_class_generator($attributes['size']) . ";");
    isset( $attributes['opacity'] ) && array_push($style, " --savvy-icon-svg-opacity: {$attributes['opacity']}%;");
    isset( $attributes['elementStates']['hover']['opacity'] ) && array_push($style, " --savvy-icon-svg-hover-opacity: {$attributes['elementStates']['hover']['opacity']}%;");
    isset( $attributes['rotation'] ) &&  array_push($style, "--savvy-icon-svg-rotation: {$attributes['rotation']}deg;");
    isset( $attributes['elementStates']['hover']['rotation'] ) &&  array_push($style, "--savvy-icon-svg-hover-rotation: {$attributes['elementStates']['hover']['rotation']}deg;");
    isset( $attributes['background']['gradient'] ) && array_push($style, "--savvy-icon-svg-bg-gradient: {$attributes['background']['gradient']};");
    isset( $attributes['elementStates']['hover']['background']['gradient'] ) &&  array_push($style, "--savvy-icon-svg-hover-bg-gradient: {$attributes['elementStates']['hover']['background']['gradient']};");

    $border_color_class = savvy_border_color_class_generator($attributes);
    if($border_color_class) {
        array_push($classList, $border_color_class);
    }

    $border_style_class = savvy_border_style_class_generator($attributes);
    if($border_style_class) {
        array_push($classList, $border_style_class);
    }

    $border_radius_variables = savvy_border_radius_variable_generator($attributes);
    
    if($border_radius_variables) {
        array_push($classList, "savvy-responsive-border-radius");
        array_push($style, $border_radius_variables);
    }

    $border_width_variables = savvy_border_width_variable_generator($attributes);
    if($border_width_variables) {
        array_push($classList, "savvy-responsive-border-width");
        array_push($style, $border_width_variables);
    }
    if ( !is_admin() ) {
        ob_start();
		?>
			<span
                class="savvy-icon-svg savvy-responsive-svg-size savvy-responsive-border-width <?php echo esc_attr(implode(' ', $classList)) ?>
"
                style= "<?php echo esc_attr(implode(' ', $style))?>"
            >
                <?php echo esc_attr($svg) ?>
            </span>
        <?php
        return ob_get_clean();
    }
}

function savvy_check_empty($array){
    foreach($array as $i)
     if($i!=null) 
      return FALSE;
    return TRUE;
}