<?php
/**
 * Template Name: Full-Width( No Sidebar )
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
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
		<?php the_content( __( '<span class="btn btn-small">Continue reading</span>', 'dw-minion' ) ); ?>
		<?php
			// wp_link_pages( array(
			// 	'before' => '<div class="page-links">',
			// 	'after'  => '</div>',
			// 	'link_before' => '<span class="btn btn-small">',
			// 	'link_after'  => '</span>',
			// ) );
		?>
	</div>
</article>
<?php

