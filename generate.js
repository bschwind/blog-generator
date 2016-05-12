"use strict";

var fs = require("fs");
var hljs = require("highlight.js");
var path = require("path");
var template = require("./templates/template");
var md = require("markdown-it")({
    html: true,
    linkify: true,
    breaks: true,

    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (err) {}
        }

        return ""; // use external default escaping
    }
});

var rootDir = "articles";
var articleDirs = fs.readdirSync(rootDir);

// YYYYMMDD
var migrationRegex = /\d{8}/;

articleDirs = articleDirs.filter(function (articleDir) {
    return migrationRegex.test(articleDir);
});

// Sort the articles by date
articleDirs.sort();

articleDirs.forEach(function (articleDir) {
    console.log(articleDir);

    var markdownPath = [rootDir, articleDir, "article.txt"].join(path.sep);
    var markdownSource = fs.readFileSync(markdownPath, "utf8");

    var output = template.index({
        html: md.render(markdownSource)
    });

    console.log(output);
});

