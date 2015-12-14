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

    init_index_html();
    //db.deleteAll(); // test.
    //initApp();
    //setTimeout(function(){ showPage('setting'); }, 600); // test
    //setTimeout(function(){ $('.page[page="news"]').click(); }, 1000); // test : news page
    //setTimeout(function(){ $('.page[page="info"]').click(); }, 1300); // test : info page
    //setTimeout(togglePanel, 300); // test : open panel-menu


    /**
     * 두 시간 마다 버젼 확인
     */
    setTimeout(check_version,1000);
    setInterval(check_version, 1000 * 60 * 60 * 2);
    function check_version(){
        ajax_load(url_server + '?module=ajax&action=version&submit=1', function(re){
            update_version(re.version);
            db.set('url_css_bootstrap', re['url_css_bootstrap']);
            db.set('url_js_bootstrap', re['url_js_bootstrap']);
        });
    }

});


function init_index_html() {
    if (_.isEmpty(db.get('header')) ) header().find('div').show();
    if (_.isEmpty(db.get('footer')) ) footer().find('div').show();
}