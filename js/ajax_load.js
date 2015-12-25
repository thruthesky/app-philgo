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
    if ( url.indexOf('?') == -1 ) url += '?';
    else url += '&';
    if ( member.login() ) {
        url += 'idx_member=' + member.id + '&session_id=' + member.session_id;
    }
    url +=  '&page=' + app.getCurrentPage() + '&mobile=' + app.isMobile() + '&platform=' + app.platform();
    trace(url);
    $.ajax({
        url:url,
        cache: false,
        success: function(data) {
            //trace(data);
            if ( html ) return callback(data);
            var re;
            try {
                re = $.parseJSON(data);
            }
            catch ( e ) {
                return note.post("Ajax_load() : caught an error : " + e.message);
            }
            /**
             * It must be here. It must not be in try {}
             */
            if ( re.code ) alert(re.message);
            else callback(re);
        },
        error: function(xhr, type) {
            return note.post("Ajax load error : " + type);
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
    trace(debug.url(url, data));
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function(data){
            var re;
            //trace(data);
            try {
                re = $.parseJSON(data);
            }
            catch ( e ) {
                trace(e);
                return note.post("Ajax_load_post() : caught an error : " + e.message);
            }
            if ( re['code'] ) {
                console.log(re);
                alert(re['message']);
            }
            else callback(re);
        },
        error: function(xhr, type){
            return note.post("Ajax load error : " + type);
            console.log(type);
            console.log(xhr);
        }
    });
}