
function isPanelOpen() {
    //return panel().css('display') != 'none';
	return panel().css("right") != '-260px';
}

var panel_animating = false;
function togglePanel(){
	if( panel_animating == true ) return;
    console.log('togglePanel() begins ...');
    console.log(menu_panel());
    menu_panel().animate({
	panel_animating = true;
	/*
    panel().animate({
        width: "toggle"
    }, function(){
        console.log("toggle panel complete...!")
    });
	*/
	if( panel().css("right") == '-260px' ){//should be the panel width
		panel_width = '0';				 		 
	}
	else{
		panel_width = '-260px';//should be the panel width		
	}	
	
	panel().animate({
        right: panel_width,
    },500, function(){
        console.log("toggle panel complete...!")
		panel_animating = false;
    });
}
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
        /*
		panel().animate({
            width: "toggle"
        }, function() {
            inProgressHidePanel = false;
        });
		*/
		panel().animate({
			right: '-260px',
		},500, function(){
			console.log("toggle panel complete...!")
			inProgressHidePanel = false;
		});
    }
}
