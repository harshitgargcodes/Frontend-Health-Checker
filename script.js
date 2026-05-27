const htmlTextarea=document.querySelector(".html-input textarea")
const cssTextarea=document.querySelector(".css-input textarea")

function htmlCheck() {
  const htmlIssues = [];
  const htmlcode = htmlTextarea.value;

  if (!htmlcode.includes("<!DOCTYPE html>")) {
    htmlIssues.push("missing-doctype");
  }

  if (!/<html[^>]*lang=["']en["'][^>]*>/i.test(htmlcode)) {
    htmlIssues.push("missing-lang");
  }

  if (!/<title>.*<\/title>/i.test(htmlcode)) {
    htmlIssues.push("missing-head-title");
  }

  if (/<title[^>]*>\s*<\/title>/i.test(htmlcode)) {
    htmlIssues.push("empty-title");
  }

  if (!/<meta[^>]*charset=["']UTF-8["'][^>]*>/i.test(htmlcode)) {
    htmlIssues.push("missing-meta-charset");
  }

  if (!/<meta[^>]*name=["']viewport["'][^>]*content=["']width=device-width,\s*initial-scale=1\.0[^>]*>/i.test(htmlcode)) {
    htmlIssues.push("missing-meta-viewport");
  }

  if (!/<main[^>]*>[\s\S]*<\/main>/i.test(htmlcode)) {
    htmlIssues.push("missing-main");
  }

  if (!/<h1[^>]*>[\s\S]*<\/h1>/i.test(htmlcode)) {
    htmlIssues.push("add-h1-heading");
  }

  if ((htmlcode.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []).length > 1) {
    htmlIssues.push("multiple-h1");
  }

  if (/<img(?![^>]*alt=)[^>]*>/i.test(htmlcode)) {
    htmlIssues.push("missing-alt");
  }

  if (/<a[^>]*href=["']\s*["'][^>]*>/i.test(htmlcode)) {
    htmlIssues.push("empty-link");
  }

  if (/<a[^>]*href=["']#["'][^>]*>/i.test(htmlcode)) {
    htmlIssues.push("use-real-link");
  }

  if (/<button[^>]*>\s*<\/button>/i.test(htmlcode)) {
    htmlIssues.push("empty-button");
  }

  if (/<[a-z][^>]*\bstyle=["'][^"']*["'][^>]*>/i.test(htmlcode)) {
    htmlIssues.push("inline-css");
  }

  return htmlIssues;
}


function cssCheck(){
  const cssIssues=[];
  const cssCode=cssTextarea.value;

  if(!/\*\s*{[^}]*box-sizing\s*:\s*border-box\s*;?[^}]*}/i.test(cssCode)){
     cssIssues.push("missing-border-box");
  }

  if(!/\bbody\b\s*{[^}]*margin\s*:\s*0\s*;?[^}]*}/i.test(cssCode)){
    cssIssues.push("missing-margin-0")
  }

  if(!/\bbody\b\s*{[^}]*font-family\s*:[^}]/i.test(cssCode)){
    cssIssues.push("missing-font-family")
  }

  if(/[^{}]+\s*{[^}]*width\s*:\s*(?:[5-9]\d{2}|[1-9]\d{3,})px\s*;?[^}]*}/i.test(cssCode)){
    cssIssues.push("use-max-width")
  }

  if(/[^{}]+\s*{[^}]*height\s*:\s*(?:[5-9]\d{2}|[1-9]\d{3,})px\s*;?[^}]*}/i.test(cssCode)){
    cssIssues.push("use-max-height")
  }

  if(!/[^{}]+\s*{[^}]*max-width\s*:\s*100%\s*;?[^}]*}/i.test(cssCode)){
    cssIssues.push("consider-max-width-100%")
  }

  const importantCount = (cssCode.match(/!\s*important/gi) || []).length;

  if (importantCount > 3) {
    cssIssues.push("overuse-important");
  }

  if(/[^{}]+\s*{\s*}/i.test(cssCode)){
    cssIssues.push("empty-css-rule")
  }

  if(!/[^{}]+\s*:hover\s*[^}]*}/i.test(cssCode)){
    cssIssues.push("consider-hover-effect-button")
  }

 if (/margin\s*:\s*(?:[8-9]\d|[1-9]\d{2,})px\s*;?/i.test(cssCode)) {
  cssIssues.push("large-margin");
  }

  return cssIssues;
}

const numericResult={
 bestpractices:[
  {name:"missing-doctype", deduction:8},
  {name:"missing-head-title", deduction:8},
  {name:"empty-title", deduction:5},
  {name:"missing-meta-charset", deduction:5},
  {name:"missing-main", deduction:5},
  {name:"add-h1-heading", deduction:5},
  {name:"multiple-h1", deduction:5},
  {name:"missing-border-box", deduction:5},
  {name:"missing-margin-0", deduction:5},
  {name:"missing-font-family", deduction:3}
 ],

 accessibility:[
  {name:"missing-lang", deduction:5},
  {name:"missing-alt", deduction:8},
  {name:"empty-link",deduction:8},
  {name:"empty-button", deduction:8}
 ],

 performance:[
  {name:"missing-meta-viewport", deduction:8},
  {name:"use-max-width",deduction:5},
  {name:"use-max-height",deduction:5},
  {name:"consider-max-width-100%",deduction:3},
  {name:"large-margin",deduction:3}
 ],

 codeQuality:[
  {name:"use-real-link",deduction:3},
  {name:"inline-css",deduction:5},
  {name:"overuse-important",deduction:5},
  {name:"empty-css-rule",deduction:5},
  {name:"consider-hover-effect-button",deduction:1}
 ]
}

const bestPractices=numericResult.bestpractices;
const accessibilty=numericResult.accessibility;
const performance=numericResult.performance;
const codeQuality=numericResult.codeQuality;

