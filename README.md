# app-sapcms3
sapcms3 app

# Build guide 참고

* database.js 에서 DB 캐시를 할 때, length 와 md5, stamp 를 같이 저장한다.

    - stamp 는 캐시 된 시간이 오래 되었을 때, 다시 캐시

    - length 는 데이터가 올바로 전송되었는지 확인

    - md5 는 서버로 부터 받아서, 데이터가 갱신되었는지 확인 할 때 사용한다.
* 자바스크립트 함수를 완전 조각화 한다. 자바스크립트 함수가 너무 헷갈린다.
    - 특히 callback 함수 군에서 너무 많이 했갈린다.

    - OK: 모든 click 관련 콜백은 'on_click_xxxx()' 로 한다.
    - OK: 모든 change, select, 등은 'on_change_xxxx()' 로 한다.
/*
    - callback_cache_update_on_widget() 대신 update_widget(widget_name, re) 으로 한다.
    - callback_cache_update_page_on_content() 대신 update_content(page_name, re) 으로 한다.
        -- update 를 한다는 것은 서버로 부터 새로운 데이터를 받았기 때문이다.
        -- 따라서 update 를 할 때에는 항상 db_save() 로 html, stamp, md5, length 를 같이 저장한다.
        -- 또한 이 두 함수는 범용으로 쓰일 수 있도록 한다.
*/
    - cache_get_widget_from_server() 를 cache_update_page() 로 변경한다.


* (재고) db.save() 를 바로 호출하지 말고, db_save() 를 둘 것.
    - db_save(), db_get(), db_set(), db_get_record(), db_delete(), db_delete_all()

* server.js 가 인터넷에 연결되지 않아도 올바로 캐시 되는지 확인 한다.

    - 앱을 종료했다가 다시 실행, 폰을 껐다가 다시 실행.

* 앱을 종료했다가 다시 실행 할 때, 폰을 재 부팅 할 때, client.js 가 처음 부터 실행되는지 확인한다.

* server.js 가 ajax 로 로딩되지 않아서, <script src=....> 에 임시로 기록을 해 놓았다.

* server.js 가 실행될 때/매1시간 마다, 각 페이지 별로 DB 에 캐시가 있는지 확인하고 없으면 캐시를 한다.

* server.js 가 실행 될 때/매 1시간 마다, 각 페이지 별로 DB 에 캐시를 한다.

* set_version() 으로 버젼이 바뀌면 리프레시를 한번 해서 server.css 와 server.js 를 다시 캐시를 할 수 있도록 한다.

* 필요하다면 server.js 에서 db_delete_all() 을 통해서 db 초기화를 한다.

* server.js 를 아예 새로 불러오지 않아서, set_version() 부분의 버젼 코드가 바뀌어도 적용되지 않을 수 있다.

    - 이를 방지하기 위해셔 ajax_load() 에는 항상 dummy 코드를 추가하도록 하고,
    - front page 에서 자바스크립트로 확실하게 리프레시를 하는 코드와 여기서 직접 set_version()을 하는 방법을
        생각해 본다.
