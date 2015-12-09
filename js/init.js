
/**
 * ================================= Initialization Functions ==================================
 */


function initApp() {
    initEventHandlers();
    init_default_widgets_and_pages();
    if ( isOffline() ) {
        note('인터넷을 연결 해 주십시오. Connect to Internet.', 'red');
    }
}




function init_default_widgets_and_pages() {
    widget_load('header');
    widget_load('footer');
    widget_load('panel');
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
    console.log('initContent()');
    showPage('front');
}



/**
 * #buildguide 페이지 캐시 https://docs.google.com/document/d/1yL2hl3qbMf3YVvO742-cDFssVtbdRTGh6yV3a43IN20/edit#heading=h.uy3hti46wyu9
 * @param widget_name
 *
 * @note 맨 처음 App 이 실행 될 때 초기화를 하는데,
 */
function widget_load(widget_name) {
    //console.log('widget_load:' + widget_name);
    var m = db.get( widget_name );
    if ( m ) return widget(widget_name).html(m);
    ajax_load_page(widget_name, widget(widget_name))
}

function page_load(page, callback) {
    console.log('page_load:' + page);
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
    console.log('ajax_load_page() : page: ' + page + ', url: ' + url);
    ajax_load(url, function(html){
        if ( $e ) $e.html(html);
        db.save(page, html);
        if ( typeof callback == 'function' ) {
            console.log("ajax_load_page callback: ...");
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
    console.log('showPage(' + page + ')');
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
    on_click('.panel.toggle', togglePanel);
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
    var page = $this.attr('page');

    console.log('on_click_page() : ' + page);
    showPage(page);

    if ( isOffline() && $this.hasClass('check-online') ) {
        alert(page + " 페이지를 보기 위해서는 인터넷에 연결을 해 주세요. Please connect to Internet.")
        return;
    }

    if ( typeof cache_get_widget_from_server == 'function' ) {
        cache_get_widget_from_server(page, callback_cache_update_on_content);
    }
}





function callback_cache_update_on_widget(widget_name, re) {
    if ( re.html ) {
        db.save( widget_name, re.html );
        widget(widget_name).html(re.html);
    }
}

function callback_cache_update_on_content(widget_name, re) {
    if ( re.html ) {
        db.save( widget_name, re.html );
        //content().html(re.html).attr('widget', widget_name);
        setContent(re.html, widget_name);
    }
}

