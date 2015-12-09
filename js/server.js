/**
 *
 *
 */
/**
 * Definitions
 *
 */
var cache_url = url_server + 'ajax/cache/widget/';
var cache_template_widgets = [
    'header',
    'footer',
    'panel'
];


$(function(){
    note('server.js 를 로드하였습니다.');
    set_version('20151209');
    cache_run_for_templates(); // 템플릿( header, footer, panel 등 )만 1시간에 한번씩 실행
    cache_get_widget_from_server('front', callback_cache_update_on_content);
    initServerEventHandlers();
});
/** ===================== Helper functions =================== */

function set_version(version) {
    db.set('version', version);
}

function resetApp() {
    var key = 'reset2';
    var reset_date = '2015-12-08';
    var reset = db.getRecord(key);
    console.log(reset);
    if ( reset ) {
        // installed.
    }
    else {
        // Not installed. Install now.
        console.log("App is begin reset.");
        db.save(key, reset_date);
        db.delete('header');
        db.delete('footer');
        db.delete('panel');
        db.delete('front');
    }
}

/** ===================== init Server Event Handlers ======================= */

function initServerEventHandlers() {

}




/** ======================================= Cache functions ================================= */


function cache_run_for_templates() {
    var count = 0;
    cache_update_loop();
    setInterval(cache_update_loop, 1000 * 60 * 60 * 1);
    function cache_update_loop() {
        count++;
        //console.log("cache_run:" + count);
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
    console.log( "widget:" + widget );
    var q = cache_url + widget + "?dummy=" + new Date().getTime();
    //console.log(q);
    ajax_load(q, function(re){
        if ( re.code == 0 ) {
            callback(widget, re);
        }
    });
}




/**
 * =============== Callback functions ================
 *
 */





/** =============== Login / Register ================ */




