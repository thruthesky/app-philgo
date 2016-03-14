

var cache = {
    content : function (page, post_id) {
        app.setCurrentPage(page);
        this.update(page, post_id);
        // element.content().html(db.get( 'front' ));
    },
    showFront : function () {
        cache.content('front', '*');
    },
    /**
     *
     * 새로운 페이지를 보여준다.
     *
     *  함수명이 update() 이지만, 이것은 새로운 메뉴를 보여주는 것이다.
     *
     * @short
     *      1. db cache 서브페이지 데이터를 먼저 보여 준다.
     *      2. ajax 로 서브페이지 데이터를 다운로드 하여
     *          2-1. cache 에 저장하고
     *          2-2. 화면에 보여준다.
     *      3. endless 페이지를 구현한다.
     *
     *
     * @usage 페이지를 캐시해야한다면 임의로 이 코드를 사용 하면 된다.
     *
     * @code
     *      cache_update('front', 'freetalk');
     * @code
     * @param name - page='' 이름으로서 PHP 에서는 widget 이름이 된다.
     * @param post_id
     *      - 이 값이 지정되지 않으면 게시물을 endless 로 로드하지 않는다.
     *      - 이 값이 '*' 이면 전체 게시판의 게시물을 로드한다. 예를 들어 front 페이지를 클릭 할 때에는 post-id 를 '*' 로 해주면 전체 글을 보여준다.
     */
    update : function (name, post_id) {
        trace( "cache.update():" + name );
        endless_reset('');
        html.setContent( db.get( name ), name );
        var url_widget = app.url_server_widget() + name;
        ajax_load(url_widget, function(re){
            if ( re.html ) {
                save_page( name, re );

                if ( app.getCurrentPage() != re['page'] ) {
                    //console.log(re);
                    trace("cache.update() : current page: "+app.getCurrentPage()+", loaded page: "+re['page']+" : current page and loaded page are differenct. data voided.")
                    return;
                }

                html.setContent(re.html, name);
                //console.log("re.html");
                //console.log(re.html);
                //alert('curr page: ' + app.getCurrentPage() + ', loaded page:' + re['page']);
                //note.post(name + ' 페이지를 로드하였습니다.');
                //console.log("==================== ajax_load() : endless_reset:")
                if ( post_id ) {
                    app.setCurrentForum(post_id);
                    endless_show_loader();
                    endless_reset(app.url_server_forum() + post_id, post.endless_update);
                }
                else {
                    app.setCurrentForum('');
                    endless_reset('');
                }
            }
        });
    }
};
