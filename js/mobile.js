var current_page_name = null;
var url_server_ajax = url_server + 'ajax/';
var url_server_ajax_page = url_server_ajax + 'page/';
//var url_server_ajax_widget = url_server_ajax + 'widget/';
//var list_widget = [ 'front_banner', 'front_text', 'forum_text', 'life_banner', 'life_text' ];
var list_pages = ['front', 'forum', 'life'];
$(function(){
    setCurrentPage('front');
    initApp();
    downloadPages();
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
function slidemenu() {
    return $('#slide-menu');
}


function initContent(page) {
    /*
    ajax_load('page/content.html', function(re){
        content().html(re);
    });
    */

    if ( page ) setCurrentPage(page);
    content().html( db.get( getCurrentPage() ) );
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

function initSlideMenu() {
    ajax_load('page/slide-menu.html', function(re){
        slidemenu().html(re);
    });
}

function initApp() {

    initEventHandlers();
    initHeader();
    initContent();
    initFooter();
    initSlideMenu();
}



function initEventHandlers() {

    $("body").on('click', '.slide-menu-button', function(){
        $("#slide-menu").animate({
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
        }
        if ( getCurrentPage() == page_name ) {
            content().html(re.html);
        }
    });
}
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