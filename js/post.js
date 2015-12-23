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
        m += '</textarea>';
        m += '</div>';
        return m;
    },
    subject : function( p ) {
        if ( p['deleted'] == 1 ) return '';
        else return p['subject'];
    },
    content : function( p ) {
        if ( p['deleted'] == 1 ) return lang('deleted');
        else return p['content'];
    },
    markup : {
        more : function(idx) {
            var m = '';
            m += '  <span class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
            m += '      <img src="img/post/more.png"/>';
            m += '  </span>';
            m += '  <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">';
            m += '      <li><span class="report-button">Report</span></li>';
            m += '      <li><span class="report-button">Message</span></li>';
            m += '  </ul>';
            return m;
        }
    }
};