var db;
var member;
var panel;
var note;
$(function(){

    //db.deleteAll();

    //check_update_version();
    html.setHeader();
    html.setFooter();
    html.setPanel();
    cache.showFront();
    //cache_update('front', 'freetalk');


    member.load();
    console.log(member.idx);

    console.log("server.js begins ...");
    note.post('server.js 를 로드하였습니다.');

    if ( app.offline() ) {
        note.post('인터넷을 연결 해 주십시오. Connect to Internet.', 'alert alert-warning');
    }

    //db.deleteAll(); // test.
    //initApp();
    //setTimeout(function(){ showPage('setting'); }, 600); // test
    //setTimeout(function(){ $('.page[page="news"]').click(); }, 700); // test : news page
    //setTimeout(function(){ $('.page[page="login"]').click(); }, 700); // test : login page
    //setTimeout(function(){ $('.page[page="info"]').click(); }, 1300); // test : info page
    //setTimeout(togglePanel, 300); // test : open panel-menu

    //setTimeout( function()  { panel.toggle(); }, 300 );

    setTimeout(function(){ html.showPostWriteForm('freetalk'); }, 300); // TEST SHOW Post Write Form

    app.initEvent();
});


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
    current_page_name : null,
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
    },
    setCurrentForum : function (post_id) {
        element.post_button().attr('post-id', post_id);
    },
    getCurrentForum : function () {
        return element.post_button().attr('post-id');
    }
};

member = {
    idx : null,
    id : '',
    name : '',
    session_id : '',
    login : function () {
        return this.idx;
    },
    unset : function () {
        this.idx = null;
        this.id = '';
        this.name = '';
        this.session_id = '';
    },
    load : function () {
        var v = db.get('idx_member');
        if ( v ) {
            member.idx = v;
            member.id = db.get('user_id');
            member.session_id = db.get('session_id');
            member.name = db.get('user_name');
        }
        else this.unset();
    },
    setLogin : function (id, re) {
        db.set('user_id', id);
        db.set('idx_member', re['idx_member']);
        db.set('session_id', re['session_id']);
        db.set('user_name', re['user_name']);
        member.idx = re['idx_member'];
        member.id = id;
        member.session_id = re['session_id'];
        member.name = re['user_name'];
    },
    setLogout : function () {
        db.delete('idx_member');
        db.delete('user_id');
        db.delete('session_id');
        db.delete('user_name');
        member.unset();
    }

};

var element = {
    body : function() {
        return $('body');
    },
    content:     function () {
        return $('.widget.content');
    },
    widget: function (name) {
        return $(".widget." + name);
    },
    header: function () {
        return $('header');
    },
    footer: function () {
        return $('footer');
    },
    panel: function () {
        return $('.widget.menu-panel');
    },
    note: function () {
        return $('.note');
    },
    post_write_form : function () {
        return $('.post-write-form');
    },
    post_list : function () {
        return $('.post-list');
    },
    post_button : function () {
        return $("footer .post-button");
    }
};

panel = {
    inHideProgress: false,
    get: function () {
        return element.panel();
    },
    open: function() {
        var r = parseInt(panel.get().css('right').replace('px', ''));
        var w = Math.abs(r);
        var open = w == 0;
        console.log('panel.open() : ' + open + ' width: ' + w);
        return open;
    },
    width: function() {
        return this.get().width();
    },
    toggle: function () {
        console.log('panel.toggle()');
        var w ;
        if ( this.open() ) w = - this.width();
        else w = 0;
        console.log(w);
        this.get().velocity({
            right: w
        }, function(){
            console.log("toggle panel complete...!")
        });
    },
    close: function() {
        if ( this.inHideProgress ) return;
        if ( this.open() ) {
            console.log('panel.close() : is going to hide panel.');
            this.inHideProgress = true;
            this.get().velocity({
                right: - panel.width()
            }, function() {
                panel.inHideProgress = false;
            });
        }
    }
};

/**
 * -------------------------------- Notification, note() ----------------------
 */

note = {
    timer: 0,
    get: function() {
        return element.note();
    },
    post: function (message, cls) {
        this.get().show();
        this.get().append("<div class='row "+cls+"'>"+message+"</div>").show();
        if ( note.timer ) {
            clearTimeout(note.timer);
        }
        this.timer = setTimeout(function() {
            note.clear();
            note.hide();
        }, 1500);
    },
    clear: function() {
        element.note().html('');
    },
    hide: function() {
        this.clear();
        this.get().hide();
    }
};

