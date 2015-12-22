

var cache = {
    content : function (page, post_id) {
        this.update(page, post_id);
        // element.content().html(db.get( 'front' ));
    },
    showFront : function () {
        cache.content('front', '*');
    },
    /**
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
     *      - 이 값이 '*' 이면 전체 게시판의 게시물을 로드한다. 예를 들어 front 페이지를 클릭 할 때에는 data-post-id 를 '*' 로 해주면 전체 글을 보여준다.
     */
    update : function (name, post_id) {
        //console.log( "cache_update:" + name );
        html.setContent( db.get( name ), name );
        var url_widget = app.url_server_widget + name;
        ajax_load(url_widget, function(re){
            if ( re.html ) {
                save_page( name, re );
                app.setCurrentPage(name);
                html.setContent(re.html, name);
                note.post(name + ' 페이지를 로드하였습니다.');
                app.setCurrentForum(post_id);
                if ( post_id ) endless_reset(name, post_id);
            }
        });
    }
};
