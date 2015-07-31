(function($) {

  $.fn.cntl = function(options) {

    /* default settings */
    var settings = $.extend({
      revealbefore : 200, /* this is the amount of "scroll padding" to allow (the more, the later the state will be revealed) */
      anim_class  : 'cntl-animate', /* the anim class, this class should have animation rules in css */
      statelist_class : 'cntl-state',
      onreveal  : null, /* a callback once the state has been revealed */
      bar_fill_class : null
    }, options);

    return this.each(function() {
      var states = [];
      var tbf = 0;
      var statelist = $(this).find('.' + settings.statelist_class);
      var bar_fill;
      
      if (settings.bar_fill_class != null) {
        bar_fill = $(this).find('.' + settings.bar_fill_class);
      }

      function setupElements() {
        for (var i = 0; i < statelist.length; i++) {
          states[i] = {};
          states[i]['top'] = $(statelist[i]).offset().top + settings.revealbefore;
          states[i]['elm'] = $(statelist[i]);
        };

        revealElements();
      }

      function revealElements() {
        var windowtop = $(window).scrollTop();
        var windowbtm = windowtop + $(window).height();

        for (var i = 0; i < states.length; i++) {
          if (states[i].top > windowtop && states[i].top < windowbtm) {
            if (!states[i].elm.hasClass(settings.anim_class) && $.isFunction(settings.onreveal)) {
              settings.onreveal.call(this, states[i].elm);
            }

            states[i].elm.addClass(settings.anim_class);
            var h = states[i].elm.position().top;

            if (h > tbf) {
              tbf = h;
            }

            if (bar_fill != null) {
              bar_fill.height(tbf);
            }
          }
        };
      }

      $(window).on('scroll',revealElements);
      $(window).on('load',setupElements)

    });
  }

}(jQuery));
