"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// select the list element where the suggestions should go, and all three dropdown elements
//  HINT: look at the HTML
const suggestionList = document.querySelector('#suggestions');
const sunSelection = document.querySelector('#sun');
const moonSelection = document.querySelector('#moon');
const risingSelection = document.querySelector('#rising');
// Here, when the value of sun is changed, we will call the method postAndUpdate.
// Do the same for moon and rising
if (sunSelection !== null) {
    sunSelection.addEventListener("change", postAndUpdate);
}
if (moonSelection !== null) {
    moonSelection.addEventListener("change", postAndUpdate);
}
if (risingSelection !== null) {
    risingSelection.addEventListener("change", postAndUpdate);
}
function postAndUpdate() {
    // empty the suggestionList (you want new suggestions each time someone types something new)
    //  HINT: use .innerHTML
    if (suggestionList === null) {
        console.error("suggestion list is null");
        return;
    }
    suggestionList.innerHTML = "";
    if (sunSelection === null || moonSelection === null || risingSelection === null) {
        console.error("couldn't find one of the sun, moon, rising selection");
        return;
    }
    // add a type annotation to make this of type MatchesRequestData
    const postParameters = {
        // get the text inside the input box
        //  HINT: use sun.value to get the value of the sun field, for example
        sun: sunSelection.value,
        moon: moonSelection.value,
        rising: risingSelection.value
    };
    console.log(postParameters);
    // make a POST request using fetch to the URL to handle this request you set in your Main.java
    //  HINT: check out the POST REQUESTS section of the lab and of the front-end guide.
    //  Make sure you add "Access-Control-Allow-Origin":"*" to your headers.
    //  Remember to add a type annotation for the response data using the Matches type you defined above!
    // Call and fill in the updateSuggestions method in one of the .then statements in the Promise
    //  Parse the JSON in the response object
    //  HINT: remember to get the specific field in the JSON you want to use
    fetch("http://localhost:8080/async-lab", {
        // Request method
        method: 'post',
        // HTTP headers to tell the receiving server what format the data is in
        body: JSON.stringify(postParameters),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }).then((response) => response.json())
        // .json() returns a Promise, so we call .then() again and log the data
        .then((json) => updateSuggestions([json['match1'], json['match2'], json['match3'], json['match4'], json['match5']]))
        // Catch any errors and error log them
        .catch((error) => console.error("Error:", error));
}
function updateSuggestions(matches) {
    // for each element in the set of matches, append it to the suggestionList
    //  HINT: use innerHTML += to append to the suggestions list
    //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
    //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
    //  This makes each element selectable via screen reader.
    if (suggestionList === null) {
        console.error("cannot find suggestion list");
        return;
    }
    suggestionList.innerHTML += `<li tabindex="0">${matches[0]}</li>`;
    suggestionList.innerHTML += `<li tabindex="1">${matches[1]}</li>`;
    suggestionList.innerHTML += `<li tabindex="2">${matches[2]}</li>`;
    suggestionList.innerHTML += `<li tabindex="3">${matches[3]}</li>`;
    suggestionList.innerHTML += `<li tabindex="4">${matches[4]}</li>`;
}
// create an event listener to the document (document.addEventListener) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().
document.addEventListener('keyup', function (e) {
    if (e.code === 'ArrowUp') {
        updateValues('Cancer', 'Leo', 'Gemini')
            .then(() => postAndUpdate());
    }
});
function updateValues(sunval, moonval, risingval) {
    return __awaiter(this, void 0, void 0, function* () {
        // This line asynchronously waits 1 second before updating the values.
        // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
        yield new Promise(resolve => setTimeout(resolve, 1000));
        if (sunSelection === null || moonSelection === null || risingSelection === null) {
            console.error("couldn't find one of the sun, moon, rising selection");
            return;
        }
        sunSelection.value = sunval;
        moonSelection.value = moonval;
        risingSelection.value = risingval;
    });
}
