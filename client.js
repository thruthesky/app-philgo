//debug.start(); // 중요 : 개발 중일때만 실행하고, 실제로 배포 할 때에는 주석 처리한다.
document.addEventListener("backbutton", app.on_click_backbutton, false);



/**
 * post_list_type 이
 *
 *      1 이면, 모두 펼쳐 보이기를 한다.
 *      2 이면, 제목만 보이고, 제목을 클릭해야 전체 내용 및 코멘트 FORM, 코멘트 목록이 보인다.
 * @type {number}
 */
var post_list_type = 2;


$(function(){

    var type = db.get('post_list_type');
    if ( type ) post_list_type = type;

    trace("post_list_type : " + post_list_type);

    // on_click('.setting-button', app.on_click_backbutton);


    //var url = 'http://work.philgo.org/'; // ICS 로 앱에서 테스트
    var url = 'http://philgo.org/'; // ICS 로 앱에서 테스트

    url = 'http://www.philgo.com/';

    /*
    url = db.get('url_server');
    if ( url ) {

    }
    else {
        if ( app.fileProtocol() ) {
            url = 'http://www.philgo.com';
        }
        else {
            if ( document.domain ) { // 데스크톱이면 자동으로 데스크톱 URL 을 지정한다.
                var domain = document.domain;
                if ( domain.indexOf('localhost') != -1 ) url = 'http://philgo.org/';
                else if ( domain.indexOf('work.org') != -1 ) url = 'http://philgo.org/';
            }
        }
    }
    */

    app.setServerURL(url);

    add_css(app.getServerCSSURL());
    add_javascript(app.getServerJavascriptURL());
    //add_javascript(app.getHookJavascriptURL ());



    // @doc How to use onDeviceRead
    app.addEventDeviceReady(
        function callback_onDeviceReady() {
            if ( app.isCordova() ) {
                app.setTitle('헬로 필리핀');
            }
            callback_init_message();
        }
    );

/*
    setInterval(function(){
        //$('.icon-next').click();
        //$('.icon-prev').click();

    }, 1000);
    */


    // db.deleteAll();


    // cordova browser platform 에서 file transfer 로 파일을 업로드하게 하는 테스트 옵션이다.
    // 코드를 테스트 할 때에만 사용한다.
    // debug.browser_camera_upload = true;


    html.setHeader();
    if ( app.isCordova() ) {
        app.setTitle('헬로 필리핀');
    }



    //trace(member.idx);



    member.load();



    cache.showFront();

    // 중간으로 스크롤
    /*
    setTimeout(function(){
        scrollTo(0, 600);
    }, 500);
    */




    //db.deleteAll(); // test.
    //initApp();
    //setTimeout(function(){ showPage('setting'); }, 600); // test
    //setTimeout(function(){ $('[page-button="news"]').click(); }, 700); // test : news page
    // setTimeout(function(){ $('[page-button="freetalk"]').click(); }, 400); // test : 자유게시판 page
    //setTimeout(function(){ $('[page-button="qna"]').click(); }, 200); // test : qna page
        //setTimeout(function(){ $('.point-ads-title').click(); }, 500); // test : qna page
    //setTimeout(function(){ $('[page-button="login"]').click(); }, 700); // test : login page
    //setTimeout(function(){ $('[page-button="info"]').click(); }, 1300); // test : info page


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




    // 전체 메뉴 열고 =>
    /**
    setTimeout(function(){
        $('[widget="menu-all"]').click();
        setTimeout(function(){
            $('[widget="fruit"]').click();
        }, 100);
    }, 100);
     */


    // 글 쓰기 창 열고 문의게시판 선택.
    /*
    setTimeout(function(){
        $(".post-button").click();
        setTimeout(function(){
            $(".post-write-form [name='post_id']").val('request_to_manager');
        }, 300);
    }, 600);
    */




//    setTimeout(function(){ $('[page-button="qna"]').click(); }, 200); // test : qna page
    //setTimeout(function(){ $('[page-button="news"]').click(); }, 200); // test : qna page
//    setTimeout(function(){ $('[page-button="info"]').click(); }, 200); // test : qna page
    //setTimeout(function(){ $('[company-button]').click(); }, 300); // test : qna page

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
    }, 50);
    */

    // 글 읽기
    /*
    setTimeout(function() {
        $("[post-view='1270663409']").click();
    }, 800);
    */

    /*
    setTimeout(function(){
        $('[company-button]').click(); // 업소록 열기
        setTimeout(function(){
            //$('[org-name="마트/식품"]').click(); // 마트 카테고리 열기
            setTimeout(function(){
                //$('[idx="1270580673"]').click(); // 첫번째 글 클릭
            }, 100);
        }, 100)
    }, 400);
*/

//    setTimeout(function(){ $('[page-button="search"]').click(); }, 200); // test : qna page

});



