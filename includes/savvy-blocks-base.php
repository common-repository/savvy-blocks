<?php
if ( ! defined( 'ABSPATH' ) ) exit;
class savvyBlocksBase
{
    static $instance = false;

    protected function __construct()
    {
        $this->register_api();
        add_action('plugins_loaded', function() {
            load_plugin_textdomain(
                'savvy-blocks',
                false,
                __DIR__ . '/../languages'
            );
        });

        add_action('admin_head', [ $this, 'localize_settings' ]);
        add_action('wp_enqueue_scripts', [ $this, 'localize_settings' ]);


        add_action('init', [ $this, 'register_base_scripts' ]);
        do_action('savvy_base_init');


        add_action('register_new_user', [$this, 'savvy_blocks_admin_color']);
        add_action('wp_enqueue_scripts', [ $this, 'globalScripts' ]);
        add_action('admin_enqueue_scripts', [ $this, 'globalScripts' ]);
        add_action( 'wp_enqueue_scripts', [ $this, 'load_dashicons_front_end' ] );
        add_action('admin_head', [ $this, 'admin_localize_settings' ]);
        add_action('wp_enqueue_scripts', [ $this, 'view_localize_settings' ]);
        add_filter('block_categories_all', [ $this, 'add_savvy_blocks_category' ], 10, 2);
        if (!defined('savvyBLOCKS_VERSION')) {
            define('savvyBLOCKS_VERSION', '0.13.0');
        }

        $this->register_blocks();
    }

    public static function singletom()
    {
        if (!static::$instance) {
            static::$instance = new static;
        }
        return static::$instance;
    }

    function localize_settings()
    {
        wp_register_script('savvy-settings', false);
        wp_enqueue_script('savvy-settings');
    }

    public function view_localize_settings()
    {
        $json_content = get_option('savvy_block_savvy_setting_json_content');
        $savvysettings_file = get_savvysettings_file();
        $settings = savvy_CombineSettingsThemeJson($json_content,json_decode($savvysettings_file));
        wp_localize_script('savvy-settings', 'savvy_breakpoints', json_decode($settings)->breakpointsValue ?? null);
    }

    public function admin_localize_settings()
    {
        $json_content = get_option('savvy_block_savvy_setting_json_content');
        $savvysettings_file = get_savvysettings_file();
        $settings = savvy_CombineSettingsThemeJson($json_content,json_decode($savvysettings_file));

        wp_localize_script('savvy-settings', 'svPluginInfo', array(
            'svPluginUrl' => plugin_dir_url(__FILE__),
        ));

        wp_localize_script('savvy-settings', 'svSettings', json_decode($settings));

        /** Localize Custom Fields */
        if (get_option('savvy_blocks_custom_fields')) {
            $custom_fields_obj = new stdClass();
            foreach (get_option('savvy_blocks_custom_fields') as $custom_field) {
                $custom_fields_obj->$custom_field = get_option('savvy_blocks_custom_fields_'.$custom_field);
            }
            wp_localize_script('savvy-settings', 'svCustomFields',$custom_fields_obj);
        }
    }

    public function load_dashicons_front_end()
    {
        wp_enqueue_style( 'dashicons' );
    }
    private function register_api()
    {
        add_action( 'rest_api_init', function () {
            register_rest_route( 'savvy/v1', '/post-metas(?:/(?P<post_type_key>\w+))?', array(
                'methods' => 'GET',
                'callback' => [$this, 'get_post_metas'],
            ) );
        } );

        add_action( 'rest_api_init', function () {
            register_rest_route( 'savvy/v1', '/post-taxonomies(?:/(?P<post_type_key>\w+))?', array(
                'methods' => 'GET',
                'callback' => [$this, 'get_post_taxonomies'],
            ) );
        } );

        add_action( 'rest_api_init', function () {
            register_rest_route( 'savvy/v1', '/block-type/add', [
                'methods' => 'POST',
                'callback' => [$this, 'block_type_add'],
            ]);
            register_rest_route( 'savvy/v1', '/block-type/remove', [
                'methods' => 'POST',
                'callback' => [$this, 'block_type_remove'],
            ]);
        } );
    }

