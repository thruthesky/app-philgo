function note(message, cls) {
    notification().append("<div class='note "+cls+"'>"+message+"</div>");
}
function note_clear() {
    notification().html('');
}