/**
 *
 *
 *
 *
 *
 */
var current_page_name = null;
$(function(){
    initApp();
    showPage('front');
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

/**
 * =============== Action Functions =================
 */
function togglePanel(){
    $(".widget.panel").animate({
        width: "toggle"
    });
}
/**
 * 두번 연속으로 호출하면, 닫기는 것이 아니라, 닫고 열린다.
 * 예를 들면 메뉴를 클릭 할 때, 이것을 호출하고, 페이지를 클릭을 할 두번 연속 호출 될 수 잇다.
 */
function hidePanel() {
    if ( isPanelOpen() ) togglePanel();
}
