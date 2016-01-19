var post = {
    mine : function (p) {
        if ( typeof p['idx_member'] == 'undefined' ) return false;
        if ( ! member.login() ) return false;
        return p['idx_member'] == member.idx;
    },
    edit_cancel : function () {
        return '<span class="glyphicon glyphicon-remove cancel-button">Cancel</span>';
    },
    edit_subject : function (v) {
        if ( _.isEmpty(v) ) return '';
        var m = '<div class="subject">';
        m += '  <input name="subject" value="'+v+'">';
        m += '</div>';
        return m;
    },
    edit_content : function (v) {
        if (_.isEmpty(v)) return;
        var m = '<div class="content">';
        m += '  <textarea name="content">';
        m +=        v;
        m += '</textarea>';
        m += '</div>';
        return m;
    },
    subject : function( p ) {
        if ( p['deleted'] == 1 ) return '';
        else return p['subject'];
    },
    content : function( p ) {
        if ( p['deleted'] == 1 ) return lang('deleted');
        else return p['content'];
    },
    add_endless_container : function () {
        if ( el.post_list().length == 0 ) el.content().append('<div class="post-list"></div>');
    },
    endless_update : function (re) {
        //console.log(re);
        post.add_endless_container();
        var $page_button = el.page_button(re['page']);


        var post_id = $page_button.attr('post-id');
        if ( post_id != '*' ) {
            if ( post_id != re['post_id'] ) {
                trace(" : endless update() : Post data has been loaded but the page has changed. so, the posts will not be shown. re[post_id] = " + re['post_id'] + ", post-id:" + post_id);
                return;
            }
        }



        /*
        if ( app.getCurrentPage() != re['page'] ) {
            trace("post.endless_update() : widget_name and page name is not the same. data voided.");
            return;
        }
        */

        post.display_posts(re);
    },
    /**
     * 게시판 글을 로드해서 화면에 표시한다.
     * 특히, endless load 를 한 다음에 데이터를 표시한다.
     * @attention 페이지를 보여 줄지 말지를 이 메소드를 호출하기 전에 결정해야 한다.
     *  예를 들어, 메뉴를 연속으로 막 클릭 할 때, 맨 마지막 메뉴의 게시판 글만 표시하려 할 때
     *  그러한 옵션 처리는 이 함수를 호출하기 전에 해야 한다.
     * @param re
     */
    display_posts : function ( re ) {
        if (_.isEmpty(re['posts']) ) {
            endless_show_no_more_content('<h1>No more content</h1>');
        }
        else {
            var site = re['site'];
            var post_id = re['post_id'];
            var page_no = re['page_no'];
            //note.post(site + ' 사이트 : ' + post_id + '의 ' + page_no + " 페이지 내용이 추가되었습니다.");

            //console.log(re['ads']);

            post.render_ads( re['ads'] );

            var posts = re['posts'];
            for ( var i in posts ) {
                if (posts.hasOwnProperty(i)) {
                    element.post_list().append(html.render_post(posts[i]));
                    element.post_list().append(html.render_comments(posts[i]['comments'], posts[i]));
                }
            }
        }
    },
    render_ads : function (posts) {
        if ( typeof posts == 'undefined' ) return;
        var m = '<div class="point-ads">';
        m += '<div class="point-ads-title">회원 포인트 광고 <i class="fa fa-info-circle"></i> 광고안내</div>';
        m += '<div class="point-ads-desc" style="display: none;">필고에서 회원 포인트로 글을 게시판 상단에 고정 등록하시면 앱에 자동으로 광고가 나타납니다.</div>';
        for ( var i in posts ) {
            if (posts.hasOwnProperty(i)) {
                var post = posts[i];
                //console.log(post);
                m += '<div class="ad" post-view="'+post['idx']+'">';
                if ( typeof post['src_thumbnail'] != 'undefined' ) m += '<div class="image"><img src="'+post['src_thumbnail']+'"></div>';
                m += '<div class="subject">' + post.subject + '</div>';
                m += '</div>';
            }
        }
        m += '</div>';
        el.post_list().append(m);
    },
    markup : {
        more : function(p) {
            var onclick = html.message_onclick(p['member']);
            var m = '';
            m += '  <span class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
            m += '      <img src="img/post/more.png"/>';
            m += '  </span>';
            m += '  <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">';
            if ( post.mine(p) ) {
                m += '      <li class="dropdown-item"><span class="glyphicon glyphicon-warning-sign"></span><span class="post-edit-button">Edit</span></li>';
            }
            else {
                m += '      <li class="dropdown-item" '+onclick+'><span class="glyphicon glyphicon-envelope"></span><span>Message</span></li>';
            }
            m += '      <li class="dropdown-item"><span class="glyphicon glyphicon-warning-sign"></span><span class="report-button">Report</span></li>';
            m += '  </ul>';
            return m;
        },
        bannerSelector : function() {
            if ( member.acl != 'a' ) return;

            var m = '';
            m += '<form>';


            return '광고 배너 지정';
        }
    }
};