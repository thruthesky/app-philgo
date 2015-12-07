$(function(){
    cache_update_run();
});







/**
 * =============== Action Functions =================
 */
function hidePanel() {
    panel().css('display', 'none');
}

/**
 * =============== Callback functions ================
 *
 */

function callback_cache_update(widget_name, re) {

    //console.log('mobile.js::callback_cache_update() : widget name:' + widget_name);
    //console.log(re.html);
    //console.log(widget_name);
    if ( re.html ) {
        var page = widget_name.replace('page-', '');
        db.save( page, re.html );
        //console.log('lenth:' + widget(widget_name).length);
        //console.log('page:' + page);
        if ( getCurrentPage() == page ) {
            //console.log("change content");
            //console.log(re.html);
            content().html(re.html);
        }
    }

}




/** ======================================= Cache functions ================================= */
var cache_url = url_server + 'ajax/cache/widget/';
var cache_widgets = [
    'header',
    'footer',
    'page-front',
    'page-forum',
    'page-life'
];


function cache_update_run() {
    var count = 0;
    cache_update_loop();
    setInterval(cache_update_loop, 1000 * 100);
    function cache_update_loop() {
        count++;
        //console.log("cache_run:" + count);
        for (i in cache_widgets) {
            cache_update_widgets(cache_widgets[i]);
        }
    }
}
function cache_update_widgets(widget) {
    //console.log("widget:" + widget );
    var q = cache_url + widget + "?dummy=" + new Date().getTime();
    //console.log(q);
    ajax_load(q, function(re){
        if ( re.code == 0 ) {
            //console.log("ajax_load() success: " + widget);
            //console.log(re.html);
            callback_cache_update(widget, re);
        }
    });
}

