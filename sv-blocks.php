<?php

/**
 * Plugin Name:       savvy Blocks
 * Description:       savvy Blocks
 * Requires at least: 6.2
 * Requires PHP:      8.1
 * License:           GPLv3
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Version:           0.1.1
 * Author:            savvy-blocks
 * Text Domain:       savvy-blocks
 *
 * @package           savvy-blocks
 */

defined('ABSPATH') || exit;

$plugin = dirname(plugin_basename(__FILE__));



define('SAVVY_PATH', plugin_dir_path(__FILE__));

define('SAVVY_URL', plugins_url( '', __FILE__ ) . '/');
define('SAVVY_NAME', 'savvyblocks');

require_once __DIR__ . '/components/editor/attribute-class-generator.php';

if (is_admin()) {
    require_once __DIR__ . '/includes/savvy-blocks-admin.php';
    $savvyblocks = SavvyDashboard::singletom();
} else {
    require_once __DIR__ . '/includes/savvy-blocks-front.php';
    $savvyblocks = SavvyAssets::singletom();
}



