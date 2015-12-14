var timer_notification;
function note(message, cls) {
    notification().append("<div class='note "+cls+"'>"+message+"</div>").show();
    if ( timer_notification ) {
        clearTimeout(timer_notification);
        timer_notification = false;
    }
    timer_notification = setTimeout(function() {
        note_clear();
        notification().hide();
    }, 1500);
}
function note_clear() {
    notification().html('');
}
function note_reset(message, cls) {
    note_clear();
    note(message, cls);
}
