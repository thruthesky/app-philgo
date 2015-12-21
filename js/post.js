var post = {
    mine : function (p) {
        if ( typeof p['idx'] == 'undefined' ) return false;
        if ( !_.isEmpty(member.login()) ) return false;
        return p['idx'] == member.idx;
    }
};