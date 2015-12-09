
function isPanelOpen() {
    return panel().css('display') != 'none';
}


function togglePanel(){
    $(".widget.panel-menu").animate({
        width: "toggle"
    }, function(){

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
    console.log('hidePanel()');
    if ( inProgressHidePanel ) return;
    if ( isPanelOpen() ) {
        inProgressHidePanel = true;
        $(".widget.panel-menu").animate({
            width: "toggle"
        }, function() {
            inProgressHidePanel = false;
        });
    }
}
