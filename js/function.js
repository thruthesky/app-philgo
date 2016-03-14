var count_trace = 0;
alert = function ( str ) {
    app.alert(str);
};
confirm = function ( str ) {
    app.alert("confirm 대신 app.confirm 을 사용하십시오.");
};
function trace(v) {
    if ( ! debug.mode ) return ;
    var caller = arguments.callee.caller;
    var name = null;
    if ( caller ) {
        try {
            name = caller.toString().match(/function ([^\(]+)/)[1];
        }
        catch (e) {
            name = 'Anonymous';
        }
    }
    else {
        name = 'global';
    }
    count_trace ++;
    console.log('[' + count_trace + '] ' + name + '() ' + v);
}

function lang(code) {
    switch (code) {
        case 'deleted' : return '<h5 class="deleted">글이 삭제되었습니다.</h5>';
        default : return code;
    }
}


/**
 *
 * @param url
 * @code
 *      add_css('css/server.css?version=' + version);
 * @endcode
 */
function add_css(url){
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', url);
    document.getElementsByTagName('head')[0].appendChild(link);
}
/**
 *
 * @param url
 * @code
 *      'js/server.js?version=' + version
 * @endcode
 *
 */
function add_javascript(url) {
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    document.body.appendChild(scriptTag);
}


function goTop() {
    app.goTop();
}

/**
 *
 *
 * @code
 *
 *      goTo( $('.post-edit[idx="'+idx+'"]'), -120 );
 *
 * @endcode
 *
 * @param $obj
 * @param add
 */
function goTo( $obj, add ) {
    $('html, body').animate({
        scrollTop: $obj.offset().top + add + 'px'
    }, 'fast');
}

/**
 * 페이지를 선택하고 그 안의 객체를 선택한다.
 *
 * @param selector
 * @param sub_selector
 * @code
 *      page_click('[page-button="qna"]');
 *      page_click('[widget="menu-all"]', '[tab="query"]'); // 처음 selector 를 클릭하고 나서 두번째 selector 를 클릭한다.
 * @endcode
 */
function page_click(selector, sub_selector) {
    setTimeout(function(){ $(selector).click(); }, 400);
    if ( sub_selector ) setTimeout(function(){ $(sub_selector).click(); }, 800);
}