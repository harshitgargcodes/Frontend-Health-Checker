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
const accessibility=numericResult.accessibility;
const performance=numericResult.performance;
const codeQuality=numericResult.codeQuality;

function calculatedScore(detectedIssues){
  const bestPracticesDeduction=bestPractices.filter(issue => detectedIssues.includes(issue.name)).reduce((total, issue) => total+issue.deduction,0);
  const accessibilityDeduction=accessibility.filter(issue => detectedIssues.includes(issue.name)).reduce((total, issue) => total + issue.deduction,0);
  const performanceDeduction=performance.filter(issue => detectedIssues.includes(issue.name)).reduce((total, issue) => total + issue.deduction,0);
  const codeQualityDeduction=codeQuality.filter(issue => detectedIssues.includes(issue.name)).reduce((total, issue) => total + issue.deduction,0);

  const total=Math.round((bestPracticesDeduction+accessibilityDeduction+performanceDeduction+codeQualityDeduction)/4);
  const totalScore=Math.max(0,100-total)

  return{
    totalScore,
    bestPracticesScore:Math.max(0,100-bestPracticesDeduction),
    accessibilityScore:Math.max(0,100-accessibilityDeduction),
    performanceScore:Math.max(0,100-performanceDeduction),
    codeQualityScore:Math.max(0,100-codeQualityDeduction)
  }
}

const loadSample=document.querySelector(".sample")
loadSample.addEventListener("click",()=>{
htmlTextarea.value=
`<html>
<head>
  <title></title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header style="background: lightblue;">
    <h2>My Portfolio Website</h2>

    <nav>
      <a href="#">Home</a>
      <a href="">Projects</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <section>
    <h2>Welcome to my website</h2>
    <p>This is a simple portfolio page created using HTML and CSS.</p>

    <img src="profile.png">

    <button></button>
  </section>

  <section>
    <h2>My Projects</h2>
    <p>Here are some projects I have built.</p>

    <div>
      <h3>Landing Page</h3>
      <p>A simple responsive landing page.</p>
    </div>

    <div>
      <h3>Todo App</h3>
      <p>A small JavaScript todo app.</p>
    </div>
  </section>

  <footer>
    <p>Created by Harshit</p>
  </footer>

</body>
</html>`

cssTextarea.value=
`body {
  background-color: #f5f7fb;
  color: #222;
}

.header {
  width: 900px;
  height: 600px;
  margin: 100px;
  background-color: lightblue;
}

.logo {
  color: navy !important;
}

.navbar {
}

.card {
  width: 750px;
  height: 500px;
  padding: 20px;
  background-color: white;
}

.card-title {
  font-size: 32px !important;
}

.button {
  background-color: blue !important;
  color: white !important;
  padding: 12px 20px;
}

.hero-image {
  width: 800px;
}`

})

