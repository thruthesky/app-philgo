var count_trace = 0;
function trace(data) {
    count_trace ++;
    console.log('[' + count_trace + '] ' + data);
}
function note(message, cls) {
    notification().append("<div class='note "+cls+"'>"+message+"</div>");
}
function note_clear() {
    notification().html('');
}