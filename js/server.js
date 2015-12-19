/**
 * 새로운 버젼이 기록되면, 버젼을 기록하고 앱을 다시 로딩(리프레시)를 한다.
 * @param new_version
 */
function update_version(new_version) {
    if ( app.version == new_version ) {
        console.log("App version:" + new_version);
    }
    else {
        console.log('updating version with:' + new_version);
        app.reset();
        //set_version(new_version);
        app.refresh();
    }
}





// -

// -
// -






/**
 * @todo check if used
 */
function click_post_reply() {
    var $this = $(this);
    var $post = $this.parents('.post');
    var id = $post.attr('no');
    var m = get_post_edit_form(post_config_name, 0, id);
    $post.append( m );
}

/**
 * @todo check if used
 */
function click_post_edit() {
    var $this = $(this);
    var $post = $this.parents('.post');

    //var $subject  = $post.find(".subject");
    //var subject = '';

    // if ( $subject.length ) subject = $subject.text();

    var $content  = $post.find(".content");
    var content = '';
    if ( $content.length ) content = $content.text();
    var id = $post.attr('no');
    var id_parent = $post.attr('no-parent');


    var form = get_post_edit_form(post_config_name, id, id_parent);

    $post.find('.form-area').hide();
    $post.append(form);

    //$post.find("[name='subject']").val(subject);
    $post.find("[name='content']").val(content);

    var $files = $post.find(".files");

    if ( $files.length ) {
        var m = '';
        var $file = $files.find('.file');
        if ( $file.length ) {
            $file.each(function(i, element){
                $obj = $(element);
                var id = $obj.attr('no');
                var url = $obj.find('img').prop('src');
                console.log(url);
                m += get_display_file(url, id, true);
            });
            $files.html(m);
        }
    }
}

/**
 * @todo check if used
 */
function click_post_edit_cancel() {
    var $this = $(this);
    var $post = $this.parents('.post');
    $post.find('.post-edit').remove();
    $post.find('.form-area').show();
}





/**
 * @todo check if used
 */
function click_post_delete() {
    var $this = $(this);
    var $post = $this.parents('.post');
    var url = '/post/ajax/delete/' + $post.attr('no');
    ajax_load(url, function(re) {
        console.log(re);
        $post.find('.content').html(re.html);
        $post.find('.author').remove();
        $post.find('.files').remove();
    });
}
/**
 * @todo check if used
 */
function click_post_like() {
    var $this = $(this);
    var $post = $this.parents('.post');
    var url = '/post/ajax/like/' + $post.attr('no');
    ajax_load(url, function(re) {
        //console.log(re);
        $this.find(".no").text(re.like);
    });
}





//
//
//
//                      Login Function
//
//