    public function block_type_add( WP_REST_Request $request )
    {
        $params = $request->get_params();
        $blockName = $params['blockName'] ?? '';
        $blockTypeName = $params['blockTypeName'] ?? '';
        $attributes = $params['attributes'] ?? '';
        $savvy_setting_json_content = get_option('savvy_block_savvy_setting_json_content');
        if (get_option( 'savvy_block_savvy_setting_json_content' ) === false ) {
            add_option( 'savvy_block_savvy_setting_json_content', '{}', '', true );
        }

        if (!isset($savvy_setting_json_content['blocks'][$blockName])) {
            $savvy_setting_json_content['blocks'][$blockName] = (object)[
                'blockTypes' => [
                    $blockTypeName => $attributes
                ]
            ];
        } else {
            if (!isset($savvy_setting_json_content['blocks'][$blockName]->blockTypes)) {
                $savvy_setting_json_content['blocks'][$blockName]->blockTypes = (object)[ $blockTypeName => $attributes];
            } else {
                $savvy_setting_json_content['blocks'][$blockName]->blockTypes[$blockTypeName] = $attributes;
            }
        }

        update_option( 'savvy_block_savvy_setting_json_content', $savvy_setting_json_content );
        return $savvy_setting_json_content;
    }

    public function block_type_remove( WP_REST_Request $request )
    {
    }

    public function get_post_metas(WP_REST_Request $request)
    {
        $post_model = new savvyBlocks_PostTypeModel();
        $meta_model = new savvyBlocks_PostMetaModel();
        if ($request['post_type_key']) {
            $post_type_id = $post_model->where('post_type_key', $request['post_type_key'])->first()['id'];
            $metas = $meta_model->where('post_type_id', $post_type_id)->all();
        } else {
            $metas = $meta_model->all();
        }

        echo wp_json_encode($metas);
    }


    public function get_post_taxonomies(WP_REST_Request $request)
    {
        $taxonomies = [];
        $result = [];
        if ($request['post_type_key']) {
            $taxonomies = get_object_taxonomies($request['post_type_key']);
        }
        foreach ($taxonomies as $taxonomy) {
            if ($taxonomy !== 'post_format') {
                $taxonomy_data = get_taxonomy($taxonomy);
                $taxonomy_obj = new stdClass();
                $taxonomy_obj->name = $taxonomy_data->label;
                $taxonomy_obj->taxonomy_key = $taxonomy_data->name;
                array_push($result, $taxonomy_obj);
            }
        }

        echo wp_json_encode($result);
    }

    public function register_base_scripts()
    {
        wp_register_script('Savvy-script-params', false);
        wp_enqueue_script('Savvy-script-params');
        wp_localize_script('Savvy-script-params', 'savvyParams', [
            'siteUrl' => site_url(),
            'savvyBlocksUrl' => SAVVY_URL,
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'postsPerPage' => get_option('posts_per_page'),
        ]);
    }

    public function add_savvy_blocks_category($block_categories, $editor_context)
    {
        array_unshift(
            $block_categories,
            [
                'slug'  => 'savvy-blocks',
                'title' => __('Savvy Blocks', 'savvy-blocks')
            ]
        );

        return $block_categories;
    }

    public static function get_block_names()
    {

        $blocks = [];

        $blockNames = array_map(
            function($path) {
                return str_replace(SAVVY_PATH . 'blocks/', '', $path);
            },
            glob(SAVVY_PATH . 'blocks/*', GLOB_ONLYDIR)
        );

        $blockNames = array_filter( $blockNames, function($blockName) use($blocks){
            return !isset($blocks[$blockName]) || $blocks[$blockName]['enabled'];
        });
        return $blockNames;
    }

    public function register_blocks()
    {
        $blockNames = static::get_block_names();

        $blocks = [];
        foreach ($blockNames as $blockName) {
            $props = $blocks[$blockName] ?? [];

            $blockPath = SAVVY_PATH . 'blocks/' . $blockName;

            if (file_exists($blockPath . '.php')) {
                require_once $blockPath . '.php';
            } else {
                add_action('init', function() use($blockPath) {
                    register_block_type($blockPath);
                });
            }
        }
    }

