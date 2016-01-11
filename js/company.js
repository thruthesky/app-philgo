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
        var m = $('#company-page').html();
        m = _.template(m)(company);
        console.log(m);
        el.content().html( m );
    },
    on_click_company_category : function () {
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

        console.log(name);
        console.log( this.data[name] );

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