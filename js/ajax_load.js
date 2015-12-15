
/**
 * ============================== AJAX Loading Function ========================
 */
function ajax_load(url, $callback) {

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
        var re;
        try {
            re = $.parseJSON(data);
        }
        catch ( e ) {
            // alert("Parse Error: The data from server is not json format!");
            re = data;
        }
        if ( typeof $callback == 'function' ) $callback(re);

    });
    request.fail(function( jqXHR, textStatus ) {
        console.log( "ajax_load Request failed: " + textStatus );
        setContent(jqXHR.responseText);
    });
}
