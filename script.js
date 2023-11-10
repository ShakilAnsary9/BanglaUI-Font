// Get the range inputs and preview elements
const rangeInput1 = document.getElementById("customRange1");
const rangeInput2 = document.getElementById("customRange2");
const previews = document.getElementsByClassName("preview");

const initialFontSize = 26;
for (let i = 0; i < previews.length; i++) {
  previews[i].style.fontSize = `${initialFontSize}px`;
}

rangeInput1.addEventListener("input", updateFontSize);
rangeInput2.addEventListener("input", updateFontWeight);

// Font Size Change
function updateFontSize() {
  const fontSize = parseInt(rangeInput1.value);
  for (let i = 0; i < previews.length; i++) {
    previews[i].style.fontSize = `${fontSize}px`;
  }
}

// Font Weight Change
function updateFontWeight() {
  const fontWeight = parseInt(rangeInput2.value);
  for (let i = 0; i < previews.length; i++) {
    previews[i].style.fontWeight = fontWeight;
  }
}

// Default Preview Value Set
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

// Copy CDN
const copyIcons = document.querySelectorAll(".copy-icon");
copyIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const input = icon.parentElement.querySelector("input");
    input.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  });
});

// Copy Font Family
function copyFontFamily(inputId) {
  var input = document.getElementById(inputId);
  var tempInput = document.createElement("input");
  tempInput.value = input.value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

function showAlrt(alrtID) {
  const alrtText = document.getElementById(alrtID);
  alrtText.classList.remove("d-none");

  setTimeout(function () {
    alrtText.classList.add("d-none");
  }, 2000);
}
