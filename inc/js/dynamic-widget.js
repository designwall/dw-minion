jQuery(function($) {
    var dw_sortable = function(dwWidgetSortable){
        dwWidgetSortable.sortable({
            placeholder: 'widget-placeholder',
            items: '> .widget',
            handle: '> .widget-top > .widget-title',
            cursor: 'move',
            distance: 2,
            containment: 'document',
            start: function(e,ui) {
                ui.item.children('.widget-inside').hide();
                ui.item.css({margin:'', 'width':''});
            },
            receive: function(e, ui) {
                var sender = $(ui.sender);

                if ( !$(this).is(':visible') || this.id.indexOf('orphaned_widgets') != -1 )
                    sender.sortable('cancel');

                if ( sender.attr('id').indexOf('orphaned_widgets') != -1 && !sender.children('.widget').length ) {
                    sender.parents('.orphan-sidebar').slideUp(400, function(){ $(this).remove(); });
                }
            },
            stop: function(e,ui) {

                if ( ui.item.hasClass('ui-draggable') && ui.item.data('draggable') )
                    ui.item.draggable('destroy');

                var $id_base = ui.item.find('[name="id_base"]').val();
                if( 'dw_accordions' == $id_base || 'dw_tabs' == $id_base ) {
                    ui.item.remove();
                    return;
                }
                if ( ui.item.hasClass('deleting') ) {
                    dwSaveWidget(ui.item);
                    ui.item.remove();
                    return;
                }


                var add = ui.item.find('input.add_new').val(),
                    n = ui.item.find('input.multi_number').val(),
                    id = 'rb-__i__',
                    sb = $(this).attr('id');

                ui.item.css({margin:'', 'width':''});   
                if ( add ) {
                    var matches = 0, 
                        id_base = ui.item.find('.id_base').val();
                    $(this).find(":input.id_base").each(function(i, val) {
                      if ($(this).val() == id_base ) {
                        matches++;
                      }
                    });

                    var widget_id = id_base + '-dw-widget-' + matches;
                    ui.item.find('.widget-id').val( widget_id );
                    if ( 'multi' == add ) {
                        ui.item.html( ui.item.html().replace(/<[^<>]+>/g, function(m){ return m.replace(/__i__|%i%/g, n); }) );
                        ui.item.attr( 'id', id.replace('__i__', n) );
                        n++;
                        $('div#' + id).find('input.multi_number').val(n);
                    } else if ( 'single' == add ) {
                        ui.item.attr( 'id', 'new-' + id );
                        rem = 'div#' + id;
                    }

                    dwSaveWidget(ui.item);
                    ui.item.find('input.add_new').val('');
                    ui.item.find('a.widget-action').click();

                    return;
                }

                dwSaveWidget(ui.item);
            }
        });
    }

    $('#widget-list').children('.widget').draggable( "option", 'connectToSortable', 'div.widgets-sortables,div.dw-widget-extends' );

    dw_sortable( $('#widgets-right .dw-widget-extends') );

    $('div.widgets-sortables').on('sortstop',function(event, ui){


    });
    

    //Override saveOrder of global wpWidgets, just add sortable for .dw-widget-extends item 
    wpWidgets.saveOrder = function (sb) {
        if ( sb )
            $('#' + sb).closest('div.widgets-holder-wrap').find('.spinner').css('display', 'inline-block');

        var a = {
            action: 'widgets-order',
            savewidgets: $('#_wpnonce_widgets').val(),
            sidebars: []
        };

        $('div.widgets-sortables').each( function() {
            if ( $(this).sortable )
                a['sidebars[' + $(this).attr('id') + ']'] = $(this).sortable('toArray').join(',');
        });

        //DW Focus: Resortable for div.dw-widget-extends
        $('div.widget-liquid-right div.dw-widget-extends').each( function(){
                dw_sortable( $(this) );
        });//End DW Focus Custom

        $.post( ajaxurl, a, function() {
            $('.spinner').hide();
        });

        this.resize();
    }

    function dwSaveWidget(widget){
        var container = widget.closest('.dw-widget-extends');
        
        dwSaveWidgetForContainer(container);
    }

    function dwSaveWidgetForContainer(container){
        
        var field = container.data('setting'), data =  new Array();
        if( container.find('div.widget').length > 0 ){
            container.find('div.widget').each(
                function(i){
                    if( $(this).hasClass('deleting') ) return;
                    if( i != 0 ){
                        data += ':dw-data:';
                    }
                    $(this).find(':input').each(function(index, el){
                        if( $(this).val() ) {
                            if( el.type == 'checkbox' || el.type == 'radio' ){
                                if( $(this).is(':checked') ){
                                    data += $(this).attr('name')+'='+$(this).val()+'&';
                                }
                            }else{
                                data += $(this).attr('name')+'='+ encodeURIComponent( $(this).val() )+'&';
                            }
                        }
                    });
                }
            );

            $('#'+field).val(data);
        }else{
            $('#'+field).val('');
        }
    }

    var isRTL = !! ( 'undefined' != typeof isRtl && isRtl ),
            margin = ( isRtl ? 'marginRight' : 'marginLeft' ), the_id;
    $(document.body).unbind('click.widgets-toggle');
    $(document.body).bind('click.widgets-toggle', function(e){
        var target = $(e.target), css = {}, widget, inside, w;
        if ( target.parents('.widget-top').length && ! target.parents('#available-widgets').length ) {
            widget = target.closest('div.widget');
            inside = widget.children('.widget-inside');
            w = parseInt( widget.find('input.widget-width[data-dw!="true"]').val(), 10 );
            if( widget.parent().hasClass('dw-widget-extends') ) {
                w = parseInt( widget.find('input.widget-width').val(), 10 );
            }

            if ( inside.is(':hidden') ) {
                if ( w > 250 && inside.closest('div.widgets-sortables').length ) {
                    css['width'] = w + 30 + 'px';
                    if ( inside.closest('div.widget-liquid-right').length ) {
                        css[margin] = 220 - w + 'px';
                    }
                    widget.css(css);
                }
                wpWidgets.fixLabels(widget);
                inside.slideDown('fast');
            } else {
                inside.slideUp('fast', function() {
                    widget.css({'width':'', margin:''});
                });
            }
            e.preventDefault();
        } else if ( target.hasClass('widget-control-save') ) {

            var widget = target.closest('div.widget');

            if( widget.parent().hasClass('dw-widget-extends') ) {
                dwSaveWidget(widget);
                wpWidgets.save( widget.parent().closest('div.widget'), 0, 1, 0 );
            }else{
                var container = widget.find('.dw-widget-extends');
                container.find(':input').attr('disabled','disabled');
                dwSaveWidgetForContainer( container );
                wpWidgets.save( widget, 0, 1, 0 );
                container.find(':input').removeAttr('disabled');
            }
            setTimeout(function(){
                //DW Focus: Resortable for div.dw-widget-extends
                $('div.widget-liquid-right div.dw-widget-extends').each( function(){
                    dw_sortable( $(this) );
                });//End DW Focus Custom
            },1000);
            e.preventDefault();
        } else if ( target.hasClass('widget-control-remove') ) {
            var widget = target.closest('div.widget');
            if( widget.parent().hasClass('dw-widget-extends') ) {
                var parent = widget.parent();
                target.closest('div.widget').remove();
                dwSaveWidgetForContainer( parent );
                wpWidgets.save( parent.closest('div.widget'), 0, 0, 1 );
            }else{
                wpWidgets.save( widget, 1, 1, 0 );
            }
            e.preventDefault();
        } else if ( target.hasClass('widget-control-close') ) {
            wpWidgets.close( target.closest('div.widget') );
            e.preventDefault();
        }
    });

});