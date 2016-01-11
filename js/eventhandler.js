
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
            //trace(re);
            /*
            note.post(
                _.template('서버: {{domain}}, version: {{version}}')(re)
            );*/
            if ( re['version'] != app.getVersion() ) {
                app.version = re['version'];
                app.vibrate(1000);
                app.confirm('앱이 업데이트되었습니다. 새 버젼으로 업데이트 하십시오.', function(re) {
                    var m;
                    if ( re ) m = '네 업데이트를 하겠습니다.';
                    else m = '업데이트를 가능한 빠르게 하십시오.';
                    alert(m);
                });
            }
            if ( re['user_name'] != member.name ) member.update_name(re['user_name']);
        });
    }
}

