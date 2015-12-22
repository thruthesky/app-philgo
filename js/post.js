var post = {
    mine : function (p) {
        if ( typeof p['idx'] == 'undefined' ) return false;
        if ( !_.isEmpty(member.login()) ) return false;
        return p['idx'] == member.idx;
    },
    edit_cancel : function () {
        return '<span class="glyphicon glyphicon-remove cancel-button">Cancel</span>';
    },
    edit_subject : function (v) {
        if ( _.isEmpty(v) ) return '';
        var m = '<div class="subject">';
        m += '  <input name="subject" value="'+v+'">';
        m += '</div>';
        return m;
    },
    edit_content : function (v) {
        if (_.isEmpty(v)) return;
        var m = '<div class="content">';
        m += '  <textarea name="content">';
        m +=        v;
        m += '  </textarea>';
        m += '</div>';
        return m;
    }

};