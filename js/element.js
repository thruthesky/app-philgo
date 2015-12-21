
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
    post : function (idx) {
        return $("[data-idx-post='"+idx+"']");
    },
    post_button : function () {
        return $("footer .post-button");
    },
    comment_write_form : function (idx_parent) {
        return $(".comment-write-form[data-idx-parent='"+idx_parent+"']");
    }
};
