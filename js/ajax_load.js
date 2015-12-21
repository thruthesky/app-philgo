/**
 * ============================== AJAX Loading Function ========================
 *
 *
 *
 * @param url       - must be GET URI
 * @param callback
 * @param html - if it is true, it just return data without parsing.
 */
function ajax_load(url, callback, html) {
    if ( member.login() ) {
        if ( url.indexOf('?') == -1 ) url += '?';
        else url += '&';
        url += 'idx_member=' + member.id + '&session_id=' + member.session_id;
    }
    //console.log(url);
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
                return alert("Ajax_load() : caught an error : " + e.message);
            }
            /**
             * It must be here. It must not be in try {}
             */
            if ( re.code ) alert(re.message);
            else callback(re);
        },
        error: function(xhr, type){
            alert("Ajax load error : " + type);
            console.log(type);
            console.log(xhr);
        }
    });
}
/**
 *                      ----- Ajax submit in POST method -----
 * @param url
 * @param data
 * @param callback
 */
function ajax_load_post(url, data, callback) {
    console.log(debug.url(url, data));
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function(data){
            var re;
            //console.log(data);
            try {
                re = $.parseJSON(data);
            }
            catch ( e ) {
                //console.log(e);
                return alert("Ajax_load_post() : caught an error : " + e.message);
            }
            if ( re.code ) alert(re.message);
            else callback(re);
        }
    });
}