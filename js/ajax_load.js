
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
            if ( typeof callback == 'function' ) callback(re);
        }
        catch ( e ) {
            alert("Ajax_load() : Parsing data error.\n\nThe data from server is not JSON format! There might be an internal server error.");
        }
    });
    request.fail(function( jqXHR, textStatus ) {
        console.log( "Ajax_load Request failed: " + textStatus );
        setContent(jqXHR.responseText);
    });
}
