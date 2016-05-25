"use strict";

var dot = require("dot");
var fs = require("fs");
var path = require("path");

var templates = {};

// Do not strip whitespace from the template
dot.templateSettings.strip = false;

function loadTemplate(fileName) {
    return dot.template(fs.readFileSync(__dirname + path.sep + fileName, "utf8"));
}

templates.index = loadTemplate("index.html");
templates.homepage = loadTemplate("homepage.html");

module.exports = templates;
