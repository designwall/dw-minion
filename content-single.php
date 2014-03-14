<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php if( ! has_post_format('quote') ) : ?><h1 class="entry-title"><?php the_title(); ?></h1><?php endif; ?>
		<?php dw_minion_entry_meta(); ?>
	</header>
	<?php if( has_post_thumbnail() ) : ?>
	<div class="entry-thumbnail"><?php the_post_thumbnail(); ?></div>
	<?php endif; ?>
	<?php if ( is_search() ) : ?>
	<div class="entry-summary">
		<?php the_excerpt(); ?>
	</div>
	<?php else : ?>
	<div class="entry-content">
		<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'dw-minion' ) ); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">',
				'after'  => '</div>',
				'link_before' => '<span class="btn btn-small">',
				'link_after'  => '</span>',
			) );
		?>
	</div>
	<?php endif; ?>
	<footer class="entry-footer">
		<?php
			$tags_list = get_the_tag_list();
			if ( $tags_list ) :
		?>
		<div class="entry-tags">
			<span class="tags-title"><?php _e('Tags', 'dw-minion') ?></span>
			<span class="tags-links"><?php printf( __( '%1$s', 'dw-minion' ), $tags_list ); ?></span>
		</div>
		<?php endif; ?>
		<div class="dw-sharing">
		    <span class="social-title"><?php _e('Share this', 'dw-minion') ?></span>
		    <ul>
		        <?php 
		            $permalink = rawurlencode(get_permalink()); 
		            $title = rawurlencode(get_the_title());
		        ?>
		        <li><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $permalink; ?>" class="dw-share-facebook " title="<?php _e('Share on Facebook') ?>"><i class="icon-facebook"></i></a></li>
		        <li><a target="_blank" href="https://plus.google.com/share?url=<?php echo $permalink; ?>" class="dw-share-google-plus" title="<?php _e('Share on Google+') ?>"><i class="icon-google-plus"></i></a></li>
		        <li><a target="_blank" href="https://twitter.com/intent/tweet?original_referer=<?php echo $permalink ?>&text=<?php echo $title; ?>&url=<?php echo $permalink; ?>" class="dw-share-twitter" title="<?php _e('Share on Twitter') ?>"><i class="icon-twitter"></i></a></li>
		        <li><a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo $permalink ?>&title=<?php echo $title; ?>&source=<?php echo $permalink ?>" class="dw-share-linkedin" title="<?php _e('Share on LinkedIn') ?>"><i class="icon-linkedin"></i></a></li>
		        <li><a target="_blank" href="http://www.tumblr.com/share?v=3&u=<?php echo $permalink ?>&t=<?php echo $title ?>" class="dw-share-tumblr" title="<?php _e('Share on Tumblr') ?>"><i class="icon-tumblr"></i></a></li>
		    </ul>
		</div>
	</footer>
</article>