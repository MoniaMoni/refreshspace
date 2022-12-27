const content = document.getElementById('main');
const spatial = document.getElementById('spatial');
const flat = document.getElementById('flat');
const circuit = document.getElementById('circuit');

const flat_checks = document.querySelectorAll('div#flat input[type="checkbox"]');
const spatial_checks = document.querySelectorAll('div#spatial input[type="checkbox"]');
const reset_button = document.querySelector('button[type="reset"]');


function compute_spatial(width, len, height) {
  return 2 * (width + len) * height;
}

function compute_flat(width, len) {
  return width * len;
}

function compute_circuit(width, len) {
  return 2 * (width + len);
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
const surface_sum_field = document.querySelector('div#output table tr.comp_sum td[name="comp_surface_sum"]');

let sum = 0;
let surface_sum = 0;

function broadcastValue(value, input_name) {
  console.log('input[name="' + input_name + '"]')
  console.log(document.querySelectorAll('input[name="' + input_name + '"]')[0])
  document.querySelectorAll('input[name="' + input_name + '"]').forEach((number_field) => {
    number_field.value = value;
  });
  return;
}

function displayComputedRow(out_table, description, surface, price){
  let row = out_table.insertRow(2);
  row.classList.add("comp_part");
  let cell;
  let row_data = [description, surface.toFixed(2), price.toFixed(2)];
  for(let i = 0; i < 3; i++){
    cell = row.insertCell(i);
    cell.innerHTML = row_data[i];
  }
}

submit_buttons.forEach(function (button) {
  button.addEventListener('click', () => {
    let len, width, height, price, surface, parent_bt, description_box, computed_price;

    parent_bt = button.parentNode;
    len = getInputValue(parent_bt, 'len');
    width = getInputValue(parent_bt, 'width');
    height = getInputValue(parent_bt, 'height');
    price = getInputValue(parent_bt, 'price');
    description_box = getChecked(parent_bt);

    if (out_table.hidden == true) {
      out_table.hidden = false;
    }

    if (parent_bt.id == 'spatial') {
      broadcastValue(len, 'len');
      broadcastValue(width, 'width');
      if (description_box.classList[0] == 'walls') {
        surface = compute_spatial(width, len, height);
        computed_price = surface * price;
      } else {
        surface = compute_spatial(width, len, height) + compute_flat(width, len);
        computed_price = surface * price;
      }
      description = description_box.value;
      
    } else if (parent_bt.id == 'flat') {
      broadcastValue(len, 'len');
      broadcastValue(width, 'width');
      surface = compute_flat(width, len);
      computed_price = surface * price;
      description = description_box.value;

    } else if (parent_bt.id == 'circuit') {
      broadcastValue(len, 'len');
      broadcastValue(width, 'width');
      surface = compute_circuit(width, len)
      computed_price = surface * price;
      description = "Listwy";


    } else if (parent_bt.id == 'additive') {
      computed_price = price;
      surface = 0;
      description = 'Dodatkowa kwota';
    }
    displayComputedRow(out_table, description, surface, computed_price)

    sum += computed_price;
    if(parent_bt.id != 'circuit'){
      surface_sum += surface;
    }
    sum_field.innerHTML = sum.toFixed(2);
    surface_sum_field.innerHTML = surface_sum.toFixed(2);
  })
})

reset_button.addEventListener('click', () => {
  sum = 0;
  surface_sum = 0;
  sum_field.innerHTML = '';
  surface_sum_field.innerHTML = '';
  document.querySelectorAll('table tr.comp_part').forEach((row) => {
    row.remove();
  })

  if (out_table.hidden == false) {
    out_table.hidden = true;
  }

  document.querySelectorAll('input[type="number"]').forEach((number) => {
    number.value = '';
  });
})
