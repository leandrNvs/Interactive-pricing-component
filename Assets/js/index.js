const prices = [
  ["10K pageviews", 8],
  ["50K pageviews", 12],
  ["100K pageviews", 16],
  ["500k pageviews", 24],
  ["1M pageviews", 36],
];

const subtitle = document.querySelector("h2");
const outputValue = document.querySelector("output span.value");
const outputText = document.querySelector("output span.text");

const rangeInput = document.querySelector('input[type="range"]');
const checkInput = document.querySelector('input[type="checkbox"]');

window.onload = function () {
  const price = prices[rangeInput.value];
  const type = checkInput.checked ? "year" : "month";
  render(price[0], price[1], type);

  slideBar(rangeInput);
};

rangeInput.addEventListener("input", function () {
  const index = +this.value;
  const type = checkInput.checked ? "year" : "month";
  const value = discount(prices[index][1], type);

  render(prices[index][0], value, type);
  slideBar(this);
});

checkInput.addEventListener("input", function () {
  const index = +rangeInput.value;
  const type = checkInput.checked ? "year" : "month";
  const value = discount(prices[index][1], type);

  render(prices[index][0], value, type);
});

function render(text, value, type) {
  subtitle.textContent = text;
  outputValue.textContent = "$" + value.toFixed(2);
  outputText.textContent = " /" + type;
}

function discount(value, type) {
  if (type === "month") return value;
  return value - value * 0.25;
}

function slideBar(el) {
  const position = (el.value * 100) / 4;
  el.style.background = `
  linear-gradient(
    to right, 
    hsl(174, 77%, 80%) ${position}%, 
    hsl(224, 65%, 95%) ${position}%
  )`;
}
