/**
 *
 *
 */
/**
 * Definitions
 *
 */
var cache_url = url_server + 'ajax/cache/widget/';
var url_company_book_data = 'http://philgo.org/?module=etc&action=company_data_json_submit';
var cache_template_widgets = [
    'header',
    'footer',
    'panel-menu'
];


$(function(){
    console.log("server.js begins ...");
    note('server.js 를 로드하였습니다.');
    set_version('2015-12-10');
    initServerEventHandlers();


    // 이 두 코드는 여기 있어야 한다. server.js 가 로드 될 때 바로 실행하면 된다.
    cache_update_templates(); // 템플릿( header, footer, panel 등 )만 1시간에 한번씩 실행

    // server.js 가 로드되면 첫 페이지를 업데이트 한다.
    cache_get_widget_from_server('front', callback_cache_update_page_on_content);

});
/** ===================== Helper functions =================== */

function set_version(version) {
    db.set('version', version);
}



/** ===================== init Server Event Handlers ======================= */

function initServerEventHandlers() {

}




/** ======================================= Cache functions ================================= */


function cache_update_templates() {
    trace("cache_update_templates() begins");
    var count = 0;
    cache_update_loop();
    setInterval(cache_update_loop, 1000 * 60 * 60 * 1);
    function cache_update_loop() {
        count++;
        //trace("cache_run:" + count);
        for (i in cache_template_widgets) {
            cache_get_widget_from_server(cache_template_widgets[i], callback_cache_update_on_widget);
        }
    }
}

/**
 *
 * @short 페이지를 서버로 부터 받아서,
 *          - DB 에 캐시 한 다음,
 *          - '.content' 부분에 표시를 한다.
 *
 * @usage 페이지를 캐시해야한다면 임의로 이 코드를 사용 하면 된다.
 *
 * @param widget
 * @param callback
 * @code
 *      cache_get_widget_from_server('front', callback_cache_update_on_content);
 * @code
 */
function cache_get_widget_from_server(widget, callback) {
    trace( "cache_get_widget_from_server:" + widget );
    var q = cache_url + widget + "?dummy=" + new Date().getTime();
    ajax_load(q, function(re){
        callback(widget, re);
    });
}




/**
 * =============== Callback functions ================
 *
 */
function server_on_click_page($this) {
    var page = $this.attr('page');
    trace('server_on_click_page() : page=' + page);
    if ( page != 'company' ) return false;
    ajax_load(url_company_book_data, function(re) {
        trace(re);
    });
}




/** =============== Login / Register ================ */




