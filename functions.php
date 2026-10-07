<?php

function tuomas_portfolio_styles() {

    // Child theme CSS
    wp_enqueue_style(
        'tuomas-portfolio-style',
        get_stylesheet_uri(),
        array(),
        filemtime( get_stylesheet_directory() . '/style.css' )
    );

    // Portfolio JavaScript
    wp_enqueue_script(
        'tuomas-portfolio-script',
        get_stylesheet_directory_uri() . '/script.js',
        array(),
        filemtime( get_stylesheet_directory() . '/script.js' ),
        true
    );
}

add_action('wp_enqueue_scripts', 'tuomas_portfolio_styles');
// Contact-rivi: [portfolio_contact email="..." phone="+358 ..."]
function tuomas_portfolio_contact_shortcode( $atts ) {
    $atts = shortcode_atts(
        array( 'email' => '', 'phone' => '', 'github' => '' ),
        $atts,
        'portfolio_contact'
    );
    $email = sanitize_email( $atts['email'] );
    $phone = sanitize_text_field( $atts['phone'] );
    $phone_link = preg_replace( '/[^0-9+]/', '', $phone );
    if ( ! $email && ! $phone && ! $atts['github'] ) {
        return '';
    }
    ob_start();
    ?>
    <section id="contact" class="portfolio-contact" aria-labelledby="portfolio-contact-title">
        <div class="portfolio-contact-inner">
            <h2 id="portfolio-contact-title">Contact</h2>
            <div class="portfolio-contact-details">
                <?php if ( $email ) : ?>
                    <a class="portfolio-contact-mail" href="<?php echo esc_url( 'mailto:' . $email ); ?>">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
                        <span><?php echo esc_html( $email ); ?></span>
                    </a>
                <?php endif; ?>
                <?php if ( $phone && $phone_link ) : ?>
                    <a href="<?php echo esc_attr( 'tel:' . $phone_link ); ?>">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z" stroke-linejoin="round"/></svg>
                        <span><?php echo esc_html( $phone ); ?></span>
                    </a>
                <?php endif; ?>
                <?php if ( $atts['github'] ) : ?>
                    <a class="portfolio-contact-github" href="<?php echo esc_url( $atts['github'], array( 'https', 'http' ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.5-3.7 4.9 4.9 0 0 0-.1-3.7s-1.2-.4-3.8 1.4a13.1 13.1 0 0 0-7 0C5.3-.2 4.1.2 4.1.2A4.9 4.9 0 0 0 4 3.9a5.3 5.3 0 0 0-1.5 3.7c0 5.3 3.2 6.5 6.2 6.8a3.4 3.4 0 0 0-.9 2.7V21"/></svg>
                    </a>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode( 'portfolio_contact', 'tuomas_portfolio_contact_shortcode' );