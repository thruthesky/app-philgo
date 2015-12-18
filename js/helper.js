var timer_notification;
var _defaultMode = false;
function debugMode(b) {
    _debugMode = b;
}
function debugString() {
    return new Date().getTime().toString();
}
function note(message, cls) {
    element.notification().append("<div class='note "+cls+"'>"+message+"</div>").show();
    if ( timer_notification ) {
        clearTimeout(timer_notification);
        timer_notification = false;
    }
    timer_notification = setTimeout(function() {
        note_clear();
        element.notification().hide();
    }, 1500);
}
function note_clear() {
    element.notification().html('');
}
function note_reset(message, cls) {
    note_clear();
    note(message, cls);
}


/**
 * Unique 32 bytes.
 * @param id
 * @returns {string}
 */
function unique_id(id) {
    var uid='';
    if ( id ) uid = id;
    var time = (new Date()).getTime().toString().substring(6);
    uid += time;
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



function goTop() {
    scrollTo(0,0);
}
