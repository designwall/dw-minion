<?php get_header(); ?>
<?php  $theme_option = get_option( 'dw_minion_theme_options' )['fullwidth_content']; ?>
<?php if( 'yes' == $theme_option ) { ?>
	<div id="content" class="site-content content-list full-width-page" role="main">
		<?php
		while ( have_posts() ) : the_post();
			get_template_part( 'content', 'full' );
			dw_minion_content_nav( 'nav-below' );
			dw_minion_related_post($post->ID);
			if ( comments_open() ) comments_template();
		endwhile; 
		?>
	</div>
<?php } else { ?>
<div id="primary" class="content-area">
	<div class="primary-inner">
		<div id="content" class="site-content" role="main">
		<?php 
		while ( have_posts() ) : the_post();
			get_template_part( 'content', 'single' );
			dw_minion_content_nav( 'nav-below' );
			dw_minion_related_post($post->ID);
			if ( comments_open() ) comments_template();
		endwhile; 
		?>
		</div>
	</div>
</div>
<?php get_sidebar('secondary'); ?>
<?php } ?>
<?php get_footer(); ?>