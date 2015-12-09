/**
 *
 * @file client.js
 * @desc This is the starter script.
 *
 *
 */
/**
 * #buildguide
 * @var current_page_name
 * @type {null}
 */
var current_page_name = null;
$(function(){
    initApp();

    db.deleteAll(); // test.
    setTimeout(function(){ showPage('setting'); }, 600); // test
    //setTimeout(togglePanel, 300); // test : open panel-menu
});



/**
 * @Attention Use this function to set content on '.content'.
 *      - it does extra tasks.
 * @param html
 */
function setContent(html, page) {
    console.log('setContent(...,' + page + ')');
    if ( isPanelOpen() ) hidePanel();
    content().html(html).attr('widget', page);
}


/**
 *
 * =============== STATE FUNCTIONS ===================
 */
/**
 * =============== Action Functions =================
 */