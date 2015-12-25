var count_trace = 0;
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
        case 'deleted' : return '<h5>글이 삭제되었습니다.</h5>';
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


function popup_message(str) {
    if ( navigator.notification ) {
        navigator.notification.alert(
            str,
            function(){},
            '필리핀 매거진',
            '확인'
        );
    }
    else alert(str);
}
