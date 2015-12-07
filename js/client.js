/**
 *
 * 이미지는 따로 다운로드 해서 base64 로 저장?
 * @type {null}
 *
 */
var current_page_name = null;
$(function(){
    initApp();
    showPage('front');
    cache_update_run();
});


function showPage(page) {
    setCurrentPage(page);
    setContent( db.get( getCurrentPage()) );
}


/**
 * @Attention Use this function to set content on '.content'.
 *      - it does extra tasks.
 * @param html
 */
function setContent(html) {
    if ( isPanelOpen() ) hidePanel();
    content().html(html);
}


/**
 *
 * =============== STATE FUNCTIONS ===================
 */
function isPanelOpen() {
    return panel().css('display') != 'none';
}