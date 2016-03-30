/**
 *
 * 2016 년 3 월 8 일 . company.js 에 대한 내용을 완전히 변경을 한다.
 * 2016 년 3 월 21 일. company.js 를 통한 업소  정보를 다시 보여 준다.
 *
 * 문제 : 서버의 정보를 로드하려니 내용이 너무 많이 필요하다.
 *          그리고 업데이트 안된 내용은 검색을 통해서 서버로 부터 추출 하도록 하면 된다.
 *
 * @type {{data: null, length: number, count: string, init: company.init, on_click_company_button: company.on_click_company_button, on_click_company_category: company.on_click_company_category, on_click_row: company.on_click_row, el: {company: company.el.company, count: company.el.count, category_page: company.el.category_page}, show_category: company.show_category, update_count: company.update_count}}
 */
var company = {
    data : null,
    length : 0,
    count : '',
    init: function() {

        on_click('[company-button]', company.on_click_company_button);

        on_click('.company li', company.on_click_company_category);
        on_click('.company .row', company.on_click_row);

        $.get('company-data-base64.html', function(data) {
            company.data = JSON.parse( atob( data ) );
            for( var n in company.data ) {
                var group = company.data[n];
                company.length += group.length;
            }
            company.count = s.numberFormat(company.length);
            company.update_count(company.count);
        });
    },
    on_click_company_button : function () {
        goTop();
        var $this = $(this);
        var title = $this.attr('title');
        app.setTitle(title);
        app.setCurrentForum('-'); // 업소록 밑에 게시글이 붙지 않도록 한다.
        app.setCurrentPage('company');
        var m = $('#company-page').html();
        m = _.template(m)(company);
        //console.log(m);
        el.content().html( m );
    },
    on_click_company_category : function () {
        goTop();
        var $this = $(this);
        var name;
        if ( $this.attr('org-name') ) name = $this.attr('org-name');
        else name = $this.text();
        company.show_category(name);
    },
    on_click_row : function () {
        var $this = $(this);
        $this.find('.details').show();
    },
    el: {
        company : function() {
            return $(".company");
        },
        count : function() {
            return company.el.company().find('.count');
        },
        category_page : function() {
            return $('#company-category-page');
        }
    },
    show_category : function(name) {

        //console.log(name);
        //console.log( this.data[name] );

        var m = this.el.category_page().html();
        m = _.template(m)({
            name: name,
            company: this
        });
        el.content().html( m );
    },

    update_count: function (count) {
        this.el.count().text( this.count );
    }
};
company.init();