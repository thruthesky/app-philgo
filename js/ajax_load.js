
/**
 * ============================== AJAX Loading Function ========================
 *
 *
 *
 * @param url       - must be GET URI
 * @param callback
 * @param html
 */
function ajax_load(url, callback, html) {
    if ( typeof idx_member != 'undefined' && idx_member ) {
        if ( url.indexOf('?') == -1 ) url += '?';
        else url += '&';
        url += 'idx_member=' + idx_member + '&session_id=' + session_id;
    }

    console.log(url);

    $.ajax({
        url:url,
        cache: false,
        success: function(data) {
            //console.log(data);
            if ( html ) return callback(data);
            var re;
            try {
                re = $.parseJSON(data);
            }
            catch ( e ) {
                //console.log(data);
                //console.log(re.posts);
                //console.log(e);
                return alert("Ajax_load() : catched an error. It might be an internal server error or callback error.");
            }
            /**
             * It must be here. It must not be in try {}
             */
            if ( typeof callback == 'function' ) callback(re);
        },
        error: function(xhr, type){
            alert("Ajax load error");
            console.log(type);
            console.log(xhr);
        }
    });
}
