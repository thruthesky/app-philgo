
/**
 * ============================== AJAX Loading Function ========================
 */
function ajax_load($input, $callback) {

    /*
    if ( typeof $input == 'string' ) {
        console.log($input);
    }
    else {
        console.log($input.url);
    }
    */

    var request = $.ajax($input);
    request.done(function( data ) {
        //console.log(data);
        try {
            var re = $.parseJSON(data);
        }
        catch ( e ) {
            alert("Parse Error: The data from server is not json format!");
        }
        if ( typeof $callback == 'function' ) $callback(re);

    });

    request.fail(function( jqXHR, textStatus ) {
        console.log( "ajax_load Request failed: " + textStatus );
        setContent(jqXHR.responseText);
    });
}