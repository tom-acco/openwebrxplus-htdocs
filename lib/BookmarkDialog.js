$.fn.bookmarkDialog = function() {
    var $el = this;
    return {
        setModes: function(modes) {
            $el.find('#modulation').html(modes.filter(function(m){
                return m.isAvailable();
            }).map(function(m) {
                return '<option value="' + m.modulation + '">' + m.name + '</option>';
            }).join(''));
            return this;
        },
        setValues: function(bookmark) {
            var $form = $el.find('form');
            ['name', 'frequency', 'modulation', 'description', 'scannable'].forEach(function(key){
                var $input = $form.find('#' + key);
                if ($input.is(':checkbox')) {
                    $input.prop('checked', bookmark[key]);
                } else {
                    $input.val(bookmark[key]);
                }
            });
            $el.data('id', bookmark.id || false);
            return this;
        },
        getValues: function() {
            var bookmark = {};
            var valid = true;
            ['name', 'frequency', 'modulation', 'description', 'scannable'].forEach(function(key){
                var $input = $el.find('#' + key);
                valid = valid && $input[0].checkValidity();
                bookmark[key] = $input.is(':checkbox')? $input.is(':checked') : $input.val();
            });
            if (!valid) {
                $el.find("form :submit").click();
                return;
            }
            bookmark.id = $el.data('id');
            return bookmark;
        }
    }
}
