var panel = {
    get: function () {
        return element.panel();
    },
    isOpen: function() {
        //return this.get().css('display') != 'none';

        var w = parseInt(Math.abs(this.get().css('right').replace('px', '')));
        var open = w == 0;
        console.log('panel.isOpen() : ' + open + ' width: ' + w);
        return open;
    },
    width: function() {
        return this.get().width();
    },
    toggle: function () {
        console.log('panel.toggle()');
        var w ;
        if ( this.isOpen() ) w = - this.width();
        else w = 0;
        console.log(w);
        this.get().velocity({
            right: w
        }, function(){
            console.log("toggle panel complete...!")
        });
    },
    close: function() {

    }
};



/**
 * @warning 이 닫기 옵션은 togglePanel() 에 직접 적용되어야 하는거 아닌가?
 * 두번 연속으로 호출하면, 닫기는 것이 아니라, 닫고 열린다.
 * 예를 들면 메뉴를 클릭 할 때, 이것을 호출하고, 페이지를 클릭을 할 두번 연속 호출 될 수 잇다.
 * 또는 페이지를 두번 클릭해도 마찬가지이다.
 * 그래서 아래와 같이 inProgressHidePanel 로 옵션 처리를 한다.
 */
var inProgressHidePanel = false;
function hidePanel() {
    if ( inProgressHidePanel ) return;
    if ( isPanelOpen() ) {
        console.log('hidePanel() : is going to hide panel.');
        inProgressHidePanel = true;
        element.panel().velocity({
            width: "toggle"
        }, function() {
            inProgressHidePanel = false;
        });
    }
}