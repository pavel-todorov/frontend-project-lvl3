// import _ from 'lodash';
import './js/bootstrap.min';
import './css/bootstrap.min.css';

function component() {
  const label = document.createElement('label');
  label.setAttribute('for', 'exampleRSS');
  label.textContent = 'RSS link:';

  const input = document.createElement('input');
  input.type = 'rss';
  input.classList.add('form-control');
  input.id = 'cssLink';

  const formGroup = document.createElement('div');
  formGroup.classList.add('form-group');
  formGroup.appendChild(label);
  formGroup.appendChild(input);

  const button = document.createElement('button');
  button.type = 'submit';
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Submit';

  const form = document.createElement('form');
  form.appendChild(formGroup);
  form.appendChild(button);

  const main = document.createElement('div');
  main.appendChild(form);

  return main;
}

document.body.appendChild(component());
