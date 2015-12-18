/**
 *
 * @file client.js
 * @desc This is the starter script.
 *
 *
 */
/**
 * #buildguide
 * @var current_page_name
 * @type {null}
 */
var current_page_name = null;
$do_not_use_server_header_footer_template = false;
$(function(){

    //db.deleteAll();

    check_update_version();
    header_show();
    footer_show();

    front_show();
    panel_menu_content_load();

    do_not_use_server_header_footer_template();


    //db.deleteAll(); // test.
    //initApp();
    //setTimeout(function(){ showPage('setting'); }, 600); // test
    //setTimeout(function(){ $('.page[page="news"]').click(); }, 700); // test : news page
    //setTimeout(function(){ $('.page[page="login"]').click(); }, 700); // test : login page
    //setTimeout(function(){ $('.page[page="info"]').click(); }, 1300); // test : info page
    //setTimeout(togglePanel, 300); // test : open panel-menu

    //setTimeout(function(){ show_post_write_form('freetalk'); }, 500); // TEST SHOW Post Write Form


    /** Event Handlers */
    on_click('.page[page]', on_click_page);
    on_click('.menu-panel.toggle', on_click_menu_panel);
});
/**
 * ----------------------------------- Event Handlers ------------------------------
 * @param selector
 * @param callback
 */
function on_click(selector, callback) {
    $('body').on('click', selector, callback);
}


/**
 * #buildguide on_click_page
 */
function on_click_page() {
    if ( typeof on_click_page_server == 'function' ) return on_click_page_server($(this));
    else content().html( db.get( $(this).attr('page') ) );
}


/**
 *
 * @returns {*}
 */
function on_click_menu_panel() {
    if ( typeof on_click_menu_panel_server == 'function' && on_click_menu_panel_server() ) return;
    togglePanel();
}



/**
 * @note This let you to use local 'widget' folder html files only.
 * @usage Use this function when you want to debug or build.
 */
function do_not_use_server_header_footer_template() {
    $do_not_use_server_header_footer_template = true;
    db.delete('header');
    db.delete('footer');
    db.delete('menu-panel');
}


function header_show() {
    set_cache_data_or_load_page('header', header());
    /*
    var m = get_cache('header');
    if ( !_.isEmpty(m) ) return header().html(m);
    ajax_load('widget/header.html', function(re){
        header().html(re);
    }, true);
    */
}

function footer_show() {
    set_cache_data_or_load_page('footer', footer());
    /*
    var m = get_cache('footer');
    if ( !_.isEmpty(m) ) return footer().html(m);
    ajax_load('widget/footer.html', function(re){
        footer().html(re);
    }, true);
    */
}


function panel_menu_content_load() {
    set_cache_data_or_load_page('menu-panel', menu_panel());
    /*
    var m = get_cache('menu-panel');
    if ( !_.isEmpty(m) ) return menu_panel().html(m);
    ajax_load('widget/menu-panel.html', function(re){
        menu_panel().html(re);
    }, true);
    */
}

/**
 * - first, it looks up for the cached HTML markup from database.
 * - second, IF cached HTML does not exists, it load HTML markup from page folder.
 * @param cache_key
 * @param $obj
 * @returns {*}
 */
function set_cache_data_or_load_page(cache_key, $obj) {
    var m = get_cache(cache_key);
    if ( !_.isEmpty(m) ) return $obj.html(m);
    ajax_load('widget/'+cache_key+'.html', function(re){
        $obj.html(re);
    }, true);
}


/**
 * Show cached front
 */
function front_show() {
    content().html(db.get( 'front' ));
}

function check_update_version() {
    /**
     * Check version every two hours.
     */
    setTimeout(check_version,1000); // fire after 1 seconds
    setTimeout(check_version,1000 * 60 * 1); // fire after 1 minutes.
    setInterval(check_version, 1000 * 60 * 60 * 2);
    function check_version(){
        ajax_load(url_server + '?module=ajax&action=version&submit=1', function(re){
            console.log(re);
            db.set('url_css_bootstrap', re['url_css_bootstrap']);
            db.set('url_js_bootstrap', re['url_js_bootstrap']);
            if ( typeof update_version == 'function' ) update_version(re.version);
        });
    }
}

/*added by benjamin*/
$(function(){
	$("body").on("click", ".custom-carousel .arrow", do_carousel_event );	
	$("body").on("click", ".custom-carousel .carousel-paging > li", do_carousel_event );
	
	$("body").on("click", ".btn-group", custom_btn_dropdown_callback );	
});

var top_carousel_animating = false;

function do_carousel_event(){
	if( top_carousel_animating == true ) return;
	top_carousel_animating = true;
	var counter = 0;

	$this = $(this);
	action = $this.attr('action');

	if( action == "next" ){
		$next_item = $(".custom-carousel .item.active").next();
		if( $next_item.index() <= 0 ){
			$next_item = $(".custom-carousel > .inner .item:first");
		}
		$next_item.addClass("next").css("left","100%");
		
		animation = "-100%";
	}
	else if( action == "prev" ){
		$next_item = $(".custom-carousel .item.active").prev();
		if( $next_item.index() <= 0 ){
			$next_item = $(".custom-carousel > .inner .item:last");
		}
		$next_item.addClass("next").css("left","-100%");
		
		animation = "100%";
	}
	else if( action == "jump" ){
		jump_num = $this.attr("page");
		$current_active = $(".custom-carousel .carousel-paging > li.active");
		current_active_num = $current_active.attr("page");
		
		$next_item = $(".custom-carousel > .inner .item:eq(" + jump_num + ")");
		
		if( jump_num > current_active_num ){
			$next_item.addClass("next").css("left","100%");
			animation = "-100%";
		}
		else if( jump_num < current_active_num ){
			$next_item.addClass("next").css("left","-100%");
			animation = "100%";
		}
		else{
			top_carousel_animating = false;
			return;
		}
	}
	
	$(".custom-carousel .carousel-paging > li.active").removeClass("active");
	$(".custom-carousel .carousel-paging > li:eq(" + ( $next_item.index() - 1 ) + ")").addClass("active");
	
	$(".custom-carousel .item.active").animate({
		left: animation,		
	}, 500, function() {
			$(".custom-carousel .item.active").removeClass("active");			
	});
	
	$(".custom-carousel .item.next").animate({
		left: "0",		
	}, 500, function() {
		$next_item.addClass("active").removeClass("next");
		top_carousel_animating = false;
	});
}

function custom_btn_dropdown_callback(){
	$this = $(this);
	if( $this.hasClass("open") ) $this.removeClass("open");
	else $this.addClass("open");
}
/*eo added by benjamin*/