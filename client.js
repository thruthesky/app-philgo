debug.start();


$(function(){

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
    //cache_update('front', 'freetalk');


    member.load();
    //console.log(member.idx);

    if ( app.offline() ) {
        note.post('인터넷을 연결 해 주십시오. Connect to Internet.', 'alert alert-warning');
    }

    //db.deleteAll(); // test.
    //initApp();
    //setTimeout(function(){ showPage('setting'); }, 600); // test
    //setTimeout(function(){ $('.page[page="news"]').click(); }, 700); // test : news page
    //setTimeout(function(){ $('[data-content-page="freetalk"]').click(); }, 400); // test : news page
     //setTimeout(function(){ $('[data-content-page="qna"]').click(); }, 200); // test : news page
    //setTimeout(function(){ $('.page[page="login"]').click(); }, 700); // test : login page
    //setTimeout(function(){ $('.page[page="info"]').click(); }, 1300); // test : info page
    //setTimeout(togglePanel, 300); // test : open panel-menu

    //setTimeout( function()  { panel.toggle(); }, 300 );

    // setTimeout(function(){
    // element.content().prepend(html.post_write_form(freetalk));
    // }, 300); // TEST SHOW Post Write Form


    app.initEvent();
});
