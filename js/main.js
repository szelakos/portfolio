	//------------------------------------//
	//Splitting JS//
	//------------------------------------//
	console.clear();
	var s = Splitting();
	
	//------------------------------------//
	//Cursor//
	//------------------------------------//
	$(document)
		.mousemove(function(e) {
		$('.cursor')
			.eq(0)
			.css({
			left: e.pageX - 18,
			top: e.pageY - 18
		});
	});

	$(document).on("mousemove", function(e) {
		var mouseX = e.pageX;
		var mouseY = e.pageY;
	});

	var cursor = $(".cursor");

	$("a, .menu-toggle").on("mouseenter", function() {
		cursor.addClass("active");
	});
	$("a, .menu-toggle").on("mouseleave", function() {
		cursor.removeClass("active");
	});

	//------------------------------------//
	//Scroll Animations//
	//------------------------------------//
	var $animation_elements = $('.moveUp, .fadeIn, .work-list, .slide-in .char');
		var $window = $(window);

		function check_if_in_view() {
		  var window_height = $window.height();
		  var window_top_position = $window.scrollTop();
		  var window_bottom_position = (window_top_position + window_height);

		  $.each($animation_elements, function() {
		    var $element = $(this);
		    var element_height = $element.outerHeight();
		    var element_top_position = $element.offset().top;
		    var element_bottom_position = (element_top_position + element_height);

		    //check to see if this current container is within viewport
		    if ((element_bottom_position >= window_top_position) &&
		        (element_top_position <= window_bottom_position)) {
		      $element.addClass('in-view');
		    }
		  });
		}

	$window.on('scroll resize', check_if_in_view);
	$window.trigger('scroll');

	//------------------------------------//
	//Navigation Panel//
	//------------------------------------//
	$('#toggle').click(function() {
	 $(this).toggleClass('active');
	 $('#overlay').toggleClass('open');
	 $('body').toggleClass('overflow-hidden');
	 $('#main').toggleClass('body-zoomout');
	});

	//------------------------------------//
	//Color Sections//
	//------------------------------------//
	$(window).scroll(function() {

	  // selectors
	  var $window = $(window),
	      $body = $('body'),
	      $panel = $('section, header');

	  // Change 33% earlier than scroll position so colour is there when you arrive.
	  var scroll = $window.scrollTop() + ($window.height() / 2);

	  $panel.each(function () {
	    var $this = $(this);

	    // if position is within range of this panel.
	    // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
	    // Remember we set the scroll to 33% earlier in scroll var.
	    if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

	      // Remove all classes on body with color-
	      $body.removeClass(function (index, css) {
	        return (css.match (/(^|\s)fade-\S+/g) || []).join(' ');
	      });

	      // Add class of currently active div
	      $body.addClass('fade-' + $(this).data('background-color'));
	    }
	  });

	}).scroll();

	//------------------------------------//
	//Hover Reveal//
	//------------------------------------//
	const mapNumber = (X,A,B,C,D) => (X-A)*(D-C)/(B-A)+C;
    // from http://www.quirksmode.org/js/events_properties.html#position
	const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
		if (!e) e = window.event;
		if (e.pageX || e.pageY) {
            posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
        return { x : posx, y : posy }
    }
    // Generate a random float.
    const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

    // Hover Effect
    class HoverImgFx1 {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.reveal = document.createElement('div');
            this.DOM.reveal.className = 'hover-reveal';
            this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
            this.DOM.el.appendChild(this.DOM.reveal);
            this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
            this.DOM.revealInner.style.overflow = 'hidden';
            this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');

            this.initEvents();
        }
        initEvents() {
            this.positionElement = (ev) => {
                const mousePos = getMousePos(ev);
                const docScrolls = {
                    left : document.body.scrollLeft + document.documentElement.scrollLeft, 
                    top : document.body.scrollTop + document.documentElement.scrollTop
                };
                this.DOM.reveal.style.top = `${mousePos.y+20-docScrolls.top}px`;
                this.DOM.reveal.style.left = `${mousePos.x+20-docScrolls.left}px`;
            };
            this.mouseenterFn = (ev) => {
                this.positionElement(ev);
                this.showImage();
            };
            this.mousemoveFn = ev => requestAnimationFrame(() => {
                this.positionElement(ev);
            });
            this.mouseleaveFn = () => {
                this.hideImage();
            };
            
            this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
            this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
            this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
        }
        showImage() {
            TweenMax.killTweensOf(this.DOM.revealInner);
            TweenMax.killTweensOf(this.DOM.revealImg);

            this.tl = new TimelineMax({
                onStart: () => {
                    this.DOM.reveal.style.opacity = 1;
                    TweenMax.set(this.DOM.el, {zIndex: 1000});
                }
            })
            .add('begin')
            .add(new TweenMax(this.DOM.revealInner, 0.2, {
                ease: Sine.easeOut,
                startAt: {x: '-100%'},
                x: '0%'
            }), 'begin')
            .add(new TweenMax(this.DOM.revealImg, 0.2, {
                ease: Sine.easeOut,
                startAt: {x: '100%'},
                x: '0%'
            }), 'begin');
        }
        hideImage() {
            TweenMax.killTweensOf(this.DOM.revealInner);
            TweenMax.killTweensOf(this.DOM.revealImg);

            this.tl = new TimelineMax({
                onStart: () => {
                    TweenMax.set(this.DOM.el, {zIndex: 999});
                },
                onComplete: () => {
                    TweenMax.set(this.DOM.el, {zIndex: ''});
                    TweenMax.set(this.DOM.reveal, {opacity: 0});
                }
            })
            .add('begin')
            .add(new TweenMax(this.DOM.revealInner, 0.2, {
                ease: Sine.easeOut,
                x: '100%'
            }), 'begin')
            
            .add(new TweenMax(this.DOM.revealImg, 0.2, {
                ease: Sine.easeOut,
                x: '-100%'
            }), 'begin');
        }
	}
	
	[...document.querySelectorAll('[data-fx="1"] > a, a[data-fx="1"]')].forEach(link => new HoverImgFx1(link));

	//------------------------------------//
	//Displacement//
	//------------------------------------//
	class WorkList {
		/**
		 *
		 * @param {object} options
		 */
		constructor(options) {
			const _defaults = {
				workItem: '.js-work-item',
				workItemPreviewList: '.js-work-preview-list',
				workItemImg: '.js-work-preview',
	
				//
				activeItemClass: 'is-active',
	
				//
				workCanvas: '.js-work-preview-canvas',
			};
	
			this.defaults = Object.assign({}, _defaults, options);
	
			if (this.getWorkItem().length > 0) {
				this.init();
				this.workItemHover(this.getWorkItem());
				this.workHover(this.getWorkItemPreviewList());
				this.initWorkCanvas();
			}
		}
	
		// region Getters
	
		/**
		 *
		 * @returns {*|jQuery|HTMLElement}
		 */
		getWorkItem() {
			return $(this.defaults.workItem);
		}
	
		getWorkItemImg() {
			return $(this.defaults.workItemImg);
		}
	
		getWorkItemPreviewList() {
			return $(this.defaults.workItemPreviewList);
		}
	
		getWorkCanvas() {
			return $(this.defaults.workCanvas);
		}
	
		getCanvasEl() {
			return $(this.defaults.workCanvas).find('canvas');
		}
	
		// endregion
	
		init() {
			console.log('WorkList init()');
		}
	
		/**
		 *
		 * @param workItem
		 */
		workItemHover(workItem) {
			workItem.on('mouseenter', (e) => {
				e.preventDefault();
	
				const workItemId = $(e.currentTarget).data('work-preview-id');
	
				this.workHoverEnter(workItemId);
			});
	
			workItem.on('mouseleave', () => {
				this.workHoverLeave();
			});
		}
	
		/**
		 *
		 * @param workContainer
		 */
		workHover(workContainer) {
			$(document).on('mousemove', (ev) => {
				const decimalX = (ev.clientX / window.innerWidth) - 0.5;
				const decimalY = (ev.clientY / window.innerHeight) - 0.5;
	
				TweenMax.to(workContainer, 0.4, {
					x: 0 * decimalX,
					y: 0 * decimalY,
					ease: Power3.easeOut,
				});
			});
	
			// SETTINGS
			const workItem = $(this.defaults.workItem);
			const hoverDuration = 0.15;
			const opacityLevel = 0.3;
	
	
			// CONTEXT SHIFTING
			// mouseenter
			$(document).on('mouseenter', this.defaults.workItem, (ev) => {
				ev.preventDefault();
	
				const notItem = workItem.not(ev.currentTarget);
	
				TweenMax.to(ev.currentTarget, hoverDuration, {
					opacity: 1,
					ease: Power3.easeOut,
				});
	
				TweenMax.to(notItem, hoverDuration, {
					opacity: opacityLevel,
					x: 0,
					ease: Power3.easeOut,
				});
			});
	
			// mouseleave
			$(document).on('mouseleave', this.defaults.workItem, (ev) => {
				ev.preventDefault();
	
				const notItem = workItem.not(ev.currentTarget);
	
				TweenMax.to([ev.currentTarget, notItem], hoverDuration, {
					opacity: 1,
					ease: Power3.easeOut,
				});
			});
		}
	
		initWorkCanvas() {
			// CANVAS DIMENSIONS
			const canvasWidth = this.getWorkItemImg().innerWidth();
			const canvasHeight = this.getWorkItemImg().innerHeight();
	
			// CREATE PIXI APPLICATION
			const app = new PIXI.Application(
				canvasWidth,
				canvasHeight, {
					transparent: true,
				},
			);
	
			// APPEND CANVAS
			this.getWorkCanvas().append(app.view);
	
			// CREATE SLIDES CONTAINER
			this.slidesContainer = new PIXI.Container();
			app.stage.addChild(this.slidesContainer);
	
			// CREATE DISPLACEMENT MAP
			//const displacementMap = PIXI.Sprite.fromImage(this.getWorkCanvas().data('displacement-map'));
		  
			const displacementMap = PIXI.Sprite.fromImage(this.getWorkCanvas().css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''));
	
			// CREATE FILTER
			const filter = new PIXI.filters.DisplacementFilter(displacementMap);
	
			displacementMap.name = 'displacementMap';
			displacementMap.anchor.set(1);
			displacementMap.scale.set(2);
			displacementMap.position.set(canvasWidth / 1, canvasHeight / 1);
	
			app.stage.filterArea = app.screen;
			app.stage.filters = [filter];
			app.stage.addChild(displacementMap);
			
	
			// PIXI SPRITE ARRAY
			for (const spriteImage of this.getWorkItemImg()) {
				//const texture = new PIXI.Texture.fromImage($(spriteImage).data('work-preview'));
							const texture = new PIXI.Texture.fromImage($(spriteImage).css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''));
			  
				const image = new PIXI.Sprite(texture);
	
				image.name = `workPreview`;
				image.alpha = 0;
				image.width = canvasWidth;
				image.height = canvasHeight;
	
				this.slidesContainer.addChild(image);
			}
			
			// DISPLACE TIMELINE
			this.displaceTl = new TimelineMax({
				paused: true,
			});
	
			this.displaceTl.add('start')
				.fromTo(this.getCanvasEl(), 0.2, {
					autoAlpha: 0,
				}, {
					autoAlpha: 1,
					ease: Power4.easeOut,
				}, "start")
				.fromTo(this.getCanvasEl(), 1.5, {
					scale: 1,
				}, {
					scale: 1.06,
					ease: Power4.easeOut,
				}, "start")
				.fromTo(
					filter.scale, 3.5, {
						x: 25,
						y: 75,
					},
					{
						x: 0,
						y: 0,
						ease: Power4.easeOut,
						onComplete: () => {
	
						},
					}, "start",
				);
	
			return [this.slidesContainer, this.displaceTl];
		}
	
		workHoverEnter(layerId) {
			TweenMax.to(this.slidesContainer.children[layerId], 0.6, {
				alpha: 1,
				ease: Power3.easeOut,
				onStart: () => {
					this.displaceTl.progress(0);
					this.displaceTl.play();
				},
			});
		}
	
		workHoverLeave() {
			TweenMax.to(this.slidesContainer.children, 0.2, {
				alpha: 0,
				ease: Power3.easeOut,
			});
		}
		
	}
	
	
	new WorkList();