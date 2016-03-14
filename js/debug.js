
/**
 *
 *
 * ------------------------------ Debug Function
 */
var debug = {
    mode : false,
    browser_camera_upload : false,
    start: function() {
        console.log("Debug mode set true");
        this.mode = true;
    },
    stop: function() {
        console.log("Debug mode set false");
        this.mode = false;
    },
    started : function () {
        return this.mode;
    },
    not_started : function () {
        return ! this.started();
    },
    string : function() {
        return new Date().getTime().toString();
    },
    url: function(url, data) {
        return url + '?' + data;
    }
};