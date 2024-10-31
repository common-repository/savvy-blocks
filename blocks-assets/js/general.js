document.addEventListener("DOMContentLoaded", () => {
  makeCustomSelectBox();
});

function makeCustomSelectBox() {
  /* Data  Select Option
  * Create Ul Li based on Select Option for better style
   */
  const selects = document.querySelectorAll(".savvy-custom-select-box");
  for (const select of selects) {
    const customSelect = document.createElement("div");
    const originalSelectBox = document.createElement("div");
    const list = document.createElement("ul");
    list.setAttribute('id', `ul_${select.attributes.id.value}`);
    list.classList.add('select-dropdown');
    list.setAttribute('role', 'listbox');

    const button = document.createElement("button");
    button.classList.add('select-button');
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'combobox');
    button.setAttribute('aria-labelledby', 'select button');
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'select-dropdown');

    const listSelectedItem = document.createElement("span");
    listSelectedItem.classList.add('selected-value');

    const listIcon = document.createElement("span");
    listIcon.classList.add('icon-arrow-down');

    const options = select.options;
    const parent = select.parentElement;

    customSelect.classList.add("savvy-custom-select"); //parent Div
    customSelect.tabIndex = 1;
    select.tabIndex = -1;
    listSelectedItem.innerText = select.label;

    button.appendChild(listSelectedItem);
    button.appendChild(listIcon);

    for (let i = 0; i < options.length; i++) {
      const listItem = document.createElement("li");
      listItem.setAttribute('role', 'option');

      const label = document.createElement("label");
      const radioInput = document.createElement("input");
      radioInput.setAttribute('type', 'radio');
      radioInput.setAttribute('name', select.attributes.name.value);
      const opt = options[i];
      for (const attribute of opt.attributes) {
        listItem.dataset[attribute.name] = attribute.value;
      }
      listItem.classList.add("option");
      label.classList.add("label");
      label.innerText = opt.label;
      listItem.dataset.value = opt.value;
      listItem.dataset.label = opt.label;
      label.setAttribute('for', opt.value)
      listItem.onclick = onclick;
      listItem.onkeyup = onkeyup;
      listItem.tabIndex = i + 1;
      listItem.appendChild(radioInput);
      listItem.appendChild(label);
      list.appendChild(listItem);
    }

    parent.insertBefore(customSelect, select);
    customSelect.appendChild(select)
    customSelect.appendChild(button);
    customSelect.appendChild(list);
    list.style.top = `${originalSelectBox.offsetTop + button.offsetHeight}px`;

    Array.from(options).forEach(element => {
      if (element.selected === true) {
        listSelectedItem.innerText = element.selected === true ? element.label : '';
      }
    });

    customSelectBoxEvents(customSelect, select);
  }
}

function customSelectBoxEvents(customSelect, select) {

  const selectBtn = customSelect.querySelector(".select-button");
  const selectedValue = customSelect.querySelector(".selected-value");
  const optionsList = customSelect.querySelectorAll(".select-dropdown li");

  // add click event to select button
  selectBtn.addEventListener("click", (e) => {
    // add/remove active class on the container element
    customSelect.classList.toggle("active");
    // update the aria-expanded attribute based on the current state
    selectBtn.setAttribute(
      "aria-expanded",
      selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
  });

  MouseUpExceptThisElement(customSelect, 'active')

  optionsList.forEach((option) => {
    option.addEventListener("keyup", handler);
    option.addEventListener("click", handler);

    function handler(e) {
      // Click Events
      if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
        select.value = this.children[1].textContent.split('_')[1].trim();
        selectedValue.textContent = this.children[1].textContent;
        customSelect.classList.remove("active");

      }
      // Key Events
      if (e.key === "Enter") {
        select.value = this.children[1].textContent.split('_')[1].trim();
        selectedValue.textContent = this.textContent;
        customSelect.classList.remove("active");
      }
    }
  });
}

function MouseUpExceptThisElement(Element, customClass) {
  document.addEventListener('mouseup', (e) => {
    var container = jQuery(Element);

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass(customClass);
    }
  });
}

// Animations
document.addEventListener('DOMContentLoaded', function () {
  const clickAnimations = document.querySelectorAll('.animate-click');
  clickAnimations.forEach(function (element) {
    element.addEventListener('click', function () {
      element.classList.remove('anim-clicked');
      void element.offsetWidth;
      element.classList.add('anim-clicked');
    });
    element.addEventListener('animationend', () => {
      element.classList.remove('anim-clicked')
    });
  });

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleScroll() {
    const elements = document.querySelectorAll('.animate-init');

    elements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('animate-active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);

  handleScroll();
})