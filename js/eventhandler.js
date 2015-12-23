
/**
 * ----------------------------------- Event Handlers ------------------------------
 * @param selector
 * @param callback
 */
function on_click(selector, callback) {
    element.body().on('click', selector, callback);
}
function on_submit(selector, callback) {
    element.body().on('submit', selector, callback);
}


function check_update_version() {
//
    setTimeout(check_version,1000); // fire after 1 seconds
    setTimeout(check_version,1000 * 60); // fire after 1 minutes.
    setInterval(check_version, 1000 * 60 * 60 * 2);
    function check_version(){
        ajax_load(app.getServerURL() + '?module=ajax&action=version&submit=1', function(re){

            console.log(re);
            note.post(
                _.template('{{domain}} {{version}} 에 접속하였습니다.')(re)
            );
        });
    }
}

