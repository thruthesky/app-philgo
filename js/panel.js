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
        //console.log('panel.toggle()');
        html.setPanel();
        var w ;
        if ( this.open() ) w = - this.width();
        else w = 0;
        //console.log(w);
        this.get().velocity({
            right: w
        }, function(){
            //console.log("toggle panel complete...!")
        });
    },
    close: function() {
        if ( this.inHideProgress ) return;
        if ( this.open() ) {
            //console.log('panel.close() : is going to hide panel.');
            this.inHideProgress = true;
            this.get().velocity({
                right: - panel.width()
            }, function() {
                panel.inHideProgress = false;
            });
        }
    }
};