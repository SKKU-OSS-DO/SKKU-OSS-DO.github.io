/* Custom Script for WP
 * Author: ThemeVan.com
 */
var is_home;

/*Ajax load page content*/
jQuery(function($){
	 "use strict";

     function preload_page(obj){

		 $(obj).each(function(){
				var pagelink=$(this).attr('href'); //Get the page link
				
				var my_preloader=$('.preloader');
				var my_ajax=$('#ajax-load');
				var my_ajax_content=$('#ajax-content');
				  
				$(this).on('click',function(event){
				  $('body').animate({scrollTop:0},'slow');
				  if(event.handled !== true){
					   my_ajax_content.empty();
				   my_preloader.fadeIn();
				   
				   //Ajax Load
				   $.ajax({ 
					  type: "get", 
					  url: pagelink, 
					  cache: false,
					  error: function() {my_ajax_content.html('Loading error!');}, 
					  success: function(data) { 
					    my_ajax_content.append($(data).find('#ajax-body').html());
						setTimeout(function(){
							 my_preloader.fadeOut(function(){
							    my_ajax.slideDown('easeInCubic');
							});
						 },1000);
						
						 my_ajax_content.find('.blog-tags a').removeAttr('href');
						 
						 /*Portfolio slider*/
					     $('.portfolio-slider.flexslider').flexslider({
						   slideshowSpeed: 7000,
						   animationSpeed: 600,
						   pauseOnHover: true,
						   smoothHeight:false,
						   video: true,
						   keyboard: false,
						   controlNav: false,
						   multipleKeyboard: false,
						   start: function() {
							   $('.portfolio-slider').css('background-image','none');
						   }
					     });
					     $("a.single_image,.gallery-icon a,.lightbox").colorbox();
	                     $(".flickr_badge_image a").attr('target','_blank');
						 return;
					  }
				   });
				   event.handled = true;
				  }
				  return false; 
				}); 
				  
				  //Close
				  my_ajax.children('#close_button').click(function(){
					  my_ajax.slideUp('slow');
					  my_ajax_content.empty();
				  });  
		 });
	 }
	 
	 //Action
	 preload_page('a.ajax');
	 preload_page('#ajax-load .link_pages a');
		
});

/** Ajax Comment ***/
jQuery('document').ready(function($){
var commentform=$('#commentform'); // find the comment form
    commentform.prepend('<div id="comment-status" ></div>'); // add info panel before the form to provide feedback or errors
    var statusdiv=$('#comment-status'); // define the info panel
	var list ;
	
    $('a.comment-reply-link').on('click',function(){
	  list = $(this).parent().parent().parent().attr('id');
    });
	 
    commentform.submit(function(){
        //serialize and store form data in a variable
        var formdata=commentform.serialize();
        //Add a status message
        statusdiv.html('<p>Processing...</p>');
        //Extract action URL from commentform
        var formurl=commentform.attr('action');
        //Post Form with data
        
        $.ajax({
            type: 'post',
            url: formurl,
            data: formdata,
            error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    statusdiv.html('<p class="ajax-error" >You might have left one of the fields blank, or be posting too quickly</p>');
                },
            success: function(data, textStatus){
              if(data == "success" || textStatus == "success"){
                    statusdiv.html('<p class="ajax-success" >Thanks for your comment. We appreciate your response.</p>').delay(2000).fadeOut('slow');
					data=data.replace("success","");
                    
					if($("#comments").has("ol.comment-list").length > 0){
							if(list != null){
								$('div.rounded').prepend(data);
							}
							else{
								$('ol.comment-list').append(data);                 
							}
					} 
					else{
					   $("#comments").append('<ol class="comment-list"></ol>');
					   $('ol.comment-list').html(data);
					}
			  }else{
						statusdiv.html('<p class="ajax-error" >Please wait a while before posting your next comment</p>');
						commentform.find('textarea[name=comment]').val('');
			  }
            }
        });
        return false;
    });
	
});

/*Infinite scroll Comment*/
/*jQuery(function($){
	$('ol#comment-list').infinitescroll({
		navSelector: ".comment-navigation a",    
		nextSelector: ".comment-navigation a",
		itemSelector:"ol.comment-list li"
	});
});*/

jQuery('document').ready(function($){
	/*Make the blog links which is included in the book to opened as a new tab or window*/ 
	$('.bb-item .blog-wrapper a').attr('target','_blank');
	
	/*Portfolio slider*/
    $('.portfolio-slider.flexslider').flexslider({
	   slideshowSpeed: 7000,
	   animationSpeed: 600,
	   pauseOnHover: true,
	   smoothHeight:false,
	   video: true,
	   keyboard: false,
	   controlNav: false,
	   multipleKeyboard: false,
	   start: function() {
		   $('.portfolio-slider').css('background-image','none');
	   }
    });
	
	/*FancyBox*/
	//$('.gallery-icon a').attr('kesrc',$('.gallery-icon a').attr('href'));
	$("a.single_image,.gallery-icon a,.lightbox").colorbox({opacity:0.6});
	$(".flickr_badge_image a").attr('target','_blank');
	
	/*Portfolios Filter*/
	if(is_home!==1){
		$('.portfolio-container').isotope({
			  // options
			  itemSelector : '.portfolio-item',
			  layoutMode : 'fitRows'
		});	
		$('.portfolio-filters li').on('click',function(){
			var selector = $(this).attr('data-filter');
			$('.portfolio-container').isotope({ filter: selector });
			//reset fancyBox
			$('.isotope-item').find('.fancybox').removeAttr('rel')
			$('.isotope-item').not('.isotope-hidden').find('.fancybox').attr('rel', 'xxx');
			//reset current filter item
			$(".portfolio-filters>li.active").removeClass('active');
			$(this).addClass('active');
			return false;
		});
	}
	
	//Reset custom heading style
	function rep_heading_style(obj){
		$('.vc_custom_heading').children(obj).each(function(){  
		 var heading_style=$(this).attr('style');
		  var new_style="";
	
		  if(heading_style.indexOf('right')>0){
			   new_style=";float:right;margin-top:0;padding-right:0;";
		  }
		  if(heading_style.indexOf('left')>0){
			   new_style=";padding-left:0;";
		  }
		  if(heading_style.indexOf('center')>0){
			   new_style=";float:none;margin:auto";
		  }
		  $(this).attr('style',heading_style+new_style);
		});
	}
	rep_heading_style('h2');
	rep_heading_style('h3');
	rep_heading_style('h4');
	rep_heading_style('h5');
	rep_heading_style('h6');
	rep_heading_style('div');
	rep_heading_style('p');
	
	/*Sub Menu*/
	$('#nav-scroll ul.sub-menu').parent().children('a').append('<span class="plus"> +</span>')
	
    function menuHoverIn(){
	   $(this).children('ul').slideDown(200);
    }
    function menuHoverOut(){
	   $(this).children('ul').slideUp(300);
    }
	
    $('#nav-scroll li').hoverIntent({
		 sensitivity: 1,
		 interval: 100,
		 over: menuHoverIn,
		 timeout: 0,
		 out: menuHoverOut
    });

	/*Open the social media in new window*/
	$('.social li a').attr('target','_blank');


    /*Make the cover picture page none-scrollable*/
    $('.wpb_single_image.cover').parents('.container').css({
	    'height':'100%',
	    'overflow':'hidden'
    });
    
});