/**
 * ============================= DATABASE FUNCTIONS =========================
 */
/**
 *
 *
 *
 * @type {db}
 *
 *
 * @code
 *
 db.set('title', 'This is test');
 console.log( db.get('title') );
 console.log( db.getRecord('title') );
 db.set('title', 'Test 2');
 console.log( db.getRecord('title') );
 console.log( db.get('No Key') == null );
 console.log( db.getRecord('No Key') );
 * @endcode
 *
 */
db = new function() {
    this.set = function ( key, value ) {
        localStorage.setItem(key, value);
    };

    this.get = function ( key ) {
        return localStorage.getItem(key);
    };

    /*
    this.getRecord = function ( key ) {
        var value = db.get(key);
        if ( value ) {
            var stamp = localStorage.getItem(key + '.stamp');
            return {
                'key' : key,
                'value' : value,
                'stamp' : stamp
            }
        }
        else return null;
    };
    */

    /*
    this.save = function( key, value ) {
        db.set(key, value);
        db.set(key + '.length', value.length);
        db.set(key + '.stamp', new Date().getTime());
    };
    */

    this.delete = function ( key ) {
        localStorage.removeItem(key);
    };

    /**
     * Deletes all keys in localStorage
     */
    this.deleteAll = function () {
        for (var k in localStorage) {
            if (localStorage.hasOwnProperty(k)) {
                db.delete(k);
            }
        }
    };

    /**
     * @short returns the whole localStorage
     * @returns {Storage}
     */
    /*
    this.getAll = function () {
        return localStorage;
    };
    */

    /**
     * @short Check if the web storage is availble.
     */

    if ( typeof(Storage) === "undefined") {
        alert("Fatal Error : Web Storage is not supported in this web/app/platform");
    }

};
function save_widget(key, re) {
    db.set(key, re.html);
    db.set(key + '.length', re['length']);
    db.set(key + '.stamp', new Date().getTime());
    db.set(key + '.md5', re['md5']);
}
function save_page(key, re) {
    save_widget(key, re);
}


/**
 *
 *
 * ------------------------------ Debug Function
 */
var debug = {
    mode : false,
    start: function() {
        this.mode = true;
    },
    stop: function() {
        this.mode = false;
    },
    string : function() {
        return new Date().getTime().toString();
    }
};

/**
 * -------------------------- ETC Function, Helper functions
 */


var etc = {
    /**
     * Unique 32 bytes.
     * @param id
     * @returns {string}
     */
    unique_id : function (id) {
        var uid='';
        if ( id ) uid = id;
        var date_string = (new Date()).getTime().toString().substring(6);
        uid = uid + date_string;
        if ( uid.length > 32 ) {
            uid = uid.substring(0, 31);
        }
        else {
            var more_length = 32 - uid.length - 1;
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var random = _.sample(possible, more_length).join('');
            uid = uid + random;
        }
        return uid;
    }
};

/**
 * ============================== AJAX Loading Function ========================
 *
 *
 *
 * @param url       - must be GET URI
 * @param callback
 * @param html
 */
function ajax_load(url, callback, html) {
    if ( member.login() ) {
        if ( url.indexOf('?') == -1 ) url += '?';
        else url += '&';
        url += 'idx_member=' + member.id + '&session_id=' + member.session_id;
    }
    console.log(url);
    $.ajax({
        url:url,
        cache: false,
        success: function(data) {
            //console.log(data);
            if ( html ) return callback(data);
            var re;
            try {
                re = $.parseJSON(data);
            }
            catch ( e ) {
                return alert("Ajax_load() : catched an error. It might be an internal server error or callback error.");
            }
            /**
             * It must be here. It must not be in try {}
             */
            if ( typeof callback == 'function' ) callback(re);
        },
        error: function(xhr, type){
            alert("Ajax load error");
            console.log(type);
            console.log(xhr);
        }
    });
}
/**
 *                      ----- Ajax submit in POST method -----
 * @param url
 * @param data
 * @param callback
 */
