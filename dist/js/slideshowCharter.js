(function () {
  window["Reuters"] = window["Reuters"] || {};
  window["Reuters"]["Graphics"] = window["Reuters"]["Graphics"] || {};
  window["Reuters"]["Graphics"]["slideshowCharter"] = window["Reuters"]["Graphics"]["slideshowCharter"] || {};
  window["Reuters"]["Graphics"]["slideshowCharter"]["Template"] = window["Reuters"]["Graphics"]["slideshowCharter"]["Template"] || {};

  window["Reuters"]["Graphics"]["slideshowCharter"]["Template"]["gallery"] = function (t) {
    var __t,
        __p = '',
        __j = Array.prototype.join;
    function print() {
      __p += __j.call(arguments, '');
    }
    __p += '\n\n<!-- Slider main container -->\n<div class="swiper-container">\n    <!-- Additional required wrapper -->\n    <div class="swiper-wrapper">\n        <!-- Slides -->\n        ';
    t.data.forEach(function (img) {
      ;
      __p += '\n            <div class="swiper-slide">\n                <div class="pic">\n                    <img src="images/' + ((__t = img.url) == null ? '' : __t) + '" />\n                </div>\n            </div>\n        ';
    });
    __p += '\n    </div>\n\n    <!-- If we need navigation buttons -->\n    <div class="swiper-button-prev">\n        <i class="fa fa-angle-left"></i>\n    </div>\n    <div class="swiper-button-next">\n        <i class="fa fa-angle-right visible"></i>\n    </div>\n\n    <!-- If we need pagination -->\n    <div class="swiper-pagination"></div>\n    \n    <div class="caption-container">\n        ';
    t.data.forEach(function (img, index) {
      ;
      __p += '\n            ';
      if (index == 0) {
        ;
        __p += '<p class="caption visible" id="caption' + ((__t = index) == null ? '' : __t) + '">';
      } else {
        ;
        __p += '<p class="caption" id="caption' + ((__t = index) == null ? '' : __t) + '">';
      };
      __p += '\n            <span class="bold-caption">' + ((__t = img.boldcaption) == null ? '' : __t) + '</span> <span class="pipe">&nbsp;&#8214;&nbsp;</span> ' + ((__t = img.caption) == null ? '' : __t) + ' <span class="photo-byline">' + ((__t = 'Photo by ') == null ? '' : __t) + '' + ((__t = img.byline) == null ? '' : __t) + '</span>\n        </p>\n        ';
    });
    __p += '\n    </div>\n\n\n</div>\n';
    return __p;
  };
})();
Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
//the view that constructs a linechart
Reuters.Graphics.ImageGallery = Backbone.View.extend({
	initialize: function initialize(opts) {
		var self = this;
		this.options = opts;

		// if we are passing in options, use them instead of the defualts.
		_.each(opts, function (item, key) {
			self[key] = item;
		});

		d3.json(self.dataURL, function (data) {
			self.getImages(data);
		});
	},
	template: Reuters.Graphics.slideshowCharter.Template.gallery,
	getImages: function getImages(data) {
		var self = this;

		self.data = data;

		self.$el.append(self.template({ data: self.data, self: self }));

		self.buildGallery();
	},
	buildGallery: function buildGallery() {
		var self = this;

		self.swiper = new Swiper('.swiper-container', {
			direction: 'horizontal',
			loop: false,
			keyboardControl: true,
			pagination: '.swiper-pagination',
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			onSlideChangeStart: function onSlideChangeStart(swiper) {
				self.slideChange(swiper);
			}
		});
	},
	slideChange: function slideChange(swiper) {
		var self = this;

		var current = swiper.realIndex;

		$('p.caption').removeClass('visible');
		$('p.caption#caption' + current).delay(1000).addClass('visible');
	}
});
//# sourceMappingURL=slideshowCharter.js.map
