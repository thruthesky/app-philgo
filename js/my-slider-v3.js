(
    function( $ ) {
        $.fn.animateMySlider = function ( options ) {
            //console.log(this.length);
            this.each ( function () {
                var $this = $(this);


                // variables
                var settings = $.extend( {
                    intervalPageChange : 800,
                    speedPageChange : 500,
                    direction : 'right-to-left',
                    active : 0,
                    zIndex : 100,
                    mouseIn : false,
                    dotColor : '#494949'
                }, options );


                // elements
                var el = {
                    slider : function() {
                        return $this;
                    },
                    li : function() {
                        return el.slider().find('li');
                    },
                    activeSlider : function() {
                        return el.li().eq(getActiveNo());
                    },
                    nav : {
                        left : function () {
                            return el.slider().find('nav img:eq(0)');
                        },
                        right : function () {
                            return el.slider().find('nav img:eq(1)');
                        }
                    }
                };


                // listeners
                //console.log($this);
                el.slider()
                    .mouseenter(pauseAnimation)
                    .mouseleave(resumeAnimation);


                el.nav.left().click(moveLeft);
                el.nav.right().click(moveRight);


                // initialize
                showDots();
                putButtonMiddle();
                setInterval(animate, settings.intervalPageChange);



                // Animation
                function animateNo(no) {
                    if ( settings.direction == 'right-to-left' ) {
                        settings.active = parseInt(no) - 1;
                    }
                    else {
                        settings.active = parseInt(no) + 1;
                    }
                    //console.log('settings.active:' + settings.active);
                    animate(true);
                }
                function animate( force ) {

                    if ( ! force ) if ( settings.mouseIn ) return;

                    var w = el.slider().width();
                    var left;
                    if ( settings.direction == 'right-to-left' ) {
                        increaseActiveNo();
                        left = w;
                    }
                    else {
                        decreaseActiveNo();
                        left = -w;
                    }

                    moveDots();

                    var $act = el.activeSlider();// $li.eq(getActiveNo());//getActiveSlider();
                    var z = getNextIndex();
                    $act.css({
                        'display' : 'block'
                        , 'z-index': z
                        , 'left' : left
                        , 'width' : w + 1
                    } );
                    $act.velocity({left:0}, settings.speedPageChange, function(){
                        el.activeSlider().css('display', 'block');
                    });
                    function resizeHeight() {
                        el.li().height(el.activeSlider().find('img').height());
                    }

                    resizeHeight();

                    putButtonMiddle();
                }


                // functions
                function showDots() {
                    var m = '';
                    for ( var i = 0 ; i < el.li().length ; i ++ ) {
                        m += '<b no="'+i+'">-</b>';
                    }
                    el.slider().append('<nav class="dots">' + m + '</nav>');
                    var $dots = el.slider().find('.dots');
                    $dots.css( {
                        'position': 'absolute',
                        'z-index': 4321,
                        'bottom' : 0,
                        'left' : 0,
                        'right' : 0,
                        'text-align' : 'center',
                        'font-size': '40px',
                        'color': settings.dotColor,
                        'line-height' : '20px',
                        'cursor': 'pointer'
                    });
                    $dots.find(':eq(0)').css({
                        'color': 'white'
                    });
                    $dots.find('b').click(function(){
                        var no = $(this).attr('no');
                        //console.log(no);
                        animateNo(no);
                    });
                }


                function moveDots() {
                    var $dots = el.slider().find('.dots');
                    $dots.find('b').css('color', settings.dotColor);
                    $dots.find('b:eq("'+getActiveNo()+'")').css('color', 'white');
                }


                function increaseActiveNo() {
                    ++ settings.active;
                }
                function decreaseActiveNo() {
                    -- settings.active;
                }

                function getActiveNo() {
                    if ( settings.active >= el.li().length ) settings.active = 0;
                    else if ( settings.active < 0 ) settings.active = el.li().length - 1;
                    return settings.active;
                }


                function getNextIndex() {
                    return ++ settings.zIndex;
                }


                function putButtonMiddle() {
                    // var h_slider = el.activeSlider().height(); // This height is based on the height of the image ( LI tag ). So, the button moves based on the image size.
                    var h_slider = el.slider().height();
                    var h_button = el.nav.left().height();
                    var pos_top = ( h_slider / 2 - h_button / 2 );
                    el.nav.left().css('top', pos_top);
                    el.nav.right().css('top', pos_top);
                }

                function pauseAnimation() {
                    settings.mouseIn = true;
                }
                function resumeAnimation() {
                    settings.mouseIn = false;
                }

                function moveLeft() {
                    //console.log('left clicked');
                    settings.direction = 'left-to-right';
                    animate(true);
                }
                function moveRight(){
                    //console.log('right clicked');
                    settings.direction = 'right-to-left';
                    animate(true);
                }

            } );
        };
    } ( jQuery )
);
