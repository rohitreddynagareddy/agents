const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  let browser;
  let page;
  const consoleMessages = [];
  let pageLoadedSuccessfully = false;
  const results = {
    pageLoaded: false,
    errors: [],
    warnings: [],
    exceptions: [],
    requestsFailed: []
  };

  // Check if sw.html exists
  const swHtmlPath = path.join(__dirname, 'sw.html');
  if (!fs.existsSync(swHtmlPath)) {
    console.error(`ERROR: sw.html not found at ${swHtmlPath}`);
    results.errors.push(`sw.html not found at ${swHtmlPath}`);
    // Output results and exit if file not found
    console.log("\n--- Load Test Summary ---");
    console.log("Page did NOT load successfully (file not found).");
    console.log("\nConsole Errors/Warnings/Exceptions:");
    results.errors.forEach(msg => console.log(`- Type: error, Message: ${msg}`));
    return;
  }

  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteer.executablePath(), // Explicitly use the downloaded Chromium
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        // '--single-process', // try removing this if issues persist
        '--disable-gpu'
      ],
      dumpio: true // Log browser process stdout/stderr
    });
    console.log('Browser launched.');

    page = await browser.newPage();
    console.log('New page created.');

    page.on('console', msg => {
      const type = msg.type().toLowerCase();
      const text = msg.text();
      const location = msg.location();
      const fullMessage = `[CONSOLE ${type.toUpperCase()}] ${text} (Source: ${location.url || 'N/A'}:${location.lineNumber || 'N/A'})`;

      if (type === 'error') {
        results.errors.push(fullMessage);
        console.error(fullMessage);
      } else if (type === 'warning') {
        results.warnings.push(fullMessage);
        console.warn(fullMessage);
      }
      // console.log(fullMessage); // For debugging all messages
    });

    page.on('pageerror', error => {
      const errorMessage = `[PAGE ERROR] ${error.message}`;
      results.exceptions.push(errorMessage);
      console.error(errorMessage);
    });

    page.on('requestfailed', request => {
      const url = request.url();
      // Ignore favicon.ico and Google Fonts API requests as they are external and might fail in sandbox
      if (url.endsWith('favicon.ico') || url.startsWith('https://fonts.googleapis.com') || url.startsWith('https://fonts.gstatic.com')) {
        // console.log(`[REQUEST FAILED (Ignored)] ${request.failure()?.errorText} ${url}`);
        return;
      }
      // Ignore expected API call for AI agent if it's due to network issues in sandbox
      if (url.startsWith('https://generativelanguage.googleapis.com')) {
         // console.log(`[REQUEST FAILED (Ignored - AI API)] ${request.failure()?.errorText} ${url}`);
         return;
      }

      const failText = `[REQUEST FAILED] ${request.failure()?.errorText} ${url}`;
      results.requestsFailed.push(failText);
      console.error(failText);
    });

    const filePath = `file://${swHtmlPath}`;
    console.log(`Navigating to ${filePath}...`);

    await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
    console.log('Page navigation complete (networkidle0).');
    results.pageLoaded = true;

    await new Promise(resolve => setTimeout(resolve, 7000)); // Increased wait for scripts
    console.log('Additional wait finished.');

  } catch (e) {
    const errorMessage = `Headless browser operation failed: ${e.message} ${e.stack}`;
    results.errors.push(errorMessage);
    console.error('Error during headless browser operation:', e);
  } finally {
    if (page) {
      try {
        console.log('Closing page...');
        await page.close();
        console.log('Page closed.');
      } catch (e) {
        console.error('Error closing page:', e);
      }
    }
    if (browser) {
      try {
        console.log('Closing browser...');
        await browser.close();
        console.log('Browser closed.');
      } catch (e) {
        console.error('Error closing browser:', e);
      }
    }
  }

  console.log("\n--- Load Test Summary ---");
  if (results.pageLoaded) {
    console.log("Page loaded successfully in headless browser.");
  } else {
    console.log("Page did NOT load successfully in headless browser.");
  }

  if (results.errors.length > 0 || results.warnings.length > 0 || results.exceptions.length > 0 || results.requestsFailed.length > 0) {
    console.log("\n--- Issues Encountered ---");
    if (results.errors.length > 0) {
      console.log("\nJavaScript Console Errors:");
      results.errors.forEach(msg => console.log(`- ${msg}`));
    }
    if (results.warnings.length > 0) {
      console.log("\nJavaScript Console Warnings:");
      results.warnings.forEach(msg => console.log(`- ${msg}`));
    }
    if (results.exceptions.length > 0) {
      console.log("\nUncaught Page Exceptions:");
      results.exceptions.forEach(msg => console.log(`- ${msg}`));
    }
    if (results.requestsFailed.length > 0) {
        console.log("\nNetwork Requests Failed (excluding ignored):");
        results.requestsFailed.forEach(msg => console.log(`- ${msg}`));
    }
  } else {
    console.log("\nNo console errors, warnings, exceptions, or relevant request failures encountered.");
  }
  console.log("-------------------------\n");
})();
