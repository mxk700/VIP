(function setSlider(){
  var sliderBox = document.getElementById("slider_box");
  var thumbs    = document.getElementById("slider_thumbs");
  var arrows    = document.getElementById("sl_arrow_box");

  var throttlerFlag = false;
  var THROTTLING_TIME = 1000; // for best perfomance this digit must match transition time css

  var max = thumbs.childElementCount - 1;

  arrows.addEventListener("click", function(e){
    var shift = e.target.classList.contains("left") ? -1 : 1;
    var newCurIndex = getNextSliderIndex(shift);
    setNewSlider(newCurIndex, shift);
  });

  thumbs.addEventListener("click", function(e){
    var liElem = (function getParentLi(elem){
      if(elem.tagName === "LI" && elem.parentElement.id === "slider_thumbs"){
        return elem;
      }
      if(elem.id === "slider_thumbs") return false;
      return getParentLi(elem.parentElement);
    })(e.target);

    if(!liElem) return;

    var newCurIndex = +liElem.dataset.number;
    setNewSlider(newCurIndex);
  });

  function getNextSliderIndex(shift){
    var cur = +thumbs.querySelector(".active").dataset.number;
    var newCurIndex = cur + shift;

    (newCurIndex < 0) && (newCurIndex = max);
    (newCurIndex > max) && (newCurIndex = 0);

    return newCurIndex;
  }

  function setNewSlider(index, shift){
    if(throttlerFlag) return;

    var prevMoved = sliderBox.querySelectorAll(".appearFromRight, .appearFromLeft");
    prevMoved.forEach( function(elem){
      elem.classList.remove("appearFromLeft");
      elem.classList.remove("appearFromRight");
    });

    var prevMoved = sliderBox.querySelectorAll(".hideToLeft, .hideToRight");
    prevMoved.forEach( function(elem){
      elem.classList.remove("active");
      elem.classList.remove("hideToLeft");
      elem.classList.remove("hideToRight");
    });

    var curIndex = +thumbs.querySelector(".active").dataset.number;
    if(index == curIndex) return; // the same thumbnail, do nothing;

    var curSlider = sliderBox.querySelector(".slider_item.active");
    var nextSlider = sliderBox.querySelectorAll(".slider_item")[index];

    nextSlider.classList.add("active");

    var cond = null;
    if(shift){
      cond = (shift > 0) ?  true : false;
    }else{
      cond = (index > curIndex) ?  true : false;
    }

    if(cond){      // click to right button
      nextSlider.classList.add("appearFromRight");
      curSlider.classList.add("hideToLeft");
    }else{         // click to left button
      nextSlider.classList.add("appearFromLeft");
      curSlider.classList.add("hideToRight");
    }

    thumbs.querySelector(".active").classList.remove("active");
    thumbs.querySelectorAll("li")[index].classList.add("active");

    throttlerFlag = true;
    setTimeout( function(){ throttlerFlag = false; }, THROTTLING_TIME);
  }
})();
