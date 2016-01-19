
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
        /*
        ajax_load(app.getServerURL() + '?module=ajax&action=version&submit=1', function(re){
            if ( re['version'] != app.getVersion() ) {
                app.version = re['version'];
                app.vibrate(1000);
                app.confirm('앱이 업데이트되었습니다. 새 버젼으로 업데이트 하십시오.', function(re) {
                    var m;
                    if ( re ) {
                        window.open('https://play.google.com/store/apps/details?id=org.philgo.philzine2', '_playstore');
                        //
                    }
                    // else m = '업데이트를 가능한 빠르게 하십시오.';
                }, '예, 업데이트하겠습니다.', '아니오');
            }
            if ( re['user_name'] != member.name ) member.update_name(re['user_name']);
        });
        */
    }
}


/**
 * 헤더가 설정된 후에 호출된다.
 *
 * @note 헤더는 ajax call 로 보여질 수 있다. 따라서 헤더에 설정을 하기 위해서는 ajax call 이 끝난 다음 해야하므로 콜백이 필요하다.
 */
function callback_on_set_header() {
    callback_init_message();
}
function callback_on_set_footer() {
    callback_init_message();
}

/**
 * 이 함수는 여러 상황에서 여러번 호출 된다.
 *
 *      1. deviceready event 가 발생하는 경우,
 *      2. setHeader(), setFooter() 가 발생하는 경우,
 *
 */
function callback_init_message() {
    console.log("callback_init_message()");
    var $top = el.header().find('.top');
    console.log('online:' + app.isOnline());
    if ( app.isOnline() ) {
        setTimeout(function(){
            $top.addClass('header-top-online');
        },200);
    }
    else{
        $top.addClass('header-top-offline');
        note.clear();
        note.post('인터넷을 연결 해 주십시오. Connect to Internet.', 'alert alert-warning');
    }
}