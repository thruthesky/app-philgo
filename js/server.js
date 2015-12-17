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

var url_server_widget = url_server + '?module=ajax&action=widget&submit=1&name=';
var url_server_login = url_server + '?module=ajax&action=login&submit=1';
var url_server_forum =  url_server + '?module=ajax&action=post-list&submit=1&post_id=';
var url_company_book_data = 'http://philgo.org/?module=etc&action=company_data_json_submit';
var cache_template_widgets = [
    'header',
    'footer',
    'menu-panel'
];

var idx_member = null;
var user_id = '';
var user_name = '';
var session_id = ''; // for verifying password.

$(function(){
    var v = db.get('idx_member');
    if ( v ) idx_member = v;
    user_id = db.get('user_id');
    session_id = db.get('session_id');
    console.log("server.js begins ...");
    note('server.js 를 로드하였습니다.');

    if ( isOffline() ) {
        note('인터넷을 연결 해 주십시오. Connect to Internet.', 'alert alert-warning');
    }

    //update_version(app_version); // 여기서 기록을 하면, 버젼을 수동으로 확인 할 수가 없다.

    initServerEventHandlers();


    // 이 두 코드는 여기 있어야 한다. server.js 가 로드 될 때 바로 실행하면 된다.

    if ( $do_not_use_server_header_footer_template  == false ) cache_update_templates();

    // server.js 가 로드되면 첫 페이지를 업데이트 한다.
    open_fron_page();

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
 * @param callback
 */
function update_version(new_version) {
    var old_version = get_version();
    if ( old_version == new_version ) {
        console.log("App version:" + new_version);
        return;
    }
    else {
        console.log('updating version with:' + new_version);
        app_reset();
        set_version(new_version);
        app_refresh();
    }
}

/**
 *
 */
function open_fron_page() {
    cache_update('front', 'freetalk');
}
/** =================== App related functions =================== */

function app_reset() {
    db.deleteAll();
}
function app_refresh() {
    location.href='index.html';
}


/** ================ init Server Event Handlers ============== */
function initServerEventHandlers() {
    on_click('.reset', on_click_reset);
    on_click('.content', on_click_content);
    on_click('.logout-button', on_click_logout_button);
    body().on('submit', 'form.login', ajx_login);

    on_click('footer .post-button', on_click_post_button);
}


/** ================ Menu Callback Functions ================= */

/**
 * #buildguide on_click_page
 */
function on_click_page_server($this) {
    var page = $this.attr('page');
    var post_id = $this.attr('post_id');
    console.log('on_click_page_server() : ' + page);

    if ( isOffline() && $this.hasClass('check-online') ) {
        alert(page + " 페이지를 보기 위해서는 인터넷에 연결을 해 주세요. Please connect to Internet.")
        return;
    }


    if ( page == 'login' ) {
        setContent( get_login_form(), 'login' );
    }
    else {
        cache_update(page, post_id);
    }
}


function on_click_content() {
    hidePanel();
}

/**
 *
 */
function on_click_reset() {
    console.log('on_click_reset()');
    var re = confirm("앱을 초기화 하시겠습니까? Do you want to reset?");
    if ( re ) {
        app_reset();
        app_refresh();
    }
}


/**
 *
 * It is an overriding function of on_click_menu_panel in server.js
 *
 * @attention if it returns false, then the code in client.js will run.
 *      return 'true' if you do not want the code in client.js run.
 */
function on_click_menu_panel_server() {
    console.log("on_click_menu_panel_server() begins ...");
    return false;
}




/** ======================================= Cache functions ================================= */

function cache_no_html(name) {

    console.log("cache_update: name:" + name + ", no HTML from server.");

}

/**
 * header, footer, panel 을 1시간에 한번씩 다시 로딩 한다.
 */
function cache_update_templates() {
    var count_cache_update_templates = 0;
    cache_update_templates_loop();
    setInterval(cache_update_templates_loop, 1000 * 60 * 60 * 1);
    function cache_update_templates_loop() {
        count_cache_update_templates++;
        console.log("cache_update_templates_loop() begins:" + count_cache_update_templates);
        for (i in cache_template_widgets) {
            var url = url_server_widget + cache_template_widgets[i];
            ajax_load(url, function(re){
                // console.log(re);
                if ( re.html ) {
                    var name = re.widget;
                    save_page( name, re );
                    widget(name).html(re.html);
                }
                else cache_no_html(name);
            });
        }
    }
}


/** ============= DOM Management functions ============= */



/**
 *
 * @short
 *      1. db cache 서브페이지 데이터를 먼저 보여 준다.
 *      2. ajax 로 서브페이지 데이터를 다운로드 하여
 *          2-1. cache 에 저장하고
 *          2-2. 화면에 보여준다.
 *      3. endless 페이지를 구현한다.
 *
 *
 * @usage 페이지를 캐시해야한다면 임의로 이 코드를 사용 하면 된다.
 *
 * @param widget
 * @param callback
 * @code
 *      cache_update('front');
 * @code
 */
function cache_update(name, post_id) {
    console.log( "cache_update:" + name );
    setContent( db.get( name ), name );
    var url_widget = url_server_widget + name;
    ajax_load(url_widget, function(re){
        if ( re.html ) {
            save_page( name, re );
            setCurrentPage(name);
            setContent(re.html, name);
            if ( post_id ) endless_reset(post_id);
        }
        else cache_no_html(name);
    });
}

/**
 *
 * @note This does not save data into database.
 * @Attention Use this function to set content on '.content'.
 *      - it does extra tasks.
 * @param html
 */
function setContent(html) {
    //console.log('setContent(...,' + page_name + ')');
    if ( isPanelOpen() ) hidePanel();
    content().html(html);
}






/** =============== Login / Register ================ */




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
        note_reset(site + ' 사이트 : ' + post_id + '의 ' + page_no + " 페이지 내용이 추가되었습니다.");
        for ( i in re.posts ) {
            endless_hide_loader();
            post_list().append(get_post_render(re.posts[i]));
        }
    }
    endless_in_loading = false;
}

