function mammoXML(formID, formCode) { /*把表單輸入完的資料填到json物件*/
    var thisform = document.getElementById(formID);
    var elements = thisform.elements;
    var p = new Array(15), count = 1;
    p[0] = "1168613";  /*patientID */

    for (i = 0; i < elements.length; i++) {         /*讀取表單填完的資料*/
        var form_elem = elements[i];
        if (form_elem.checked == true) {
            p[count] = form_elem.id;
            count++;
            p[count] = form_elem.value;
            count++;
        }
    }
    /*把表單輸入完的資料填到json物件*/
    massObservation.identifier[0].system = document.URL;
    massObservation.identifier[0].value = formID;
    massObservation.code.coding[0].code = formCode;
    massObservation.status = "final";
    massObservation.code.coding[0].system = "http://hl7.org/fhir/STU3/valueset-observation-codes.html";
    massObservation.code.coding[0].Display = "Physical findings of Breasts Narrative";
    massObservation.subject.reference = "Patient/" + p[0];
    //massObservation.derivedFrom[0].reference = "Observation/" + (標記ID); /*可以輸入標記的連結*/
    massObservation.valueCodeableConcept.coding[0].code = p[1];
    massObservation.component[0].code.coding[0].code = p[3];
    massObservation.component[0].code.coding[1].code = p[5];
    massObservation.component[1].code.coding[0].code = p[7];
    massObservation.component[2].code.coding[0].code = p[9];
    massObservation.component[3].code.coding[0].code = p[11];
    massObservation.component[4].code.coding[0].code = p[13];

    postData(massObservation, "Observation", formID);
}
function postData(jsonString, type, formID) { /*把json物件送到fhir server*/
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", fhir.url + type, true);
    xhttp.setRequestHeader("Content-type", 'application/json');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            alert(this.responseText);
        }
    };
    var data = JSON.stringify(jsonString);
    xhttp.send(data);
}
function check(p) { /*檢查表單有沒有拿填滿*/
    var thisform = document.getElementById(p.id);
    var elements = thisform.elements, count = 0, checkcount = 0;
    for (i = 0; i < elements.length; i++) {
        if (elements[i].checked == true)
            count++;
    }
    if (p.id == "mass" && count != 7)
        checkcount = 1;
    if (checkcount != 0)
        alert(p.id + "未勾選完畢");
    else {
        mammoXML(p.id, p.name);
        for (i = 0; i < elements.length; i++) { /*放回未填寫的表單*/
            if (elements[i].checked == true)
                elements[i].checked = false;
        }
    }
}
