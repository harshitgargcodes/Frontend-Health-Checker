# Frontend Health Checker

Frontend Health Checker is a simple web tool that helps beginners check whether their HTML and CSS project is client-ready.

It scans common frontend problems like missing alt text, empty links, missing viewport meta tag, fixed width issues, inline CSS, and basic accessibility mistakes.

## Why I built this

Many beginner developers create frontend projects that look fine at first, but still have common issues that can make the project look unprofessional.

This tool helps users find those issues before they publish the project, submit it, or send it to a client.

## Features

- Check basic HTML issues
- Check basic CSS issues
- Show frontend health score
- Show issue cards with priority
- Explain why each issue matters
- Suggest simple fixes
- Copy report feature
- Load sample code feature
- Responsive UI

## What it checks

### HTML Checks

- Missing `<title>` tag
- Missing viewport meta tag
- Images without `alt` text
- Empty links
- Buttons without text
- Inputs without labels
- Missing `lang` attribute
- Multiple `<h1>` tags
- Empty divs
- Forms without submit button
- And many more....

### CSS Checks

- Large fixed widths
- Missing `box-sizing: border-box`
- No media queries
- Inline CSS
- Too many `!important` rules
- Very large margin or padding
- Fixed height issues
- Overuse of `px`
- Missing hover/focus styles
- ANd many more....

## Tech Stack

- HTML
- CSS
- JavaScript

## Project Status

This is the V1 free version of the project.

Current focus:

- HTML checking
- CSS checking
- Basic frontend score
- Beginner-friendly issue explanation

Future V2 plan:

- JavaScript checks
- Advanced code quality suggestions
- PDF report download
- Better responsive design analysis
- Manual frontend audit service
- Fiverr service integration

## How it works

1. Paste your HTML code.
2. Paste your CSS code.
3. Click the check button.
4. The tool scans common frontend issues.
5. It shows a score and improvement suggestions.

## Who can use this

This tool is useful for:

- Beginner frontend developers
- Students
- Freelance beginners
- Portfolio builders
- HTML/CSS learners
- People preparing projects for clients or college submissions

## Folder Structure

```text
frontend-health-checker/
│
├── index.html
├── style.css
├── script.js
└── README.md