/**
 * 리셋을 하면 첫 페이지를 바로 보여준다.
 * @param url
 */
function endless_reset(post_id) {
    var url = url_server_forum + post_id;
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
var isFileUploadSubmit = false;
var $fileSelected = null;
/** */

function onFileChange(obj) {
    $fileSelected = $(obj);
    var $form = $fileSelected.parents("form");
    isFileUploadSubmit = true;
    $form.submit();
    isFileUploadSubmit = false;
    $fileSelected.val('');
}
//

$(function(){
    body().on('submit', '.ajax-upload', post_form_submit);
    body().on('click', '.file[no] .delete', ajax_delete);
});


/**
 *
 * @returns {boolean}
 */
function post_form_submit(e) {
    // Return if the form submit is not for ajax file upload.
    if (isFileUploadSubmit == false) {
        ajax_form_submit($(this), e);
    }
    else {
        ajax_file_upload($(this), e);
    }
    return false;
}


function ajax_form_submit($this, e) {
    console.log("ajax_form_submit() begin");
    e.preventDefault();
    function ajax_load_post(url, data, callback) {

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function(data){
                var re;
                try {
                    re = $.parseJSON(data);
                }
                catch ( e ) {
                    return alert("Ajax_load_post() : catched an error. It might be an internal server error.");
                }
                callback(re);
            }
        });
    }

    ajax_load_post(url_server, $this.serialize(), function(data){
        post_write_form().remove();
        content().prepend(get_post_render(data.post));
    });

}




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
function on_click_post_button() {
    show_post_write_form($(this).attr('post-id'));
}
function show_post_write_form(post_id) {
    if ( post_write_form().length == 0 ) {
        content().prepend(get_post_write_form(post_id));
    }
    goTop();
}
/**
 *
 *
 * @note Use this only for Creating a post
 */
