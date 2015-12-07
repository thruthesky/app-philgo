var current_page_name = null;
var url_server_ajax = url_server + 'ajax/';
var url_server_ajax_page = url_server_ajax + 'page/';
//var url_server_ajax_widget = url_server_ajax + 'widget/';
//var list_widget = [ 'front_banner', 'front_text', 'forum_text', 'life_banner', 'life_text' ];

$(function(){
    setCurrentPage('front');
    initApp();
//    downloadPages();

    //cache.run();
});

function setCurrentPage(page) {
    current_page_name = page;
}
function getCurrentPage() {
    return current_page_name;
}
function content() {
    return $('#content');
}

/*
function widget(name) {
    return $(".widget ." + name);
}
*/
function header() {
    return $('header');
}
function footer() {
    return $('footer');
}
function panel() {
    return $('#panel');
}


function initContent(page) {
    /*
    ajax_load('page/content.html', function(re){
        content().html(re);
    });
    */

    if ( page ) setCurrentPage(page);
    setContent( db.get( getCurrentPage() ) );
}

/**
 * @Attention Use this function to set content on '.content'.
 *      - it does extra tasks.
 * @param html
 */
function setContent(html) {
    if ( isPanelOpen() ) hidePanel();
    content().html(html);
}

function initHeader() {
    ajax_load('page/header.html', function(re){
        header().html(re);
    });
}

function initFooter() {
    ajax_load('page/footer.html', function(re){
        footer().html(re);
    });
}

function initPanel() {
    ajax_load('page/panel.html', function(re){
        panel().html(re);
    });
}

function initApp() {

    initEventHandlers();
    initHeader();
    initContent();
    initFooter();
    initPanel();
}



function initEventHandlers() {

    $("body").on('click', '.panel.toggle', function(){
        $("#panel").animate({
            width: "toggle"
        });
    });

    $('body').on('click', 'header [page]', function() {
        var $this = $(this);
        var page = $this.attr('page');
        initContent(page);
    })
}


/**
 * Download front page and sub-pages.
 *
 *
 */
/*
function downloadPages() {
    for( i in list_pages ) {
        downloadPageAndRender(list_pages[i]);
    }
}
function downloadPageAndRender(page_name) {
    page_name += "?dummy=" + new Date().getTime();
    ajax_load(url_server_ajax_page + page_name, function(re) {
        console.log(re);
        if ( re.html ) {
            db.set(page_name, re.html);
            db.set(page_name + '.md5', re.md5);
        }
        if ( getCurrentPage() == page_name ) {
            content().html(re.html);
        }
    });
}
*/
/*
function downloadWidgets() {

    for( i in list_widget ) {
        downloadWidgetAndRender(list_widget[i]);
    }
}
function downloadWidgetAndRender($widget_name) {
    ajax_load(url_server_ajax_widget + $widget_name, function(re) {
        //console.log(re);
        if ( re.html ) {
            db.set($widget_name, re.html);
        }
        widget( $widget_name).html(re.html);
    });
}
*/
/**
 *
 * =============== STATE FUNCTIONS ===================
 */
function isPanelOpen() {
    return panel().css('display') != 'none';
}

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

function callback_cache_update(page_name, re) {
    //var page_name = re.page_name;
    //console.log('callback_cache_update() : page name:' + page_name);
    if ( re.html ) {
        db.set(page_name, re.html);
        db.set(page_name + '.md5', re.md5);
        if ( getCurrentPage() == page_name ) {
            content().html(re.html);
        }
    }
}
