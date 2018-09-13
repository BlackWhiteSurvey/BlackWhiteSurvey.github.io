var backG;

$(document).ready( function() {
    
});

window.addEventListener('DOMContentLoaded', init)


function fadeIn() {
  var t;
  backG.style.opacity = "0";
  backG.style.zIndex = "2";
  cG = calcColour();
  backG.style.backgroundColor = cG;

  if(winner == 1) {
    document.getElementById("textG").innerHTML = "White is winning.";
    document.getElementById("textG").style.color = "black";
  } else {
    document.getElementById("textG").innerHTML = "Black is winning.";
    document.getElementById("textG").style.color = "white";
  }

  if(parseFloat(backG.style.opacity) == 0) {
    t = setInterval(function() {
      if(parseFloat(backG.style.opacity) < 1) {
        backG.style.opacity = (parseFloat(backG.style.opacity) + 0.03).toString();
      } else {
        clearInterval(t);
 //       console.log("Done!");
      }
    }, 10 );
  }
}

  var spreadsheetA = [];
  var bw = [0,0];     //[b,w]
  var cG;
  var winner = 0;   // 0 black; 1 white

  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1NRzhAa8deKKSYGvqy53aaK-HbOT1STmsdBv0HnqTj5Y/edit?usp=sharing';

  function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                     callback: showInfo,
                     simpleSheet: true } )
  }

  function showInfo(data, tabletop) {
//    alert('Successfully processed!')
 //   console.log(data);
    spreadsheetA = data;
    onit();

    bw[0] = parseInt(spreadsheetA[0].BlackTotal);
    bw[1] = parseInt(spreadsheetA[0].WhiteTotal);

  }

  function calcColour() {
    var pW = bw[1] / (bw[0] + bw[1]);
    var hW = Math.floor(pW * 256);
    var hex = rgbToHex(hW, hW, hW);
    if(pW > 0.5) {
      winner = 1;
    } else {
      winner = 0;
    }
    return hex;
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function setup() {
  // Variable to hold request
var request;

  backG = document.getElementById("backG");

// Bind to the submit event of our form
$("#food").submit(function(event){

    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    WhiteChoice.value = "1";
    BlackChoice.value = "1";

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwrtGSJdDR-EXik536LqRjhPDEZwvSYBdPf8IkjjJtaE8ht5CM/exec",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
 //       console.log("Hooray, it worked!");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

    fadeIn();

});

$("#foo").submit(function(event){

    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    WhiteChoice.value = "1";
    BlackChoice.value = "1";

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwrtGSJdDR-EXik536LqRjhPDEZwvSYBdPf8IkjjJtaE8ht5CM/exec",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
 //       console.log("Hooray, it worked!");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

    fadeIn();

});
}

function onit() {
  cG = calcColour();
  setup();
}

