/**
 *
 * @file client.js
 * @desc This is the starter script.
 *
 *
 */
/**
 * #buildguide
 *
 */
//

var current_page_name = null;
$do_not_use_server_header_footer_template = false;


$(function(){


    //db.deleteAll();

    check_update_version();
    html.setHeader();
    html.setFooter();
    html.setPanel();
    front_show();


    //header_show();
    //footer_show();
    //panel_menu_content_load();

    do_not_use_server_header_footer_template();



    //db.deleteAll(); // test.
    //initApp();
    //setTimeout(function(){ showPage('setting'); }, 600); // test
    //setTimeout(function(){ $('.page[page="news"]').click(); }, 700); // test : news page
    //setTimeout(function(){ $('.page[page="login"]').click(); }, 700); // test : login page
    //setTimeout(function(){ $('.page[page="info"]').click(); }, 1300); // test : info page
    //setTimeout(togglePanel, 300); // test : open panel-menu

    //setTimeout( function()  { panel.toggle(); }, 300 );


    // setTimeout(function(){ show_post_write_form('freetalk'); }, 500); // TEST SHOW Post Write Form


    /** Event Handlers */
    on_click('.page[page]', on_click_page);
    on_click('.menu-panel.toggle', on_click_menu_panel);
});


/**
 *
 * App class object
 *
 */
var app = {
    current_page_name : null,
    getCurrentPage: function () {
        return current_page_name;
    },
    setCurrentPage: function (page) {
        app.current_page_name = page;
    },
    online : function() {
        return true;
    },
    offline : function() {
        return ! this.online();
    },
    goTop : function() {
        scrollTo(0,0);
    }
};

var member = {
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
    }
};

var panel = {
    inHideProgress: false,
    get: function () {
        return element.panel();
    },
    open: function() {
        var w = parseInt(Math.abs(this.get().css('right').replace('px', '')));
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

var note = {
    timer: false,
    get: function() {
        return element.note();
    },
    post: function (message, cls) {
        this.get().show();
        this.get().append("<div class='row "+cls+"'>"+message+"</div>").show();
        if ( this.timer ) {
            clearTimeout(this.timer);
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
var db = new function() {
    this.type = 'WebStorage';
    this.author = 'JaeHo Song';
    this.email = 'thruthesky@gmail.com';
    /**
     *
     *
     * @returns {string}
     *
     *
     * @code
     * alert ( this.info() );
     * @endcode
     */
    this.info = function() {
        return this.type + ' ' + this.author + ' ' + this.email;
    };

    this.set = function ( key, value ) {
        localStorage.setItem(key, value);
    };

    this.get = function ( key ) {
        return localStorage.getItem(key);
    };

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

    this.save = function( key, value ) {
        db.set(key, value);
        db.set(key + '.length', value.length);
        db.set(key + '.stamp', new Date().getTime());
    };

    this.delete = function ( key ) {
        localStorage.removeItem(key);
    };

    /**
     * Deletes all keys in localStorage
     */
    this.deleteAll = function () {
        for (var key in localStorage) {
            db.delete(key);
        }
    };

    /**
     * @short returns the whole localStorage
     * @returns {Storage}
     */
    this.getAll = function () {
        return localStorage;
    };

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
        uid += date_string;
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
    header : function() {
        var m = '';
        m += '<nav class="navbar navbar-default top">';
        m += '  <div class="container-fluid">';
        m += '      <span class="navbar-text page text-button glyphicon glyphicon-home" page="front"></span>';
        m += '      <span class="navbar-text logo">LOGO</span>';
        m += '      <span class="navbar-text navbar-right page text-button glyphicon glyphicon-th-list menu-panel toggle"></span>';
        m += '  </div>';
        m += '</nav>';
        m += '<ul class="nav nav-pills nav-justified bottom">';
        m += '  <li><span class="text-button page" page="news" post_id="freetalk">News</span></li>';
        m += '  <li><span class="text-button page" page="info" post_id="qna">Info</span></li>';
        m += '  <li><span class="text-button page" page="company">Company</span></li>';
        m += '  <li><span class="text-button page" page="travel">Travel</span></li>';
        m += '  <li><span class="text-button page" page="photo">QnA</span></li>';
        m += '  <li><span class="text-button page" page="philgo-board">Talk</span></li>';
        m += '  <li><span class="text-button page" page="menu-all">More</span></li>';
        m += '</ul>';
        return m;
    },
    footer : function() {
        var m = '';
        m += '<ul class="nav nav-pills nav-justified bottom">';
        m += '  <li><span class="text-button page" page="profile"><span class="glyphicon glyphicon-user"></span>Profile</span></li>';
        m += '  <li><span class="text-button page" page="message"><span class="glyphicon glyphicon-envelope"></span>Message</span></li>';
        m += '  <li><span class="text-button page" page="search"><span class="glyphicon glyphicon-search"></span>Search</span></li>';
        m += '  <li class="post-button" post-id=""><span class="text-button"><span class="glyphicon glyphicon-pencil"></span>Post</span></li>';
        m += '  <li><span class="text-button page" page="setting"><span class="glyphicon glyphicon-wrench"></span>Setting</span></li>';
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
        m += '      <li><div class="list-group-item text-button page" page="login">로그인 login<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item text-button page" page="register">회원가입 register<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item text-button page" page="admin">운영자 요청/건의 inquery<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item text-button page" page="menu-all">전체메뉴 all-menu<span class="glyphicon glyphicon-menu-right"></span></div></li>';
        m += '      <li><div class="list-group-item text-button page" page="setting">Settings<span class="glyphicon glyphicon-menu-right"></span></li>';
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
    }
};


/**
 * ----------------------------------- Event Handlers ------------------------------
 * @param selector
 * @param callback
 */
function on_click(selector, callback) {
    $('body').on('click', selector, callback);
}


/**
 * #buildguide on_click_page
 */
function on_click_page() {
    if ( typeof on_click_page_server == 'function' ) return on_click_page_server($(this));
    else element.content().html( db.get( $(this).attr('page') ) );
}


/**
 *
 * @returns {*}
 */
function on_click_menu_panel() {
    if ( typeof on_click_menu_panel_server == 'function' && on_click_menu_panel_server() ) return;
    //togglePanel();
    panel.toggle();
}



/**
 * @note This let you to use local 'widget' folder html files only.
 * @usage Use this function when you want to debug or build.
 */
function do_not_use_server_header_footer_template() {
    $do_not_use_server_header_footer_template = true;
    db.delete('header');
    db.delete('footer');
    db.delete('menu-panel');
}

/*
function header_show() {
    //element.header().html( html.header() );
    //set_cache_data_or_load_page('header', element.header());
}

function footer_show() {
    element.footer().html( html.footer() );
    //set_cache_data_or_load_page('footer', element.footer());
}

function panel_menu_content_load() {
    set_cache_data_or_load_page('menu-panel', element.panel());
}

 */

/**
 * - first, it looks up for the cached HTML markup from database.
 * - second, IF cached HTML does not exists, it load HTML markup from page folder.
 * @param cache_key
 * @param $obj
 * @returns {*}
 */
function set_cache_data_or_load_page(cache_key, $obj) {
    var m = db.get(cache_key);
    if ( !_.isEmpty(m) ) return $obj.html(m);
    ajax_load('widget/'+cache_key+'.html', function(re){
        $obj.html(re);
    }, true);
}


/**
 * Show cached front
 */
function front_show() {
    element.content().html(db.get( 'front' ));
}

function check_update_version() {
    /**
     * Check version every two hours.
     */
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

