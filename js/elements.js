
function body() {
    return $('body');
}


/**
 * ============================ Page Object Functions ============================
 */


function setCurrentPage(page) {
    current_page_name = page;
}
function getCurrentPage() {
    return current_page_name;
}
function content() {
    return $('.widget.content');
}


function widget(name) {
    return $(".widget." + name);
}

function header() {
    return $('header');
}
function footer() {
    return $('footer');
}
function panel() {
    return menu_panel();
}
function menu_panel() {
    return $('.widget.menu-panel');
}

function notification() {
    return $('.notification');
}