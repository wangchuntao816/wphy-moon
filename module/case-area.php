<?php 
if (get_option('show_case')=='checked') {
?>
<div class="limiter show-case ">
  <div class="block-title">
    <a href="<?php echo get_permalink_by_slug('cases'); ?>">案例展示</a>
  </div>

  <div class="row three-image-block">
  <?php 
    $args_case = array(
      'post_type' => get_option('case_type'),
      'posts_per_page' =>get_option('case_num')
    );

    $query_case = new WP_Query($args_case);
    if ($query_case->have_posts()) {
      while($query_case->have_posts()){
        $query_case->the_post();
        $data=array();
        $image_link='';
        if (function_exists('get_field')&&get_field('pic')) {
          $image_link=get_image_by_id(get_field('pic'));
        }else{
          $image_link=get_feature_image_by_id(get_the_ID());
        }
        $data=array(
          'title'=>get_the_title(),
          'excertp'=>get_the_excerpt(),
          'link'=>get_permalink(),
          'image'=>$image_link
        );
        ?>
        <div class="col-sm-4 item">
          <?php include(locate_template('module/case-block.php')); ?>
        </div>
        <?php
      }
    }
    wp_reset_postdata();
  ?> 
  </div>
</div><!-- show-case -->
<?php
}
?>