/**
 *
 * App class object
 *
 */
var app = {
    version : '51219', // 년 1자리, 월2자리, 일 2자리
    url_server_widget : url_server + '?module=ajax&action=widget&submit=1&name=',
    url_server_forum : url_server + '?module=ajax&action=post-list&submit=1&post_id=',
    url_server_login : url_server + '?module=ajax&action=login&submit=1',
    //url_server_javascript_update : cordova.file.applicationDirectory + 'index.html',//url_server + '?module=ajax&action=update-javascript&submit=1',
    current_page_name : null,
    addEventDeviceReady : function(callback) {
        trace('app.isCordova():' + app.isCordova());
        function onDeviceReady() {
            trace('onDeviceReady()');
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
        return !!window.cordova;
    },
    model : function() {
        if ( this.isCordova() ) return device.model;
        else return 'desktop';
    },
    platform : function() {
        if ( this.isCordova() ) return device.platform;
        else return 'desktop';
    },
    isBrowser : function() {
        return this.platform() == 'browser';
    },
    isDesktop : function() {
        return this.platform() == 'desktop';
    },
    isMobile : function () {
        if ( this.isBrowser() ) return false;
        else if ( this.isDesktop() ) return false;
        else return true;
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
    initEvent : function() {
        on_click('[data-content-page]', callback.on_click_page);
        on_click('.menu-panel.toggle', callback.on_click_menu_panel);
        on_click('.reset', callback.on_click_reset);
        on_click('.content', callback.on_click_content);
        on_click("footer .post-button", callback.on_click_post_button);
        on_submit('form.login', callback.form_login);
        on_click('.logout-button', callback.on_click_logout_button);

        on_submit('form.post-write-form', callback.post_form_submit);
        on_submit('form.comment-write-form', callback.comment_form_submit);


        on_click('.reply-button', callback.on_click_reply_button);

        on_click('.file-upload-button', callback.on_click_file_upload_button);
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
    }
};