const issueDetails = {
  "missing-doctype": {
    title: "Missing DOCTYPE",
    whatIsWrong: "You did not write <!DOCTYPE html> at the top of your HTML file.",
    whyItMatters: "It tells the browser to use modern HTML rules instead of old rendering modes.",
    itsUse: "Use it at the very top of every HTML document."
  },

  "missing-lang": {
    title: "Missing Language Attribute",
    whatIsWrong: "You did not add lang=\"en\" inside the <html> tag.",
    whyItMatters: "It helps screen readers, browsers, and translation tools understand the language of your page.",
    itsUse: "Use it to define the main language of your webpage."
  },

  "missing-head-title": {
    title: "Missing Title Tag",
    whatIsWrong: "Your HTML does not contain a <title> tag.",
    whyItMatters: "The title appears in the browser tab and helps users understand what the page is about.",
    itsUse: "Use it inside the <head> section to give your page a clear name."
  },

  "empty-title": {
    title: "Empty Title Tag",
    whatIsWrong: "Your <title> tag exists, but it has no text inside it.",
    whyItMatters: "An empty title makes the page look unfinished and less professional.",
    itsUse: "Write a short and clear page title inside the <title> tag."
  },

  "missing-meta-charset": {
    title: "Missing Charset Meta Tag",
    whatIsWrong: "You did not add the UTF-8 charset meta tag.",
    whyItMatters: "It helps the browser display letters, symbols, and special characters correctly.",
    itsUse: "Use it inside the <head> section to define text encoding."
  },

  "missing-meta-viewport": {
    title: "Missing Viewport Meta Tag",
    whatIsWrong: "You did not add the viewport meta tag.",
    whyItMatters: "Without it, your layout may not display properly on mobile devices.",
    itsUse: "Use it to make your page responsive on phones, tablets, and desktops."
  },

  "missing-main": {
    title: "Missing Main Tag",
    whatIsWrong: "You did not use a <main> element.",
    whyItMatters: "It helps separate the main page content from the header, navigation, and footer.",
    itsUse: "Use <main> to wrap the primary content of your page."
  },

  "add-h1-heading": {
    title: "Missing H1 Heading",
    whatIsWrong: "Your page does not have an <h1> heading.",
    whyItMatters: "The <h1> tells users and search engines the main topic of the page.",
    itsUse: "Use one clear <h1> for the main heading of the page."
  },

  "multiple-h1": {
    title: "Multiple H1 Headings",
    whatIsWrong: "Your page has more than one <h1> heading.",
    whyItMatters: "Too many main headings can make the page structure confusing.",
    itsUse: "Use one main <h1>, then use <h2>, <h3>, and lower headings for sections."
  },

  "missing-alt": {
    title: "Image Missing Alt Text",
    whatIsWrong: "One or more images do not have an alt attribute.",
    whyItMatters: "Alt text helps users understand the image if it does not load or if they use a screen reader.",
    itsUse: "Use alt text to describe the purpose or meaning of the image."
  },

  "empty-link": {
    title: "Empty Link Found",
    whatIsWrong: "One of your links has an empty href attribute.",
    whyItMatters: "An empty link does not take the user anywhere and makes the page feel incomplete.",
    itsUse: "Use a real URL or a valid section ID inside the href attribute."
  },

  "use-real-link": {
    title: "Placeholder Link Found",
    whatIsWrong: "You used href=\"#\" in a link.",
    whyItMatters: "This is usually a temporary placeholder and may confuse users if it does nothing.",
    itsUse: "Replace # with a real page link or a real section link."
  },

  "empty-button": {
    title: "Empty Button Found",
    whatIsWrong: "A button exists, but it has no visible text inside it.",
    whyItMatters: "Users need clear button text to understand what action the button performs.",
    itsUse: "Write clear button text like Submit, Check Project, or Start Health Check."
  },

  "inline-css": {
    title: "Inline CSS Found",
    whatIsWrong: "You used CSS directly inside the HTML style attribute.",
    whyItMatters: "Inline CSS makes the code harder to maintain and reuse.",
    itsUse: "Keep styling inside an external CSS file whenever possible."
  },

  "missing-border-box": {
    title: "Missing Box-Sizing Reset",
    whatIsWrong: "You did not add box-sizing: border-box using the universal selector.",
    whyItMatters: "Without it, padding and borders can increase element size and make layouts harder to control.",
    itsUse: "Use it to make width and height calculations more predictable in your CSS."
  },

  "missing-margin-0": {
    title: "Missing Body Margin Reset",
    whatIsWrong: "You did not set margin: 0 on the body.",
    whyItMatters: "Browsers add default margin to the body, which can create unwanted spacing around your page.",
    itsUse: "Use body { margin: 0; } to start your layout from the edge of the screen."
  },

  "missing-font-family": {
    title: "Missing Font Family",
    whatIsWrong: "You did not define a font-family for the page.",
    whyItMatters: "Without a font family, the browser uses its default font, which may not match your design.",
    itsUse: "Use font-family to make your website text look consistent and professional."
  },

  "use-max-width": {
    title: "Large Fixed Width Found",
    whatIsWrong: "You used a large fixed width value in pixels.",
    whyItMatters: "Large fixed widths can cause horizontal scrolling or layout overflow on smaller screens.",
    itsUse: "Use max-width, percentages, or responsive units to make layouts adapt better."
  },

  "use-max-height": {
    title: "Large Fixed Height Found",
    whatIsWrong: "You used a large fixed height value in pixels.",
    whyItMatters: "Fixed heights can break layouts when content grows or when the screen size changes.",
    itsUse: "Use min-height, auto, or flexible spacing instead of forcing large fixed heights."
  },

  "consider-max-width-100%": {
    title: "Missing max-width: 100%",
    whatIsWrong: "Your CSS does not include a max-width: 100% rule.",
    whyItMatters: "Without it, images or large elements may overflow outside their container.",
    itsUse: "Use max-width: 100% to make images and elements stay inside their parent container."
  },

  "overuse-important": {
    title: "Too Many !important Rules",
    whatIsWrong: "You used !important too many times.",
    whyItMatters: "Overusing !important makes CSS harder to override, debug, and maintain.",
    itsUse: "Use better selectors and CSS structure instead of forcing styles with !important."
  },

  "empty-css-rule": {
    title: "Empty CSS Rule Found",
    whatIsWrong: "You created a CSS selector with no styles inside it.",
    whyItMatters: "Empty CSS rules add unnecessary code and make the stylesheet look unfinished.",
    itsUse: "Remove empty rules or add the required styles inside them."
  },

  "consider-hover-effect-button": {
    title: "Missing Hover Effect",
    whatIsWrong: "Your CSS does not include a :hover effect.",
    whyItMatters: "Hover effects make buttons and links feel more interactive and polished.",
    itsUse: "Use :hover to give visual feedback when users move the mouse over interactive elements."
  },

  "large-margin": {
    title: "Large Margin Found",
    whatIsWrong: "You used a very large margin value.",
    whyItMatters: "Large margins can create too much empty space and break layouts on smaller screens.",
    itsUse: "Use balanced spacing with smaller margins, padding, gap, or responsive units."
  }
};