function ajax_load_post(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function(data){
            var re;
            try {
                re = $.parseJSON(data);
            }
            catch ( e ) {
                return alert("Ajax_load_post() : catched an error. It might be an internal server error.");
            }
            callback(re);
        }
    });
}

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
        m += '      <span class="navbar-text page text-button glyphicon glyphicon-home" data-content-page="front"></span>';
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
        m += '  <li data-content-page="freetalk" data-post-id="freetalk">Talk</span></li>';
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
    showPostWriteForm : function  (post_id) {
        element.content().prepend(html.post_write_form(post_id));
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
        m += "<form class='post-write-form' action='"+url_server+"'>";
        m += "  <input type='hidden' name='idx_member' value='"+member.idx+"'>";
        m += "  <input type='hidden' name='session_id' value='"+member.session_id+"'>";
        m += "  <input type='hidden' name='gid' value='"+gid+"'>";
        m += "  <input type='hidden' name='module' value='ajax'>";
        m += "  <input type='hidden' name='action' value='post_write_submit'>";
        m += "  <div class='content'><textarea name='content'></textarea></div>";

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
        m += '  <div class="file"><input type="file" name="file"></div>';
        m += "  <div class='submit'><input type='submit'></div>";
        m += "</form>";
        m += '<div class="post-write-form-photos"></div>';
        return m;
    },
    post_render : function (p) {
        //console.log('get_post_render(p)');
        if (_.isEmpty(p) ) return;
        //console.log('creating DOM');
        var m = '';

        //console.log( p );

        date = new Date( p['stamp'] * 1000 );
        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();
        //var hours = date.getHours();
        //var minutes = "0" + date.getMinutes();
        //var seconds = "0" + date.getSeconds();
        var date = month + " " + day + "," + year; //hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);


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
        m += '      <li><a href="#">More Menu 1</a></li>';
        m += '      <li><a href="#">More Menu 2</a></li>';
        m += '  </ul>';
        m += '</div>';

        m += '<div class="media post-info">';
        m += '  <a class="media-left" href="#">';
        m += '      <img class="media-object profile-image" src="img/no_primary_photo.png" alt="Generic placeholder image">';
        m += '  </a>';
        m += '  <div class="media-body">';
        m += '      <div class="name">'+p['user_name']+'<img class="send-message" src="img/post/mail.png"/></div>';
        m += '      <div class="date">' + date + '<span class="separator">|</span>HUMAN TIMING</div>';
        m += '      <div class="location">Lives in Philippines<span class="separator">|</span>xx Fans</div>';
        m += '  </div>';
        m += '</div>';

        if ( !_.isEmpty(p['subject']) ) {
            //m += '<h3 class="subject">' + p['subject'] + '</h3>';
        }
        var no_of_comment, likes;
        if ( p['content'] ) m += '<div class="content">' + p['content'] + '</div>';
        if ( p['photos'] ) m += p['photos'];
        if( p['good'] > 0 ) likes = p['good'];
        else likes = '';
        if( p['no_of_comment'] > 0 ) no_of_comment = p['no_of_comment'];
        else no_of_comment = '';

        m += '<ul class="nav nav-pills post-menu-philzine-bottom">';
        m += '  <li class="like"><img src="img/post/like.png"/> Like <span class="no">' + likes + '</span></li>';
        m += '  <li class="reply"><img src="img/post/comment.png"/>Comment ' + no_of_comment + '</li>';
        m += '</ul>';

        m = '<div class="post">' + m + '</div>';
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


var cache = {
    content : function (page, post_id) {
        this.update(page, post_id);
        // element.content().html(db.get( 'front' ));
    },
    showFront : function () {
        cache.content('front', 'freetalk');
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
     * @param name
     * @param post_id
     */
    update : function (name, post_id) {
        console.log( "cache_update:" + name );
        html.setContent( db.get( name ), name );
        var url_widget = app.url_server_widget + name;
        ajax_load(url_widget, function(re){
            if ( re.html ) {
                save_page( name, re );
                app.setCurrentPage(name);
                html.setContent(re.html, name);
                note.post(name + ' 페이지를 로드하였습니다.');
                app.setCurrentForum(post_id);
                if ( post_id ) endless_reset(post_id);
            }
        });
    }
};


var callback = {
    on_click_page : function () {
        var $this = $(this);
        var page = $this.attr('data-content-page');
        var post_id = $this.attr('data-post-id');
        console.log('on_click_page() : ' + page);
        if ( app.offline() && $this.hasClass('check-online') ) {
            alert(page + " 페이지를 보기 위해서는 인터넷에 연결을 해 주세요. Please connect to Internet.");
            return;
        }
        if ( page == 'login' ) {
            html.setContent( html.login_form(), 'login' );
        }
        else {
            cache.update(page, post_id);
        }
    },
    on_click_content: function () {
        panel.close();
    },
    form_login : function () {
        console.log('ajax_login() member.idx:'+member.idx);
        var $this = $(this);
        var id = $this.find('[name="id"]').val();
        var url = app.url_server_login + '&id=' + id;
        url += '&password=' + $this.find('[name="password"]').val();
        ajax_load( url, function(re) {
            console.log(re);
            if ( re.code == 504 ) alert('아이디를 입력하십시오.');
            else if ( re.code == 503 ) alert('비밀번호를 입력하십시오.');
            else if ( re.code == 502 ) alert('아이디를 찾을 수 없습니다.');
            else if ( re.code == 501 ) alert('비밀번호가 틀렸습니다. Wrong password.');
            else {
                console.log("login success!");
                console.log(re);
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
        console.log('on_click_reset()');
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
    on_click_menu_panel : function () {
        panel.toggle();
    },
    post_form_submit : function (e) {
        e.preventDefault();
        ajax_load_post(url_server, $(this).serialize(), function(data){
            element.post_write_form().remove();
            element.content().prepend(html.post_render(data.post));
        });
        return false;
    }
};

/**
 * ----------------------------------- Event Handlers ------------------------------
 * @param selector
 * @param callback
 */
function on_click(selector, callback) {
    element.body().on('click', selector, callback);
}
function on_submit(selector, callback) {
    element.body().on('submit', selector, callback);
}

/*
function check_update_version() {
//
    setTimeout(check_version,1000); // fire after 1 seconds
    setTimeout(check_version,1000 * 60 * 1); // fire after 1 minutes.
    setInterval(check_version, 1000 * 60 * 60 * 2);
    function check_version(){
        ajax_load(url_server + '?module=ajax&action=version&submit=1', function(re){
            console.log(re);
            db.set('url_css_bootstrap', re['url_css_bootstrap']);
            db.set('url_js_bootstrap', re['url_js_bootstrap']);
            if ( typeof update_version == 'function' ) update_version(re.version);
        });
    }
}
*/

/** =============== ENDLESS page loading =============== */

var endless_api = '';
var endless_scroll_count = 0;
var endless_no_more_content = false;
var endless_in_loading = false;
function endless_load_more_update(re) {
    //console.log(re);
    if (_.isEmpty(re['posts']) ) {
        endless_no_more_content = true;
        endless_hide_loader();
        endless_show_no_more_content();
    }
    else {
        var site = re['site'];
        var post_id = re['post_id'];
        var page_no = re['page_no'];
        note.post(site + ' 사이트 : ' + post_id + '의 ' + page_no + " 페이지 내용이 추가되었습니다.");
        var posts = re['posts'];
        for ( var i in posts ) {
            if (posts.hasOwnProperty(i)) {
                endless_hide_loader();
                element.post_list().append(html.post_render(posts[i]));
            }
        }
    }
    endless_in_loading = false;
}
/**
 * 리셋을 하면 첫 페이지를 바로 보여준다.
 * @param post_id
 */
function endless_reset(post_id) {
    var url = app.url_server_forum + post_id;
    //console.log('endless_reset('+url+')');
    endless_api = url + '&page_no=';
    endless_scroll_count = 1;
    endless_no_more_content = false;
    endless_in_loading = false;
    var url_endless = endless_api + endless_scroll_count;
    ajax_load( url_endless, endless_load_more_update);
}
(function endless_run() {
    var $window = jQuery(window);
    var $document = $(document);
    var endless_distance = 400; // how far is the distance from bottom to get new page.
    $document.scroll(endless_load_more);
    function endless_load_more() {
        // console.log('endless_load_more(e) : ');
        if ( ! endless_api ) return console.log("no endless_api");
        if ( endless_no_more_content ) return console.log("no more content. return.");
        if ( endless_in_loading ) return console.log("endless is in loading page.");
        var top = $document.height() - $window.height() - endless_distance;
        if ($window.scrollTop() >= top) {
            endless_scroll_count ++;
            console.log("endless_listen_scroll():: count:" + endless_scroll_count);
            endless_in_loading = true;
            endless_show_loader();
            ajax_load( endless_api + endless_scroll_count, endless_load_more_update);
        }
    }
})();
function endless_hide_loader() {
    //console.log("endless_hide_load()");
    var $loader = $('.endless-loader');
    if ( $loader.length ) $loader.remove();
}
function endless_show_loader() {
    console.log("endless_show_load()");
    var markup = "<div class='endless-loader'><img src='img/loader/loader9.gif'></div>";
    element.post_list().append(markup);
}
function endless_show_no_more_content() {
    console.log("endless_show_no_more_content");
    var text = 'No more content ........... !';
    element.post_list().after("<div class='no-more-content'>"+text+"</div>");
}
/* ============================== EO Endless page loading ... ================================ */
