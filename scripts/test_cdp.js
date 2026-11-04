const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const WORKSPACE = "d:\\Desktop\\IQ-CRM projects\\DryNuts";
const PORT = 9222;

const pages = [
  'index.html', 'home-2.html', 'about.html', 'products.html',
  'product-details.html', 'gift-boxes.html', 'gift-details.html',
  'bulk-orders.html', 'pricing.html', 'projects.html',
  'project-details.html', 'blog.html', 'blog-details.html', 'contact.html'
];

const viewports = [320, 375, 425, 768, 1024, 1440];

async function run() {
  console.log('Testing responsive widths & CSS computed styles via CDP...');
  // We can also verify computed styles directly in headless Chrome
}

run();
