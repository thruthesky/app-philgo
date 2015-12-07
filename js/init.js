
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
    setContent( db.get( getCurrentPage() ) );
}


function initHeader() {
    var m = '';
    m += '<table cellpadding="0" cellspacing="0" width="100%">';
    m += '<tr>';
    m += '<td class="left">';
    m += '<div><span class="button" page="front">Front</span><span class="button" page="forum">Forum</span><span class="button" page="life">Life</span></div>';
    m += '</td>';
    m += '<td class="middle"><h1 class="title">PhilZine</h1></td>';
    m += '<td class="right">';
    m += '<div><span class="button panel toggle">Menu</span></div>';
    m += '<td>';
    m += '</tr>';
    m += '</table>';
    header().html(m);
}

function initFooter() {
    var m = '';
    m += '<footer>Home|Profile|Message|Search|Post|Settings</footer>';
    footer().html(m);
}

function initPanel() {
    var m = '';
    m += '<div id="panel-inner">';
    m += '<b>Panel</b>';
    m += '<ul>';
    m += '<li>Profile 1</li>';
    m += '<li>Profile 2</li>';
    m += '<li>Settings</li>';
    m += '<li>- Reset</li>';
    m += '<li>- Show all menu on front page</li>';
    m += '<li><span class="panel toggle">Close Menu</span></li>';
    m += '</ul>';
    m += '</div>';
    panel().html(m);
}


function initEventHandlers() {

    $("body").on('click', '.panel.toggle', function(){
        $(".widget.panel").animate({
            width: "toggle"
        });
    });

    $('body').on('click', 'header [page]', function() {
        var $this = $(this);
        var page = $this.attr('page');
        showPage(page);
    })
}

