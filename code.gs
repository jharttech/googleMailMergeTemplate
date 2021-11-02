function myFunction() {
  var docTemplateId = "FIXME";
  var docFinalId = "FIXME";
  var workSheetId = "FIXME";

  var docTemplate = DocumentApp.openById(docTemplateId);
  var docFinal = DocumentApp.openById(docFinalId);
  var spreadSheet = SpreadsheetApp.openById(workSheetId).getSheetByName("data");

  var data = spreadSheet.getRange(2,1, spreadSheet.getLastRow()-1, spreadSheet.getLastColumn()).getValues();

  var templateParagraphs = docTemplate.getBody().getParagraphs();

  docFinal.getBody().clear();

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

  docFinal.getBody().appendPageBreak();
}
