document.addEventListener("DOMContentLoaded", () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('page') === 'savvy_blocks_settings' && searchParams.get('tab') === 'block-active') { 
        blockActiveCreateCheckboxSelectAll();
        blockActiveCheckSelectAll();
    }
});

function blockActiveCreateCheckboxSelectAll()
{
    const blockActiveWrapper = document.querySelector('#block-active-wrapper');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'select-alllll';
    checkbox.name = 'select-all';
    checkbox.value = 'Select All';
    
    var label = document.createElement('label')
    label.htmlFor = 'select-all';
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode('Select All'));

    var container = document.createElement('p');
    container.classList = 'block-active-select-all';
    container.appendChild(label)
    blockActiveWrapper.parentNode.prepend(container);

    const allBlocks = blockActiveWrapper.querySelectorAll('.block-name input[type=checkbox]');
    checkbox.onchange = () => {
        allBlocks.forEach(blockItem => { blockItem.checked = checkbox.checked ? true : false });
    }
    
}

function blockActiveCheckSelectAll() 
{
    let selectAllValue = true
    const selectAllCheckbox = document.querySelector('.block-active-select-all #select-all');
    const blockActiveWrapper = document.querySelector('#block-active-wrapper');
    const allBlocks = blockActiveWrapper && blockActiveWrapper.querySelectorAll('.block-name input[type=checkbox]');

    allBlocks.forEach(blockItem => {
        if ( blockItem.checked !== true ){
            selectAllValue = false
        }
    });
    if (selectAllCheckbox !== null) {
        selectAllCheckbox.checked = selectAllValue
    }
}