function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function randColour() {
  const r =Math.floor(Math.random()*255);
  const g =Math.floor(Math.random()*255);
  const b =Math.floor(Math.random()*255);

  const brightness = (299*r + 587*g + 114*b) / 1000

  return { 
    rgb: `rgb(${r},${g},${b})`,
    hex: rgbToHex(r,g,b).toUpperCase(),
    labelColour: brightness > 100 ? 'rgb(30,30,30)' : 'rgb(200,200,200)',
  };
}

function createNewBlock() {
  const colour = randColour();

  const block = document.createElement('DIV');
  block.classList.add('block')
  block.style.backgroundColor = colour.rgb;

  var blocks = document.querySelectorAll('.block');

  if (blocks.length !== 0) {
    const closeButton = document.createElement('DIV');
    closeButton.classList.add('close-button');
    closeButton.style.color = colour.hex;
    closeButton.innerHTML = 'x'
    closeButton.style.cursor = 'pointer';
  
    closeButton.addEventListener('click', event => {
      const colourBlock = closeButton.parentNode;
      const row = colourBlock.parentNode;
      row.removeChild(colourBlock);
    });

    block.addEventListener('mouseenter', () => {
      closeButton.style.color = colour.labelColour;
    });
  
    block.addEventListener('mouseleave', () => {
      closeButton.style.color = colour.hex;
    });

    block.addEventListener('touchstart', ({ target }) => {
      if (!target.getAttribute('isTapped') || target.getAttribute('isTapped') == 'false') {
        target.setAttribute('isTapped', true);
        closeButton.style.color = colour.labelColour;
      } else {
        target.setAttribute('isTapped', false);
        closeButton.style.color = colour.hex;
      }

    });

    block.appendChild(closeButton);
  }


  const label = document.createElement('DIV');
  label.classList.add('colour-label');
  label.style.color = colour.labelColour;
  label.innerHTML = colour.hex + '<br/>' + colour.rgb;

  
  block.appendChild(label);

  return block;
}

const button = document.querySelector('.add-block');

button.addEventListener('click', event => {
  const row = button.parentNode;
  const newNode = createNewBlock();
  row.insertBefore(newNode, row.lastElementChild);

  window.scrollBy(300,0)
});

const firstRow = button.parentNode;
const newNode = createNewBlock();
firstRow.insertBefore(newNode, firstRow.lastElementChild);