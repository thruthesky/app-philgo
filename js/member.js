var member = {
    idx : 0,
    id : '',
    name : '',
    session_id : '',
    idx_photo : '',
    login : function () {
        return this.idx;
    },
    unset : function () {
        this.idx = 0;
        this.id = '';
        this.name = '';
        this.session_id = '';
        this.idx_photo = '';
    },
    load : function () {
        var v = db.get('idx_member');
        if ( v ) {
            member.idx = v;
            member.id = db.get('user_id');
            member.session_id = db.get('session_id');
            member.name = db.get('user_name');
            member.idx_photo = db.get('idx_photo');
        }
        else this.unset();
    },
    /**
     *
     * 아래의 값이 입력되면 로그인 처리를 한다.
     *
     * @param id
     * @param re
     *      re.idx_member, re.session_id, re.user_name, re.idx_photo (프로필포토)
     */
    setLogin : function (id, re) {
        db.set('user_id', id);
        db.set('idx_member', re['idx_member']);
        db.set('session_id', re['session_id']);
        db.set('user_name', re['user_name']);
        db.set('idx_photo', re['idx_photo']);
        member.idx = re['idx_member'];
        member.id = id;
        member.session_id = re['session_id'];
        member.name = re['user_name'];
        member.idx_photo = re['idx_photo'];
    },
    setLogout : function () {
        db.delete('idx_member');
        db.delete('user_id');
        db.delete('session_id');
        db.delete('user_name');
        db.delete('idx_photo');
        member.unset();
    },
    primary_photo : function () {
        if ( member.idx_photo ) {
            var idx = member.idx_photo;
            return _.template('<img src="{{url_server}}/data/upload/{{postfix}}/{{idx_photo}}">')
            ({
                url_server : app.getServerURL(),
                postfix : s.chars(idx).pop(),
                idx_photo : idx
            });
        }
    }

};