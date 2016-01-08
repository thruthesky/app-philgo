/**
 * ============================== AJAX Loading Function ========================
 *
 *
 *
 * @param url       - must be GET URI
 * @param callback
 * @param option
 *          - if it is true, it just return data without parsing.
 *          - if it is object
 *              -- if check_error is false, then it does not error check.
 */
function ajax_load(url, callback, option) {

//    console.log(option);

    if ( url.indexOf('?') == -1 ) url += '?';
    else url += '&';
    if ( member.login() ) {
        url += 'idx_member=' + member.id + '&session_id=' + member.session_id + '&';
    }
    url +=  'page=' + app.getCurrentPage() + '&mobile=' + app.isMobile() + '&platform=' + app.platform();

    trace(url);

    $.ajax({
        url:url,
        cache: false,
        success: function(data) {
            //trace(data);
            if ( option === true ) return callback(data);
            var re;
            try {
                re = $.parseJSON(data);
            }
            catch ( e ) {
                note.post("파싱 에러 ... ");
                html.hideLoader();
                console.log(data);
                return;
            }
            /**
             * It must be here. It must not be in try {}
             */
            if ( re.code ) {
                if ( option && option['error_check'] === false ) {

                }
                else return alert(re.message);
            }


            member.acl = re.acl;
            callback(re);
        },
        error: function(xhr, type) {

            note.post("인터넷 접속 에러 : " + type);
            html.hideLoader();
            //trace(type);
            //trace(xhr);
        }
    });
}
/**
 *                      ----- Ajax submit in POST method -----
 * @param url
 * @param data
 * @param success_callback
 * @param error_callback
 */
function ajax_load_post(url, data, success_callback, error_callback) {
    //trace(debug.url(url, data));
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
                console.log(data);
                return note.post("접속 에러 2 : caught an error : " + e.message);
            }
            if ( re['code'] ) {
                //trace(re);
                if ( typeof error_callback == 'function' ) error_callback(re);
                alert(re['message']);
            }
            else success_callback(re);
        },
        error: function(xhr, type){
            return note.post("접속 에러 : " + type);
            //trace(type);
            //trace(xhr);
        }
    });
}