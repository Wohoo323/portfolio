<?php

function tuomas_portfolio_styles() {

    // Child theme CSS
    wp_enqueue_style(
        'tuomas-portfolio-style',
        get_stylesheet_uri()
    );

    // Portfolio JavaScript
    wp_enqueue_script(
        'tuomas-portfolio-script',
        get_stylesheet_directory_uri() . '/script.js',
        array(),
        '1.0',
        true
    );
}

add_action('wp_enqueue_scripts', 'tuomas_portfolio_styles');