$(function() {

  //SVG Fallback
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };

  $("img, a").on("dragstart", function(event) { event.preventDefault(); });

  $(document).ready(function(){

    $(".status-text").addClass("shown");
    setTimeout(function() {
        $(".status-email").addClass("shown");
    },200);
    setTimeout(function() {
        $(".phone-primary").addClass("shown");
    },300);
    setTimeout(function() {
        $(".phone-secondary").addClass("shown");
    },460);
    setTimeout(function() {
        $(".main-header").addClass("shown");
    },700);

     $(".email-input").on('click', function(){
       $(".email").addClass("focused");
       setTimeout(function() {
           $(".email").removeClass("focused");
       },400);
    });

    $(".email-button").on('click', function(){
      $(".email").addClass("shaky");
      setTimeout(function() {
          $(".email").removeClass("shaky");
      },800);
     });

  $('.block').waypoint(function() {
      $('.block-blue').addClass('shown');
      setTimeout(function() {
          $(".block-purple").addClass("shown");
      },100);
      setTimeout(function() {
          $(".block-green").addClass("shown");
      },100);
      setTimeout(function() {
          $(".block-peach").addClass("shown");
      },200);
  }, { offset: '50%' });

  $('.block-white').waypoint(function() {
      $('.block-white').addClass('shown');
  }, { offset: '100%' });

  $('.tags').waypoint(function() {
      $('.tag-status').addClass('shown');
      setTimeout(function() {
          $(".tag-transaction").addClass("shown");
      },100);
      setTimeout(function() {
          $(".tag-name").addClass("shown");
      },200);
      setTimeout(function() {
          $(".tag-password").addClass("shown");
      },300);
      setTimeout(function() {
          $(".tag-location").addClass("shown");
      },400);
  }, { offset: '90%' });

  $('.block-square').waypoint(function() {
      $('.block-square').addClass('shown');
  }, { offset: '90%' });

  $('.gradient-text').waypoint(function() {
      $('.gradient-text').addClass('shown');
  }, { offset: '90%' });


  });

});
