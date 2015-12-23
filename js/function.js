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