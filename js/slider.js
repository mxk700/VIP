(function setSlider(){
  var sliderBox = document.getElementById("slider_box");
  var points    = document.getElementById("sl_points_box");
  var arrows    = document.getElementById("sl_arrow_box");

  var max = points.childElementCount - 1;

  arrows.addEventListener("click", function(e){
    var shift = e.target.classList.contains("left") ? -1 : 1;
    newCurIndex = getNextSliderIndex(shift);
    setNewSlider(newCurIndex);
  });

  points.addEventListener("click", function(e){
    if (e.target.tagName !== "BUTTON") return;
    newCurIndex = +e.target.parentElement.dataset.number;
    setNewSlider(newCurIndex);
  });

  function getNextSliderIndex(shift){
    var cur = +points.querySelector(".selected").dataset.number;
    var newCurIndex = cur + shift;

    (newCurIndex < 0) && (newCurIndex = max);
    (newCurIndex > max) && (newCurIndex = 0);

    return newCurIndex;
  }

  function setNewSlider(index){
    sliderBox.querySelector(".slider_item.active").classList.remove("active");
    sliderBox.querySelectorAll(".slider_item")[index].classList.add("active");

    points.querySelector(".selected").classList.remove("selected");
    points.querySelectorAll("li")[index].classList.add("selected");
  }
})();
