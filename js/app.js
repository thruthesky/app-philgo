/**
 *
 * App class object
 *
 */
var app = {
    version : 26, // config.xml 의 version 값을 입력한다. 서버의 값과 비교해서 작으면 메인 화면에 알림창이 뜬다.
    url_server : null,
    current_page_name : null,
    deviceReady : false,
    connectionStatus : false,
    title : '필고',
    getVersion : function () {
        return this.version;
    },
    setTitle : function (str) {
        app.title = str;
        $('header .logo').text(app.title);
    },
    getTitle : function() {
        return app.title;
    },
    getCurrentPage : function () {
        return this.current_page_name;
    },
    isRegisterPage : function () {
        return app.getCurrentPage() == 'register';
    },
    setServerURL : function (url) {
        this.url_server = url;
    },
    getServerURL : function () {
        return this.url_server;
    },
    getServerCSSURL : function () {
        var url = this.getServerURL() + 'module/ajax/server.css?version=' + this.getVersion();
        //if ( debug.mode )
            url += new Date().getTime();
        return url;
    },
    getServerJavascriptURL : function () {
        var url = this.getServerURL() + 'module/ajax/server.js?version=' + this.getVersion();
        //if ( debug.mode )
            url += new Date().getTime();
        return url;
    },
    getHookJavascriptURL : function () {
        return this.getServerURL() + 'module/ajax/hook.js?time=' + new Date().getTime();
    },
    url_server_widget : function () {
        return this.getServerURL() + '?module=ajax&action=widget&submit=1&name=';
    },
    url_server_forum : function () {
        return this.getServerURL() + '?module=ajax&action=post-list&submit=1&post_id=';
    },
    url_server_login : function () {
        return this.getServerURL() + '?module=ajax&action=login&submit=1';
    },
    isDeviceReady : function () {
        return this.deviceReady;
    },
    /**
     * deviceready 이벤트를 얻기 위해서는 이 함수를 반드시 호출 해야 한다.
     * 이 함수가 deviceready 를 등록하고 callback 을 호출한다.
     * @param callback
     * @code deviceready 이벤트를 등록하고, deviceready 일 때, 처리 할 코드

     app.addEventDeviceReady(
     function callback_onDeviceReady() {
            alert( app.platform() );
        }
     );

     *
     * @endcode
     */
    addEventDeviceReady : function(callback) {
        trace('app.isCordova():' + app.isCordova());
        function onDeviceReady() {
            trace('onDeviceReady()');
            app.deviceReady = true;
            document.addEventListener("offline", app.on_offline, false);
            document.addEventListener("online", app.on_online, false);
            callback();
        }
        if ( app.isCordova() ) {
            trace("This app is running under cordova. Device is ready.");
            document.addEventListener("deviceready", onDeviceReady, false);
        }
        // 앱이 아닌 경우,
        else {
            trace("This app is running under Desktop browser. Device is ready.");
            app.setOnline();
            onDeviceReady();
        }
    },
    isCordova : function() {
        if ( this.isDeviceReady() ) {
            return !!window.cordova;
        }
        else return false;
    },
    fileProtocol : function () {
        return window.location.protocol === "file:";
    },
    model : function() {
            if ( this.isCordova() ) {
                if ( typeof device == 'undefined' ) return 'undefined';
                return device.model;
            }
            else return 'isNotCordova';
    },
    platform : function() {
        if ( this.isCordova() ) {
            if ( typeof device == 'undefined' ) return 'undefined';
            return device.platform;
        }
        else return 'isNotCordova';
    },
    isBrowser : function() {
        return this.platform() == 'browser';
    },
    isDesktop : function() {
        return this.platform() == 'isNotCordova';
    },
    isMobile : function () {
        if ( this.isBrowser() ) return false;
        else if ( this.isDesktop() ) return false;
        return true;
    },
    reset : function () {
        var url_server = db.get('url_server');
        db.deleteAll();
        db.set('url_server', url_server);
    },
    refresh : function () {
        location.href='index.html';
    },
    /*
     getCurrentPage: function () {
     return this.current_page_name;
     },
     */
    setCurrentPage: function (page) {
        this.current_page_name = page;
    },
    setOnline : function () {
        app.connectionStatus = true;
    },
    setOffline : function () {
        app.connectionStatus = false;
    },
    on_online : function() {
        app.setOnline();
    },
    on_offline : function() {
        app.setOffline();
    },
    isOnline : function() {
        return app.connectionStatus == true;
    },
    isOffline : function() {
        return ! app.isOnline();
    },
    goTop : function() {
        scrollTo(0,0);
    },
    init : function () {
        // this.version = db.get('version');
    },
    initEvent : function() {
        on_click('[callback]', function(e){
            var $this = $(this);
            var func = $this.attr('callback');
            var call_func = 'callback_' + func;
            if ( typeof window[call_func] == 'function' ) window[call_func]($this, e);
            else window[func]($this, e);
        });
        on_click('[widget]', function(e){
            var $this = $(this);

            html.clear_place_post_view( $this );

            var title = $this.attr('title');
            app.setTitle(title);

            var widget_name = $this.attr('widget');
            app.setCurrentPage(widget_name);
            html.setWidget(widget_name);
        });
        on_click('div[href],span[href]',function(){
            var href = $(this).attr('href');
            if ( app.isCordova() ) cordova.InAppBrowser.open(href, '_blank', 'location=no');
            else window.open(href);
        });

        on_click('[page-button]', callback.on_click_page);
        on_click('.menu-panel.toggle', callback.on_click_menu_panel);
        on_click('.reset', callback.on_click_reset);
        on_click('.content', callback.on_click_content);
        on_click(".post-button", callback.on_click_post_button);
        on_submit('form.login', callback.form_login);
        on_click('.logout-button', callback.on_click_logout_button);


        on_click('.setting-button', callback.on_click_setting_button);
        on_click('.change-server-button', callback.on_click_change_server_button);



        on_submit('form.post-write-form', callback.post_form_submit);
        on_submit('form.comment-write-form', callback.comment_form_submit);
        on_submit('form.post-edit-form', callback.edit_form_submit);
        on_submit('form.member-register-form', callback.member_register_submit);



        on_click('.reply-button', callback.on_click_reply_button);
        on_click('.like-button', callback.on_click_like_button);
        on_click('.report-button', callback.on_click_report_button);

        on_click('.file-upload-button', callback.on_click_file_upload_button);
        on_click('.post-edit-button', callback.on_click_post_edit_button);
        on_click('.photo-delete-button', callback.on_click_photo_delete_button);
        on_click('.post-delete-button', callback.on_click_post_delete_button);

        on_click('.post-edit .cancel-button', callback.on_click_post_edit_cancel_button);
		//added by benjamin
        on_click('form.post-write-form textarea[name="content"]', callback.on_click_post_edit_textarea);
		on_click('form.comment-write-form textarea[name="content"]', callback.on_click_post_edit_comment_textarea);
		on_click('.post .photos > img, .modalImage .arrow', callback.on_click_post_photos_img);//also used by arrow of modalWindow > modalImage
		on_click('.modalWindow', callback.on_click_modal_window);

        on_click('.point-ads-title', function(){
            $(this).next().show();
        });

        on_click('.message-button', function() {
            if ( typeof server_version == 'function' ) {

            }
            else {
                alert("인터넷 연결을 해 주십시오.");
            }
        });


        //
        on_click('[post-view]', callback.on_click_post_view);

        on_click('[open-post-id]', function(){
            var id = $(this).attr('open-post-id');
            html.setContent('');
            app.setCurrentForum(id);
            endless_reset(app.url_server_forum() + id, function(re) {
                post.add_endless_container();
                post.display_posts(re);
            });
        });

        /**
         * 2016-03-14 더보기 버튼을 옵션 처리
         */
        if ( post.isOpenList() ) {
            on_click('.show-more-comment', function() {
                var $this = $(this);
                var root = $this.attr('idx-root');
                $(".comment[idx-root='"+root+"']").show();
                $this.hide();
            });
            on_click('.show-more-post-content-button', function() {
                $(this).parents('.post').find('.show-more-post-content').css('display', 'inline');
                $(this).remove();
            });
        }
        else {
            on_click('.post-info[idx-root]', function() {
                var $this = $(this);
                var idx = $this.attr('idx-root');
                $(".post-detail[idx-root='"+idx+"']").show();
            });
        }


        /**
         *
         * page scroll 이 되면 0.3 초 마다 한번씩 이벤트를 발생시킨다.
         *
         */
        var lazyScroll = _.debounce(pageScrolled, 100);
        $(document).scroll(lazyScroll);
        function pageScrolled() {
            var top = $(document).scrollTop();
            if ( top < 100 ) {
                $("#cse").show();
                el.header().css('background-color', 'white');
            }
            else {
                $("#cse").hide();
                el.header().css('background-color', 'transparent');
            }
        }
    },
    setCurrentForum : function (post_id) {
        element.post_button().attr('post-id', post_id);
    },
    getCurrentForum : function () {
        return element.post_button().attr('post-id');
    },
    /**
     * browser platform 의 경우에는 그냥 confirm 으로 한다.
     * @param message
     * @param callback
     * @param title
     * @param lables
     */
    confirmUpload : function (message, callback, title, lables) {
        if ( this.isBrowser() || this.isDesktop() ) {
            var re = confirm(message);
            if ( re ) callback();
        }
        else {
            navigator.notification.confirm(message, callback, title, lables);
        }
    },





    vibrate : function ( time ) {
        if ( this.isCordova() ) navigator.vibrate(time);
    },

    /**
     *
     app.confirm('안녕하십니까?', function(re){
        app.alert('re:' + re);
    });

     * @param str
     */
    alert : function (str) {

        bootbox.dialog( {
            title : app.getTitle(),
            message : str,
            buttons : {
                success : {
                    label : '확인'
                }
            }
        }, function() {
            //console.log('app.alert clicked');
        });
    },
    confirm : function (str, callback, label_yes, label_no) {
        if ( typeof label_yes == 'undefined' ) label_yes = '예';
        if ( typeof label_no == 'undefined' ) label_no = '아니오';
        bootbox.confirm( {
                message : str,
                buttons : {
                    cancel : {
                        'label' : label_no
                    },
                    confirm : {
                        label : label_yes
                    }
                },
                callback : function(re) {
                    callback(re);
                }
            }
        );
    },
    selectDialog : function ( message, labels, callback ) {
        bootbox.dialog({
            message: message,
            title: app.getTitle(),
            buttons: {
                success: {
                    label: labels[0],
                    className: "btn-success",
                    callback: function() {
                        callback(1)
                    }
                },
                danger: {
                    label:  labels[1],
                    className: "btn-danger",
                    callback: function() {
                        callback(2);
                    }
                },
                main: {
                    label:  labels[2],
                    className: "btn-primary",
                    callback: function() {
                        callback(3);
                    }
                }
            }
        });
    },
    getDataURL : function ( idx ) {
        if ( idx ) return '' +
            app.getServerURL() +
            'data/upload/' +
            s.chars(idx).pop() +
            '/' + idx;
        else return '';
    },
	//added by benjamin modal window
	createModalWindowWithImage : function( idx ){
		if( !element.modal_window().length ) element.body().append( html.modalWindow );
		element.body().css('overflow','hidden');//disable browser scrolling
		document.ontouchmove = function(e){ e.preventDefault(); }//disable mobile scrolling
		total_images = $(".post .photos img[idx='" + idx + "']").parent().find("img").length;
		if( $(".modalImage[idx='" + idx + "']").length ){
			$(".modalImage").hide();
			$(".modalImage[idx='" + idx + "']").show();
		}
		else{
			$(".modalImage").hide();
			if ( total_images > 1 ) add_arrow = true;
			else add_arrow = false;
			modalImage = html.modalImage( idx, $(".post .photos img[idx='" + idx + "']").attr("org"), add_arrow );
			element.modal_window().append( modalImage );
			$(".modalImage[idx='" + idx + "'] img").load( function(){
				//console.log( idx );
				app.modalWindowAdjustImage( idx );
			});
		}
	},
	//adjusting the photo size to look better
	modalWindowAdjustImage : function( idx ){
		//console.log("adjust");
		var $selector = $(".modalImage[idx='" + idx + "'] img");
		var window_width = $(window).width();
		var window_height = $(window).height();

		if( $selector.height() >= $selector.width() ) {
			$selector.css('width','initial').css('height',$(window).height());
			if( $selector.width() > $(window).width() ) $selector.css('max-width','100%').css('height','initial');
		}
		else if( $selector.width() >= $selector.height() ){
			$selector.css('height','initial').css('max-width','100%');
			if( $selector.height() > $(window).height() ) $selector.css('height', ( $(window).height() ) ).css('width','initial');
		}

		var margin_top = window_height/2 - $selector.height()/2;

		if( margin_top < 0 ) margin_top = 0;
		$selector.parent().css('margin-top',margin_top);//compatible for $(".modalWindow > .modalImage > img")
		$selector.css("display","block");
	}
	//^ added by benjamin modal window
    ,
    on_click_backbutton : function () {

        var top = $(window).scrollTop();
        if ( top == 0 ) {
            // close the app if the user is on main page.
        }
        else {
            app.goTop();
        }
    }
};
