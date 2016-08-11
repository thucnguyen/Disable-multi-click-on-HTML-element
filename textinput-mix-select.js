
// require bootstrap selectbox

(function ( $ ) {
 
    $.fn.textInputMixSelect = function() {
        
        // create select box
        var myElement = this;
        var data = this.data('list')

        var select = $('<select/>');

        var checkSelected = false;
        $(data).each(function() {
            // select.append();
            var opt = $("<option>").attr('value',this).text(this).appendTo(select);
            if (this == myElement.val()) {
                opt.attr('selected', 'selected');
                checkSelected = true;
            }
        });

        if (checkSelected) {
            myElement.hide();
        } else if (myElement.val() === '') {
            // default value
            myElement.val(data[0]);
            myElement.hide();
        } else {
            // custome text
            select.find("option:last").attr("selected","selected");
        }

        myElement.before(select);
        
        if(jQuery().chosen) { 
            // use boostrap chosen
            myElement.css("margin-top", "12px");
            select.chosen({width: "100%"});
            // select.trigger("chosen:updated");
        } else {
            select.attr("class", myElement.attr("class"));
            select.css("margin-bottom", "12px");
        }

        // event
        select.bind( "change", function(e) {

            var selected = select.find("option:selected");
            if ((select.find('option').length - 1) === selected.index()) {
                myElement.val('');
                // show text box
                myElement.show();
                // fix 'chosen focus'
                setTimeout(function(){myElement.focus()}, 1);
            } else {
                myElement.val(selected.val());
                if (myElement.is(":visible")) {
                    myElement.hide()
                }
            }
        });        

        return this;
    };

}( jQuery ));