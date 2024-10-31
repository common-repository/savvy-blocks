<?php
if ( ! defined( 'ABSPATH' ) ) exit;
require_once __DIR__ . '/savvy-blocks-base.php';
class SavvyAssets extends savvyBlocksBase
{
    protected function __construct()
    {
        parent::__construct();


        add_action('wp_enqueue_scripts', [$this, 'savvy_blocks_video_player']);
    }






    public function savvy_blocks_video_player()
    {
        wp_enqueue_script(
            'savvy-blocks-video-player-js',
            SAVVY_URL . 'assets/js/savvy-blocks-video-player.js',
            [],
        );
    }

}