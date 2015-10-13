/**
 * application script for index.html
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var clickMeButton = document.getElementById("click-me");
    clickMeButton.addEventListener('click', function() {
        alert("You clicked me!");
    });

    var closeButtons= document.querySelectorAll('.alert .close');
    var idx;
    var closeButton;
    for (idx = 0; idx < closeButtons; ++idx) {
        closeButton = closeButtons[idx];
    }

});