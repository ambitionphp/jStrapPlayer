+function ($) {
    'use strict';
    var Bootswatch = function (element, options) {
        var self = this;
        this.$element = $(element);
        this.options = $.extend({}, Bootswatch.DEFAULTS, this.$element.data(), options);

        this.$link = $('#' + this.options.selector);
        if (!this.$link.length) {
            this.$link = $('<link rel="stylesheet"/>').attr('id', this.options.selector).appendTo('head');
        }

        $.each(this.options.themes, function (name) {
            var label = name.substr(0, 1).toUpperCase() + name.substr(1);
            var html = self.options.roller
                .replace(/\$name/g, name)
                .replace(/\$label/g, label);
            $(html).appendTo(self.$element);
        });

        // set default theme
        if (this.options.default) {
            this.change(this.options.default);
        }

        this.$element.find('a').click(function () {
            var theme = $(this).data('theme');
            self.change(theme);
        });
    };

    function theme_url(name) {
        return 'https://stackpath.bootstrapcdn.com/bootswatch/4.1.0/$name/bootstrap.min.css'.replace(/\$name/g, name);
    }

    var themes = {
        default: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
        cerulean: theme_url('cerulean'),
        cosmo: theme_url('cosmo'),
        cyborg: theme_url('cyborg'),
        darkly: theme_url('darkly'),
        flatly: theme_url('flatly'),
        journal: theme_url('journal'),
        litera: theme_url('litera'),
        lumen: theme_url('lumen'),
        lux: theme_url('lux'),
        materia: theme_url('materia'),
        minty: theme_url('minty'),
        pulse: theme_url('pulse'),
        sandstone: theme_url('sandstone'),
        simplex: theme_url('simplex'),
        sketchy: theme_url('sketchy'),
        slate: theme_url('slate'),
        solar: theme_url('solar'),
        spacelab: theme_url('spacelab'),
        superhero: theme_url('superhero'),
        united: theme_url('united'),
        yeti: theme_url('yeti')
    };

    Bootswatch.DEFAULTS = {
        default: 'default',
        themes: themes,
        selector: 'bootswatch',
        roller: '<a href="#" class="dropdown-item" data-theme="$name"><span>$label</span>&nbsp;<span class="glyphicon"></span></a>',
        icon: 'glyphicon-ok'
    };

    Bootswatch.prototype.change = function (theme) {
        this.$link.attr('href', this.options.themes[theme]);

        // toggle icon
        this.$element.find('a[data-theme] .' + this.options.icon).removeClass(this.options.icon);
        this.$element.find('a[data-theme=' + theme + '] .glyphicon').addClass(this.options.icon);

        this.$element.trigger('theme-changed', theme);
    };

    Bootswatch.prototype.setOptions = function (options) {
        if (typeof options == 'object') {
            this.options = $.extend({}, this.options, options);
        }
    };

    var old = $.fn.bootswatch;

    $.fn.bootswatch = function (option, arg) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.bootswatch');
            var isNew = (typeof data == 'object');
            var options = typeof option == 'object' && option;

            if (!data) {
                data = new Bootswatch(this, options);
                $this.data('bs.bootswatch', data);
            }

            if (typeof option == 'object' && isNew === false) {
                data.setOptions(option);
            } else if (typeof option == 'string') {
                data[option](arg);
            }
        });
    };

    $.fn.bootswatch.Constructor = Bootswatch;

    $.fn.bootswatch.noConflict = function () {
        $.fn.bootswatch = old;
        return this;
    };

}(jQuery);
