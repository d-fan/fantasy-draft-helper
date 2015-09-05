function createTextArea() {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';

    return textArea;
}

function copyBest() {
    // Copy
    textarea = createTextArea();
    textarea.value = avail.find("tr:visible:not(.header)").first().find(".name").html();
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function togglePlayer(element, list, other) {
    if (element.hasClass("header")) {
        return;
    }
    element.hide();
    $("#" + element.attr("index") + "-" + other).show();
    copyBest();
}

$(function () {
    avail = $('#undrafted');
    taken = $('#drafted');

    // Grab the template script
    var theTemplateScript = $("#undrafted-template").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Add the compiled html to the page
    avail.html(theTemplate({ "players": value, "type": "avail" }));
    taken.html(theTemplate({ "players": value, "type": "taken" }));

    avail.delegate("tr", "click", function() { togglePlayer($(this), avail, "taken"); });
    taken.delegate("tr", "click", function() { togglePlayer($(this), taken, "avail"); });

    $(".deviation").each(function(deviation) {
        hue = Math.min(120, Math.max(0, 120 - (this.innerHTML - 2) * 10));
        lightness = 90 - Math.max(0, 2 * (this.innerHTML - 10));
        this.style.backgroundColor = "hsl(" + hue + ", 100%, " + lightness + "%)"
    })
});
