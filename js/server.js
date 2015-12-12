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
var url_server_widget = url_server + 'ajax/cache/widget/';
var url_company_book_data = 'http://philgo.org/?module=etc&action=company_data_json_submit';
var cache_template_widgets = [
    'header',
    'footer',
    'panel-menu'
];


$(function(){
    console.log("server.js begins ...");
    note('server.js 를 로드하였습니다.');

    if ( isOffline() ) {
        note('인터넷을 연결 해 주십시오. Connect to Internet.', 'alert alert-warning');
    }

    update_version('2015-12-12-2');

    initServerEventHandlers();


    // 이 두 코드는 여기 있어야 한다. server.js 가 로드 될 때 바로 실행하면 된다.
    cache_update_templates(); // 템플릿( header, footer, panel 등 )만 1시간에 한번씩 실행

    // server.js 가 로드되면 첫 페이지를 업데이트 한다.
    cache_update('front', url_server_widget + 'front');

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
        return;
    }
    else {
        app_reset();
        set_version(new_version);
        app_refresh();
    }
}
/** =================== App related functions =================== */
function app_reset() {
    db.deleteAll();
}
function app_refresh() {
    location.href='index.html';
}


/** ================ init Server Event Handlers ============== */
function on_click(selector, callback) {
    $('body').on('click', selector, callback);
}
function initServerEventHandlers() {
    on_click('.page[page]', on_click_page);
    on_click('.content', on_click_content);
    on_click('.reset', on_click_reset);
    on_click('.panel-menu.toggle', on_click_panel_menu);

}


/** ================ Menu Callback Functions ================= */

function on_click_page() {
    var $this = $(this);
    var page = $this.attr('page');
    var url = $this.attr('url');

    //console.log('on_click_page() : ' + page);

    if ( isOffline() && $this.hasClass('check-online') ) {
        alert(page + " 페이지를 보기 위해서는 인터넷에 연결을 해 주세요. Please connect to Internet.")
        return;
    }

    // 여기서부터. url 에 값이 있으면 그 것을 endpoint 로 해서 정보를 로드한다.
    // 없으면 sapcms3 로 page 위젯을 로드한다.

    /*

     // 서버로 부터 새로운 캐시 내용을 받아서, 화면에 보여 준다.
     if ( typeof cache_update == 'function' ) {
     cache_update(page, update_content);
     }
     */
}


function on_click_content() {
    hidePanel();
}

function on_click_reset() {
    var re = confirm("앱을 초기화 하시겠습니까? Do you want to reset?");
    if ( re ) {
        app_reset();
        app_refresh();
    }
}

function on_click_panel_menu() {
    togglePanel();
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
 *      cache_update('front', callback_cache_update_on_content);
 * @code
 */
function cache_update(name, url) {
    console.log( "cache_update:" + name );
    setContent( db.get( name ), name );
    ajax_load(url, function(re){
        if ( re.html ) {
            save_page( name, re );
            setCurrentPage(name);
            setContent(re.html, name);
        }
        else cache_no_html(name);
    });
}



/** ============= DOM Management functions ============= */

/**
 *
 * @note This does not save data into database.
 * @Attention Use this function to set content on '.content'.
 *      - it does extra tasks.
 * @param html
 */
function setContent(html, page_name) {
    //console.log('setContent(...,' + page_name + ')');
    if ( isPanelOpen() ) hidePanel();
    content().html(html).attr('widget', page_name);
}






/** =============== Login / Register ================ */




/** =============== ENDLESS page loading =============== */

var endless_api = '';
function endless_reset(url) {
    endless_api = url;
}
endless_reset('http://sapcms3.org/ajax/endless?forum=abc&page_no=');
(function endless_run() {
    var $window = $(window);
    var $document = $(document);

    var endless_scroll_count = 0;
    var endless_distance = 400; // how far is the distance from bottom to get new page.
    var endless_in_loading = false;
    var endless_no_more_content = false;
    var endless_timer = 0;

    function endless_hide_loader() {
        console.log("endless_hide_load()");
        $('.endless-loader').remove();
    }
    function endless_show_no_more_content() {
        console.log("endless_show_no_more_content");
        var text = 'No more content!'
        $(".endless-list").after("<div class='no-more-content'>"+text+"</div>");
    }
    $document.scroll(function(e) {
        if ( ! endless_api ) return console.log("no endless_api");
        if ( endless_no_more_content ) return console.log("no more content");
        if ( endless_in_loading ) return console.log("endless is in loading page.");
        var top = $document.height() - $window.height() - endless_distance;
        if ($window.scrollTop() >= top) {
            endless_scroll_count ++;
            console.log("endless_listen_scroll():: count:" + endless_scroll_count);
            endless_in_loading = true;
            ajax_load( endless_api + endless_scroll_count, function(re) {
                //console.log(re);
                if ( re.code ) {
                    if ( re.code ==  -4 ) { // no more content
                        endless_no_more_content = true;
                        clearInterval(endless_timer);
                        endless_hide_loader();
                        endless_show_no_more_content();
                    }
                    else alert("Unkown error");
                }
                else {
                    //console.log(re['html']);
                    $(".endless-list").append(re.html);
                }
                endless_in_loading = false;
            });
        }
    });
})();
