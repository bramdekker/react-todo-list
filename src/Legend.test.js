import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Legend from './Legend';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('displays the legend correctly', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<Legend />, container);
  });
  const allTextElements = container.querySelectorAll('span span span');

  const schoolBox = allTextElements[0];
  expect(schoolBox.textContent).toBe("School");
  
  const workBox = allTextElements[1];
  expect(workBox.textContent).toBe("Work");
  
  const houseBox = allTextElements[2];
  expect(houseBox.textContent).toBe("Housekeeping");
  
  const otherBox = allTextElements[3];
  expect(otherBox.textContent).toBe("Other");
});