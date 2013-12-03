<?php get_header(); ?>

		<div id="primary" class="content-area">
			<div class="primary-inner">
				<div id="content" class="site-content content-list" role="main">

				<?php if ( have_posts() ) : ?>

					<?php while ( have_posts() ) : the_post(); ?>

						<?php get_template_part( 'content', get_post_format() ); ?>

					<?php endwhile; ?>

					<?php dw_minion_content_nav( 'nav-below' ); ?>

				<?php else : ?>

					<?php get_template_part( 'no-results', 'index' ); ?>

				<?php endif; ?>

				</div>
			</div>
		</div>

<?php get_sidebar('secondary'); ?>
<?php get_footer(); ?>