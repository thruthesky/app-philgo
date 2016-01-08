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
     * @param name
     */
    setContent : function (html, name) {
        //trace('setContent(...,' + page_name + ')');
        //if ( isPanelOpen() ) hidePanel();
        if ( panel.open() ) panel.close();


        // 클릭된 (보여줄) 페이지 이름과 데이터를 다운로드한 페이지 이름이 다르면
        // 내용을 보여주지 않는다.
        // 즉, 동시에 메뉴를 여러번 빨리 눌러서 ajax_load 가 많이 실행된 경우,
        // 마지막에 클릭된 메뉴의 페이지만 보여 준다.
        /*
        if ( app.getCurrentPage() != name ) {
            console.log(app.getCurrentPage());
            console.log(name);
            console.log("widget_name and page name is not the same. data voided.");
            return;
        }
        */

        goTop();
        element.content().html(html);
    },
    header : function() {		
        var m = '';
        m += '<nav class="navbar navbar-default top">';
        m += '  <div class="container-fluid">';
        m += '      <span class="navbar-text glyphicon glyphicon-home" page-button="front" post-id="*" title="헬로필리핀"></span>';
        m += '      <span class="navbar-text glyphicon glyphicon-pencil"></span>';
        m += '      <span class="navbar-text glyphicon glyphicon-camera"></span>';
        m += '      <span class="navbar-text logo">필리핀매거진</span>';
        m += '      <span class="navbar-text navbar-right glyphicon glyphicon-th-list menu-panel toggle"></span>';
		
		
			
		//m += '      <span class="navbar-text navbar-right">' + member.primary_photo() + '</span>';
	
		        
        m += '  </div>';
        m += '</nav>';
        m += '<div class="btn-group btn-group-justified main-menu">';
        m += '  <span class="btn" page-button="news" post-id="news" title="필리핀 뉴스">뉴스</span>';
        m += '  <span class="btn" page-button="info" post-id="qna" title="필리핀정보">정보</span>';
        m += '  <span class="btn" page-button="company" post-id="" title="필리핀업소록">업소록</span>';
        m += '  <span class="btn" page-button="travel" post-id="travel" title="필리핀여행">여행</span>';
        m += '  <span class="btn" page-button="qna" post-id="qna" title="질문과답변">질문</span></span>';
        m += '  <span class="btn" page-button="freetalk" post-id="freetalk,knowhow" title="커뮤니티">토론</span></span>';
        m += '  <span class="btn" widget="menu-all">더보기</span></span>';
        m += '</div>';
        return m;
    },
    footer : function() {
        var m = '';
        m += '<div class="btn-group btn-group-justified bottom bottom-menu">';


        if ( member.login() ) {
            m += '  <span class="btn" page-button="register"><span class="glyphicon glyphicon-user"></span>나의정보</span>';
            m += '  <span class="btn message-button"><span class="glyphicon glyphicon-envelope"></span>쪽지</span>';
        }
        else {
            m += '  <span class="btn"  page-button="login"><span class="glyphicon glyphicon-lock"></span>로그인</span>';
            m += '  <span class="btn"  page-button="register"><span class="glyphicon glyphicon-user"></span>회원가입</span>';
        }

        //m += '  <span class="btn"  page-button="search"><span class="glyphicon glyphicon-search"></span>Search</span>';
        m += '  <span class="btn post-button" post-id=""><span class="glyphicon glyphicon-pencil"></span>글쓰기</span>';
        m += '  <span class="btn setting-button"><span class="glyphicon glyphicon-wrench"></span>설정</span></span>';
        m += '</div>';
        return m;
    },
    panel : function() {
        var m = '';
        m += '<div class="panel panel-default menu-panel-inner">';
        m += '  <ul class="list-group top">';
        m += '      <li><div class="list-group-item">전체 메뉴 보기<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item message-button check-internet">쪽지 Message<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item">Menu 3<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item menu-panel toggle">Close Menu<span class="glyphicon glyphicon-remove"></span></div></li>';
        m += '  </ul>';

        var primary_photo = member.primary_photo();
        console.log(member);

        var button_name = 'login';
        if ( member.login() ) button_name = 'register';

        m += '  <div class="panel-user-profile" page-button="'+button_name+'">';
        m += primary_photo;
        m += '      <div class="bottom-space"></div>';
        if ( member.login() ) {
            m += '      <div class="name">{{name}}/{{idx_photo}}<div>{{id}}</div></div>';
        }
        else {
            m += '      <div class="name">회원 로그인<div>Login</div></div>';
        }
        m += '  </div>';
        m += '  <ul class="list-group bottom">';

        if ( member.login() ) {
            m += '      <li><div class="list-group-item" page-button="register">회원 정보<span class="glyphicon glyphicon-menu-right"></span></div></li>';
            m += '      <li><div class="list-group-item" page-button="login">로그아웃<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        }
        else {
            m += '      <li><div class="list-group-item" page-button="login">로그인 (필고 아이디 로그인)<span class="glyphicon glyphicon-menu-right"></span></div></li>';
            m += '      <li><div class="list-group-item" page-button="register">회원가입 register<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        }
        m += '      <li><div class="list-group-item" page-button="admin">운영자 요청/건의 inquery<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item" page-button="setting">설정 Settings<span class="glyphicon glyphicon-menu-right"></span></li>';
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
        m += '          필리핀 교민 홈페이지 앱 무료 제작<br>';
        m += '          신청 : thruthesky@gmail.com';
        m += '      </div>';
        m += '  </div>';
        m += '</div>';

        var str = _.template(m)(member);

        return str;
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
        m += "<form class='post-write-form' action='"+app.getServerURL()+"' method='post' enctype='multipart/form-data'>";
        m += "  <input type='hidden' name='idx_member' value='"+member.idx+"'>";
        m += "  <input type='hidden' name='session_id' value='"+member.session_id+"'>";
        m += "  <input type='hidden' name='gid' value='"+gid+"'>";
        m += "  <input type='hidden' name='submit' value='1'>";
        m += "  <input type='hidden' name='module' value='ajax'>";
        m += "  <input type='hidden' name='action' value='post_write_submit'>";
		m += "	<div class='post-content-wrapper'>";
        m += "  	<div class='content'>";
		m += "			<textarea name='content' placeholder='Write a post.'></textarea>";		
		m += "		</div>";        
		m += '		<div class="photos clearfix"></div>';
		m += "	</div>";
		m += '<div class="row commands">';
		m += '<div class="col-xs-4">';
        m += 	this.filebox();
		m += '</div>';
        m += "  <div class='category col-xs-4'>";
        m += "      <select class='form-control' name='post_id'>";
        for( var name in forums ) {
            if ( forums.hasOwnProperty(name) ) {
                m += '<option value="'+name +'"';
                if ( name == post_id ) m += ' selected=1';
                m += '>' + forums[name] + '</optoin>';
            }
        }
        m += "      </select>";
		m += "		<span class='caret'></span>";
        m += "</div>";
        m += "<div class='submit col-xs-4'><input type='submit' value='글쓰기'></div>";
		m += "</div>";
        m += "</form>";
        return m;
    },
    comment_write_form : function (p) {
		/*
        var gid = etc.unique_id(member.idx + p['post_id']);
        var m = '';

        m += this.filebox();
        m += '  <input type="submit">';
        m += '</form>';
        return m;
		*/
		
		
		var gid = etc.unique_id(member.idx + p['post_id']);
		var m = '';
		
		m += '<form class="comment-write-form clearfix" data-idx-parent="'+p['idx']+'" action="'+app.getServerURL()+'" method="post" enctype="multipart/form-data">';
		m += "  <input type='hidden' name='idx_parent' value='"+p['idx']+"'>";
        m += "  <input type='hidden' name='gid' value='"+gid+"'>";
        m += "  <input type='hidden' name='idx_member' value='"+member.idx+"'>";
        m += "  <input type='hidden' name='session_id' value='"+member.session_id+"'>";
        m += "  <input type='hidden' name='submit' value='1'>";
        m += '  <input type="hidden" name="module" value="ajax">';
        m += "  <input type='hidden' name='action' value='comment_write_submit'>";

        m += '  <table class="box" width="100%" border="0" cellpadding="0" cellspacing="0">';
        m += '      <tr valign="top">';
        m += '          <td width="48">' + member.primary_photo() + '</td>';
		m += '          <td width="99%"><textarea name="content"></textarea></td>';
        m += '          <td class="comment-file-upload-button">' + this.filebox() + '</td>';
		m += '          <td class="submit-button"><input type="submit" value="등록"></td>';
        m += '      </tr>';
        m += '  </table>';

        m += '  <div class="alt-buttons" style="display:none;">';
        m += '   ' + this.filebox() + '';
        m += '   <input type="submit" value="글쓰기">';
        m += '  </div>';

        m += '<div class="photos"></div>';
		m += '</form>';
		

		//trace( m );
		return m;
		
    },
    filebox : function () {
        var m;
        if ( app.isDesktop() || app.isBrowser() ) {
            m = '<div class="file desktop">';
			m += '<span class="glyphicon glyphicon-camera"></span>';
			m += '<input type="file" name="file" onchange="callback.on_change_file_upload(this);">';
			m += '</div>';            
        }
        /*
        else if ( app.isBrowser() ) {
            if ( debug.browser_camera_upload ) m = '  <div class="file file-upload-button"><span class="glyphicon glyphicon-camera"></span> File Upload</div>';
            else m = '  <div class="file"><input type="file" name="file" onchange="callback.on_change_file_upload(this);"></div>';
        }
        */
        else {
            m = '<div class="file file-upload-button"><span class="glyphicon glyphicon-camera"></span></div>';
        }
		//m = '<div class="file file-upload-button"><span class="glyphicon glyphicon-camera"></span></div>';
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
    message_onclick : function ( member ) {
        var onclick = '';
        if ( typeof message != 'undefined' && typeof member.id != 'undefined' ) {
            onclick = message.getOnClick(member.id);
        }
        return onclick;
    },
    render_post : function (p) {
        //trace('get_post_render(p)');
        if (_.isEmpty(p) ) return;
        //trace('creating DOM');
        var m = '';

        //trace( p );


        var date_full = etc.date_full(p['stamp']);
        var date = etc.date_short(p['stamp']);

        m += '<div class="btn-group post-menu-philzine-top" role="group">';
        if( !post.mine(p) ) {
            m += '<span type="button" class="btn btn-secondary report-button"><img src="img/post/report.png"/></span>';
        }
        else {
            m += '<span type="button" class="btn btn-secondary post-edit-button"><span class="glyphicon glyphicon-pencil"></span></span>';
            m += '<span type="button" class="btn btn-secondary post-delete-button"><span class="glyphicon glyphicon-trash"></span></span>';
        }
        m += '  <span class="menu-separator"></span>';
        m += post.markup.more(p);
        m += '</div>';

        m += '<div class="media post-info">';
        m += '  <a class="media-left" href="#">';

        var src = 'img/no_primary_photo.png';

        if ( typeof p['member']['idx_primary_photo'] != 'undefined' ) src = app.getDataURL(p['member']['idx_primary_photo']);
        m += '      <img class="media-object profile-image" src="'+src+'" alt="Generic placeholder image">';
        m += '  </a>';
        m += '  <div class="media-body" '+this.message_onclick(p['member'])+'>';
        m += '      <div class="name">'+p['user_name']+'<img class="send-message" src="img/post/mail.png"/></div>';
        m += '      <div class="date" title="'+date_full+'">' + date + '</div>';
        m += '  </div>';
        m += '</div>';

        // m += post.markup.bannerSelector();

        if ( !_.isEmpty(p['subject']) ) {
            //m += '<h3 class="subject">' + p['subject'] + '</h3>';
        }
        var no_of_comment, likes;
        m += '<div class="subject">' + post.subject(p) + '</div>';
        m += '<div class="content">' + post.content(p) + '</div>';
        if ( p['photos'] ) m += p['photos'];
        if( p['good'] > 0 ) likes = p['good'];
        else likes = '';
        if ( p['no_of_comment'] > 0 ) no_of_comment = p['no_of_comment'];
        else no_of_comment = '';

        m += '<ul class="nav nav-pills post-menu-philzine-bottom">';
        //m += '  <li class="like">'+ p['idx']+'<img src="img/post/like.png"/> Like <span class="no">' + likes + '</span></li>';
        m += '  <li class="like like-button"><span class="glyphicon glyphicon-thumbs-up"></span>Like <span class="no">' + likes + '</span></li>';
        m += '  <li class="reply"><span class="glyphicon glyphicon-comment"></span>Comment ' + no_of_comment + '</li>';
        m += '</ul>';

        m += this.comment_write_form(p);

        m = '<div class="post root-post" idx="'+p['idx']+'" gid="'+p['gid']+'">' + m + '</div>';

        //trace(m);
        return m;
    },
    render_comments : function (comments, post) {
        var m = '';
        if ( comments ) {
            var length = comments.length;
            if ( length > 5 ) {
                var no = length - 5;
                m += '<div class="show-more-comment" idx-root="'+post['idx']+'"><i class="fa fa-commenting-o"></i> '+ no +'개의 코멘트가 더 있습니다. 더보기...</div>';
            }
            for( var j in comments ) {
                if ( comments.hasOwnProperty(j) ) {
                    m += html.render_comment(comments[j], length - j);
                }
            }
        }
        return m;
    },
    render_comment : function (comment, reverse_index) {
		var m = '';

		var date_full = etc.date_full(comment['stamp']);
		var date = etc.date_short(comment['stamp']);
		//var humanTime = etc.humanTime(comment['stamp']); // DO NOT USE Human Time.

		var likes;
		if( comment['good'] > 0 ) likes = comment['good'];
		else likes = '';

		m += '<div ';
        if ( reverse_index > 5 ) {
            m += 'style="display:none;"';
        }
        m += 'rindex="'+reverse_index+'" ' +
            'class="post comment clearfix" ' +
            'post-id="'+comment['post_id']+'" ' +
            'idx="'+comment['idx']+'" ' +
            'gid="'+comment['gid']+'" ' +
            'idx-parent="'+comment['idx_parent'] + '" ' +
            'idx-root="'+comment['idx_root'] + '" ' +
            'depth="'+comment['depth']+'" ' +
            '">';

		m += '<div class="btn-group post-menu-philzine-top" role="group">';
		
		if( post.mine(comment) ) {
			m += '<span type="button" class="btn btn-secondary post-delete-button glyphicon glyphicon-remove"></span>';
		}

        /*
		else {
			m += '<span type="button" class="btn btn-secondary post-edit-button"><img src="img/post/edit.png"/></span>';
			m += '<span type="button" class="btn btn-secondary post-delete-button"><img src="img/post/delete.png"/></span>';
		}
        m += '  <span class="menu-separator"></span>';
        m += post.markup.more(comment['idx']);
        */
		m += '</div>';

		m +=	'<div class="media post-info">';
		m +=		'<a class="media-left" href="#">';

        var src = 'img/no_primary_photo.png';
        if ( typeof comment['member']['idx_primary_photo'] != 'undefined' ) src = app.getDataURL(comment['member']['idx_primary_photo']);

		m +=		'<img class="media-object profile-image" src="'+src+'" alt="Generic placeholder image">';
		m +=		'</a>';
		m +=		'<div class="media-body" '+this.message_onclick(comment['member'])+'>';
		m +=			'<div class="name">'+comment['user_name']+'<img class="send-message" src="img/post/mail.png"/></div>';
		m +=			'<div class="date" title="'+date_full+'">'+date+'</div>';
		m +=		'</div>';
        m +=			'<div class="content">';
        m +=				'<div class="text">' + post.content(comment) + '</div>';
        if ( comment['photos'] ) m += comment['photos'];
        m +=			'</div>';
		m +=	'</div>';

        //
        var onclick = html.message_onclick(comment['member']);
		m +=	'<nav class="btn-group post-menu-philzine-bottom pull-right">';
        m +=		'<span class="btn like"><span class="glyphicon glyphicon-thumbs-up"></span> Like <span class="no">'+likes+'</span></span>';
        m +=		'<span class="btn reply-button"><span class="glyphicon glyphicon-share-alt"></span> Reply</span>';
		if( post.mine(comment) ) {
			m +=		'<span class="btn post-edit-button"><span class="glyphicon glyphicon-pencil"></span> Edit</span>';
		}
		m +=		'<div class="btn dropdown">';
		m +=			'<div class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
		m +=				' &nbsp; <span class="glyphicon glyphicon-option-horizontal"></span>';
		m +=			'</div>';
		m +=			'<ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">';
		m +=				'<li class="dropdown-item reply-button"><span class="glyphicon glyphicon-share-alt"></span>Reply</li>';
		if( post.mine(comment) ) {
            m +=				'<li class="dropdown-item post-delete-button"><span class="glyphicon glyphicon-trash"></span>Delete</li>';
            m +=				'<li class="dropdown-item post-edit-button"><span class="glyphicon glyphicon-pencil"></span>Edit</li>';
        }
        else {
            m +=				'<li class="dropdown-item report-button" '+onclick+'><span class="glyphicon glyphicon-envelope"></span> Message</li>';
            m +=				'<li class="dropdown-item report-button"><span class="glyphicon glyphicon-warning-sign"></span>Report</li>';
		}
		m +=			'</ul>';
		m +=		'</div>';
		m +=	'</nav>';

		m += '</div>';
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
        m += '<form class="post-edit-form" idx="'+idx+'" action="'+app.getServerURL()+'" method="post" enctype="multipart/form-data">';
        m += '  <input type="hidden" name="module" value="ajax">';
        m += '  <input type="hidden" name="action" value="post_edit_submit">';
        m += '  <input type="hidden" name="idx" value="'+idx+'">';
        m += '  <input type="hidden" name="gid" value="'+gid+'">';
        m += "  <input type='hidden' name='idx_member' value='"+member.idx+"'>";
        m += "  <input type='hidden' name='session_id' value='"+member.session_id+"'>";
		
		m += "  <div class='post-content-wrapper'>";
		
        m += post.edit_subject(subject);
        m += post.edit_content(content);
        m += html.photos(idx, photos); // .photos must exists.
		
		m += "</div>";

		m += '<div class="row commands">';
		m += '	<div class="col-xs-4">';
        m += 		this.filebox();
		m += '	</div>';
		m += '	<div class="col-xs-4">';
        m += 		post.edit_cancel();
		m += '	</div>';
		m += '	<div class="col-xs-4">';
        m += '		<input type="submit" value="Update">';
		m += '	</div>';
        m += '</form>';
		m += '</div>';

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
        //trace('render_photo');
        //trace(data['idx']);
        if (_.isUndefined(data['url'])) alert('url of photo is empty');
        if (_.isUndefined(data['idx'])) alert('idx of photo is empty');
        var m = '<div class="photo" idx-data="'+data['idx']+'">';
        m += '<span class="glyphicon glyphicon-remove photo-delete-button"></span>';
        m += '<img idx="'+data['idx']+'" src="'+data['url_thumbnail']+'" org="'+data.url+'">';
        m += '</div>';
        //trace(m);
        return m;
    },
    login_form : function () {
        var m;

        if ( member.idx ) {
            m = '<h1>User Login</h1>';
            m += "<p>You have already logged in as <b>" + member.id + '</b></p>';
            m += '<p>'+member.primary_photo()+'</p>';
            m += '<nav class="navbar navbar-default logout-button">';
            m += '<p class="navbar-brand">Logout</p>';
            m += '</nav>';
        }
        else {
            m = 	'<div class="form-wrapper">';
            m += 	'<form class="member-login-form login">';
            m += 	'<div class="input-group username">';
            m += 	'<input name="id" type="text" class="form-control" placeholder="아이디를 입력하세요.">';
            m += 	'<span class="input-group-addon glyphicon glyphicon-user"></span>';
            m += 	'</div>';
            m += 	'<div class="input-group password">';
            m += 	'<input name="password"  type="password" class="form-control" placeholder="비밀번호를 입력하세요.">';
            m += 	'<span class="input-group-addon glyphicon glyphicon-lock"></span>';
            m += 	'</div>';
            m += 	'<input type="submit" class="btn btn-primary" value="로그인">';
            m += 	'<a class="forgot-password" href="https://www.philgo.com/?module=member&action=find_id_password" target="_blank">비밀번호 찾기 ...</a>';
            m +=    '<div class="register" page-button="register">회원가입 ...</div>';
            m += 	'</form>';
            m += 	'</div>';
        }
        return m;
    },
    photos : function ( idx, photos ) {
        return '<div class="photos" idx="'+idx+'">' + photos + '</div>';
    },
    page : {
        setting : function () {
            var m = '';
            m += '<div class="page-header">';
            m += '  <h1>설정 <small>필리핀매거진 {{version}}</small></h1>';
            m += '</div>';
            m += '<ul class="list-group">';
            m += '  <li class="list-group-item reset"><div>Reset</div></li>';
            m += '  <li class="list-group-item" onclick="app.refresh();">Refresh</li>';
            m += '  <li class="list-group-item"><div class="change-server-button">Change Server - {{url_server}}</div></li>';
            m += '  <li class="list-group-item"><a href="http://192.168.73.1/platforms/android/build/outputs/apk/android-debug.apk">Download Debugging APK</a></li>';
            m += '</ul>';
            return _.template(m)(app);
        }
    },
    update_primary_photo : function ( data ) {
        //trace(data);
        el.primary_photo().prop('src', data.url);
        member.update_photo_idx(data.idx);
    },
    focus : function ($obj) {
        setTimeout(function(){
            $obj.focus();
        }, 100);
    },
    /**
     * widget 폴더의 HTML 을 로드해서 화면에 보여준다.
     *
     *      1. 먼저 캐시된 정보를 보여준다.
     *      2. 캐시된 정보가 없으면,
     *          - 오프라인이면 로컬 widget 폴더의 HTML 파일을 로드해서 보여주고
     *          - 온라인이면 서버 widget 폴더의 HTML 파일을 로드해서 보여 준다.
     *
     * @attention 이 함수는 캐시는 하지만 게시판이나 Endless load 를 보여주지는 않는다.
     * @param widget_name
     */
    setWidget : function ( widget_name ) {

        if (app.online()) {
            return cache.update(widget_name);
        }

        this.setLocalWidget( widget_name );
    },
    /**
     *
     *
     * 서버의 Widget HTML 을 로드하지 않고 그냥 로컬의 widget html 정보만 로드해서 보여준다.
     *  즉, 앱을 컴파일 할 때, 같이 추가한 HTML 과 이미지를
     *      앱 내부의 Widget 폴더에서만 보여 줄 때 사용한다.
     *
     * @param widget_name
     * @returns {*}
     */
    setLocalWidget : function ( widget_name ) {
        if ( debug.not_started() ) {
            var data = db.get( widget_name );
            if ( data ) return html.setContentWithCacheMark(widget_name, data);
        }

        ajax_load('widget/'+widget_name+'.html', function(markup){
            //trace(markup);
            if ( markup ) {
                var re = {
                    html: markup,
                    length: markup.length,
                    md5: ''
                };
                save_page( widget_name, re );
                html.setContent(re.html, widget_name);
                //note.post('html.setWidget() : ' + name + ' 페이지를 로드하였습니다.');
                app.setCurrentForum('');
            }
        }, true);
    },
    setContentWithCacheMark : function (widget_name, data) {
        var stamp = parseInt(db.get(widget_name + '.stamp')) / 1000;
        var date = etc.date_full(stamp);
        html.setContent( data + '<div class="cache-mark">cached at : '+date+'</div>', widget_name );
    },

    /**
     * 전체 화면에 로더를 표시한다.
     */
    showLoader : function () {
        $('<div id="post-loader"><i class="fa fa-spinner fa-spin"></i></div>').appendTo('body')
            .css({
                position: 'fixed',
                'z-index': 99999,
                'background-color' : 'rgba(200,200,200,0.5)',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                'padding-top' : '40%',
                'text-align':'center',
                'color' : 'white',
                'font-size' : '3.4em'
            });
    },
    /**
     * loader 는 1번 부터 14번 까지 있는데, 몇번의 loader 를 어느 위치에 표시 할 것인지 지정한다.
     * @note $.after() 를 사용해서, target $obj 의 다음에 넣는다.
     * @param no
     * @param $obj
     */
    showLoaderAfter : function ( no, $obj ) {
        $obj.after('<div class="gif-loader" no="'+no+'"><img src="img/loader/loader'+no+'.gif"></div>');
        return $('.gif-loader');
    },
    /**
     * showLoaderAfter() 와 동일한데 단, $.html() 을 사용해서 target object 의 내부에 넣는다.
     * @param no
     * @param $obj
     *
     * @code
     html.showLoaderOn(14, $submit).css({'padding-left':'0.8em'});
     * @endcode
     */
    showLoaderOn : function ( no, $obj ) {
        $obj.html('<img class="gif-loader" no="'+no+'" src="img/loader/loader'+no+'.gif">');
        return $('.gif-loader');
    },
    hideLoader : function () {
        setTimeout(function(){

            var $ajax_loader = $('.gif-loader');
            if ( $ajax_loader.length ) $ajax_loader.remove();
            var $post_loader = $('#post-loader');
            if ( $post_loader.length ) $post_loader.remove();

        },200);},
	//added by benjamin modal window
	modalWindow : function(){
		m = '<div class="modalWindow"></div>';
		return m;
	},
	modalImage : function( idx, url, add_arrow ){
		m = '';
		m += '<div class="modalImage" idx="' + idx + '">';
		m += '<img src="' + url + '"/>'
		if( add_arrow == true ){
			if( $(".post .photos img[idx='" + idx + "']").prev().length ) prev = $(".post .photos img[idx='" + idx + "']").prev();
			else prev = $(".post .photos:has(img[idx='" + idx + "']) img:last");
			prev_idx = prev.attr("idx");

			if( $(".post .photos img[idx='" + idx + "']").next().length ) next = $(".post .photos img[idx='" + idx + "']").next();
			else next = $(".post .photos:has(img[idx='" + idx + "']) img:first");
			next_idx = next.attr("idx");

			m += '<span class="glyphicon glyphicon-menu-left arrow left" idx="' + prev_idx +'"></span>';
			m += '<span class="glyphicon glyphicon-menu-right arrow right" idx="' + next_idx + '"></span>';
		}
		m += '</div>';

		return m;
	},
	//^ added by benjamin modal window
	/*added by benjamin upload image loader*/
	createUploadLoader : function( $selector ){
		$selector.append("<div class='photo loader'><img src='img/loader/loader8.gif'/></div>");
	},
	/*
	*$selector = the selector to append the loader
	*idx only exists if the upload was a success	
	*/
	removeUploadLoader : function( $selector, idx ){
		//for a much smoother display when the loader gets removed
		if( typeof( idx ) == 'undefined' ) $( ".photo.loader" ).remove();	
		else{
			$(".photo[idx-data='" + idx + "']").hide();
			$selector.find( "img" ).load( function(){
				$(".photo[idx-data='" + idx + "']").show();
				$( ".photo.loader" ).remove();
			});
		}
	},
	/* eo  added by benjamin upload image loader*/


    set_comment_form_for_writing : function ( $form ) {
        $form.find('.comment-file-upload-button').hide();
        $form.find('.submit-button').hide();
        $form.find('textarea').height(100);
        $form.find('.alt-buttons').show();
    },

    reset_comment_form : function ( $form ) {
        $form.find('.comment-file-upload-button').show();
        $form.find('.submit-button').show();
        $form.find('textarea').height(48);
        $form.find('.alt-buttons').hide();
    }


};
