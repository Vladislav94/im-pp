var slider = document.getElementById('range');
  noUiSlider.create(slider, {
  start: [ 50000, 150000 ], // Handle start position
  step: 1, // Slider moves in increments of '10'
  connect: true, // Display a colored bar between the hand
  range: { // Slider can select '0' to '100'
    'min': 0,
    'max': 200000
  }
});

  var valueInput = document.querySelector('.input-from'),
      valueInput2 = document.querySelector('.input-to');

slider.noUiSlider.on('update', function( values, handle ) {
  if ( handle ) {
    valueInput2.value = values[handle];
  } else {
    valueInput.value = values[handle];
  }
});

// When the input changes, set the slider value

valueInput.addEventListener('change', function(){
  slider.noUiSlider.set([this.value,null]);
});

valueInput2.addEventListener('change', function(){
  slider.noUiSlider.set([null, this.value]);
});


var snapValues = [
  document.querySelector('.slider-snap-value-lower'),
  document.querySelector('.slider-snap-value-upper')
];

slider.noUiSlider.on('update', function( values, handle ) {
  snapValues[handle].innerHTML = values[handle];
});