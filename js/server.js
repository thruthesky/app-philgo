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
    //'front',
    //'forum',
    //'life'
];

var widget_check_online = [ 'login', 'register' ];

$(function(){
    cache_run_for_templates();
    initServerEventHandlers();
});
/** ===================== Cordova functions ================== */
function isOnline() {
    return true;
}
function isOffline() {
    return ! isOnline();
}
/** ===================== Helper functions =================== */
function on_click(selector, callback) {
    $('body').on('click', selector, callback);
}


/** ===================== Server Event Handlers ======================= */

function initServerEventHandlers() {
    on_click('.button.page', on_click_page);
}



/**
 * =============== Callback functions ================
 *
 */
function on_click_page() {
    var $this = $(this);
    var page = $this.attr('page');
    console.log('server on_click_page() : ' + page);

    if ( isOffline() && _.indexOf(widget_check_online, page) ) {
        alert("인터넷에 연결을 해 주세요. Please connect to Internet.")
        return;
    }
    cache_get_widget_from_server(page, callback_cache_update_template);
}

function callback_cache_update_template(widget_name, re) {
    if ( re.html ) {
        db.save( widget_name, re.html );
        widget(widget_name).html(re.html);
    }
}




/** ======================================= Cache functions ================================= */


function cache_run_for_templates() {
    var count = 0;
    cache_update_loop();
    setInterval(cache_update_loop, 1000 * 100);
    function cache_update_loop() {
        count++;
        //console.log("cache_run:" + count);
        for (i in cache_template_widgets) {
            cache_get_widget_from_server(cache_template_widgets[i], callback_cache_update_template);
        }
    }
}

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






/** =============== Login / Register ================ */



