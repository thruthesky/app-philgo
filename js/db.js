/**
 * ============================= DATABASE FUNCTIONS =========================
 */
/**
 *
 *
 *
 * @type {db}
 *
 *
 * @code
 *
 db.set('title', 'This is test');
 console.log( db.get('title') );
 console.log( db.getRecord('title') );
 db.set('title', 'Test 2');
 console.log( db.getRecord('title') );
 console.log( db.get('No Key') == null );
 console.log( db.getRecord('No Key') );
 * @endcode
 *
 */
var db = new function() {
    this.set = function ( key, value ) {
        localStorage.setItem(key, value);
    };

    this.get = function ( key ) {
        return localStorage.getItem(key);
    };

    /*
     this.getRecord = function ( key ) {
     var value = db.get(key);
     if ( value ) {
     var stamp = localStorage.getItem(key + '.stamp');
     return {
     'key' : key,
     'value' : value,
     'stamp' : stamp
     }
     }
     else return null;
     };
     */

    /*
     this.save = function( key, value ) {
     db.set(key, value);
     db.set(key + '.length', value.length);
     db.set(key + '.stamp', new Date().getTime());
     };
     */

    this.delete = function ( key ) {
        localStorage.removeItem(key);
    };

    /**
     * Deletes all keys in localStorage
     */
    this.deleteAll = function () {
        for (var k in localStorage) {
            if (localStorage.hasOwnProperty(k)) {
                db.delete(k);
            }
        }
    };

    /**
     * @short returns the whole localStorage
     * @returns {Storage}
     */
    /*
     this.getAll = function () {
     return localStorage;
     };
     */

    /**
     * @short Check if the web storage is availble.
     */

    if ( typeof(Storage) === "undefined") {
        alert("Fatal Error : Web Storage is not supported in this web/app/platform");
    }

};
function save_widget(key, re) {
    db.set(key, re.html);
    db.set(key + '.length', re['length']);
    db.set(key + '.stamp', new Date().getTime());
    db.set(key + '.md5', re['md5']);
}
function save_page(key, re) {
    save_widget(key, re);
}