function post_write_form() {
    return $('.post-write-form');
}
function get_post_write_form(post_id) {
    var gid = unique_id(idx_member + post_id);
    var m = '';
    m += "<form class='ajax-upload post-write-form' action='"+url_server+"'>";
    m += "<input type='hidden' name='idx_member' value='"+idx_member+"'>";
    m += "<input type='hidden' name='session_id' value='"+session_id+"'>";
    m += "<input type='hidden' name='gid' value='"+gid+"'>";
    m += "<input type='hidden' name='post_id' value='"+post_id+"'>";
    m += "<input type='hidden' name='module' value='ajax'>";
    m += "<input type='hidden' name='action' value='post_write_submit'>";
    m += "<div class='content'><textarea name='content'></textarea></div>";
    m += "<div class='category'><select><option value='freetalk'>FreeTalk</option><option value='qna'>Q & A</option><option value='buyandsell'>Buy & Sell</option></select></div>";

    m += '<div class="file"><input type="file" name="file" onchange="onFileChange(this);"></div>';
    m += "<div class='submit'><input type='submit'></div>";
    m += "</form>";
    m += '<div class="post-write-form-photos"></div>';
    return m;
}

function get_post_render(p) {
    console.log('get_post_render(p)');
    if (_.isEmpty(p) ) return;
    console.log('creating DOM');
    var m = '';
    if ( !_.isEmpty(p['subject']) ) {
        m += '<h3 class="subject">' + p['subject'] + '</h3>';
    }
    if ( p['content'] ) m += '<p class="content">' + p['content'] + '</p>';
    if ( p['photos'] ) m += p['photos'];
    m = '<div class="post">' + m + '</div>';
    console.log(m);
    return m;
}


//
//
//
//                      Login Function
//
//
function get_login_form() {
    var m;
    if ( idx_member ) {
        m = '<h1>User Login</h1>';
        m += "<p>You have already logged in as <b>" + user_id + '</b></p>';
        m += '<nav class="navbar navbar-default logout-button">';
        m += '<p class="navbar-brand">Logout</p>';
        m += '</nav>';
    }
    else {
        m = '<h1>User Login</h1>';
        m += '<form class="login">';
        m += '<div class="row"><div class="caption">ID</div><div class="text"><input type="text" name="id"></div>';
        m += '<div class="row"><div class="caption">PW</div><div class="text"><input type="password" name="password"></div>';
        m += '<div class="row"><div class="caption">Submit</div><div class="text"><input type="submit"></div>';
        m += '</form>';
    }
    return m;
}
function ajx_login() {
    console.log('ajax_login() begins...');
    var $this = $(this);
    var id = $this.find('[name="id"]').val();
    var url = url_server_login + '&id=' + id;
    url += '&password=' + $this.find('[name="password"]').val();
    ajax_load( url, function(re) {
        console.log(re);
        if ( re.code == 504 ) alert('아이디를 입력하십시오.');
        else if ( re.code == 503 ) alert('비밀번호를 입력하십시오.');
        else if ( re.code == 502 ) alert('아이디를 찾을 수 없습니다.');
        else {
            setLogin(id, re);
            open_fron_page();
        }
    });
    return false;
}

function on_click_logout_button() {
    setLogout();
    open_fron_page();
}
function setLogin(id, re) {
    db.set('user_id', id);
    db.set('idx_member', re.idx_member);
    db.set('session_id', re.session_id);
    db.set('user_name', re.user_name);

    idx_member = re.idx_member;
    user_id = id;
    session_id = re.session_id;
    user_name = user_name;
}
function setLogout() {
    db.delete('idx_member');
    db.delete('user_id');
    db.delete('session_id');
    db.delete('user_name');
    idx_member = null;
    user_id = '';
    session_id = '';
    user_name = '';
}
