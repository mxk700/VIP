(function setScrollToTop(){
  var but = document.getElementById("go_up");
  but && but.addEventListener("click", function(){
    try{
      window.scrollTo({ top: 0, behavior: 'smooth'})
    }
    catch(err){
      window.scrollTo(0, 0);
    }
  });
})();

(function setScrollToQuestion(){
  var but = document.getElementById("question");
  var elem = document.querySelector(".quick_question");

  (but && elem) && but.addEventListener("click", function(){
    var elTop = elem.offsetTop;
    try{
      window.scrollTo( { top: elTop, behavior: 'smooth'} );
    }
    catch(err){
      window.scrollTo( 0, elTop );
    }
  });
})();

(function hideUpButtonOnTop(){
  var but = document.querySelector("footer .buttons_box");

  but && window.addEventListener("scroll", function(e){
    var action = window.scrollY > 300 ? "remove" : "add";
    but.classList[action]("hidden");
  });

})();

