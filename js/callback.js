var callback = {
    on_click_page : function () {
        var $this = $(this);
        var page_name = $this.attr('page-button');
        app.setCurrentPage(page_name);
        var post_id = $this.attr('post-id');
        //trace('on_click_page() : ' + page);
        if ( app.offline() && $this.hasClass('check-internet') ) {
            alert(page_name + " 페이지를 보기 위해서는 인터넷에 연결을 해 주세요. Please connect to Internet.");
            return;
        }
        if ( page_name == 'login' ) {
            html.setContent( html.login_form(), 'login' );
        }
        else {
            cache.update(page_name, post_id);
        }
    },
    on_click_content: function () {
        panel.close();
    },
    form_login : function () {
        //trace('ajax_login() member.idx:'+member.idx);
        var $this = $(this);
        var id = $this.find('[name="id"]').val();
        var url = app.url_server_login() + '&id=' + id;
        url += '&password=' + $this.find('[name="password"]').val();
        var $submit= $this.find('[type="submit"]');
        $submit.hide();
        html.showLoaderAfter(14, $('.password'));
        ajax_load( url, function(re) {
            //trace(re);
            console.log(re);
            if ( re.code == 4101 ) alert('아이디와 비밀번호를 입력하십시오.');
            else if ( re.code == 503 ) alert('비밀번호를 입력하십시오.');
            else if ( re.code == 4102 ) alert('아이디를 찾을 수 없습니다.');
            else if ( re.code == 4103 ) alert('비밀번호가 틀렸습니다. Wrong password.');
            else {
                //trace("login success!");
                //trace(re);
                member.setLogin(id, re);
                cache.showFront();
                return false;
            }
            html.hideLoader();
            $submit.show();
        }, {
            error_check : false
        });
        return false;
    },
    on_click_logout_button : function () {
        member.setLogout();
        cache.showFront();
    },

    /**
     *
     */
    on_click_reset : function () {
        //trace('on_click_reset()');
        var re = confirm("앱을 초기화 하시겠습니까? Do you want to reset?");
        if ( re ) {
            app.reset();
            app.refresh();
        }
    },
    on_click_post_button : function () {
        var post_id = app.getCurrentForum();
        if ( element.post_write_form().length == 0 ) {
            element.content().prepend(html.post_write_form(post_id));
            html.focus( el.post_write_form().find('[name="content"]') );
        }
        app.goTop();
    },
    on_click_reply_button : function () {
        var $this = $(this);
        var $comment = $this.parents('.post');
        var p = {
            'idx' : $comment.attr('idx'),
            'post_id' : $comment.attr('post-id')
        };
        $comment.after( html.comment_write_form(p));
    },
    on_click_menu_panel : function () {
        panel.toggle();
    },
    post_form_submit : function (e) {
        e.preventDefault();
        var $this = $(this);
        var $submit = $this.find('.submit');
        html.showLoaderOn(14, $submit);
        ajax_load_post(app.getServerURL(), $this.serialize(), function(re){
            element.post_write_form().remove();
            element.content().prepend(html.render_post(re.post));
            html.hideLoader();
        });
        return false;
    },
    comment_form_submit : function (e) {
        e.preventDefault();
        var $this = $(this);
        var $submit = $this.find('[type="submit"]').parent();
        html.showLoaderOn(14, $submit).css({'padding-left':'0.8em'});
        ajax_load_post(app.getServerURL(), $this.serialize(), function(re){
            var p = re.post;
            if ( p['depth'] > 1 ) {
                element.comment_write_form(p['idx_parent']).remove();
            }
            else {
                html.clear_comment_write_form(p);
            }
            var m = html.render_comment(p);
            element.post(p['idx_parent']).after(m);
            html.hideLoader();
        });
        return false;
    },
    edit_form_submit : function (e) {
        e.preventDefault();
        ajax_load_post(app.getServerURL(), $(this).serialize(), function(re){
            trace(re);
            var idx = re['idx'];
            var $edit = el.post_edit(idx);
            var $form = $(".post-edit-form[idx='"+idx+"']");
            var gid = $form.find('[name="gid"]').val();
            var subject = $form.find('[name="subject"]').val();
            var content = $form.find('[name="content"]').val();
            var photos = '';
            $edit.find('.photos img').each(function(index){
                photos = photos + '' + this.outerHTML;//added by benjamin, removed space ( ' ' => '' )  so no need to float left for the extra space when using inline block
            });
            trace(photos);
            photos = html.photos(idx, photos); // .photos must exist

            trace(photos);

            $edit.remove();

            var $post = el.post(idx);
            $post.find('.subject').text(subject);
            $post.find('.content').text(content);
            if ( el.photos(idx).length ) el.photos(idx).replaceWith(photos);
            //else $post.append(photos);//edited by benjamin for design compatibility, moved the parent to .content instead...
			else $post.find(".content").append(photos);
            $post.show();

        });
        return false;
    },
    is_upload_submit : false,
    on_change_file_upload : function (filebox) {
        var $filebox = $(filebox);
        var $form = $filebox.parents("form");
        var $action = $form.find('[name="action"]');
        var action = $action.val();
        $action.val('file_upload_submit');

        if ( app.isRegisterPage() ) $form.prop('action', app.getServerURL());

        this.is_upload_submit = true;

        html.showLoaderAfter(14,$filebox);

        $form.ajaxSubmit({
            complete: function (xhr) {
                trace("File upload completed thru jquery.form.js");
                var re;
                try {
                    re = JSON.parse(xhr.responseText);
                }
                catch (e) {
                    return alert(s.stripTags(xhr.responseText));
                }
                trace(re);
                if ( re['code'] ) {
                    return alert(re['message']);
                }

                if ( app.isRegisterPage() ) html.update_primary_photo( re.data );
                else {
                    var $photos = $form.find('.photos');
                    $photos.append( html.render_photo( re.data ) );
                }
                html.hideLoader();
            }
        });
        this.is_upload_submit = false;
        $action.val(action);
        $filebox.val('');
    },
    on_click_file_upload_button : function () {
        var $this = $(this);
        var $form = $this.parents('form');
        var gid = $form.find('[name="gid"]').val();


        app.confirm(
            '사진을 찍으시겠습니까? 갤러리에서 선택하시겠습니까?',
            onCameraConfirm,
            '사진 올리기',
            ['사진 찍기','사전 선택', '취소']
        );


        function onCameraError(e) {
            alert('onCameraError');
            alert(JSON.stringify(e));
        }
        function onFileTransferSuccess(data) {
            //alert('onFileTransferSuccess');
            //alert(JSON.stringify(data));
            trace("Code = " + data.responseCode);
            trace("Response = " + data.response);
            trace("Sent = " + data.bytesSent);
            if ( app.isMobile() ) {
                navigator.camera.cleanup();
            }
            var re = JSON.parse(data.response);
            if ( re['code'] ) {
                alert(re['message']);
            }

            if ( app.current_page_name == 'register' ) {
                $('.primary-photo').prop('src', re['data']['url']);
                member.update_photo_idx(re['data']['idx']);
            }
            else {
                var $photos = $form.find('.photos');
                $photos.append( html.render_photo( re.data ) );
            }
        }
        function onFileTransferFail(e) {
            alert('onFileTransferFail');
            alert(JSON.stringify(e));
        }
        function onCameraSuccess(fileURI) {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.params = {
                'module' : 'ajax',
                'action' : 'file_upload_submit',
                'page' : app.getCurrentPage(),
                'gid' : gid,
                'idx_member' : member.idx,
                'session_id' : member.session_id
            };
            if ( app.current_page_name == 'register' ) {
            }
            else {
                var idx_parent = $form.attr('data-idx-parent');
                if ( typeof idx_parent == 'undefined' ) idx_parent = 0;
                options['idx_parent'] = idx_parent;
            }
            trace(options);
            var ft = new FileTransfer();
            var url = app.getServerURL();
            trace(url);
            ft.upload(fileURI, encodeURI(url), onFileTransferSuccess, onFileTransferFail, options);
        }
        function onCameraConfirm(no) {
            var type = Camera.PictureSourceType.PHOTOLIBRARY; // default
            if ( app.isBrowser() ) { // @Attention This is only for test purpose.
                trace('TEST : for cordova broswer platform : mocking file transfer');
            }
            else {
                if ( no == 1 ) {
                    type = Camera.PictureSourceType.CAMERA;
                }
                else if ( no == 2 ) {
                    type = Camera.PictureSourceType.PHOTOLIBRARY;
                }
            }

            setTimeout(function() {
                navigator.camera.getPicture( onCameraSuccess, onCameraError, {
                    'quality' : 100,
                    'sourceType' : type,
                    'destinationType': Camera.DestinationType.FILE_URI
                } );
            },  0);
        }

    },
    on_click_post_edit_button : function () {		
        var $this = $(this);
        var $post = $this.parents('.post');
        $post.hide();
        html.render_post_edit($post);
    },
    on_click_photo_delete_button : function () {
		re = confirm( "Are you sure you want to delete this photo?" );
		if( !re ) return;
        var $this = $(this);
        var $photo = $this.parents('.photo');
        var $form = $this.parents('form');
        var idx = $photo.attr('idx-data');
        var gid = $form.find('[name="gid"]').val();
        var url = app.getServerURL() + '?module=ajax&action=data_delete_submit&gid='+gid + "&idx="+idx;
        ajax_load(url, function(re){
            trace(re);
            var data = re['data'];
            if ( data['code'] ) return alert(data['message']);
            $photo.remove();
        });
    },
    on_click_post_edit_cancel_button : function () {
        var $this = $(this);
        var $edit = $this.parents('.post-edit');
        var idx = $edit.attr('idx');
        var $post = el.post(idx);
        $edit.remove();
        $post.show();
    },
    on_click_post_delete_button : function () {
        var $this = $(this);
        var $post = $this.parents('.post');
        var idx = $post.attr('idx');
        var url = app.getServerURL() + '?module=ajax&action=post_delete_submit&idx=' + idx;
        ajax_load(url, function(re){
            trace(re);
            $post.html(lang('deleted'));
        });
    },
    on_click_like_button : function () {
        var $this = $(this);
        var $post = $this.parents('.post');
        var idx = $post.attr('idx');
        var url = app.getServerURL() + '?module=ajax&action=post_vote_submit&idx=' + idx;
        ajax_load(url, function(re){
            trace(re);
            $this.find('.no').text(re['good']);
        });
    },
    on_click_report_button : function () {
        var $this = $(this);
        var $post = $this.parents('.post');
        var idx = $post.attr('idx');
        var url = app.getServerURL() + '?module=ajax&action=post_report_submit&idx=' + idx;
        ajax_load(url, function(re){
            trace(re);
            alert("글 신고가 되었습니다.");
        });
    },
	//added by benjamin
	on_click_post_edit_textarea : function() {
		/*var $this = $(this);
		var $form = $this.parents('form');
		$this.height(100);
		$form.find(".row.commands").show();*/
	},
	on_click_post_edit_comment_textarea : function() {
		var $this = $(this);
		$this.height(100);
	},
	on_click_post_photos_img : function( e ) {
		var $this = $(this);	
		app.createModalWindowWithImage( $this.attr("idx") );
	},
	on_click_modal_window : function( e ) {
		var $this = $(this);	
		//element.modal_window().remove();
		
		if( $(e.target).hasClass('arrow') ){
		
		}
		else{
			element.modal_window().remove();
			element.body().css('overflow','initial');
			document.ontouchmove = function(e){}//remove the disabled mobile scrolling
		}
	},
	//^ above is added by benjamin
    on_click_setting_button : function () {
        html.setContent( html.page.setting(), 'setting' );
    },
    on_click_change_server_button : function () {
        if ( confirm("Connect to http://philgo.com/") ) return app.setServerURL('http://philgo.com/');
        if ( confirm("Connect to http://work.philgo.org/") ) return app.setServerURL('http://work.philgo.org/');
        if ( confirm("Connect to http://192.168.137.1/") ) return app.setServerURL('http://192.168.137.1/');
    },
    member_register_submit : function (e) {
        e.preventDefault();
        var $form = $(this);

        html.showLoaderAfter(14, $('.year'));
        ajax_load_post(app.getServerURL(), $form.serialize(), function(re){
            member.setLogin(re['id'], re);
            if ( $form.find('[name="session_id"]').length ) {
                alert("회원 정보를 업데이트 하였습니다.");
            }
            else {
                alert("회원 가입을 하였습니다.");
                cache.showFront();
            }
            html.hideLoader();
        }, function(re) {
            html.hideLoader();
        });
        return false;
    },
    on_click_post_view : function () {
        var $this = $(this);
        var idx = $this.attr('post-view');

        ajax_load(app.getServerURL() + '?module=ajax&action=post_view_submit&idx='+idx, function(re){

            app.setCurrentPage('post-view');
            var site = re['site'];

            note.post(site + ' 사이트의 글이 추가되었습니다.');
            var post = re['post'];
            el.content().html(html.render_post(post));
            el.content().append(html.render_comments(post['comments']));
        });
    }
};


function menu_show_more() {
    html.setWidget('menu-all');
}