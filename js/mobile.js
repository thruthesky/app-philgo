$(function(){

    initApp();


    function initContent() {
        ajax_load('page/content.html', function(re){
            content().html(re);
        });
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
        initHeader();
        initContent();
        initFooter();
        initEvents();
        initSlideMenu();
    }



    function initEvents() {

        $("body").on('click', '.slide-menu-button', function(){
            $("#slide-menu").animate({
                width: "toggle"
            });
        });
    }


});

function content() {
    return $('#content');
}
function header() {
    return $('header');
}
function footer() {
    return $('footer');
}
function slidemenu() {
    return $('#slide-menu');
}