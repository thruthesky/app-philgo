/**
 * -------------------------------- Notification, note() ----------------------
 */

var note = {
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
        }, 2500);
    },
    clear: function() {
        element.note().html('');
    },
    hide: function() {
        this.clear();
        this.get().hide();
    }
};
