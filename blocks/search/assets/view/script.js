import $ from 'jquery';

const siteUrl = savvyParams.siteUrl;
let suggestionList = [];

document.addEventListener('DOMContentLoaded', function () {
    const buttonSearch = document.getElementById('submit-filter');

    buttonSearch.addEventListener('click', formInit);

    const optionMenus = document.querySelectorAll(".select-menu");
    optionMenus.forEach((optionMenu) => {
        const selectBtn = optionMenu.querySelector(".select-btn");
        const options = optionMenu.querySelectorAll(".option");
        const inputName = optionMenu.querySelector(".input-name");
        const inputValue = optionMenu.querySelector(".input-value");

        if (selectBtn) {
            selectBtn.addEventListener("click", () => {

                optionMenu.classList.toggle("active");
                closeOtherDropdowns(optionMenu);
            });
        }

        options.forEach((option) => {
            option.addEventListener("click", () => {
                const selectedOptions = []
                const selectedOptionValues = [];
                option.classList.toggle('selected');
                options.forEach( (option) => {
                    const selectedOption = option.querySelector(".option-text").innerText;
                    const selectedOptionValue = option.querySelector(".option-text").getAttribute("data-id");
                    if (option.classList.contains('selected')) {
                        selectedOptions.push(selectedOption)
                        selectedOptionValues.push(selectedOptionValue)
                    }
                })
                inputName.classList.toggle('input-name-placeholder', selectedOptions.length === 0)
                inputName.innerText = selectedOptions.join(', ') || 'Select';
                inputValue.value = selectedOptionValues.join(',');
                optionMenu.classList.remove("active");
            });
        });
    });

    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!target.closest(".select-menu")) {
            closeAllDropdowns();
        }
    });

    function closeAllDropdowns() {
        optionMenus.forEach((optionMenu) => {
            optionMenu.classList.remove("active");
        });
    }

    function closeOtherDropdowns(currentDropdown) {
        optionMenus.forEach((optionMenu) => {
            if (optionMenu !== currentDropdown) {
                optionMenu.classList.remove("active");
            }
        });
    }

    init();
});

function formInit(event) {
    var searchForm = document.getElementById("search-form");
    if (searchForm) {
        let inputSearch = document.getElementById("input-search");
        let isdefault = inputSearch ? inputSearch.classList.contains('savvy-input-search') : false;
        let isAutoComplete = inputSearch ? inputSearch.classList.contains('savvy-input-search-suggestion') : false;
        let isCustomSearch = inputSearch ? inputSearch.classList.contains('savvy-input-search-custom') : false;

        if ( isAutoComplete && !isCustomSearch ) {
            let containsAutoCompleteValue = inputSearch.classList.contains('contains-autocomplete-value')
            if ( !containsAutoCompleteValue ) {
                inputSearch.value = '';
                event.preventDefault();
            }
        }
        var allInputs = searchForm.getElementsByTagName('input');

        for (var i = 0; i < allInputs.length; i++) {
            var input = allInputs[i];

            if (input.name && !input.value) {
                input.name = '';
            }
        }
        searchForm.submit();
    }
}

async function init() {
    let inputWrapper = document.querySelector(".savvy-input-search");
    if (inputWrapper.classList.contains('savvy-input-search-advanced')) {
        advancedAutocomplete(inputWrapper);
    } else {
        let inputWrapperSuggestion = document.querySelector(".savvy-input-search-suggestion");
        let SelectedPostType = inputWrapper && inputWrapper.getAttribute('data-post-type');
        const response = await fetch(`${siteUrl}/wp-json/savvy/v1/search`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_type: SelectedPostType || 'post',
                count: 3
            })
        });
        const postData = await response.json();
        suggestionList = Array.isArray(postData) && postData.map(post => post.title);
        autocomplete(inputWrapperSuggestion, suggestionList);
    }
}

