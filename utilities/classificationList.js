Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}


Util.buildClassificationShortList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationShortList =
    '<select name="classification_id" id="classificationShortList" required>'
  classificationShortList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationShortList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationShortList += " selected "
    }
    classificationShortList += ">" + row.classification_name + "</option>"
  })
  classificationShortList += "</select>"
  return classificationShortList
}