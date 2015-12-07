var cache_url_endpoint = url_server + 'ajax/cache/page/';
var cache_list_pages = {
    'front': ['front_banner', 'front_text', 'front_text_with_thumbnail'],
    'forum': ['forum_banner', 'forum_text'],
    'life': ['life_banner', 'life_text']
};
function cache_run() {
    var count = 0;
    cache_update_loop();
    setInterval(cache_update_loop, 1000 * 5);
    function cache_update_loop() {
        count++;
        console.log("cache_run:" + count);
        for (i in cache_list_pages) {
            cache_update(cache_list_pages[i]);
        }
    }
}
function cache_update(page_name) {
    for( i in page_name ) {
        widget_name = page_name[i];
        console.log(widget_name);
    }
    return;
    var q = cache_url_endpoint + page_name + "?dummy=" + new Date().getTime();
    console.log(q);
    ajax_load(q, function(re){
        console.log("ajax_load() success: " + page_name);
        callback_cache_update(page_name, re);
    });
}
cache_run();

