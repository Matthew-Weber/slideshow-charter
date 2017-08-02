Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
//the view that constructs a linechart
Reuters.Graphics.ImageGallery = Backbone.View.extend({
	initialize: function(opts){
		var self = this;
		this.options = opts; 		
		
		// if we are passing in options, use them instead of the defualts.
		_.each(opts, function(item, key){
			self[key] = item;
		});

		d3.json(self.dataURL, function(data){
			self.getImages(data);
		});


	},
	template: Reuters.Graphics.slideshowCharter.Template.gallery,
	getImages: function(data){
		var self = this;

		self.data = data;

	    self.$el.append(self.template({data:self.data, self: self}));

	    self.buildGallery();

	},
	buildGallery: function(){
		var self = this;

		self.swiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: false,
		    keyboardControl:true,
		    pagination: '.swiper-pagination',
		    nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev',
		    onSlideChangeStart: function(swiper){
		    	self.slideChange(swiper);
		    }
		});


	},
	slideChange: function(swiper){
		var self = this;

		var current = swiper.realIndex;

		$('p.caption').removeClass('visible');
		$('p.caption#caption'+current).delay(1000).addClass('visible');

	}
})