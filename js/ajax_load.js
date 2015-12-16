
/**
 * ============================== AJAX Loading Function ========================
 */
function ajax_load(url, callback, html) {

    /** cache: false 이면 자동으로 붙는다.
    if ( url.indexOf('?') == -1 ) url += '?__=';
    else url += '&__=';
    url += new Date().getTime();
     */

    console.log(url);

    var request = $.ajax({
        url:url,
        cache: false
    });

    request.done(function( data ) {
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
    });
    request.fail(function( jqXHR, textStatus ) {
        console.log( "Ajax_load Request failed: " + textStatus );
        setContent(jqXHR.responseText);
    });
}
