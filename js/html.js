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
        m += '      <span class="navbar-text page text-button glyphicon glyphicon-home" data-content-page="front" data-post-id="*"></span>';
        m += '      <span class="navbar-text logo">LOGO</span>';
        m += '      <span class="navbar-text navbar-right page text-button glyphicon glyphicon-th-list menu-panel toggle"></span>';
        m += '  </div>';
        m += '</nav>';
        m += '<ul class="nav nav-pills nav-justified main-menu">';
        m += '  <li data-content-page="news" data-post-id="news">News</li>';
        m += '  <li data-content-page="info" data-post-id="qna">Info</li>';
        m += '  <li data-content-page="company" data-post-id="company_book">Company</li>';
        m += '  <li data-content-page="travel" data-post-id="travel">Travel</li>';
        m += '  <li data-content-page="qna" data-post-id="qna">QnA</span></li>';
        m += '  <li data-content-page="freetalk" data-post-id="freetalk,knowhow">Talk</span></li>';
        m += '  <li data-content-page="menu-all">More</span></li>';
        m += '</ul>';
        return m;
    },
    footer : function() {
        var m = '';
        m += '<ul class="nav nav-pills nav-justified bottom bottom-menu">';
        m += '  <li data-content-page="profile"><span class="glyphicon glyphicon-user"></span>Profile</li>';
        m += '  <li data-content-page="message"><span class="glyphicon glyphicon-envelope"></span>Message</li>';
        m += '  <li data-content-page="search"><span class="glyphicon glyphicon-search"></span>Search</li>';
        m += '  <li class="post-button" data-post-id=""><span class="glyphicon glyphicon-pencil"></span>Post</li>';
        m += '  <li data-content-page="setting"><span class="glyphicon glyphicon-wrench"></span>Setting</span></li>';
        m += '</ul>';
        return m;
    },
    panel : function() {
        var m = '';
        m += '<div class="panel panel-default menu-panel-inner">';
        m += '  <ul class="list-group top">';
        m += '      <li><div class="list-group-item text-button">Menu 1<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item text-button">Menu 2<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item text-button">Menu 3<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item text-button menu-panel toggle">Close Menu<span class="glyphicon glyphicon-remove"></span></div></li>';
        m += '  </ul>';
        m += '  <div class="panel-user-profile">';
        m += '      <img src="img/no_primary_photo.png"/>';
        m += '      <div class="bottom-space"></div>';
        m += '      <div class="name">Anonymous<div>User</div></div>';
        m += '  </div>';
        m += '  <ul class="list-group bottom">';
        m += '      <li><div class="list-group-item" data-content-page="login">로그인 login<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item" data-content-page="register">회원가입 register<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item" data-content-page="admin">운영자 요청/건의 inquery<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item" data-content-page="menu-all">전체메뉴 all-menu<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item" data-content-page="setting">Settings<span class="glyphicon glyphicon-menu-right"></span></li>';
        m += '  </ul>';
        m += '  <div class="panel-copyright">';
        m += '      <ul class="nav nav-pills nav-justified bottom">';
        m += '          <li><span>Terms & Policies</span></li>';
        m += '          <li><span>Feedback</span></li>';
        m += '          <li><span>About</span></li>';
        m += '      </ul>';
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
        m += '  <div class="file"><input type="file" name="file" onchange="callback.on_change_file_upload(this);"></div>';
        m += "  <div class='submit'><input type='submit'></div>";
        m += "</form>";
        m += '<div class="post-write-form-photos"></div>';
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
        return m;
    },
    clear_comment_write_form : function (p) {
        var $form = element.comment_write_form(p['idx_parent']);
        var $gid = $form.find('[name="gid"]');
        var $content = $form.find('[name="content"]');
        $gid.val( etc.unique_id(member.idx + p['post_id']) );
        $content.val('');
        $form.find('.phptos').html('');
    },
    render_post : function (p) {
        //console.log('get_post_render(p)');
        if (_.isEmpty(p) ) return;
        //console.log('creating DOM');
        var m = '';

        //console.log( p );

        date = new Date( p['stamp'] * 1000 );
        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        //var seconds = "0" + date.getSeconds();
        var date = month + "/" + day; //hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        var date_full = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;


        m += '<div class="btn-group post-menu-philzine-top" role="group">';
        if( member.idx ){
            m += '<span type="button" class="btn btn-secondary"><img src="img/post/report.png"/></span>';
        } else {
            m += '<span type="button" class="btn btn-secondary edit"><img src="img/post/edit.png"/></span>';
            m += '<span type="button" class="btn btn-secondary delete"><img src="img/post/delete.png"/></span>';
        }
        m += '  <span class="menu-separator"></span>';
        m += '  <span class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
        m += '      <img src="img/post/more.png"/>';
        m += '  </span>';
        m += '  <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">';
        m += '      <li><a href="#">Report</a></li>';
        m += '      <li><a href="#">Blind</a></li>';
        m += '      <li><a href="#">Block</a></li>';
        m += '      <li><a href="#">Trash</a></li>';
        m += '      <li><a href="#">Move</a></li>';
        m += '      <li><a href="#">More Menu ...</a></li>';
        m += '  </ul>';
        m += '</div>';

        m += '<div class="media post-info">';
        m += '  <a class="media-left" href="#">';
        m += '      <img class="media-object profile-image" src="img/no_primary_photo.png" alt="Generic placeholder image">';
        m += '  </a>';
        m += '  <div class="media-body">';
        m += '      <div class="name">'+p['user_name']+'<img class="send-message" src="img/post/mail.png"/></div>';
        m += '      <div class="date" title="'+date_full+'">' + date;
        m += '          <span class="separator">|</span> HUMAN TIMING';
        m += '      </div>';
        m += '      <div class="location">Lives in Philippines<span class="separator">|</span>xx Fans</div>';
        m += '  </div>';
        m += '</div>';

        if ( !_.isEmpty(p['subject']) ) {
            //m += '<h3 class="subject">' + p['subject'] + '</h3>';
        }
        var no_of_comment, likes;
        if ( p['subject'] ) m += '<div class="subject">' + p['subject'] + '</div>';
        if ( p['content'] ) m += '<div class="content">' + p['content'] + '</div>';
        if ( p['photos'] ) m += p['photos'];
        if( p['good'] > 0 ) likes = p['good'];
        else likes = '';
        if( p['no_of_comment'] > 0 ) no_of_comment = p['no_of_comment'];
        else no_of_comment = '';

        m += '<ul class="nav nav-pills post-menu-philzine-bottom">';
        m += '  <li class="like">'+ p['idx']+'<img src="img/post/like.png"/> Like <span class="no">' + likes + '</span></li>';
        m += '  <li class="reply"><img src="img/post/comment.png"/>Comment ' + no_of_comment + '</li>';
        m += '</ul>';

        m += this.comment_write_form(p);

        m = '<div class="post" data-idx-post="'+p['idx']+'">' + m + '</div>';






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
        m += '<div class="comment" data-idx-post="'+comment['idx']+'" post-id="'+comment['post_id']+'" depth="'+comment['depth']+'">';
        m += ' 글번호 : '+comment['idx']+', 글쓴이: xxxx, 날짜: xxxx, 수정, 메뉴 더보기';
        m += '  <div class="content">' + comment['content'] + '</div>';
        if ( comment['photos'] ) m += comment['photos'];
        m += ' <span class="reply-button">Reply</span>, 추천, 비추천';
        m += '</div>';
        return m;
    },
    /**
     *
     * @param re - data['idx'] 와 data['url'], data['url_thumbnail'] 의 값만 들어오면 된다.
     */
    render_photo : function (data) {
        //console.log('render_photo');
        //console.log(data);
        var m = '';
        m += '<img src="'+data['url_thumbnail']+'">';
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
    }
};