function autocomplete(inputWrapperSuggestion, arr) {
    let currentFocus;

    if (inputWrapperSuggestion) {
        inputWrapperSuggestion.addEventListener("input", function (e) {
            let val = this.value;
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            const suggestionList = document.createElement("DIV");
            suggestionList.setAttribute("id", this.id + "-autocomplete-list");
            suggestionList.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(suggestionList);
            for (let i = 0; i < arr.length; i++) {
                const indx = arr[i].toUpperCase().indexOf(val.toUpperCase())
                if (indx !== -1) {
                    const b = document.createElement("DIV");
                    b.innerHTML = arr[i].substr(0, indx);
                    b.innerHTML += "<strong>" + arr[i].substr(indx, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(indx + val.length);
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                    ['mouseover', 'touchstart'].forEach(function(e) {
                        b.addEventListener(e, function (e) {
                            inputWrapperSuggestion.value = this.getElementsByTagName("input")[0].value;
                        });
                    });

                    b.addEventListener("click", function (e) {
                        inputWrapperSuggestion.value = this.getElementsByTagName("input")[0].value;
                        inputWrapperSuggestion.classList.add('contains-autocomplete-value');
                        // $('.button-search ').click();
                        closeAllLists();
                    });
                    suggestionList.appendChild(b);
                }
            }

            if (suggestionList.innerText === '') {
                const noPosts = document.createElement("DIV");
                noPosts.setAttribute("class", "alert alert-danger text-center my-8");
                noPosts.innerHTML = 'No Posts Found!';
                suggestionList.appendChild(noPosts);
            }
        });

        inputWrapperSuggestion.addEventListener("keydown", function (e) {
            let x = document.getElementById(this.id + "autocomplete-list");
            if (x) {
                x = x.getElementsByTagName("div");
            } else {
                if (e.keyCode === 13) {
                    $('.button-search ').click();
                }
            }

            if (e.keyCode === 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode === 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode === 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                } else {
                    $('.button-search ').click();
                }
            }
        });
    }

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(element) {
        const x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (element !== x[i] && element !== inputWrapperSuggestion) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function advancedAutocomplete(input) {
    input.addEventListener("input", function (e) {
        const val = input.value;

        fetch(`${siteUrl}/wp-json/savvy/v1/search`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_type: input.dataset.postType,
                taxonomies: JSON.parse(input.dataset.taxonomies),
                search_text: val,
                count: 4,
            })
        }).then( (response) => {
            response.json().then(
                (data) => {
                    const arr = data;
                    closeAllLists();
                    if (!val) { return false; }
                    currentFocus = -1;
                    const suggestionList = document.createElement("DIV");
                    suggestionList.setAttribute("id", this.id + "-autocomplete-list");
                    suggestionList.setAttribute("class", "autocomplete-items");
                    this.parentNode.appendChild(suggestionList);
                    for (let i = 0; i < arr.length; i++) {
                        const title = arr[i].title;
                        const indx = title.toUpperCase().indexOf(val.toUpperCase())
                        const item = document.createElement("div");
                        item.classList.add('d-flex', 'justify-content-between')
                        let container;
                        const typeContainer = document.createElement("span");
                        typeContainer.innerText = arr[i].type_name;
                        item.dataset.value = title;
                        if (arr[i].link) {
                            container = document.createElement("a");
                            container.href = arr[i].link;
                        } else {
                            container = document.createElement("span");
                            item.addEventListener("click", function (e) {
                                input.value = item.dataset.value;
                                input.classList.add('contains-autocomplete-value');
                                closeAllLists();
                            });
                        }
                        item.appendChild(container)
                        item.appendChild(typeContainer)

                        if (indx !== -1) {
                            container.innerHTML = title.substr(0, indx);
                            container.innerHTML += "<strong>" + title.substr(indx, val.length) + "</strong>";
                            container.innerHTML += title.substr(indx + val.length);
                        } else {
                            container.innerHTML = title;
                        }
                        suggestionList.appendChild(item);
                    }

                    if (suggestionList.innerText === '') {
                        const noPosts = document.createElement("DIV");
                        noPosts.setAttribute("class", "alert alert-danger text-center my-8");
                        noPosts.innerHTML = 'No Posts Found!';
                        suggestionList.appendChild(noPosts);
                    }
                }
            )
        })
    })

    let currentFocus;

    input.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) {
            x = x.getElementsByTagName("div");
        } else {
            if (e.keyCode === 13) {
                $('.button-search ').click();
            }
        }

        if (e.keyCode === 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            } else {
                $('.button-search ').click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(element) {
        const x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (element !== x[i] && element !== input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
