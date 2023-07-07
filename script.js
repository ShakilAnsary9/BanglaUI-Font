// Get the range inputs and preview elements
const rangeInput1 = document.getElementById("customRange1");
const rangeInput2 = document.getElementById("customRange2");
const previews = document.getElementsByClassName("preview");

// Set the initial font size
const initialFontSize = 26;
for (let i = 0; i < previews.length; i++) {
  previews[i].style.fontSize = `${initialFontSize}px`;
}

// Add event listeners to the range inputs
rangeInput1.addEventListener("input", updateFontSize);
rangeInput2.addEventListener("input", updateFontWeight);

// Function to update the font size of the preview elements
function updateFontSize() {
  const fontSize = parseInt(rangeInput1.value);
  for (let i = 0; i < previews.length; i++) {
    previews[i].style.fontSize = `${fontSize}px`;
  }
}

// Function to update the font weight of the preview elements
function updateFontWeight() {
  const fontWeight = parseInt(rangeInput2.value);
  for (let i = 0; i < previews.length; i++) {
    previews[i].style.fontWeight = fontWeight;
  }
}

function updatePreview(value) {
  var previews = document.getElementsByClassName("preview");
  var defaultValue = "আমার সোনার বাংলা";

  if (value.trim() === "") {
    value = defaultValue;
  }

  for (var i = 0; i < previews.length; i++) {
    previews[i].innerHTML = value;
  }
}
