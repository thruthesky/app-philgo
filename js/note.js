/**
 * -------------------------------- Notification, note() ----------------------
 */

var note = {
    timer: 0,
    get: function() {
        return element.note();
    },
    post: function (message, cls, timeout) {
        this.get().show();
        if ( typeof cls == 'undefined' ) cls = '';
        this.get().append("<div class='row "+cls+"'>"+message+"</div>").show();
        if ( note.timer ) {
            clearTimeout(note.timer);
        }
        if ( ! timeout ) timeout = 5000;
        this.timer = setTimeout(function() {
            note.clear();
            note.hide();
        }, timeout);
    },
    clear: function() {
        element.note().html('');
    },
    hide: function() {
        this.clear();
        this.get().hide();
    }
};
