/**
 *
 * @file client.js
 * @desc This is the starter script.
 *
 *
 */
/**
 * #buildguide
 * @var current_page_name
 * @type {null}
 */
var current_page_name = null;
$(function(){
    //db.deleteAll();
    check_update_version();
    header_show();
    footer_show();

    //db.deleteAll(); // test.
    //initApp();
    //setTimeout(function(){ showPage('setting'); }, 600); // test
    //setTimeout(function(){ $('.page[page="news"]').click(); }, 1000); // test : news page
    //setTimeout(function(){ $('.page[page="info"]').click(); }, 1300); // test : info page
    //setTimeout(togglePanel, 300); // test : open panel-menu
});


function header_show() {
    var m = get_cache('header');
    if ( !_.isEmpty(m) ) header().html(m);
    ajax_load('widget/header.html', function(re){
        header().html(re);
    });
}

function footer_show() {
    var m = get_cache('footer');
    if ( !_.isEmpty(m) ) footer().html(m);
    ajax_load('widget/footer.html', function(re){
        footer().html(re);
    });
}


function server() {
    return typeof server_js_version != 'undefined';
}
function check_update_version() {
    /**
     * Check version every two hours.
     */
    setTimeout(check_version,1000); // fire after 1 seconds
    setTimeout(check_version,1000 * 60 * 1); // fire after 1 minutes.
    setInterval(check_version, 1000 * 60 * 60 * 2);
    function check_version(){
        ajax_load(url_server + '?module=ajax&action=version&submit=1', function(re){
            db.set('url_css_bootstrap', re['url_css_bootstrap']);
            db.set('url_js_bootstrap', re['url_js_bootstrap']);
            if ( server() ) update_version(re.version);
        });
    }
}