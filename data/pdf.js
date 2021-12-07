const PDFDocument = require('pdfkit');
const fs = require('fs');

var pdfDoc = new PDFDocument;
pdfDoc.pipe(fs.createWriteStream('ticket.pdf'));

pdfDoc.text("Your ticket to Lobster Inc.", { align: 'center'})

pdfDoc.end();