let latestReportText="";

const runHealthCheck=document.querySelector(".health-check")
runHealthCheck.addEventListener("click", ()=>{
  if(htmlTextarea.value==="" && cssTextarea.value===""){
    alert("Please paste HTML or CSS code first.")
    return
  }
  const detectedIssues=[...htmlCheck(), ...cssCheck()];
  const score=calculatedScore(detectedIssues)

  latestReportText = `
Frontend Health Checker Report

Total Score: ${score.totalScore}/100
Best Practices: ${score.bestPracticesScore}/100
Accessibility: ${score.accessibilityScore}/100
Performance: ${score.performanceScore}/100
Code Quality: ${score.codeQualityScore}/100

Issues Found: ${detectedIssues.length}
`;

detectedIssues.forEach(issue => {
  const details = issueDetails[issue];

  latestReportText += `

${details.title}

What is Wrong:
${details.whatIsWrong}

Why it Matters:
${details.whyItMatters}

Its Use:
${details.itsUse}
`;
});
  const totalIssues=document.querySelectorAll(".total-issues")
  totalIssues.textContent=detectedIssues.length

  const bestPracticeScore=document.querySelector(".best-practice-score p");
  const performanceScore=document.querySelector(".performance-score p");
  const accessibilityScore=document.querySelector(".accessibility-score p");
  const codeQualityScore=document.querySelector(".code-quality-score p");

  bestPracticeScore.textContent=score.bestPracticesScore+"/100"
  performanceScore.textContent=score.performanceScore+"/100"
  accessibilityScore.textContent=score.accessibilityScore+"/100"
  codeQualityScore.textContent=score.codeQualityScore+"/100"


  const issueDetail=document.querySelector(".issue-details")
  issueDetail.innerHTML=""

  detectedIssues.forEach(issue =>{
    const h4=document.createElement("h4")
    const whatWrong=document.createElement("h5")
    const whyMatters=document.createElement("h5")
    const itzUse=document.createElement("h5")
    const wrong=document.createElement("p")
    const matters=document.createElement("p")
    const use=document.createElement("p")

    h4.textContent=issueDetails[issue].title
    whatWrong.textContent="What is Wrong:"
    wrong.textContent=issueDetails[issue].whatIsWrong
    whyMatters.textContent="Why it Matters"
    matters.textContent=issueDetails[issue].whyItMatters
    itzUse.textContent="Its Use"
    use.textContent=issueDetails[issue].itsUse
    issueDetail.appendChild(h4)
    issueDetail.appendChild(whatWrong)
    issueDetail.appendChild(wrong)
    issueDetail.appendChild(whyMatters)
    issueDetail.appendChild(matters)
    issueDetail.appendChild(itzUse)
    issueDetail.appendChild(use)
  })

  const totalScore=document.querySelector(".total-score")
  totalScore.textContent=score.totalScore

  const statusTitle=document.querySelector(".statusTitle")
  const statusMessage=document.querySelector(".statusMessage")

  if(score.totalScore === 100){
    statusTitle.textContent="Perfect Score"
    statusMessage.textContent="Your project passed all current checks and looks ready to share.";
  }

  else if(score.totalScore >= 80 && score.totalScore < 100){
    statusTitle.textContent="Excellent Work"
    statusMessage.textContent="Your project looks strong. Fix the remaining small issues to make it even better.";
  }

  else if(score.totalScore >= 60 && score.totalScore < 80){
    statusTitle.textContent="Good, but needs improvement"
    statusMessage.textContent="Your project is mostly solid, but fixing the issues below will make it better.";
  }

  else if(score.totalScore < 60){
    statusTitle.textContent="Needs improvement"
    statusMessage.textContent="Your project has several important issues. Fix the main problems before sharing it.";
  }
})

const copyReport=document.querySelector(".copy-report")
const copyStatus=document.querySelector(".copy-status")
copyReport.addEventListener("click", ()=>{
  if(latestReportText===""){
    alert("please run the health check first")
    return
  }
navigator.clipboard.writeText(latestReportText).then(()=>{
   copyStatus.textContent="Report copied!";
  }).catch(()=>{
  copyStatus.textContent="Could not copy report. Try again.";
})
})


