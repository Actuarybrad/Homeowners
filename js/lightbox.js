Ext.ns('Ext.ux');

Ext.ux.Lightbox = (function(){
	var els = {},
		images = [],
		urls = [],
		activeImage,
		activeUrl,
		initialized = false,
		selectors = [],
		width = 400,
		height = 300;

	return {
		overlayOpacity: 0.85,
		animate: true,
		resizeSpeed: 8,
		borderSize: 10,
		labelImage: "Image",
		labelOf: "of",

		init: function() {
			this.resizeDuration = this.animate ? ((11 - this.resizeSpeed) * 0.15) : 0;
			this.overlayDuration = this.animate ? 0.2 : 0;

			if(!initialized) {
				Ext.apply(this, Ext.util.Observable.prototype);
				Ext.util.Observable.constructor.call(this);
				this.addEvents('open', 'close');
				this.initMarkup();
				this.initEvents();
				initialized = true;
			}
		},

		initMarkup: function() {

			els.overlay = Ext.DomHelper.append(document.body, {
				id: 'ux-lightbox-overlay'
			}, true);

			var lightboxTpl = new Ext.Template(this.getTemplate());
			els.lightbox = lightboxTpl.append(document.body, {}, true);

			els.shim = Ext.DomHelper.append(Ext.fly('ux-lightbox-imageContainer'), {
				tag: 'iframe',
				id: 'ux-lightbox-shim'
			}, true);
			
			els.msg = Ext.DomHelper.append(Ext.fly('ux-lightbox-imageContainer'), {
				tag: 'div',
				id: 'ux-lightbox-msg'
			}, true);

			var ids =
				['outerImageContainer', 'imageContainer', 'image', 'hoverNav', 'navPrev', 'navNext', 'loading', 'loadingLink',
				'outerDataContainer', 'dataContainer', 'data', 'details', 'caption', 'imageNumber', 'bottomNav', 'navClose'];

			Ext.each(ids, function(id){
				els[id] = Ext.get('ux-lightbox-' + id);
			});

			Ext.each([els.overlay, els.lightbox, els.shim], function(el){
				el.setVisibilityMode(Ext.Element.DISPLAY)
				el.hide();
			});

			var size = (this.animate ? 250 : 1) + 'px';
			els.outerImageContainer.setStyle({
				width: size,
				height: size
			});
		},

		getTemplate : function() {
			return [
				'<div id="ux-lightbox">',
					'<div id="ux-lightbox-outerImageContainer">',
						'<div id="ux-lightbox-imageContainer">',
							'<img id="ux-lightbox-image">',
							'<div id="ux-lightbox-hoverNav">',
								'<a href="#" id="ux-lightbox-navPrev"></a>',
								'<a href="#" id="ux-lightbox-navNext"></a>',
							'</div>',
							'<div id="ux-lightbox-loading">',
								'<a id="ux-lightbox-loadingLink"></a>',
							'</div>',
						'</div>',
					'</div>',
					'<div id="ux-lightbox-outerDataContainer">',
						'<div id="ux-lightbox-dataContainer">',
							'<div id="ux-lightbox-data">',
								'<div id="ux-lightbox-details">',
									'<span id="ux-lightbox-caption"></span>',
									'<span id="ux-lightbox-imageNumber"></span>',
								'</div>',
								'<div id="ux-lightbox-bottomNav">',
									'<a href="#" id="ux-lightbox-navClose"></a>',
								'</div>',
							'</div>',
						'</div>',
					'</div>',
				'</div>'
			];
		},

		initEvents: function() {
			var close = function(ev) {
				ev.preventDefault();
				this.close();
			};

			els.overlay.on('click', close, this);
			els.loadingLink.on('click', close, this);
			els.navClose.on('click', close, this);

			els.lightbox.on('click', function(ev) {
				if(ev.getTarget().id == 'ux-lightbox') {
					this.close();
				}
			}, this);

			els.navPrev.on('click', function(ev) {
				ev.preventDefault();
				this.setImage(activeImage - 1);
			}, this);

			els.navNext.on('click', function(ev) {
				ev.preventDefault();
				this.setImage(activeImage + 1);
			}, this);
		},

		register: function(sel, group) {
			if(selectors.indexOf(sel) === -1) {
				selectors.push(sel);

				Ext.fly(document).on('click', function(ev){
					var target = ev.getTarget(sel);

					if (target) {
						ev.preventDefault();
						this.open(target, sel, group);
					}
				}, this);
			}
		},

		registerUrl: function(sel, width, height) {
			if(selectors.indexOf(sel) === -1) {
				selectors.push(sel);

				Ext.fly(document).on('click', function(ev){
					var target = ev.getTarget(sel);

					if (target) {
						ev.preventDefault();
						this.openUrl(target, width, height);
					}
				}, this);
			}
		},

		open: function(image, sel, group) {
			group = group || false;
			this.setViewSize();
			els.overlay.fadeIn({
				duration: this.overlayDuration,
				endOpacity: this.overlayOpacity,
				callback: function() {
					images = [];

					var index = 0;
					if(!group) {
						images.push([image.href, image.title]);
					}
					else {
						var setItems = Ext.query(sel);
						Ext.each(setItems, function(item) {
							if(item.href) {
								images.push([item.href, item.title]);
							}
						});

						while (images[index][0] != image.href) {
							index++;
						}
					}

					// calculate top and left offset for the lightbox
					var pageScroll = Ext.fly(document).getScroll();

					var lightboxTop = pageScroll.top + (Ext.lib.Dom.getViewportHeight() / 10);
					var lightboxLeft = pageScroll.left;
					els.lightbox.setStyle({
						top: lightboxTop + 'px',
						left: lightboxLeft + 'px'
					}).show();

					this.setImage(index);

					this.fireEvent('open', images[index]);
				},
				scope: this
			});
		},

		openUrl: function(url, fWidth, fHeight) {
			els.shim.dom.src = '';
			this.setViewSize();
			els.overlay.fadeIn({
				duration: this.overlayDuration,
				endOpacity: this.overlayOpacity,
				callback: function() {
					urls = [];

					var index = 0;
					urls.push([url.href, url.title]);


					// calculate top and left offset for the lightbox
					var pageScroll = Ext.fly(document).getScroll();

					var lightboxTop = pageScroll.top + (Ext.lib.Dom.getViewportHeight() / 10);
					var lightboxLeft = pageScroll.left;
					els.lightbox.setStyle({
						top: lightboxTop + 'px',
						left: lightboxLeft + 'px'
					}).show();
					els.shim.setStyle({
						width: fWidth + 'px',
						height: fHeight + 'px',
						alpha:	'(opacity=0)'
					})
					this.setUrl(index, fWidth, fHeight);

					this.fireEvent('open', urls[index]);
				},
				scope: this
			});
		},
		
		openMessage: function(mText, fWidth, fHeight) {
			fWidth = fWidth || width;
			fHeight = fHeight || height;
			 
			this.setViewSize();
			els.overlay.fadeIn({
				duration: this.overlayDuration,
				endOpacity: this.overlayOpacity,
				callback: function() {
					

					// calculate top and left offset for the lightbox
					var pageScroll = Ext.fly(document).getScroll();

					var lightboxTop = pageScroll.top + (Ext.lib.Dom.getViewportHeight() / 10);
					var lightboxLeft = pageScroll.left;
					els.lightbox.setStyle({
						top: lightboxTop + 'px',
						left: lightboxLeft + 'px'
					}).show();
					els.msg.setStyle({
						width: fWidth-30 + 'px',
						height: fHeight-30 + 'px'
					})
					this.setMessage(mText, fWidth, fHeight);

					this.fireEvent('open', mText);
				},
				scope: this
			});		
		},
		
		openLoader: function(fWidth, fHeight) {
			fWidth = fWidth || width;
			fHeight = fHeight || height;
			 
			this.setViewSize();
			els.overlay.fadeIn({
				duration: this.overlayDuration,
				endOpacity: this.overlayOpacity,
				callback: function() {
					

					// calculate top and left offset for the lightbox
					var pageScroll = Ext.fly(document).getScroll();

					var lightboxTop = pageScroll.top + (Ext.lib.Dom.getViewportHeight() / 10);
					var lightboxLeft = pageScroll.left;
					els.lightbox.setStyle({
						top: lightboxTop + 'px',
						left: lightboxLeft + 'px'
					}).show();
					els.msg.setStyle({
						width: fWidth + 'px',
						height: fHeight + 'px'
					})
					this.setLoader(fWidth, fHeight);

					this.fireEvent('open', '#Loader#');
				},
				scope: this
			});		
		},
		
		setViewSize: function(){
			var viewSize = this.getViewSize();
			els.overlay.setStyle({
				width: viewSize[0] + 'px',
				height: viewSize[1] + 'px'
			});
			els.shim.setStyle({
				width: viewSize[0] + 'px',
				height: viewSize[1] + 'px'
			}).show();
		},

		setImage: function(index){
			activeImage = index;

			this.disableKeyNav();
			if (this.animate) {
				els.loading.show();
			}

			els.image.hide();
			els.shim.hide();
			els.msg.hdie();
			els.hoverNav.hide();
			els.navPrev.hide();
			els.navNext.hide();
			els.dataContainer.setOpacity(0.0001);
			els.imageNumber.hide();
			
			var preload = new Image();
			preload.onload = (function(){
				els.image.dom.src = images[activeImage][0];
				this.resizeImage(preload.width, preload.height);
			}).createDelegate(this);
			preload.src = images[activeImage][0];
			els.navClose.show();
			
		},

		setMessage: function(mText, fWidth, fHeight){
			
			els.msg.update('');
			this.disableKeyNav();
			if (this.animate) {
				els.loading.show();
			}

			els.image.hide();
			els.shim.hide();
			els.msg.hide();
			els.hoverNav.hide();
			els.navPrev.hide();
			els.navNext.hide();
			els.dataContainer.setOpacity(0.0001);
			els.imageNumber.hide();
			
			els.msg.update(mText);
			els.msg.show();
			els.navClose.show();
			
			this.resizeBox(fWidth, fHeight);
			els.loading.hide();
		},

		setLoader: function(fWidth, fHeight){
			fWidth = fWidth || width;
			fHeight = fHeight || height;
			
			this.disableKeyNav();
			if (this.animate) {
				els.loading.show();
			}

			els.image.hide();
			els.shim.hide();
			els.msg.hide();
			els.hoverNav.hide();
			els.navPrev.hide();
			els.navNext.hide();
			els.dataContainer.setOpacity(0.0001);
			els.imageNumber.hide();
			els.navClose.hide();
			
			this.resizeBox(fWidth, fHeight);
			
		},

		setUrl: function(index, fWidth, fHeight){
			activeUrl = index;

			this.disableKeyNav();
			if (this.animate) {
				els.loading.show();
			}

			els.shim.hide();
			els.msg.hide();
			els.image.hide();
			els.hoverNav.hide();
			els.navPrev.hide();
			els.navNext.hide();
			els.dataContainer.setOpacity(0.0001);
			els.imageNumber.hide();

			els.shim.dom.src = urls[activeUrl][0];
			els.shim.show();
			els.navClose.show();
			
			this.resizeBox(fWidth, fHeight);
			els.shim.setStyle({
				alpha:	'(opacity=100)'
			});
			els.loading.hide();
		},
		
		resizeBox: function(w,h) {
			var wCur = els.outerImageContainer.getWidth();
			var hCur = els.outerImageContainer.getHeight();

			var wNew = w;
			var hNew = h;

			var wDiff = wCur - wNew;
			var hDiff = hCur - hNew;

			var queueLength = 0;

			if (hDiff != 0 || wDiff != 0) {
				els.outerImageContainer.syncFx()
					.shift({
						height: hNew,
						duration: this.resizeDuration
					})
					.shift({
						width: wNew,
						duration: this.resizeDuration
					});
				queueLength++;
			}

			var timeout = 0;
			if ((hDiff == 0) && (wDiff == 0)) {
				timeout = (Ext.isIE) ? 250 : 100;
			}

			(function(){
				els.hoverNav.setWidth(els.imageContainer.getWidth() + 'px');

				els.navPrev.setHeight(w + 'px');
				els.navNext.setHeight(h + 'px');

				els.outerDataContainer.setWidth(wNew + 'px');
				els.dataContainer.setOpacity(100);

			}).createDelegate(this).defer((this.resizeDuration*1000) + timeout);
		},
		
		resizeImage: function(w, h, urlmode){
			var wCur = els.outerImageContainer.getWidth();
			var hCur = els.outerImageContainer.getHeight();

			var wNew = (w + this.borderSize * 2);
			var hNew = (h + this.borderSize * 2);

			var wDiff = wCur - wNew;
			var hDiff = hCur - hNew;

			var queueLength = 0;

			if (hDiff != 0 || wDiff != 0) {
				els.outerImageContainer.syncFx()
					.shift({
						height: hNew,
						duration: this.resizeDuration
					})
					.shift({
						width: wNew,
						duration: this.resizeDuration
					});
				queueLength++;
			}

			var timeout = 0;
			if ((hDiff == 0) && (wDiff == 0)) {
				timeout = (Ext.isIE) ? 250 : 100;
			}

			(function(){
				els.hoverNav.setWidth(els.imageContainer.getWidth() + 'px');

				els.navPrev.setHeight(h + 'px');
				els.navNext.setHeight(h + 'px');

				els.outerDataContainer.setWidth(wNew + 'px');

				this.showImage();
			}).createDelegate(this).defer((this.resizeDuration*1000) + timeout);
		},

		showImage: function(){
			els.loading.hide();
			els.image.fadeIn({
				duration: this.resizeDuration,
				scope: this,
				callback: function(){
					this.updateDetails();
				}
			});
			this.preloadImages();
		},

		updateDetails: function(){
			els.details.setWidth((els.data.getWidth(true) - els.navClose.getWidth() - 10) + 'px');

			els.caption.update(images[activeImage][1]);

			els.caption.show();
			if (images.length > 1) {
				els.imageNumber.update(this.labelImage + ' ' + (activeImage + 1) + ' ' + this.labelOf + '  ' + images.length);
				els.imageNumber.show();
			}

			els.dataContainer.syncFx()
				.slideIn('t', {
					duration: this.resizeDuration/2
				})
				.fadeIn({
					duration: this.resizeDuration/2,
					scope: this,
					callback: function() {
						var viewSize = this.getViewSize();
						els.overlay.setHeight(viewSize[1] + 'px');
						this.updateNav();
					}
				})
		},

		updateNav: function(){
			this.enableKeyNav();

			els.hoverNav.show();

			// if not first image in set, display prev image button
			if (activeImage > 0)
				els.navPrev.show();

			// if not last image in set, display next image button
			if (activeImage < (images.length - 1))
				els.navNext.show();
		},

		enableKeyNav: function() {
			Ext.fly(document).on('keydown', this.keyNavAction, this);
		},

		disableKeyNav: function() {
			Ext.fly(document).un('keydown', this.keyNavAction, this);
		},

		keyNavAction: function(ev) {
			var keyCode = ev.getKey();

			if (
				keyCode == 88 || // x
				keyCode == 67 || // c
				keyCode == 27
			) {
				this.close();
			}
			else if (keyCode == 80 || keyCode == 37){ // display previous image
				if (activeImage != 0){
					this.setImage(activeImage - 1);
				}
			}
			else if (keyCode == 78 || keyCode == 39){ // display next image
				if (activeImage != (images.length - 1)){
					this.setImage(activeImage + 1);
				}
			}
		},

		preloadImages: function(){
			var next, prev;
			if (images.length > activeImage + 1) {
				next = new Image();
				next.src = images[activeImage + 1][0];
			}
			if (activeImage > 0) {
				prev = new Image();
				prev.src = images[activeImage - 1][0];
			}
		},

		close: function(){
			this.disableKeyNav();
			els.lightbox.hide();
			els.overlay.fadeOut({
				duration: this.overlayDuration
			});
			els.shim.hide();
			this.fireEvent('close', activeImage);
		},

		getViewSize: function() {
			return [Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom.getViewHeight(true)];
		}
	}
})();

Ext.onReady(Ext.ux.Lightbox.init, Ext.ux.Lightbox);