

var callback = {
    on_click_page : function () {
        var $this = $(this);
        var page_name = $this.attr('page-button');
        var post_id = $this.attr('data-post-id');
        //console.log('on_click_page() : ' + page);
        if ( app.offline() && $this.hasClass('check-online') ) {
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
        //console.log('ajax_login() member.idx:'+member.idx);
        var $this = $(this);
        var id = $this.find('[name="id"]').val();
        var url = app.url_server_login() + '&id=' + id;
        url += '&password=' + $this.find('[name="password"]').val();
        ajax_load( url, function(re) {
            //console.log(re);
            if ( re.code == 504 ) alert('아이디를 입력하십시오.');
            else if ( re.code == 503 ) alert('비밀번호를 입력하십시오.');
            else if ( re.code == 502 ) alert('아이디를 찾을 수 없습니다.');
            else if ( re.code == 501 ) alert('비밀번호가 틀렸습니다. Wrong password.');
            else {
                //console.log("login success!");
                //console.log(re);
                member.setLogin(id, re);
                cache.showFront();
            }
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
        //console.log('on_click_reset()');
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
        ajax_load_post(app.getServerURL(), $(this).serialize(), function(re){
            element.post_write_form().remove();
            element.content().prepend(html.render_post(re.post));
        });
        return false;
    },
    comment_form_submit : function (e) {
        e.preventDefault();
        ajax_load_post(app.getServerURL(), $(this).serialize(), function(re){
            var p = re.post;
            if ( p['depth'] > 1 ) {
                element.comment_write_form(p['idx_parent']).remove();
            }
            else {
                html.clear_comment_write_form(p);
            }
            var m = html.render_comment(p);
            element.post(p['idx_parent']).after(m);
        });
        return false;
    },
    edit_form_submit : function (e) {
        e.preventDefault();
        ajax_load_post(app.getServerURL(), $(this).serialize(), function(re){
            console.log(re);
            var idx = re['idx'];
            var $edit = el.post_edit(idx);
            var $form = $(".post-edit-form[idx='"+idx+"']");
            var gid = $form.find('[name="gid"]').val();
            var subject = $form.find('[name="subject"]').val();
            var content = $form.find('[name="content"]').val();
            var photos = '';
            $edit.find('.photos img').each(function(index){
                photos = photos + ' ' + this.outerHTML;
            });
            console.log(photos);
            photos = html.photos(idx, photos); // .photos must exist

            console.log(photos);

            $edit.remove();

            var $post = el.post(idx);
            $post.find('.subject').text(subject);
            $post.find('.content').text(content);
            if ( el.photos(idx).length ) el.photos(idx).replaceWith(photos);
            else $post.append(photos);
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
        $form.ajaxSubmit({
            complete: function (xhr) {
                console.log("File upload completed thru jquery.form.js");
                var re;
                try {
                    re = JSON.parse(xhr.responseText);
                }
                catch (e) {
                    return alert(s.stripTags(xhr.responseText));
                }
                console.log(re);
                if ( re['code'] ) {
                    return alert(re['message']);
                }

                if ( app.isRegisterPage() ) html.update_primary_photo( re.data );
                else {
                    var $photos = $form.find('.photos');
                    $photos.append( html.render_photo( re.data ) );
                }
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

        function onCameraError(e) {
            alert('onCameraError');
            alert(JSON.stringify(e));
        }
        function onFileTransferSuccess(data) {
            //alert('onFileTransferSuccess');
            //alert(JSON.stringify(data));
            console.log("Code = " + data.responseCode);
            console.log("Response = " + data.response);
            console.log("Sent = " + data.bytesSent);
            if ( app.isMobile() ) {
                navigator.camera.cleanup();
            }
            var re = JSON.parse(data.response);
            if ( re['code'] ) {
                alert(re['message']);
            }
            var $photos = $form.find('.photos');
            $photos.append( html.render_photo( re.data ) );
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
            console.log(options);
            var ft = new FileTransfer();
            var url = app.getServerURL();
            console.log(url);
            ft.upload(fileURI, encodeURI(url), onFileTransferSuccess, onFileTransferFail, options);
        }
        function onCameraConfirm(no) {
            var type = Camera.PictureSourceType.PHOTOLIBRARY; // default
            if ( app.isBrowser() ) { // @Attention This is only for test purpose.
                console.log('TEST : for cordova broswer platform : mocking file transfer');
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

        app.confirm(
            '사진을 찍으시겠습니까? 갤러리에서 선택하시겠습니까?',
            onCameraConfirm,
            '사진 올리기',
            ['사진 찍기','사전 선택', '취소']
        );
    },
    on_click_post_edit_button : function () {
        var $this = $(this);
        var $post = $this.parents('.post');
        $post.hide();
        html.render_post_edit($post);
    },
    on_click_photo_delete_button : function () {
        var $this = $(this);
        var $photo = $this.parents('.photo');
        var $form = $this.parents('form');
        var idx = $photo.attr('idx-data');
        var gid = $form.find('[name="gid"]').val();
        var url = app.getServerURL() + '?module=ajax&action=data_delete_submit&gid='+gid + "&idx="+idx;
        ajax_load(url, function(re){
            console.log(re);
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
            console.log(re);
            $post.html(lang('deleted'));
        });
    },
    on_click_like_button : function () {
        var $this = $(this);
        var $post = $this.parents('.post');
        var idx = $post.attr('idx');
        var url = app.getServerURL() + '?module=ajax&action=post_vote_submit&idx=' + idx;
        ajax_load(url, function(re){
            console.log(re);
            $this.find('.no').text(re['good']);
        });
    },
    on_click_report_button : function () {
        var $this = $(this);
        var $post = $this.parents('.post');
        var idx = $post.attr('idx');
        var url = app.getServerURL() + '?module=ajax&action=post_report_submit&idx=' + idx;
        ajax_load(url, function(re){
            console.log(re);
            alert("글 신고가 되었습니다.");
        });
    },
	//added by benjamin
	on_click_post_edit_textarea : function() {
		var $this = $(this);
		$this.height(100);
	},
	//^ above is added by benjamin
    on_click_setting_button : function () {
        html.setContent( html.page.setting() );
    },
    on_click_change_server_button : function () {
        if ( confirm("Connect to http://philgo.com/") ) return app.setServerURL('http://philgo.com/');
        if ( confirm("Connect to http://philgo.org/") ) return app.setServerURL('http://philgo.org/');
        if ( confirm("Connect to http://192.168.137.1/") ) return app.setServerURL('http://192.168.137.1/');
    },
    member_register_submit : function (e) {
        e.preventDefault();
        ajax_load_post(app.getServerURL(), $(this).serialize(), function(re){
            console.log(re);
        });
        return false;
    }
};
