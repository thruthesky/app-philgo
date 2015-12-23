/**
 * ---------------------- HTML Markup, Form, DOM Object ----------------------------
 */
var html = {
    setHeader: function() {
        element.header().html( this.header() );
    },
    setFooter: function() {
        element.footer().html( this.footer() );
    },
    setPanel: function() {
        element.panel().html( this.panel() );
    },
    /**
     *
     * @note This does not save data into database.
     * @Attention Use this function to set content on '.content'.
     *      - it does extra tasks.
     * @param html
     */
    setContent : function (html) {
        //console.log('setContent(...,' + page_name + ')');
        //if ( isPanelOpen() ) hidePanel();
        if ( panel.open() ) panel.close();
        element.content().html(html);
    },
    header : function() {
        var m = '';
        m += '<nav class="navbar navbar-default top">';
        m += '  <div class="container-fluid">';
        m += '      <span class="navbar-text glyphicon glyphicon-home" page-button="front" data-post-id="*"></span>';
        m += '      <span class="navbar-text glyphicon glyphicon-pencil" data-post-id="*"></span>';
        m += '      <span class="navbar-text glyphicon glyphicon-camera" data-post-id="*"></span>';
        m += '      <span class="navbar-text logo">LOGO</span>';
        m += '      <span class="navbar-text navbar-right glyphicon glyphicon-th-list menu-panel toggle"></span>';
        m += '  </div>';
        m += '</nav>';
        m += '<ul class="nav nav-pills nav-justified main-menu">';
        m += '  <li page-button="news" data-post-id="news">뉴스</li>';
        m += '  <li page-button="info" data-post-id="qna">정보</li>';
        m += '  <li page-button="company" data-post-id="company_book">업소록</li>';
        m += '  <li page-button="travel" data-post-id="travel">여행</li>';
        m += '  <li page-button="qna" data-post-id="qna">질문</span></li>';
        m += '  <li page-button="freetalk" data-post-id="freetalk,knowhow">토론</span></li>';
        m += '  <li page-button="menu-all">더보기</span></li>';
        m += '</ul>';
        return m;
    },
    footer : function() {
        var m = '';
        m += '<ul class="nav nav-pills nav-justified bottom bottom-menu">';
        m += '  <li page-button="profile"><span class="glyphicon glyphicon-user"></span>Profile</li>';
        m += '  <li page-button="message"><span class="glyphicon glyphicon-envelope"></span>Message</li>';
        m += '  <li page-button="search"><span class="glyphicon glyphicon-search"></span>Search</li>';
        m += '  <li class="post-button" data-post-id=""><span class="glyphicon glyphicon-pencil"></span>Post</li>';
        m += '  <li page-button="setting"><span class="glyphicon glyphicon-wrench"></span>Setting</span></li>';
        m += '</ul>';
        return m;
    },
    panel : function() {
        var m = '';
        m += '<div class="panel panel-default menu-panel-inner">';
        m += '  <ul class="list-group top">';
        m += '      <li><div class="list-group-item">Menu 1<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item">Menu 2<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item">Menu 3<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item menu-panel toggle">Close Menu<span class="glyphicon glyphicon-remove"></span></div></li>';
        m += '  </ul>';
        m += '  <div class="panel-user-profile">';
        m += '      <img src="img/no_primary_photo.png"/>';
        m += '      <div class="bottom-space"></div>';
        m += '      <div class="name">Anonymous<div>User</div></div>';
        m += '  </div>';
        m += '  <ul class="list-group bottom">';
        m += '      <li><div class="list-group-item" page-button="login">로그인 login<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item" page-button="register">회원가입 register<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item" page-button="admin">운영자 요청/건의 inquery<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item" page-button="menu-all">전체메뉴 all-menu<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item" page-button="setting">Settings<span class="glyphicon glyphicon-menu-right"></span></li>';
        m += '  </ul>';
        m += '  <div class="panel-copyright">';
        /*
		m += '      <ul class="nav nav-pills nav-justified bottom">';
        m += '          <li><span>Terms & Policies</span></li>';
        m += '          <li><span>Feedback</span></li>';
        m += '          <li><span>About</span></li>';
        m += '      </ul>';
		*/
        m += '      <div class="copy-right-text">';
        m += '          Copyright (C) 2013 ~ 2015 우리에듀.<br>';
        m += '          All Rights Reserved';
        m += '      </div>';
        m += '  </div>';
        m += '</div>';
        return m;
    },
    post_write_form : function (post_id) {
        var gid = etc.unique_id(member.idx + post_id);
        var forums = {
            'news' : 'News',
            'freetalk' : 'Free Talk',
            'qna' : 'Q & A',
            'buyandsell' : 'Buy & Sell',
            'travel' : 'Travel',
            'company_book' : 'Company Book'
        };
        var m = '';
        m += "<form class='post-write-form' action='"+url_server+"' method='post' enctype='multipart/form-data'>";
        m += "  <input type='hidden' name='idx_member' value='"+member.idx+"'>";
        m += "  <input type='hidden' name='session_id' value='"+member.session_id+"'>";
        m += "  <input type='hidden' name='gid' value='"+gid+"'>";
        m += "  <input type='hidden' name='submit' value='1'>";
        m += "  <input type='hidden' name='module' value='ajax'>";
        m += "  <input type='hidden' name='action' value='post_write_submit'>";
        m += "  <div class='content'><textarea name='content'></textarea></div>";
        m += '  <div class="photos"></div>';
        m += this.filebox();
        m += "  <div class='category'>";
        m += "      <select name='post_id'>";
        for( var name in forums ) {
            if ( forums.hasOwnProperty(name) ) {
                m += '<option value="'+name +'"';
                if ( name == post_id ) m += ' selected=1';
                m += '>' + forums[name] + '</optoin>';
            }
        }
        m += "      </select>";
        m += "  </div>";
        m += "  <div class='submit'><input type='submit'></div>";
        m += "</form>";
        return m;
    },
    comment_write_form : function (p) {
        var gid = etc.unique_id(member.idx + p['post_id']);
        var m = '';
        m += '<form class="comment-write-form" data-idx-parent="'+p['idx']+'" action="'+url_server+'" method="post" enctype="multipart/form-data">';
        m += "  <input type='hidden' name='idx_parent' value='"+p['idx']+"'>";
        m += "  <input type='hidden' name='gid' value='"+gid+"'>";
        m += "  <input type='hidden' name='idx_member' value='"+member.idx+"'>";
        m += "  <input type='hidden' name='session_id' value='"+member.session_id+"'>";
        m += "  <input type='hidden' name='submit' value='1'>";
        m += '  <input type="hidden" name="module" value="ajax">';
        m += "  <input type='hidden' name='action' value='comment_write_submit'>";
        m += '  <textarea name="content"></textarea>';
        m += '  <div class="photos"></div>';
        m += this.filebox();
        //m += this.filebox_photo();
        m += '  <input type="submit">';
        m += '</form>';
        return m;
    },
    filebox : function () {
        var m;
        if ( app.isDesktop() ) {
            m = '  <div class="file"><input type="file" name="file" onchange="callback.on_change_file_upload(this);"></div>';
        }
        else if ( app.isBrowser() ) {
            if ( debug.browser_camera_upload ) m = '  <div class="file file-upload-button"><span class="glyphicon glyphicon-camera"></span> File Upload</div>';
            else m = '  <div class="file"><input type="file" name="file" onchange="callback.on_change_file_upload(this);"></div>';
        }
        else {
            m = '  <div class="file file-upload-button"><span class="glyphicon glyphicon-camera"></span> File Upload</div>';
        }
        return m;
    },
    filebox_photo : function () {
        var m;
		m = '<div class="file">'
		m += '<input type="file" name="file" onchange="callback.on_change_file_upload(this);">';
        m += '<div class="file file-upload-button"><span class="glyphicon glyphicon-camera"></span></div>';
		m += '</div>';
        return m;
    },
    clear_comment_write_form : function (p) {
        var $form = element.comment_write_form(p['idx_parent']);
        var $gid = $form.find('[name="gid"]');
        var $content = $form.find('[name="content"]');
        $gid.val( etc.unique_id(member.idx + p['post_id']) );
        $content.val('');
        $form.find('.photos').html('');
    },
    render_post : function (p) {
        //console.log('get_post_render(p)');
        if (_.isEmpty(p) ) return;
        //console.log('creating DOM');
        var m = '';

        //console.log( p );


        var date_full = etc.date_full(p['stamp']);
        var date = etc.date_short(p['stamp']);
//console.log( "STAMP: " + p['stamp'] );

		var humanTime = etc.humanTime( p['stamp'] );

        m += '<div class="btn-group post-menu-philzine-top" role="group">';
        if( post.mine(p) ) {
            m += '<span type="button" class="btn btn-secondary report-button"><img src="img/post/report.png"/></span>';
        }
        else {
            m += '<span type="button" class="btn btn-secondary post-edit-button"><span class="glyphicon glyphicon-pencil"></span></span>';
            m += '<span type="button" class="btn btn-secondary post-delete-button"><span class="glyphicon glyphicon-trash"></span></span>';
        }
        m += '  <span class="menu-separator"></span>';
        m += post.markup.more(p['idx']);
        m += '</div>';

        m += '<div class="media post-info">';
        m += '  <a class="media-left" href="#">';
        m += '      <img class="media-object profile-image" src="img/no_primary_photo.png" alt="Generic placeholder image">';
        m += '  </a>';
        m += '  <div class="media-body">';
        m += '      <div class="name">'+p['user_name']+'<img class="send-message" src="img/post/mail.png"/></div>';
        m += '      <div class="date" title="'+date_full+'">' + date;
        m += '          <span class="separator">|</span>';
        m +=            humanTime + ' ago';
        m += '      </div>';
        m += '      <div class="location">Lives in Philippines<span class="separator">|</span>xx Fans</div>';
        m += '  </div>';
        m += '</div>';

        if ( !_.isEmpty(p['subject']) ) {
            //m += '<h3 class="subject">' + p['subject'] + '</h3>';
        }
        var no_of_comment, likes;
        m += '<div class="subject">' + post.subject(p) + '</div>';
        m += '<div class="content">' + post.content(p) + '</div>';
        if ( p['photos'] ) m += p['photos'];
        if( p['good'] > 0 ) likes = p['good'];
        else likes = '';
        if( p['no_of_comment'] > 0 ) no_of_comment = p['no_of_comment'];
        else no_of_comment = '';

        m += '<ul class="nav nav-pills post-menu-philzine-bottom">';
        //m += '  <li class="like">'+ p['idx']+'<img src="img/post/like.png"/> Like <span class="no">' + likes + '</span></li>';
        m += '  <li class="like"><span class="glyphicon glyphicon-thumbs-up"></span>Like <span class="no">' + likes + '</span></li>';
        m += '  <li class="reply"><span class="glyphicon glyphicon-comment"></span>Comment ' + no_of_comment + '</li>';
        m += '</ul>';

        m += this.comment_write_form(p);

        m = '<div class="post" idx="'+p['idx']+'" gid="'+p['gid']+'">' + m + '</div>';






        //console.log(m);
        return m;
    },
    render_comments : function (comments) {
        var m = '';
        if ( comments ) {
            for( var j in comments ) {
                if ( comments.hasOwnProperty(j) ) {
                    m += html.render_comment(comments[j]);
                }
            }
        }
        return m;
    },
    render_comment : function (comment) {

		var m = '';

		var date_full = etc.date_full(comment['stamp']);
		var date = etc.date_short(comment['stamp']);
		var humanTime = etc.humanTime(comment['stamp']);

		var likes;
		if( comment['good'] > 0 ) likes = comment['good'];
		else likes = '';

		m += '<div class="post comment clearfix" post-id="'+comment['post_id']+'" idx="'+comment['idx']+'" gid="'+comment['gid']+'" depth="'+comment['depth']+'" idx-parent="'+comment['idx_parent']+'">';

		m += '<div class="btn-group post-menu-philzine-top" role="group">';
		if( post.mine(comment) ) {
			m += '<span type="button" class="btn btn-secondary report-button"><img src="img/post/report.png"/></span>';
		}
		else {
			m += '<span type="button" class="btn btn-secondary post-edit-button"><img src="img/post/edit.png"/></span>';
			m += '<span type="button" class="btn btn-secondary post-delete-button"><img src="img/post/delete.png"/></span>';
		}
        m += '  <span class="menu-separator"></span>';
        m += post.markup.more(comment['idx']);
		m += '</div>';

		m += ' 글번호 : '+comment['idx'];
		m += ' 글쓴이: ' + comment['user_name'];
		m += ' <span title="'+date_full+'">날짜: ' + date + '</span>';
		m += ' 수정, 메뉴 더보기';


        m += '<div class="content">' + post.content(comment) + '</div>';

		if ( comment['photos'] ) m += comment['photos'];
		m += ' <span class="reply-button">Reply</span>, 추천, 비추천';
		m += '</div>';
		return m;


		
        return m;
    },
    render_post_edit : function ( $post ) {
        var idx = $post.attr('idx');
        var gid = $post.attr('gid');
        var subject = $post.find('.subject').text();
        var content = $post.find('.content').text();
        var photos = '';
        $post.find('.photos img').each(function(index){
            var $this = $(this);
            var idx = $this.attr('idx');
            var url_thumbnail = $this.prop('src');
            var url = $this.attr('org');
            photos += html.render_photo({idx:idx, url: url, url_thumbnail: url_thumbnail});
        });

        var m = '';
        m += '<form class="post-edit-form"" idx="'+idx+'" action="'+url_server+'" method="post" enctype="multipart/form-data">';
        m += '  <input type="hidden" name="module" value="ajax">';
        m += '  <input type="hidden" name="action" value="post_edit_submit">';
        m += '  <input type="hidden" name="idx" value="'+idx+'">';
        m += '  <input type="hidden" name="gid" value="'+gid+'">';
        m += "  <input type='hidden' name='idx_member' value='"+member.idx+"'>";
        m += "  <input type='hidden' name='session_id' value='"+member.session_id+"'>";
        m += post.edit_subject(subject);
        m += post.edit_content(content);

        m += html.photos(idx, photos); // .photos must exists.

        m += this.filebox();
        m += post.edit_cancel();
        m += '<input type="submit">';
        m += '</form>';

        m = '<div class="post-edit" idx="'+idx+'">' + m + '</div>';
        $post.after( m );
    },
    /**
     *
     * '.photo' 클래스의 HTML 값을 리턴한다.
     * 이것은 나중에 '.photos' 로 감싸져야 한다.
     * @usage 이 함수를 사용하기 위해서는 아래의 값만 들어오면 된다.
     *  - data['idx']
     *  - data['url_thumbnail']
     * @param data
     */
    render_photo : function (data) {
        //console.log('render_photo');
        //trace(data['idx']);
        if (_.isUndefined(data['url'])) alert('url of photo is empty');
        if (_.isUndefined(data['idx'])) alert('idx of photo is empty');
        var m = '<div class="photo" idx-data="'+data['idx']+'">';
        m += '<span class="glyphicon glyphicon-remove photo-delete-button"></span>';
        m += '<img idx="'+data['idx']+'" src="'+data['url_thumbnail']+'" org="'+data.url+'">';
        m += '</div>';
        //console.log(m);
        return m;
    },
    login_form : function () {
        var m;

        if ( member.idx ) {
            m = '<h1>User Login</h1>';
            m += "<p>You have already logged in as <b>" + member.id + '</b></p>';
            m += '<nav class="navbar navbar-default logout-button">';
            m += '<p class="navbar-brand">Logout</p>';
            m += '</nav>';
        }
        else {
            m = 	'<div class="form-wrapper">';
            m += 	'<form class="member-login-form login">';
            m += 	'<div class="input-group username">';
            m += 	'<input name="id" type="text" class="form-control" placeholder="Enter username">';
            m += 	'<span class="input-group-addon glyphicon glyphicon-user"></span>';
            m += 	'</div>';
            m += 	'<div class="input-group password">';
            m += 	'<input name="password"  type="password" class="form-control" placeholder="Enter password">';
            m += 	'<span class="input-group-addon glyphicon glyphicon-lock"></span>';
            m += 	'</div>';
            m += 	'<input type="submit" class="btn btn-primary" value="Login">';
            m += 	'<a class="forgot-password" href="#">Forgot Password?</a>';
            m += 	'</form>';
            m += 	'</div>';
        }
        return m;
    },
    photos : function ( idx, photos ) {
        return '<div class="photos" idx="'+idx+'">' + photos + '</div>';
    }
};
