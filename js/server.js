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

    //update_version(app_version); // 여기서 기록을 하면, 버젼을 수동으로 확인 할 수가 없다.

    initServerEventHandlers();


    // 이 두 코드는 여기 있어야 한다. server.js 가 로드 될 때 바로 실행하면 된다.
    cache_update_templates(); // 템플릿( header, footer, panel 등 )만 1시간에 한번씩 실행

    // server.js 가 로드되면 첫 페이지를 업데이트 한다.
    cache_update('front');

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
        console.log("App version:" + new_version);
        return;
    }
    else {
        console.log('updating version with:' + new_version);
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

/**
 * #buildguide on_click_page
 */
function on_click_page() {
    var $this = $(this);
    var page = $this.attr('page');
    var url = $this.attr('url');

    console.log('on_click_page() : ' + page);

    if ( isOffline() && $this.hasClass('check-online') ) {
        alert(page + " 페이지를 보기 위해서는 인터넷에 연결을 해 주세요. Please connect to Internet.")
        return;
    }

    // 여기서부터. url 에 값이 있으면 그 것을 endpoint 로 해서 정보를 로드한다.
    // 없으면 sapcms3 로 page 위젯을 로드한다.
    cache_update(page, url);
}


function on_click_content() {
    hidePanel();
}

/**
 *
 */
function on_click_reset() {
    console.log('on_click_reset()');
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
 *      cache_update('front');
 * @code
 */
function cache_update(name, url) {
    console.log( "cache_update:" + name );
    setContent( db.get( name ), name );
    var url_widget = url_server_widget + name;
    ajax_load(url_widget, function(re){
        if ( re.html ) {
            save_page( name, re );
            setCurrentPage(name);
            setContent(re.html, name);
            if ( url ) endless_reset(url);
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
var endless_scroll_count = 0;
var endless_no_more_content = false;
var endless_in_loading = false;
function endless_list() {
    return $('.endless-list');
}
function endless_load_more_update(re) {
    //console.log(re);
    if (_.isEmpty(re.posts) ) {
            endless_no_more_content = true;
            endless_hide_loader();
            endless_show_no_more_content();
    }
    else {
        //console.log(re['html']);
        var site = re.site;
        var forum = re.forum;
        var page_no = re.page_no;
        note_reset(site + ' 사이트 : ' + forum + '의 ' + page_no + " 페이지 내용이 추가되었습니다.");
        var p;
        for ( i in re.posts ) {
            p = re.posts[i];

            endless_hide_loader();
            endless_list().append('<h3>' + p.subject + '</h3>');
            console.log(p.subject);
        }
    }
    endless_in_loading = false;
}
/**
 * 리셋을 하면 첫 페이지를 바로 보여준다.
 * @param url
 */
function endless_reset(url) {
    console.log('endless_reset('+url+')');
    endless_api = url;
    endless_scroll_count = 0;
    endless_no_more_content = false;
    endless_in_loading = false;
    var url_endless = endless_api + endless_scroll_count;
    ajax_load( url_endless, endless_load_more_update);
}
//endless_reset('http://sapcms3.org/ajax/endless?forum=abc&page_no=');
(function endless_run() {
    var $window = $(window);
    var $document = $(document);

    var endless_distance = 400; // how far is the distance from bottom to get new page.


    $document.scroll(endless_load_more);

    function endless_load_more(e) {
        console.log('endless_load_more(e) : ');
        if ( ! endless_api ) return console.log("no endless_api");
        if ( endless_no_more_content ) return console.log("no more content. return.");
        if ( endless_in_loading ) return console.log("endless is in loading page.");
        var top = $document.height() - $window.height() - endless_distance;
        if ($window.scrollTop() >= top) {
            endless_scroll_count ++;
            console.log("endless_listen_scroll():: count:" + endless_scroll_count);
            endless_in_loading = true;
            endless_show_loader();
            ajax_load( endless_api + endless_scroll_count, endless_load_more_update);
        }
    }
})();


function endless_hide_loader() {
    console.log("endless_hide_load()");
    $('.endless-loader').remove();
}
function endless_show_loader() {
    console.log("endless_show_load()");
    var markup = "<div class='endless-loader'><img src='img/loader/loader9.gif'></div>";
    endless_list().append(markup);
}
function endless_show_no_more_content() {
    console.log("endless_show_no_more_content");
    var text = 'No more content ........... !'
    endless_list().after("<div class='no-more-content'>"+text+"</div>");
}