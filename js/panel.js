var panel = {
    inHideProgress: false,
    get: function () {
        return element.panel();
    },
    open: function() {
        var r = parseInt(panel.get().css('right').replace('px', ''));
        var w = Math.abs(r);
        return w == 0;
    },
    width: function() {
        return this.get().width();
    },
    toggle: function () {
        //trace('panel.toggle()');
        html.setPanel();
        var w ;
        if ( this.open() ) w = - ( this.width() + 2 ); // This is a bug from CSS. You must give 2 px to hide the border.
        else w = 0;
        //trace(w);
        this.get().velocity({
            right: w
        }, function(){
            //trace("toggle panel complete...!")
        });
    },
    close: function() {
        if ( this.inHideProgress ) return;
        if ( this.open() ) {
            //trace('panel.close() : is going to hide panel.');
            this.inHideProgress = true;
            this.get().velocity({
                right: - panel.width() - 2
            }, function() {
                panel.inHideProgress = false;
            });
        }
    }
};