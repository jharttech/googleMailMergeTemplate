function myFunction() {
  // Set each variable to the document ID of each document
  var docTemplateId = "FIXME";
  var docFinalId = "FIXME";
  var workSheetId = "FIXME";

  // Set each variable to open the respective document.
  var docTemplate = DocumentApp.openById(docTemplateId);
  var docFinal = DocumentApp.openById(docFinalId);
  var spreadSheet = SpreadsheetApp.openById(workSheetId).getSheetByName("data");

  // Set variable called data to the range in which the spreadsheet data will be pulled from.
  // We start with row 2 with the assumption that row 1 will be a header row
  var data = spreadSheet.getRange(2,1, spreadSheet.getLastRow()-1, spreadSheet.getLastColumn()).getValues();
  var templateParagraphs = docTemplate.getBody().getParagraphs();
  // Clear any existing data in the final document as to not leave old data in the document.
  docFinal.getBody().clear();
  // Run the createMailMerge function for each row, and then grab the value of each cell desired in each row.
  data.forEach(function(row){
    createMailMerge(row[0], row[1], row[2], docFinal, templateParagraphs)
  });
}

function createMailMerge(first, last, email, docFinal, templateParagraphs,){
  templateParagraphs.forEach(function(p){
    docFinal.getBody().appendParagraph(
      p
      .copy()
      .replaceText("{First Name}", first)
      .replaceText("{Last Name}", last)
      .replaceText("{Email}", email)
    );
  });
  // Make a page break after each paragraph
  docFinal.getBody().appendPageBreak();
}
