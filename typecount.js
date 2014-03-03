(function ( win, doc ) {
    'use strict';

    $.fn.nextOf = function( selector ) {
        return this.nextAll( selector ).first();
    };

    var $typecounters = $( '[data-typecount]' ),

        defaults = {
            min: 5,
            max: 20,
            warn: 5
        },

        publish = function( fn ) {
            var $this = this,
                counter = function( event ) {
                    var count = $this.val().length;
                    fn.call( $this, count, event );
                };

            $this.on( 'keydown keyup', counter );
        },

        update = function( settings ) {
            var $this = this,
                setHTML = function( count ) {
                    var $target = $this.nextOf('.count'),
                        remaining = settings.max - count,
                        message = remaining + ' characters remaining';

                    if ( count >= settings.min )
                        $target.text( message );
                    else
                        $target.empty();

                    if ( remaining <= settings.warn )
                        $target.addClass('warn');
                    else
                        $target.removeClass('warn');
                };

            publish.call( $this, setHTML );
        },

        restrict = function( settings ) {
            var $this = this,
                prevent = function ( count, event ) {
                    var noprintKeys = /^8$|^9$|^16$|^18$|^20$|^17$|^37$|^38$|^39$|^40$|^93$/;

                    if ( count >= settings.max )
                        if ( ! noprintKeys.test( event.keyCode ) )
                            event.preventDefault();
                };

            publish.call( $this, prevent );
        },

        oneach = function( index, element ) {
            var $element = $( element ),
                data = $element.data( 'typecount' ),
                settings = $.extend( {}, defaults, data );

            update.call( $element, settings );
            restrict.call( $element, settings );
        };

    if ( $typecounters.length === 0 )
        return;

    $.each( $typecounters, oneach );

}( window, document ));