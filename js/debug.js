
/**
 *
 *
 * ------------------------------ Debug Function
 */
var debug = {
    mode : false,
    browser_camera_upload : false,
    start: function() {
        this.mode = true;
    },
    stop: function() {
        this.mode = false;
    },
    string : function() {
        return new Date().getTime().toString();
    },
    url: function(url, data) {
        return url + '?' + data;
    }
};