debug.start(); // 중요 : 개발 중일때만 실행하고, 실제로 배포 할 때에는 주석 처리한다.



_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

$(function(){


    //var url = 'http://work.philgo.org/'; // ICS 로 앱에서 테스트
    var url = 'http://philgo.org/'; // ICS 로 앱에서 테스트

    url = db.get('url_server');
    if ( url ) {

    }
    else {
        if ( app.fileProtocol() ) {

        }
        else {
            if ( document.domain ) { // 데스크톱이면 자동으로 데스크톱 URL 을 지정한다.
                var domain = document.domain;
                if ( domain.indexOf('localhost') != -1 ) url = 'http://philgo.org/';
                else if ( domain.indexOf('work.org') != -1 ) url = 'http://philgo.org/';
            }
        }
    }

    //url = 'http://www.philgo.com/';
    app.setServerURL(url);

    add_css(app.getServerCSSURL());
    add_javascript(app.getServerJavascriptURL());
    add_javascript(app.getHookJavascriptURL ());

    // @doc How to use onDeviceRead
    app.addEventDeviceReady(
        function callback_onDeviceReady() {
            //trace('go to ...');
            //trace(app.model());
            //trace(app.platform());
            //alert( app.platform() );
        }
    );


    //db.deleteAll();


    // cordova browser platform 에서 file transfer 로 파일을 업로드하게 하는 테스트 옵션이다.
    // 코드를 테스트 할 때에만 사용한다.
    // debug.browser_camera_upload = true;


    html.setHeader();

    member.load();

    //trace(member.idx);


    cache.showFront();

    if ( app.offline() ) {
        note.post('인터넷을 연결 해 주십시오. Connect to Internet.', 'alert alert-warning');
		$("header > .top").css("background-color","#7f8c8d");//added by benjamin for header color
    }
	else{
		$("header > .top").css("background-color","#bb2718");//added by benjamin for header color
	}



    //db.deleteAll(); // test.
    //initApp();
    //setTimeout(function(){ showPage('setting'); }, 600); // test
    //setTimeout(function(){ $('[page-button="news"]').click(); }, 700); // test : news page
    //setTimeout(function(){ $('[page-button="freetalk"]').click(); }, 400); // test : news page
    //setTimeout(function(){ $('[page-button="qna"]').click(); }, 200); // test : qna page
    //setTimeout(function(){ $('[page-button="login"]').click(); }, 700); // test : login page
    //setTimeout(function(){ $('[page-button="info"]').click(); }, 1300); // test : info page
    //setTimeout(togglePanel, 300); // test : open panel-menu

    //setTimeout( function()  { panel.toggle(); }, 300 );

    // TEST SHOW Post Write Form
    /*
    setTimeout(function(){
    element.content().prepend(html.post_write_form('qna'));
    }, 500);
    */

    // Open Q & A and Open the first post's edit page.
    /*
    setTimeout(function(){
        el.page_button('qna').click();
        setTimeout(function() {
            var $post = $('.post-list > .post').first();
            var $button = $post.find('.post-edit-button');
            //$button.click();
        }, 400);
    }, 300);
    */

    // open front and temp forum
    // setTimeout(function(){cache.update('news', 'temp');}, 400);



    app.init();
    app.initEvent();
    //trace(member);
    check_update_version();


    html.setFooter(); // 회원 로그인 정보가 필요하므로 init 다음에 이 메소드가 호출되어야 한다.

    /** panel 은 미리 세팅되지 않으므로 아래와 같이 먼저 세팅을 해 주어야 한다. */
    /*
    setTimeout(function(){
        html.setPanel();
        $('[page-button="register"]').click();
    }, 700); // test : login page
*/
    /**
     * 쪽지 열기
     */
/*
    setTimeout(function(){
        html.setPanel();
        $('.message-button').click();

        //setTimeout(function(){
//            message.show_message_send_form('thruthesky');
  //      }, 200);
    },700);
*/

    // 특정인에게 쪽지 쓰기
    /*
    setTimeout(function(){
        message.show_message_send_form('admin');
    },
    500);
    */


    // 전체 메뉴 열기
    /*
    setTimeout(function(){
        $('[widget="menu-all"]').click();
    }, 100);
*/

    // 전체 메뉴 열고 => 과일 페이지 열기
    /*
    setTimeout(function(){
        $('[widget="menu-all"]').click();
        setTimeout(function(){
            $('[widget="fruit"]').click();
        }, 100);
    }, 100);
*/




    //setTimeout(function(){ $('[page-button="qna"]').click(); }, 200); // test : qna page
    //setTimeout(function(){ $('[page-button="news"]').click(); }, 200); // test : qna page
//    setTimeout(function(){ $('[page-button="info"]').click(); }, 200); // test : qna page
    //setTimeout(function(){ $('[page-button="company"]').click(); }, 500); // test : qna page

//    page_click('[widget="menu-all"]', '[tab="query"]'); // 처음 selector 를 클릭하고 나서 두번째 selector 를 클릭한다.



    /*
    html.showLoader();
    setTimeout(function(){
        html.hideLoader();
    },1000);
    */
/*
    setTimeout(function() {
        note.post('인터넷 접속 에러 ...');
    }, 500);
    */

    // 글 읽기
/*
    setTimeout(function() {
        $("[post-view='1271135669']").click();
    }, 800);
    */
});
