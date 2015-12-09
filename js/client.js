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
    showPage('front');
});


/**
 * 현재 페이지를 보여준다.
 * @param page
 */
function showPage(page) {
    setCurrentPage(page);
    setContent( db.get( getCurrentPage()), page );
}


/**
 * @Attention Use this function to set content on '.content'.
 *      - it does extra tasks.
 * @param html
 */
function setContent(html, widget_name) {
    if ( isPanelOpen() ) hidePanel();
    content().html(html).attr('widget', widget_name);
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
 * 또는 페이지를 두번 클릭해도 마찬가지이다.
 * 그래서 아래와 같이 inProgressHidePanel 로 옵션 처리를 한다.
 */
var inProgressHidePanel = false;
function hidePanel() {
    if ( inProgressHidePanel ) return;
    if ( isPanelOpen() ) {
        inProgressHidePanel = true;
        $(".widget.panel").animate({
            width: "toggle"
        }, function() {
            inProgressHidePanel = false;
        });
    }
}
