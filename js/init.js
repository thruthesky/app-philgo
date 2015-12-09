
/**
 * ================================= Initialization Functions ==================================
 */


function initApp() {
    initEventHandlers();
    initHeader();
    initContent();
    initFooter();
    initPanel();
}




function initHeader() {
    page_load('header');
}

function initFooter() {
    page_load('footer');
}



function initPanel() {
    page_load('panel');
}


function initContent(page) {
    if ( page ) setCurrentPage(page);
    else setCurrentPage('front');

    var m = db.get( getCurrentPage() );
    if ( m ) return setContent( m );

    var url = 'page/' + getCurrentPage() + '.html';
    console.log(url);
    ajax_load(url, function(html){
        setContent(html);
    });
}



/**
 * #buildguide 페이지 캐시 https://docs.google.com/document/d/1yL2hl3qbMf3YVvO742-cDFssVtbdRTGh6yV3a43IN20/edit#heading=h.uy3hti46wyu9
 * @param widget_name
 */
function page_load(widget_name) {
    //console.log('page_load('+widget_name+')');
    var m = db.get(widget_name);
    //console.log(m);
    if ( m ) {
        widget(widget_name).html(m);
    }
    else {
        var url = 'page/'+widget_name+'.html';
        ajax_load(url, function(html){
            widget(widget_name).html(html);
        });
    }
}


/** ============= Event handlers functions ============= */
function on_click(selector, callback) {
    $('body').on('click', selector, callback);
}

function initEventHandlers() {
    on_click('.panel.toggle', togglePanel);
    on_click('.content', on_click_content);
    on_click('header [page]', on_click_header_page_button);
}


/** =============== Callback functions ================= */


function on_click_content() {
    hidePanel();
}

function on_click_header_page_button() {
    var $this = $(this);
    var page = $this.attr('page');
    showPage(page);
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

