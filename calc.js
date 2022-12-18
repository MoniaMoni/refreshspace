const content = document.getElementById('main');
const spatial = document.getElementById('spatial');
const flat = document.getElementById('flat');
const circuit = document.getElementById('circuit');

const flat_checks = document.querySelectorAll('div#flat input[type="checkbox"]');
const spatial_checks = document.querySelectorAll('div#spatial input[type="checkbox"]');
const reset_button = document.querySelector('button[type="reset"]');


function compute_spatial(width, len, height, price) {
  let out = (width + len) * 2 * height * price;
  console.log('---------> ' + out)
  return 2 * (width + len) * height * price;
}

function compute_flat(width, len, price) {
  return width * len * price;
}

function compute_circuit(width, len, price) {
  return 2 * (width + len) * price;
}

function getInputValue(parent, name) {
  let input_field = document.querySelector('div#' + parent.id + ' input[name="' + name + '"]');

  if (input_field == undefined || input_field == null) {
    return undefined;
  } else if (input_field.value == '') {
    return 0;
  } else {
    return parseFloat(input_field.value);
  }
}

function getChecked(parent) {
  let out;
  let checkboxes = document.querySelectorAll('div#' + parent.id + ' input[type="checkbox"]');
  if (checkboxes.length > 0) {
    checkboxes.forEach((cb) => {
      if (cb.checked == true) {
        console.log('true');
        out = cb;
      }
    })
  }
  return out;
}

// checkboxes switching

let ceil = document.querySelector('div#flat input.ceil');
let floor = document.querySelector('div#flat input.floor');

for(var i = 0; i < flat_checks.length; i++) {
  flat_checks[i].addEventListener('change', function() {   
    if (this == ceil) {
      floor.checked = !this.checked;
    } else {
      ceil.checked = !this.checked;
    }
  });
}

let walls = document.querySelector('div#spatial input.walls');
let wAndC = document.querySelector('div#spatial input.wAndC');

for(var i = 0; i < spatial_checks.length; i++) {
  spatial_checks[i].addEventListener('change', function() {   
    if (this == wAndC) {
      walls.checked = !this.checked;
    } else {
      wAndC.checked = !this.checked;
    }
  });
}

const submit_buttons = document.querySelectorAll('button[type="submit"]');
const spatial_sub = document.querySelector('div#spatial button');
const flat_sub = document.querySelector('div#flat button');
const circuit_sub = document.querySelector('div#circuit button');
const additive_sub = document.querySelector('div#additive button');
const out_table = document.querySelector('div#output table');
const sum_field = document.querySelector('div#output table tr.comp_sum td[name="comp_sum"]');

let sum = 0;

function broadcastValue(value, input_name) {
  console.log('input[name="' + input_name + '"]')
  console.log(document.querySelectorAll('input[name="' + input_name + '"]')[0])
  document.querySelectorAll('input[name="' + input_name + '"]').forEach((number_field) => {
    number_field.value = value;
  });
  return;
}

submit_buttons.forEach(function (button) {
  button.addEventListener('click', () => {
    let len, width, height, price, parent, description_box, computed_price;

    parent = button.parentNode;
    len = getInputValue(parent, 'len');
    width = getInputValue(parent, 'width');
    height = getInputValue(parent, 'height');
    price = getInputValue(parent, 'price');
    description_box = getChecked(parent);

    if (out_table.hidden == true) {
      out_table.hidden = false;
    }

    if (parent.id == 'spatial') {
      broadcastValue(len, 'len');
      broadcastValue(width, 'width');
      if (description_box.classList[0] == 'walls') {
        computed_price = compute_spatial(width, len, height, price);
      } else {
        computed_price = compute_spatial(width, len, height, price) + compute_flat(width, len, price);
      }
    } else if (parent.id == 'flat') {
      broadcastValue(len, 'len');
      broadcastValue(width, 'width');
      computed_price = compute_flat(width, len, price);

    } else if (parent.id == 'circuit') {
      broadcastValue(len, 'len');
      broadcastValue(width, 'width');
      computed_price = compute_circuit(width, len, price);

    } else if (parent.id == 'additive') {
      computed_price = price;
    }
    sum += computed_price;
    sum_field.innerHTML = sum.toFixed(2);
    console.log(sum)
  })
})

reset_button.addEventListener('click', () => {
  sum = 0;
  sum_field.innerHTML = '';
  document.querySelectorAll('table tr.comp_part').forEach((row) => {
    row.innerHTML = '';
  })

  if (out_table.hidden == false) {
    out_table.hidden = true;
  }

  document.querySelectorAll('input[type="number"]').forEach((number) => {
    number.value = '';
  });

  console.log(sum)
})

// generate table rows
