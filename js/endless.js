/**
 *
 * @file endless.js 범용적으로 사용 할 수 있는 endless page loading 코드이다.
 * @usage 사용방법
 *
 *      1. endless_reset(url, callback) - 이 함수가 시작 또는 새로운 URL 로 부터 ENDLESS 로 로딩을 하게 하는 함수이다.
 *
 *      2. callback 함수에서 매개변수 re 를 화면에 뿌려주면 된다.
 *
 *
 *
 */

var endless_api = '';
var endless_scroll_count = 0;
var endless_no_more_content = false;
var endless_in_loading = false;
var endless_callback;


/**
 *
 * 이 함수는 endless 페이지 로딩을 시작하거나 새로운 URL 을 지정하는 리셋하는 함수이다.
 *
 *      - 내부적으로 필요한 설정을 한다.
 *      - 새로운 URL 로 page_no=1 을 값을 지정하여 서버로 요청을 하며,
 *      - 페이지 로딩을 할 때마다 page_no 값을 올려서 서버로 요청한다.
 *
 *
 *
 * @note 이 함수는 범용적이다.
 *
 *
 *
 * @param url - 서버 요청 URL
 * @param callback - 결과를 표현 할 callback 함수.
 *
 * @code 게시판 예제
 *      endless_reset(app.url_server_forum() + post_id, post.endless_update);
 * @endcode
 *
 * @code 쪽지 목록 예제
 * endless_reset(url, function(re){
            if (_.isEmpty(re['messages']) ) endless_show_no_more_content('<h1>No more messages</h1>');
            for( var i in re['messages'] ) {
                if ( re['messages'].hasOwnProperty(i) ) {
                    m = re['messages'][i];
                    var markup = '' +
                        '<div class="message">' +
                        '   <div class="subject">{{subject}}</div>' +
                        '</div>' +
                        '';
                    m = _.template(markup)(m);
                    message.list().append(m)
                }
            }
        });
 * @endcode
 *
 * @attention url 값이 '' 임ㄴ ajax_load 를 호출하지 않는다.
 */
function endless_reset(url, callback) {
    endless_callback = callback;
    endless_scroll_count = 1;
    endless_no_more_content = false;
    endless_in_loading = false;
    endless_hide_no_more_content();
    if( url == '' ) return;
    endless_api = url + '&page_no=';
    var url_endless = endless_api + endless_scroll_count;
    ajax_load( url_endless, endless_callback);
}
(function () {
    var $window = jQuery(window);
    var $document = $(document);
    var endless_distance = 400; // how far is the distance from bottom to get new page.
    $document.scroll(endless_load_more);
    function endless_load_more() {
        // trace('endless_load_more(e) : ');
        if ( app.getCurrentPage() == 'post-view' ) return trace("DO NOT endless load on 'post-view' page. return.");
        if ( ! endless_api ) return trace("no endless_api");
        if ( endless_no_more_content ) return trace("no more content. return.");
        if ( endless_in_loading ) return trace("endless is in loading page.");
        var top = $document.height() - $window.height() - endless_distance;
        if ($window.scrollTop() >= top) {
            endless_scroll_count ++;
            //trace("endless_listen_scroll():: count:" + endless_scroll_count);
            endless_in_loading = true;
            endless_show_loader();
            ajax_load( endless_api + endless_scroll_count, function(re) {
                if ( typeof endless_callback == 'function' ) endless_callback(re);
                endless_callback_end();
                endless_hide_loader();
            });
        }
    }
})();
function endless_hide_loader() {
    //trace("endless_hide_load()");
    var $loader = $('.endless-loader');
    if ( $loader.length ) $loader.remove();
}
function endless_show_loader() {
    //trace("endless_show_load()");
    //var markup = '<div class="endless-loader" style="margin:3em 0; padding:3em 0; text-align:center;"><img src="img/loader/loader9.gif"></div>';

    /** It is now working.*/
    var markup = '';
	markup += '<div class="endless-loader" style="padding:10px;margin-bottom:10px;background-color:#fff;text-align:center">';
	markup += '<span style="margin-right:10px;font-weight:bold;color:#585858;">Loading</span>';
	markup += '<img src="img/loader/custom_loader.gif">';
	markup += '</div>';
	
    el.content().append(markup);
}
function endless_show_no_more_content(m) {
    //trace("endless_show_no_more_content");
    endless_no_more_content = true;
    el.content().append("<div class='no-more-content'>"+m+"</div>");
}
function endless_hide_no_more_content(m) {
    $('.no-more-content').hide();
}
function endless_callback_end() {
    endless_in_loading = false;
}
/* ============================== EO Endless page loading ... ================================ */
