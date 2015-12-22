
/** =============== ENDLESS page loading =============== */

var endless_api = '';
var endless_scroll_count = 0;
var endless_no_more_content = false;
var endless_in_loading = false;
function endless_load_more_update(re) {
    //console.log(re);
    if ( re.page ) {
        var page = element.post_list().attr('page');
        if ( page != re.page ) {
            console.log("Post data has been loaded but the page has changed. so, the posts will not be shown.")
            return;
        }
    }
    if (_.isEmpty(re['posts']) ) {
        endless_no_more_content = true;
        endless_hide_loader();
        endless_show_no_more_content();
    }
    else {
        var site = re['site'];
        var post_id = re['post_id'];
        var page_no = re['page_no'];
        note.post(site + ' 사이트 : ' + post_id + '의 ' + page_no + " 페이지 내용이 추가되었습니다.");
        var posts = re['posts'];
        for ( var i in posts ) {
            if (posts.hasOwnProperty(i)) {
                endless_hide_loader();
                element.post_list().append(html.render_post(posts[i]));
                element.post_list().append(html.render_comments(posts[i]['comments']));
            }
        }
    }
    endless_in_loading = false;
}
/**
 * 리셋을 하면 첫 페이지를 바로 보여준다.
 * @param page - page 를 PHP 로 넘겨서, 리턴받는 데이터는 해당 페이지에만 보여주도록 한다.
 * @param post_id
 */
function endless_reset(page, post_id) {
    var url = app.url_server_forum + post_id + '&page=' + page;
    endless_api = url + '&page_no=';
    endless_scroll_count = 1;
    endless_no_more_content = false;
    endless_in_loading = false;
    var url_endless = endless_api + endless_scroll_count;
    element.content().append('<hr>FORUM<hr><div class="post-list" page="'+page+'"></div>');
    ajax_load( url_endless, endless_load_more_update);
}
(function () {
    var $window = jQuery(window);
    var $document = $(document);
    var endless_distance = 400; // how far is the distance from bottom to get new page.
    $document.scroll(endless_load_more);
    function endless_load_more() {
        // console.log('endless_load_more(e) : ');
        if ( ! endless_api ) return console.log("no endless_api");
        if ( endless_no_more_content ) return console.log("no more content. return.");
        if ( endless_in_loading ) return console.log("endless is in loading page.");
        var top = $document.height() - $window.height() - endless_distance;
        if ($window.scrollTop() >= top) {
            endless_scroll_count ++;
            //console.log("endless_listen_scroll():: count:" + endless_scroll_count);
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
    //console.log("endless_show_load()");
    var markup = "<div class='endless-loader'><img src='img/loader/loader9.gif'></div>";
    element.post_list().append(markup);
}
function endless_show_no_more_content() {
    //console.log("endless_show_no_more_content");
    var text = 'No more content ........... !';
    element.post_list().after("<div class='no-more-content'>"+text+"</div>");
}
/* ============================== EO Endless page loading ... ================================ */
