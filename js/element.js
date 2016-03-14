
var element = {
    body : function() {
        return $('body');
    },
    content:     function () {
        return $('.widget.content');
    },
    content_wrapper:     function () {
        return $('section.content-wrapper');
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
    post : function (idx) {
        return $(".post[idx='"+idx+"']");
    },
    post_button : function () {
        return $("footer .post-button");
    },
    comment_write_form : function (idx_parent) {
        return $(".comment-write-form[data-idx-parent='"+idx_parent+"']");
    },
    page_button : function ( page_name ) {
        return $("[page-button='"+page_name+"']");
    },
    post_edit : function ( idx ) {
        return $('.post-edit[idx="'+idx+'"]');
    },
    photos : function ( idx ) {
        return $('.photos[idx="'+idx+'"]');
    },
    primary_photo : function () {
        return $('img.primary-photo');
    },
	//added by benjamin
	modal_window : function () {
        return $('.modalWindow');
    },
    place_post_view : function () {
        return $('section.place-post-view');
    }
};
var el = element;