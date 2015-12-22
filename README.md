# app-philgo

2015-12-14 Changed repository name.


# Build guide 참고

* 자바스크립트 전체를 서버로 부터 다운로드 하여 실행 할 수 있도록 한다.
    - 즉, 모든 자바스크립트를 서버로 부터 다운로드하여 동적으로 추가를 한다.
    - zepto.js 또는 underscore.js 와 같이 외부 자바스크립트는 놔 두고,
    - 그 외의 모든 자바스크립트 파일은 client.js 로 모두 합친다.
    - client.js 는 날짜 버젼을 붙여서 client.메인버젼.월.일.js 와 같이 다운로드하도록 하고
    - 오래된 것은 삭제를 한다.
    - 먼저 client.0.12.19.js 로 시작을 한다.
    --- 장점. 모든 코드를 클라이언트에 두어도 된다.
    --- 장점. 자바스크립트에 직접 HTML 을 만들어 넣어도 된다.
        예를 들면, page/header.html 과 같은 것이 필요가 없으며,

         header, footer, panel 은 캐시 할 필요 조차 없다.

    - db 캐시에 client.js 의 버젼 이름을 기록해 놓고, 앱이 로딩 될 때 그 버젼을 보여주면된다.

    - 이렇게 하면 모든 코드를 client.js 에 둘 수 있고, 온라인/오프라인 상관없이



        일관된 동작과 인터페이스를 보여주 줄 수 있으며 편하게 개발 작업을 할 수 있다.

    이것은 client.css 도 동일한 방식으로 처리를 한다.

    --- 이 때, 앱에서 쓰는 아이콘은 그냥 sprite 아이콘으로해서 서버에 두고 사용한다.


* database.js 에서 DB 캐시를 할 때, length 와 md5, stamp 를 같이 저장한다.

    - stamp 는 캐시 된 시간이 오래 되었을 때, 다시 캐시

    - length 는 데이터가 올바로 전송되었는지 확인

    - md5 는 서버로 부터 받아서, 데이터가 갱신되었는지 확인 할 때 사용한다.

* widget 페이지 정보만 캐시하고 게시판 내용은 캐시를 하지 않는다. ( 번거롭고, 페이지 내용을 충분히 길게 표시해 주면 된다. )


* 자바스크립트 함수를 완전 조각화 한다. 자바스크립트 함수가 너무 헷갈린다. (파일을 조각화 하는 것이 아니다.)

    - 특히 callback 함수 군에서 너무 많이 했갈리며 함수가 막 뒤섞여 정렬이되어서 너무 복잡하다.
    - underscore.js 의 템플릿을 반드시 사용하낟.
    - 클래스화 할 수 있는 살펴본다.
    - var markup = function () { ... }
        - markup.post_write_form()
        - markup.comment_write_form()
        - markup.user_register_form()
    - var callback = function () {
            this.click_page = function ()
    }
        callback.page_click

    - var app = {};

    - helper.unique_id(), helper.today()
    - debug.start(), debug.stop();
    - panel.show(), panel.hide()
    -

    ----- 이렇게 클래스화 하면, 정리가 안될래야 안될 수가 없다.


