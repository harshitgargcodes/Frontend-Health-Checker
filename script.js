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
    title: "Missing DOCTYPE Declaration",
    category: "HTML Best Practice",
    priority: "Medium",
    whatIsWrong: "Your HTML file does not include the <!DOCTYPE html> declaration at the top.",
    whyItMatters: "The DOCTYPE tells the browser to render the page using modern HTML standards. Without it, some browsers may use older rendering behavior, which can cause layout or styling inconsistencies.",
    howToFix: "Add <!DOCTYPE html> as the first line of your HTML document."
  },

  "missing-lang": {
    title: "Missing Language Attribute",
    category: "Accessibility",
    priority: "Medium",
    whatIsWrong: "Your <html> tag does not include a language attribute such as lang=\"en\".",
    whyItMatters: "The language attribute helps screen readers, browsers, search engines, and translation tools understand the main language of the page.",
    howToFix: "Update your opening <html> tag to include the correct language, for example: <html lang=\"en\">."
  },

  "missing-head-title": {
    title: "Missing Page Title",
    category: "HTML Structure",
    priority: "High",
    whatIsWrong: "Your HTML document does not include a <title> tag inside the <head> section.",
    whyItMatters: "The title appears in the browser tab, improves basic SEO, and helps users understand what the page is about.",
    howToFix: "Add a clear <title> tag inside the <head> section, for example: <title>Frontend Health Checker</title>."
  },

  "empty-title": {
    title: "Empty Page Title",
    category: "HTML Structure",
    priority: "Medium",
    whatIsWrong: "Your <title> tag exists, but it does not contain any meaningful text.",
    whyItMatters: "An empty title makes the page look unfinished and gives users no context in the browser tab.",
    howToFix: "Write a short, descriptive title inside the <title> tag."
  },

  "missing-meta-charset": {
    title: "Missing Charset Meta Tag",
    category: "HTML Best Practice",
    priority: "Medium",
    whatIsWrong: "Your HTML document does not include the UTF-8 charset meta tag.",
    whyItMatters: "The charset meta tag helps the browser display text, symbols, and special characters correctly.",
    howToFix: "Add this inside the <head> section: <meta charset=\"UTF-8\">."
  },

  "missing-meta-viewport": {
    title: "Missing Viewport Meta Tag",
    category: "Responsive Design",
    priority: "High",
    whatIsWrong: "Your HTML document does not include the viewport meta tag.",
    whyItMatters: "Without the viewport meta tag, your website may not scale correctly on mobile and tablet screens.",
    howToFix: "Add this inside the <head> section: <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">."
  },

  "missing-main": {
    title: "Missing Main Landmark",
    category: "Semantic HTML",
    priority: "Medium",
    whatIsWrong: "Your page does not use a <main> element for the primary content.",
    whyItMatters: "The <main> element helps separate the main content from repeated sections like headers, navigation, and footers. It also improves accessibility and page structure.",
    howToFix: "Wrap the primary page content inside a <main> element."
  },

  "add-h1-heading": {
    title: "Missing H1 Heading",
    category: "HTML Structure",
    priority: "High",
    whatIsWrong: "Your page does not contain an <h1> heading.",
    whyItMatters: "The <h1> heading represents the main topic of the page. It helps users, search engines, and assistive technologies understand the page purpose.",
    howToFix: "Add one clear <h1> heading that describes the main purpose of the page."
  },

  "multiple-h1": {
    title: "Multiple H1 Headings",
    category: "HTML Structure",
    priority: "Medium",
    whatIsWrong: "Your page contains more than one <h1> heading.",
    whyItMatters: "Using multiple main headings can make the content structure less clear, especially for beginners and assistive technology users.",
    howToFix: "Keep one main <h1> for the page title, then use <h2>, <h3>, and lower headings for sections."
  },

  "missing-alt": {
    title: "Image Missing Alt Text",
    category: "Accessibility",
    priority: "High",
    whatIsWrong: "One or more images do not include an alt attribute.",
    whyItMatters: "Alt text helps screen reader users understand the purpose of an image. It also provides fallback text if the image fails to load.",
    howToFix: "Add meaningful alt text to important images. For decorative images, use an empty alt attribute like alt=\"\"."
  },

  "empty-link": {
    title: "Empty Link Destination",
    category: "User Experience",
    priority: "Medium",
    whatIsWrong: "One or more links have an empty href attribute.",
    whyItMatters: "Empty links do not guide users anywhere and can make the website feel incomplete or broken.",
    howToFix: "Replace the empty href value with a valid page URL, external URL, or section ID."
  },

  "use-real-link": {
    title: "Placeholder Link Found",
    category: "User Experience",
    priority: "Low",
    whatIsWrong: "One or more links use href=\"#\", which usually means the link is only a placeholder.",
    whyItMatters: "Placeholder links can confuse users because they look clickable but may not perform a useful action.",
    howToFix: "Replace # with a real URL, page path, or section ID such as href=\"#contact\"."
  },

  "empty-button": {
    title: "Empty Button Text",
    category: "Accessibility",
    priority: "High",
    whatIsWrong: "A button exists on the page, but it does not contain visible text.",
    whyItMatters: "Users need clear button text to understand what action will happen. Empty buttons are also problematic for accessibility.",
    howToFix: "Add clear action text inside the button, such as Submit, Check Project, Contact Us, or Get Started."
  },

  "inline-css": {
    title: "Inline CSS Found",
    category: "Code Quality",
    priority: "Medium",
    whatIsWrong: "Some styles are written directly inside HTML using the style attribute.",
    whyItMatters: "Inline CSS makes the code harder to maintain, reuse, and update across multiple elements or pages.",
    howToFix: "Move repeated or important styles into an external CSS file and apply them using classes."
  },

  "missing-border-box": {
    title: "Missing Box-Sizing Reset",
    category: "CSS Best Practice",
    priority: "Medium",
    whatIsWrong: "Your CSS does not include a global box-sizing reset.",
    whyItMatters: "Without box-sizing: border-box, padding and borders can increase the final size of elements, making layouts harder to control.",
    howToFix: "Add this reset at the top of your CSS: * { box-sizing: border-box; }."
  },

  "missing-margin-0": {
    title: "Missing Body Margin Reset",
    category: "CSS Best Practice",
    priority: "Medium",
    whatIsWrong: "Your CSS does not reset the default body margin.",
    whyItMatters: "Browsers add default margin to the body, which can create unwanted spacing around the page.",
    howToFix: "Add this rule to your CSS: body { margin: 0; }."
  },

  "missing-font-family": {
    title: "Missing Font Family",
    category: "Visual Consistency",
    priority: "Low",
    whatIsWrong: "Your page does not define a font-family.",
    whyItMatters: "Without a defined font-family, the browser uses its default font, which may not match your intended design.",
    howToFix: "Add a font-family to the body, for example: body { font-family: Arial, sans-serif; }."
  },

  "use-max-width": {
    title: "Large Fixed Width Found",
    category: "Responsive Design",
    priority: "High",
    whatIsWrong: "Your CSS uses a large fixed width value in pixels.",
    whyItMatters: "Large fixed widths can cause horizontal scrolling and layout overflow on smaller screens.",
    howToFix: "Use width: 100% with max-width instead of only using a fixed width. Example: width: 100%; max-width: 1200px;"
  },

  "use-max-height": {
    title: "Large Fixed Height Found",
    category: "Responsive Design",
    priority: "Medium",
    whatIsWrong: "Your CSS uses a large fixed height value in pixels.",
    whyItMatters: "Fixed heights can break layouts when content grows or when the screen size changes.",
    howToFix: "Use min-height, auto height, padding, or flexible layout techniques instead of forcing a large fixed height."
  },

  "consider-max-width-100%": {
    title: "Missing max-width: 100%",
    category: "Responsive Design",
    priority: "Medium",
    whatIsWrong: "Your CSS does not include a max-width: 100% rule for responsive media or large elements.",
    whyItMatters: "Images and large elements can overflow outside their containers if they are not constrained properly.",
    howToFix: "Add a rule such as img { max-width: 100%; height: auto; } to make images responsive."
  },

  "overuse-important": {
    title: "Overuse of !important",
    category: "Code Quality",
    priority: "Medium",
    whatIsWrong: "Your CSS uses !important too many times.",
    whyItMatters: "Overusing !important makes CSS harder to override, debug, and maintain as the project grows.",
    howToFix: "Use cleaner selectors, better class naming, and proper CSS order instead of forcing styles with !important."
  },

  "empty-css-rule": {
    title: "Empty CSS Rule Found",
    category: "Code Quality",
    priority: "Low",
    whatIsWrong: "Your stylesheet contains a CSS selector with no styles inside it.",
    whyItMatters: "Empty CSS rules add unnecessary code and make the stylesheet look unfinished or unclean.",
    howToFix: "Remove the empty rule or add the required CSS properties inside it."
  },

  "consider-hover-effect-button": {
    title: "Missing Hover Effect",
    category: "User Experience",
    priority: "Low",
    whatIsWrong: "Your CSS does not include a hover effect for interactive elements.",
    whyItMatters: "Hover effects give users visual feedback and make buttons or links feel more polished and interactive.",
    howToFix: "Add :hover styles for buttons and important links, for example: button:hover { opacity: 0.9; }."
  },

  "large-margin": {
    title: "Large Margin Found",
    category: "Layout Quality", 
    priority: "Medium",
    whatIsWrong: "Your CSS uses a very large margin value.",
    whyItMatters: "Very large margins can create excessive empty space and may break the layout on smaller screens.",
    howToFix: "Use smaller spacing values, padding, gap, or responsive units to create more balanced spacing."
  }
 }

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

