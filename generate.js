"use strict";

var fs = require("fs-extra");
var hljs = require("highlight.js");
var path = require("path");
var template = require("./templates/template");
var util = require("util");
var md = require("markdown-it")({
    html: true,
    linkify: true,
    breaks: true,

    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return "<pre class=\"hljs\"><code>" + hljs.highlight(lang, str, true).value + "</code></pre>";
            } catch (err) {}
        }

        return "<pre class=\"hljs\"><code>" + str + "</code></pre>"; // use external default escaping
    }
});

md.renderer.rules.image = function (tokens, idx, options, env, self) {
    var imageProps = tokens[0];

    if (!imageProps) {
        return "IMAGE ERROR";
    }

    var resizedSource;

    imageProps.attrs.forEach(function (attr) {
        if (attr[0] === "src") {
            resizedSource = attr[1];
        }
    });

    var content = imageProps.content;
    var fullSizedSource = resizedSource.replace("resized/", "");

    // TODO - use resized URL and link to full size

    return util.format("<p><div class=\"image-container\"><a href=\"%s\" target=\"_blank\"><img src=\"%s\" alt=\"%s\"></a><p>%s</p></div></p>", fullSizedSource, resizedSource, content, content);
};

var rootDir = __dirname + path.sep + "articles";
var articleDirs = fs.readdirSync(rootDir);

// YYYYMMDD
var migrationRegex = /\d{8}/;

articleDirs = articleDirs.filter(function (articleDir) {
    return migrationRegex.test(articleDir);
});

// Remove the output directory
var outDir = [__dirname, "out"].join(path.sep);
try {
    fs.emptyDirSync(outDir);
    fs.rmdirSync(outDir);
} catch (err) {
    console.error(err);
    // Who cares?
}

fs.mkdirSync(outDir);

// Sort the articles by date
articleDirs.sort();

articleDirs.forEach(function (articleDir) {
    var inputDir = [rootDir, articleDir].join(path.sep);
    var markdownPath = [inputDir, "article.txt"].join(path.sep);
    var markdownSource = fs.readFileSync(markdownPath, "utf8");

    var codeThemePath = [__dirname, "codeThemes", "monokai-sublime.css"].join(path.sep);
    var codeThemeSource = fs.readFileSync(codeThemePath, "utf8");

    var configPath = [inputDir, "config.json"].join(path.sep);
    var config = {};

    try {
        config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    } catch (err) {
        console.error(err);
    }

    var templateData = {
        html: md.render(markdownSource),
        title: config.title || "TODO - Add Title",
        type: config.type || "article",
        description: config.description || "TODO - Add Description",
        images: config.images || ["TODO"],
        code_theme: codeThemeSource
    };

    var output = template.index(templateData);

    var articleOutputDir = [outDir, articleDir].join(path.sep);
    var outputPath = [outDir, articleDir, "index.html"].join(path.sep);
    fs.mkdirSync(articleOutputDir);
    fs.writeFileSync(outputPath, output);

    fs.copySync(inputDir, articleOutputDir);

    var markdownOutput = [articleOutputDir, "article.txt"].join(path.sep);
    var configOutput = [articleOutputDir, "config.json"].join(path.sep);
    fs.unlinkSync(markdownOutput);
    fs.unlinkSync(configOutput);
});

