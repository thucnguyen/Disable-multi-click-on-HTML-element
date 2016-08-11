$.fn.extend
  disableMultiClick: (options) ->
    self = $.fn.disableMultiClick
    opts = $.extend {}, self.defaultOptions, options
    $(this).each (i, el) ->
      $el = $(el)
      $timeout = $el.data('timeout') || opts.timeout
      $el.click (e) ->
        if $el.hasClass(opts.preventedClass)
          e.preventDefault()
          e.stopPropagation()
          return
        $el.addClass(opts.preventedClass)
        setTimeout(
          () ->
            $el.removeClass(opts.preventedClass)
          $timeout
        )

$.extend $.fn.disableMultiClick,
  defaultOptions:
    timeout: 2000
    preventedClass: 'hire-prevented'