How To Fix:
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
    const howToFix=document.createElement("h5")
    const wrong=document.createElement("p")
    const matters=document.createElement("p")
    const fix=document.createElement("p")
    const priority=document.createElement("h5")
    const priorityDetail=document.createElement("p")
    const category=document.createElement("h5")
    const categoryDetail=document.createElement("p")

    h4.textContent=issueDetails[issue].title
    whatWrong.textContent="What is Wrong:"
    wrong.textContent=issueDetails[issue].whatIsWrong
    whyMatters.textContent="Why it Matters:"
    matters.textContent=issueDetails[issue].whyItMatters
    howToFix.textContent="How To Fix:"
    fix.textContent=issueDetails[issue].howToFix
    priority.textContent="Priority:"
    priorityDetail.textContent=issueDetails[issue].priority
    category.textContent="Category:"
    categoryDetail.textContent=issueDetails[issue].category
    issueDetail.appendChild(h4)
    issueDetail.appendChild(category)
    issueDetail.appendChild(categoryDetail)
    issueDetail.appendChild(priority)
    issueDetail.appendChild(priorityDetail)
    issueDetail.appendChild(whatWrong)
    issueDetail.appendChild(wrong)
    issueDetail.appendChild(whyMatters)
    issueDetail.appendChild(matters)
    issueDetail.appendChild(howToFix)
    issueDetail.appendChild(fix)
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

