var DELAY_TIME = 100;
var FADEIN_TIME = 1000;
var IMAGE_MARGIN_FOR_IE = 125;//Don't why the value 125 is.

function showElementWhenClicked(self, e, contents, images){
    e.preventDefault();
    var targetContent = self.attr('href');
    location.hash = targetContent;

    //Hide contents and images and stop animation.
    contents.hide();
    images.hide();

    $(targetContent).delay(DELAY_TIME).fadeIn(FADEIN_TIME, function(){
        //Only for IE
        var userAgent = window.navigator.userAgent.toLowerCase();
        if(userAgent.indexOf('msie') != -1){
            var page_height = $('#layout_center_container').height() + IMAGE_MARGIN_FOR_IE;
            $('.ie #layout_custom_container').height(page_height);
        }

        //Showing a image.
        var targetImage = $('#image_'+ targetContent.substring(1));
        images.hide();
        targetImage.delay(DELAY_TIME).fadeIn(FADEIN_TIME);
    });
}

function clickGivinLinkIfExisted(links) {
    var givinLink = location.hash;
    var goToGivinLink = false;
    var length = links.length;
    var link;

    for(var i=0;i < length; i++) {
        if(givinLink == links.eq(i).attr('href')){
            goToGivinLink = true;
        }
    }

    if(goToGivinLink) {
        link = $("a[href=" + givinLink + "]");
    } else {
        link = links.eq(0); 
    }

    link.click();
}

function fadeInSubtitles(subtitles, delayTime, fadeInTime){
    jQuery.each(subtitles, function(index){
        $(this).delay(delayTime * index).fadeIn(fadeInTime);
   });
}

$(document).ready(function() {
    var title   = $('#title');
    var links   = $('div.subtitle a');
    var divider = $('div.divider');
    var content_container = $('div.content_container');
    var contents = $('div.content', content_container);
    var images   = $('div.image');
    //service/overview
    //var links_in_overview = $('#menu_in_content a');
    var links_in_overview = $('#menu_in_content li');

    //hide
    title.hide();
    links.hide();
    divider.hide();
    contents.hide();
    images.hide();

    //fade in
    title.delay(100).fadeIn(1000);
    $(divider[0]).delay(300).fadeIn(1500);
    fadeInSubtitles(links, 300, 1000);
    $(divider[1]).delay(300).fadeIn(1500);

    links.click(function(e){
        //remove and add active class 
        var prior_active = $('.active');
        prior_active.removeClass('active');
        $(this).addClass('active');

        showElementWhenClicked($(this), e, contents, images);
    });

    links_in_overview.click(function(e){
        var link = $('a', this);

        //remove active class
        var prior_active = $('.active');
        prior_active.removeClass('active');
        //add active class
        var targetHash = link.attr('href');
        jQuery.each(links, function(index){
            var hash = $(this).attr('href');
            if($(this).attr('href') === targetHash){
                $(this).addClass('active');
            }
        });

        showElementWhenClicked(link, e, contents, images);
    });

    jQuery.event.add(window, 'load', function(){
        clickGivinLinkIfExisted(links);
    });
});

