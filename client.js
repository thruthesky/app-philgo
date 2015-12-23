debug.start();
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

$(function(){

    add_css(app.getServerCSSURL());
    add_javascript(app.getServerJavascriptURL());

    var url = 'http://192.168.137.1/'; // ICS 로 앱에서 테스트

    if ( document.domain ) { // 데스크톱이면 자동으로 데스크톱 URL 을 지정한다.
        var domain = document.domain;
        if ( domain.indexOf('work') != -1 ) url = 'http://philgo.org';
    }

        app.setServerURL(url);


    // @doc How to use onDeviceRead
    app.addEventDeviceReady(
        function callback_onDeviceReady() {
            trace('go to ...');

            console.log(app.model());
            console.log(app.platform());

            //alert( app.platform() );


        }
    );







    //db.deleteAll();


    // cordova browser platform 에서 file transfer 로 파일을 업로드하게 하는 테스트 옵션이다.
    // 코드를 테스트 할 때에만 사용한다.
    // debug.browser_camera_upload = true;

    check_update_version();
    html.setHeader();
    html.setFooter();
    html.setPanel();
    cache.showFront();


    member.load();
    //console.log(member.idx);

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
    //setTimeout(function(){ $('[page="news"]').click(); }, 700); // test : news page
    //setTimeout(function(){ $('[page="freetalk"]').click(); }, 400); // test : news page
    //setTimeout(function(){ $('[page="qna"]').click(); }, 200); // test : qna page
    //setTimeout(function(){ $('[page="login"]').click(); }, 700); // test : login page
    //setTimeout(function(){ $('[page="info"]').click(); }, 1300); // test : info page
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

    setTimeout(function(){ $('[page-button="register"]').click(); }, 700); // test : login page
});