    public function globalScripts()
    {
        wp_enqueue_style(
            'savvy-general-styles',
            SAVVY_URL . 'blocks-assets/css/general.css',
            array(),
        );

        wp_enqueue_script(
            'savvy-general-js',
            SAVVY_URL . 'blocks-assets/js/general.js',
            array(),
        );
    }

    public function savvy_blocks_admin_color($user_id)
    {
        update_user_meta($user_id, 'admin_color', 'Savvy');
    }
}


function savvy_CombineSettingsThemeJson( $savvysettings = [], $savvysettings_file = [] )
{
    if (!empty($savvysettings)) {
        foreach ($savvysettings as $key => $value) {
            $savvysettings[$key] = ( empty($value) && isset($savvysettings_file->$key) ) ? (
                $savvysettings_file->$key
            ) : (
                svgBreakpoints($key,$value)
            );
            if ($key === 'blocks' && isset($savvysettings_file->$key) ) {
                $savvysettings[$key] = (object) array_merge_recursive(
                    (array)$savvysettings[$key], (array)($savvysettings_file->$key)
                );
            }
            unset($savvysettings_file->$key);
        }

    } else {
        $savvysettings = [];
    }

    if (!isset($savvysettings['spaces'])) {
        $savvysettings['spaces'] = [ 2, 4, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 256];
    }
    if (!isset($savvysettings['breakpoints'])) {
        $savvysettings['breakpoints'] = [];
    }

    foreach ($savvysettings_file as $key => $value) {
        $savvysettings[$key] = $savvysettings_file->$key;
    }
    return(wp_json_encode($savvysettings));
}


function svgBreakpoints($key, $value)
{
    if ($key) {
        switch ($key) {
            case in_array($key, ['breakpoints', 'spaces']): //string to array
                return $value ? array_keys($value): [];
                break;
            default:
                return ($value);
                break;
        }
    }
}

function get_savvysettings_file()
{
    $settings_path = get_stylesheet_directory() . '/savvy-settings.json';
    if (!file_exists($settings_path)) {
        $settings_path = SAVVY_PATH . '/utils/settings.json';
    }
    if (is_null($settings_path)) {
        throw new Exception("savvy Setting File doesn't exist in theme or savvy-blocks plugin");
    }
    return file_get_contents($settings_path);
}



add_action( 'rest_api_init', 'SvgApis' );
function SvgApis()
{
    register_rest_route( 'savvy/v1', '/icon-svg-block-list/list', [
        'methods' => 'GET',
        'callback' => 'SvgList',
    ]);

    register_rest_route( 'savvy/v1', '/icon-svg-block-list/add', [
        'methods' => 'GET',
        'callback' => 'SvgAdd',
        'permission_callback' => function () {
            return current_user_can( 'manage_options' );
        }
    ]);

    register_rest_route( 'savvy/v1', '/icon-svg-block-list/remove', [
        'methods' => 'GET',
        'callback' => 'svgDelete',
        'permission_callback' => function () {
            return current_user_can( 'manage_options' );
        }
    ]);
}

function SvgList( $data )
{

    $ids = get_option('savvy_svg_icons_block_list', []);

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

function SvgAdd( $data )
{
    $id = $data->get_param('id');
    if( get_option( 'savvy_svg_icons_block_list' ) === false ) {
        add_option( 'savvy_svg_icons_block_list', [$id], '', true );
    } else {
        $ids = get_option('savvy_svg_icons_block_list');
        if(!in_array($id, $ids, true)){
            array_push($ids, $id);
        }
        update_option( 'savvy_svg_icons_block_list', $ids );
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

function svgDelete( $data )
{
    $id = $data->get_param('id');
    if( get_option( 'savvy_svg_icons_block_list' ) !== false ) {
        $ids = array_diff( get_option('savvy_svg_icons_block_list'), [$id] );
        wp_delete_attachment($id);
        update_option( 'savvy_svg_icons_block_list', $ids );
    }

    return $id;
}

function savvy_iSvgHide( $args ) {
    if ( ! is_admin() ) {
        return;
    }
    $args[ 'post__not_in' ] = get_option( 'savvy_svg_icons_block_list' );
    return $args;
}
add_filter( 'ajax_query_attachments_args', 'savvy_iSvgHide' );