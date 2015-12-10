
/**
 * ================================= Initialization Functions ==================================
 */


function initApp() {
    trace("init.js::initApp() begins...");
    initEventHandlers();
    init_default_widgets_and_pages();
    if ( isOffline() ) {
        note('인터넷을 연결 해 주십시오. Connect to Internet.', 'alert alert-warning');
    }
}


/**
 *
 * 이 함수의 역활은 App 이 처음 실행 될 때,
 *      - 서버로 부터 캐시(또는 page 폴더의 html)가 있으면 보여주고,
 *      - 아니면 page 폴더의 html 파일을 읽어서 db 에 저장하고 화면에 보여준다.
 *
 */


function init_default_widgets_and_pages() {
    trace("init_default_widgets_and_pages() begins ...");
    widget_load('header');
    widget_load('footer');
    widget_load('panel-menu');
    page_load('front', initContent);
    page_load('setting');
}




/**
 * App 이 실행될 때 페이지를 초기화 한다.
 *
 * front 페이지가 DB 에 있으면 그것을 보여 주고, 없으면 page/front.html 을 보여준다.
 *
 * @param page
 * @returns {*}
 */
function initContent() {
    trace('initContent()');
    showPage('front');
}



/**
 * #buildguide 페이지 캐시 https://docs.google.com/document/d/1yL2hl3qbMf3YVvO742-cDFssVtbdRTGh6yV3a43IN20/edit#heading=h.uy3hti46wyu9
 * @param widget_name
 *
 * @note 맨 처음 App 이 실행 될 때 초기화를 하는데,
 *      - DB 캐시가 없으면,
 *      - page 폴더에서 데이터를 로드한다.
 */

function widget_load(widget_name) {
    trace('widget_load:' + widget_name);
    var m = db.get( widget_name );
    if ( m ) return widget(widget_name).html(m);
    ajax_load_page(widget_name, widget(widget_name))
}
function page_load(page, callback) {
    trace('page_load:' + page);
    var m = db.get( page );
    if ( m ) {
        if ( typeof callback == 'function' ) return callback();
    }
    ajax_load_page(page, false, callback);
}


/**
 * App 의 page 폴더에 있는 정보를 '.content' 에 보여주고, DB 에 저장한다.
 * @param page
 * @param $e
 *
 *
 * @param callback - ajax load 를 하고 난 다음, hidePanel 과 같은 callback 을 사용 할 수 있다.
 */
function ajax_load_page(page, $e, callback) {
    var url = 'page/'+page+'.html';
    trace('ajax_load_page() : page: ' + page + ', url: ' + url);
    ajax_load(url, function(html){
        if ( $e ) $e.html(html);
        db.save(page, html);
        if ( typeof callback == 'function' ) {
            trace("ajax_load_page callback: ...");
            callback();
        }
    });
}

/**
 * page 값을 입력 받아서,
 * 각 page 에 해당하는 캐시를 DB 에서 끄집어 내어서 '.content' 에 넣어준다.
 * 만약 DB 에 내용이 없으면 page/connect.html 을 보여준다.
 * @param page
 */
function showPage(page) {
    trace('showPage(' + page + ')');
    setCurrentPage(page);
    var m = db.get( page );
    if ( m ) return setContent( m, page );
    else {
        ajax_load_page('connect', content(), hidePanel);
    }
}


/** ============= Event handlers functions ============= */
function on_click(selector, callback) {
    $('body').on('click', selector, callback);
}

function initEventHandlers() {
    on_click('.panel-menu.toggle', togglePanel);
    on_click('.content', on_click_content);
    on_click('.page[page]', on_click_page);
    on_click('.reset', on_click_reset);
}


/** =============== Callback functions ================= */


function on_click_reset() {
    var re = confirm("앱을 초기화 하시겠습니까? Do you want to reset?");
    if ( re ) {
        db.deleteAll();
        location.href='index.html';
    }
}

function on_click_content() {
    hidePanel();
}


function on_click_page() {
    var $this = $(this);
    if ( typeof server_on_click_page == 'function' && server_on_click_page($this) ) return;
    var page = $this.attr('page');
    trace('on_click_page() : ' + page);

    if ( isOffline() && $this.hasClass('check-online') ) {
        alert(page + " 페이지를 보기 위해서는 인터넷에 연결을 해 주세요. Please connect to Internet.")
        return;
    }

    // DB 에 캐시한 내용을 먼저 보여주고,
    showPage(page);

    // 서버로 부터 새로운 캐시 내용을 받아서, 화면에 보여 준다.
    if ( typeof cache_get_widget_from_server == 'function' ) {
        cache_get_widget_from_server(page, callback_cache_update_page_on_content);
    }
}





function callback_cache_update_on_widget(widget_name, re) {
    if ( re.html ) {
        db.save( widget_name, re.html );
        widget(widget_name).html(re.html);
    }
}

/**
 *
 * 서버로 부터 받은 페이지의 html 을 db 에 저장하고, 화면에 보여 준다.
 *
 * @param page
 * @param re
 */
function callback_cache_update_page_on_content(page, re) {
    trace("callback_cache_update_page_on_content: page:" + page);
    if ( re.html ) {
        db.save( page, re.html );
        showPage(page);
    }
}

