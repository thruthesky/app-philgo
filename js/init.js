
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



function initContent(page) {
    if ( page ) setCurrentPage(page);
    else setCurrentPage('front');

    var m = db.get( getCurrentPage() );
    if ( m ) return setContent( m );

    ajax_load('page/' + page + '.html', function(html){
        setContent(html);
    });


}


function initHeader() {
    page_load('header');
    /*
    page_load('header', header());
    var m = db.get('header');
    if ( m ) header().html(m);
    else page_load('page/header.html', header());
    */
}

function initFooter() {
    page_load('footer');
    /*
    var m = db.get('footer');
    if ( m ) footer().html(m);
    else page_load('page/footer.html', footer());
    */
}

function page_load(widget_name) {
    var m = db.get(widget_name);
    if ( m ) {
        widget(widget_name).html(m);
    }
    else {
        ajax_load('page/'+widget_name+'.html', function(html){
            widget(widget_name).html(m);
        });
    }
}

function initPanel() {
    page_load('panel');
}


function initEventHandlers() {

    var $body = $('body');
    $body.on('click', '.panel.toggle', togglePanel);
    $body.on('click', '.content', on_click_content);
    $body.on('click', 'header [page]', function() {
        var $this = $(this);
        var page = $this.attr('page');
        showPage(page);
    });

    function on_click_content() {
        hidePanel();
    }
}


