/**
 *
 *
 */
/**
 *
 *
 */


/**
 * Definitions
 *
 */






$(function(){

    //update_version(app_version); // 여기서 기록을 하면, 버젼을 수동으로 확인 할 수가 없다.




    // 이 두 코드는 여기 있어야 한다. server.js 가 로드 될 때 바로 실행하면 된다.
    // 이 코드는 더 이상 필요 없다. 왜냐하면 header, footer, panel 을 더 이상 캐시 하지 않고 client.js 에서 바로 사용한다.
    // if ( $do_not_use_server_header_footer_template  == false ) cache_update_templates();

    // server.js 가 로드되면 첫 페이지를 업데이트 한다.


});
/** ===================== Version functions =================== */

function set_version(version) {
    db.set('version', version);
}
function get_version() {
    return db.get('version');
}
/**
 * 새로운 버젼이 기록되면, 버젼을 기록하고 앱을 다시 로딩(리프레시)를 한다.
 * @param new_version
 */
function update_version(new_version) {
    var old_version = get_version();
    if ( old_version == new_version ) {
        console.log("App version:" + new_version);
    }
    else {
        console.log('updating version with:' + new_version);
        app.reset();
        set_version(new_version);
        app.refresh();
    }
}

/** =================== App related functions =================== */





/** ================ Menu Callback Functions ================= */



/** ======================================= Cache functions ================================= */

function cache_no_html(name) {

    console.log("cache_update: name:" + name + ", no HTML from server.");

}



/** ============= DOM Management functions ============= */



function post_button() {
    return $("footer .post-button");
}
function setCurrentForum(post_id) {
    post_button().attr('post-id', post_id);
}


/** =============== ENDLESS page loading =============== */

var endless_api = '';
var endless_scroll_count = 0;
var endless_no_more_content = false;
var endless_in_loading = false;
function post_list() {
    return $('.post-list');
}
function endless_load_more_update(re) {
    //console.log(re);

    if (_.isEmpty(re.posts) ) {
        endless_no_more_content = true;
        endless_hide_loader();
        endless_show_no_more_content();
    }
    else {
        var site = re.site;
        var post_id = re.post_id;
        var page_no = re.page_no;
        note.post(site + ' 사이트 : ' + post_id + '의 ' + page_no + " 페이지 내용이 추가되었습니다.");
        for ( i in re.posts ) {
            endless_hide_loader();
            post_list().append(html.post_render(re.posts[i]));
        }
    }
    endless_in_loading = false;
}

/**
 * 리셋을 하면 첫 페이지를 바로 보여준다.
 * @param url
 */
function endless_reset(post_id) {
    var url = app.url_server_forum + post_id;
    //console.log('endless_reset('+url+')');
    endless_api = url + '&page_no=';
    endless_scroll_count = 1;
    endless_no_more_content = false;
    endless_in_loading = false;
    var url_endless = endless_api + endless_scroll_count;
    ajax_load( url_endless, endless_load_more_update);
}

(function endless_run() {
    var $window = $(window);
    var $document = $(document);

    var endless_distance = 400; // how far is the distance from bottom to get new page.

    $document.scroll(endless_load_more);

    function endless_load_more(e) {
        // console.log('endless_load_more(e) : ');
        if ( ! endless_api ) return console.log("no endless_api");
        if ( endless_no_more_content ) return console.log("no more content. return.");
        if ( endless_in_loading ) return console.log("endless is in loading page.");
        var top = $document.height() - $window.height() - endless_distance;
        if ($window.scrollTop() >= top) {
            endless_scroll_count ++;
            console.log("endless_listen_scroll():: count:" + endless_scroll_count);
            endless_in_loading = true;
            endless_show_loader();
            ajax_load( endless_api + endless_scroll_count, endless_load_more_update);
        }
    }
})();


function endless_hide_loader() {
    //console.log("endless_hide_load()");
    var $loader = $('.endless-loader');
    if ( $loader.length ) $loader.remove();
}
function endless_show_loader() {
    console.log("endless_show_load()");
    var markup = "<div class='endless-loader'><img src='img/loader/loader9.gif'></div>";
    post_list().append(markup);
}
function endless_show_no_more_content() {
    console.log("endless_show_no_more_content");
    var text = 'No more content ........... !'
    post_list().after("<div class='no-more-content'>"+text+"</div>");
}


// -
// -
// -
// -
// -
// -
// --------------------------- file upload routine ---------------------------
// -
// -
// -
// -
// -
// -


$(function(){
    element.body().on('submit', '.ajax-upload', post_form_submit);
    element.body().on('click', '.file[no] .delete', ajax_delete);
});








function  ajax_file_upload($this) {

    console.log( $fileSelected.prop('name') );

    var $progressBar = $(".ajax-upload-progress-bar");

    var lastAction = $this.prop('action');
    $this.prop('action', '/data/ajax/upload');



}

/**
 * @todo check if used
 */
function ajax_delete() {
    var no = $(this).parent().attr('no');
    ajax_load('/data/ajax/delete/' + no, callback_ajax_delete);
}

function callback_ajax_upload($form, re) {
    if ( re.code < 0 ) {
        alert(re.message);
    }
    else {
        var m = get_display_file(re['record']['url'], re['record']['id']);
        $form.parents('.post-edit').find('.files').append(m);
    }
}
function callback_ajax_delete(re) {
    if ( re.code ) return alert("Failed to delete the file");
    $(".file[no='"+re.id+"']").remove();
}


/**
 * @todo check if used
 * @param $form
 */
function form_clear($form) {
    var $post_edit = $form.parents('.post-edit');
    $form.find("[name='content']").val('');
    $post_edit.find(".files").html('');
}





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
 * Use this function only to display uploaded files.
 *
 */
/**
 * @todo check if used
 */
function get_display_file(url, id, edit) {
    var m = "<div class='file' no='"+id+"'>";
    if ( edit ) m += "<span class='delete'>X</span>";
    m += "<img src='"+url+"'></div>";
    return m;
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



// -
// -
// -
// -
// -
// -------------------------- Post HTML Elements
// -
// -
// -
// -
// -






//
//
//
//                      Login Function
//
//
function get_login_form() {
    var m;

    console.log('get_login_form : member.idx : ' + member.idx);

    if ( member.idx ) {
        m = '<h1>User Login</h1>';
        m += "<p>You have already logged in as <b>" + member.id + '</b></p>';
        m += '<nav class="navbar navbar-default logout-button">';
        m += '<p class="navbar-brand">Logout</p>';
        m += '</nav>';
    }
    else {
        m = 	'<div class="form-wrapper">';
        m += 	'<form class="member-login-form login">';
        m += 	'<div class="input-group username">';
        m += 	'<input name="id" type="text" class="form-control" placeholder="Enter username">';
        m += 	'<span class="input-group-addon glyphicon glyphicon-user"></span>';
        m += 	'</div>';
        m += 	'<div class="input-group password">';
        m += 	'<input name="password"  type="password" class="form-control" placeholder="Enter password">';
        m += 	'<span class="input-group-addon glyphicon glyphicon-lock"></span>';
        m += 	'</div>';
        m += 	'<input type="submit" class="btn btn-primary" value="Login">';
        m += 	'<a class="forgot-password" href="#">Forgot Password?</a>';
        m += 	'</form>';
        m += 	'</div>';
    }
    return m;
}

