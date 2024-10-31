<?php
if ( ! defined( 'ABSPATH' ) ) exit;
require_once __DIR__ . '/savvy-blocks-base.php';

class SavvyDashboard extends savvyBlocksBase
{
    /**
     * The constructor
     *
     * @since   0.9.1
     * @return void
     */
    protected function __construct()
    {
        parent::__construct();

        $this->add_front();
        $this->register_styles();
        register_uninstall_hook(SAVVY_PATH . 'savvy-blocks.php', [get_class($this), 'uninstall']);
        register_activation_hook(SAVVY_PATH . 'savvy-blocks.php', [$this, 'activate']);
        register_deactivation_hook(SAVVY_PATH . 'savvy-blocks.php', [$this, 'deactivate']);
    }

    public function activate()
    {
    }

    public function deactivate()
    {
    }


    public static function uninstall()
    {
    }

    private function add_front()
    {
        wp_enqueue_script(
            'savvy-blocks-admin-js',
            SAVVY_URL . 'assets/js/savvy-blocks-admin.js',
            array(),
        );
    }

    private function register_styles()
    {
        wp_register_style('savvy_blocks_wp_admin_css', plugin_dir_url(__FILE__) . 'assets/css/savvy-blocks-admin.css', false, '1.0.0');
        wp_enqueue_style('savvy_blocks_wp_admin_css');
    }

}
