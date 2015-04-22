<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<?php $theme_option = get_option( 'dw_minion_theme_options' )['fullwidth_content'];
	if( 'yes' == $theme_option ) : ?>
	<header class="entry-header">
		<?php if ( has_post_thumbnail() ) : ?>
		<table>
			<tr>
				<td class="thumb-container-full-page">
					<?php if ( has_post_thumbnail() ) : ?>
						<div class="entry-thumbnail thumb-full-page"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_post_thumbnail(); ?></a></div>
					<?php endif; ?>
				</td>
				<td>
					<?php if ( ! has_post_format( 'quote' ) ) : ?><h2 class="entry-title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h2><?php endif; ?>
					<?php dw_minion_entry_meta(); ?>
				</td>
			</tr>
		</table>
		
		<?php else: ?>
				<?php if ( ! has_post_format( 'quote' ) ) : ?><h2 class="entry-title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h2><?php endif; ?>
				<?php dw_minion_entry_meta(); ?>
		<?php endif; ?>
	</header>
	<?php if( has_post_format( 'gallery' )) {
		$class = 'gallery-fullpage-content';
	} else {
		$class = '';
	}

	?>
	<div class="entry-content <?php echo esc_attr( $class ) ?>"> 
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'dw-minion' ),
				'after'  => '</div>',
			) );
		?>
	</div>
	<?php else : ?>
		<header class="page-header">
			<h1 class="page-title"><?php the_title(); ?></h1>
		</header>
		<div class="page-content">
			<?php the_content(); ?>
			<?php
				wp_link_pages( array(
					'before' => '<div class="page-links">' . __( 'Pages:', 'dw-minion' ),
					'after'  => '</div>',
				) );
			?>
		</div>
<?php endif; ?>
</article>