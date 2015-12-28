/**
 *
 * App class object
 *
 */
var app = {
    version : '0.12.01', // 년.월.일 로 Major.medium.minor 로 표시한다. 2015 년이 0 년.
    url_server : null,
    current_page_name : null,
    deviceReady : false,
    getVersion : function () {
        return this.version;
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
        if ( debug.mode ) url += new Date().getTime();
        return url;
    },
    getServerJavascriptURL : function () {
        var url = this.getServerURL() + 'module/ajax/server.js?version=' + this.getVersion();
        if ( debug.mode ) url += new Date().getTime();
        return url;
    },
    getHookJavascriptURL : function () {
        return this.getServerURL() + 'module/ajax/hook-js.php?time=' + new Date().getTime();
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
    addEventDeviceReady : function(callback) {
        trace('app.isCordova():' + app.isCordova());
        function onDeviceReady() {
            trace('onDeviceReady()');
            app.deviceReady = true;
            callback();
        }
        if ( app.isCordova() ) {
            trace("This app is running under cordova. Device is ready.");
            document.addEventListener("deviceready", onDeviceReady, false);
        }
        else {
            trace("This app is running under Desktop browser. Device is ready.");
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
        db.deleteAll();
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
    online : function() {
        return true;
    },
    offline : function() {
        return ! this.online();
    },
    goTop : function() {
        scrollTo(0,0);
    },
    init : function () {
        this.version = db.get('version');
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
            var widget_name = $this.attr('widget');
            app.setCurrentPage(widget_name);
            html.setWidget(widget_name);
        });

        on_click('[page-button]', callback.on_click_page);
        on_click('.menu-panel.toggle', callback.on_click_menu_panel);
        on_click('.reset', callback.on_click_reset);
        on_click('.content', callback.on_click_content);
        on_click("footer .post-button", callback.on_click_post_button);
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



        //
        on_click('[post-view]', callback.on_click_post_view);

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
    confirm : function (message, callback, title, lables) {
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
    alert : function (str) {
        if ( navigator.notification ) {
            navigator.notification.alert(
                str,
                function(){},
                '필리핀 매거진',
                '확인'
            );
        }
        else alert(str);
    },
    getDataURL : function ( idx ) {
        return '' +
            app.getServerURL() +
            'data/upload/' +
            s.chars(idx).pop() +
            '/' + idx;
    }
};
