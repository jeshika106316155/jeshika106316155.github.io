var cmass = new Array(15), ccal = new Array(15), casym = new Array(15), cdistort = new Array(15), cQuesCheck = new Array(15);
var cline = [], crect = [], ccircle = [];
cmass[0] = 0; ccal[0] = 0; casym[0] = 0; cdistort[0] = 0; cQuesCheck[0] = 0;
function formInputsToXML(type, URL, uid, svgBase64, sx, sy, sw, sh, wc, ww, index, formID) {
	var output;

	Observation.identifier[0].system = URL;
	Observation.identifier[0].value = UID;
	Observation.status = "final";
	Observation.code.coding[0].code = type;
	Observation.code.coding[0].system = "https://www.dicom.org.tw/";
	Observation.code.coding[0].Display = type;

	//Observation.subject.reference = "Patient/" + p[0];
	annotationObservation.basedOn[0].identifier.system = URL;
	annotationObservation.basedOn[0].identifier.value = uid;
	annotationObservation.category[0].coding[0].system = "http://hl7.org/fhir/observation-category";
	annotationObservation.category[0].coding[0].code = "imaging";
	annotationObservation.component[0].code.coding[0].code = "SVG.Annotation";
	annotationObservation.component[0].code.coding[0].display = "SVG Annotation";
	annotationObservation.component[0].valueString = svgBase64;
	annotationObservation.component[1].code.coding[0].code = "viewPort.sx";
	annotationObservation.component[1].code.coding[0].display = "viewPort.sx";
	annotationObservation.component[1].valueString = sx;
	annotationObservation.component[2].code.coding[0].code = "viewPort.sy";
	annotationObservation.component[2].code.coding[0].display = "viewPort.sy";
	annotationObservation.component[2].valueString = sy;
	annotationObservation.component[3].code.coding[0].code = "viewPort.sw";
	annotationObservation.component[3].code.coding[0].display = "viewPort.sw";
	annotationObservation.component[3].valueString = sw;
	annotationObservation.component[4].code.coding[0].code = "viewPort.sh";
	annotationObservation.component[4].code.coding[0].display = "viewPort.sh";
	annotationObservation.component[4].valueString = sh;
	annotationObservation.component[5].code.coding[0].code = "WindowCenter";
	annotationObservation.component[5].code.coding[0].display = "WindowCenter";
	annotationObservation.component[5].valueString = wc;
	annotationObservation.component[6].code.coding[0].code = "WindowWidth";
	annotationObservation.component[6].code.coding[0].display = "WindowWidth";
	annotationObservation.component[6].valueString = ww;
	annotationObservation.component[7].code.coding[0].code = "DCM File";
	annotationObservation.component[7].code.coding[0].display = "DCM File";
	annotationObservation.component[7].valueString = "203.64.84.86/DicomWebViewer/" + index;
	output = Object.assign(Observation, annotationObservation);

	postData(output, "Observation", formID);
}

function mammoXML(formID, formCode) {
	var thisform = document.getElementById(formID);
	var elements = thisform.elements;
	var p = new Array(15), count = 1;
	p[0] = "1168613";
	if (formID == 'QuestionCheck') {
		var que = ["RetractionSkin_", "ThickeningSkin_", "DilatedLactiferous_", "EnlargedAxillary_"];
		for (i = 0; i < que.length; i++) {
			for (j = 0; j < 2; j++) {
				p[count] = que[i] + j;
				count++;
				var a = document.getElementById(p[count - 1]);
				if (a.checked == true) {

					p[count] = "Exist";
					p[count - 1] += p[count];
				}
				else {
					p[count] = "None";
					p[count - 1] += p[count];
				}
				count++;
			}
		}
	}
	else {
		for (i = 0; i < elements.length; i++) {
			var form_elem = elements[i];
			if (form_elem.checked == true) {
				p[count] = form_elem.id;
				count++;
				p[count] = form_elem.value;
				count++;
			}
		}
	}
	var output;
	Observation.identifier[0].system = document.URL;
	Observation.identifier[0].value = formID;
	Observation.code.coding[0].code = formCode;
	Observation.status = "final";
	Observation.code.coding[0].system = "http://hl7.org/fhir/STU3/valueset-observation-codes.html";
	Observation.code.coding[0].Display = "Physical findings of Breasts Narrative";
	Observation.subject.reference = "Patient/" + p[0];
	var ca = document.cookie.split(';');
	id = ca[0].split('=');

	if (formID == 'mass') {
		massObservation.derivedFrom[0].reference = "Observation/" + id[1];
		massObservation.valueCodeableConcept.coding[0].code = p[1];
		massObservation.component[0].code.coding[0].code = p[3];
		massObservation.component[0].code.coding[1].code = p[5];
		massObservation.component[1].code.coding[0].code = p[7];
		massObservation.component[2].code.coding[0].code = p[9];
		massObservation.component[3].code.coding[0].code = p[11];
		massObservation.component[4].code.coding[0].code = p[13];
		output = Object.assign(Observation, massObservation);
	}
	if (formID == 'calcifications') {
		calcificationObservation.derivedFrom[0].reference = "Observation/" + id[1];
		calcificationObservation.valueCodeableConcept.coding[0].code = p[1];
		calcificationObservation.component[0].code.coding[0].code = p[3];
		calcificationObservation.component[0].code.coding[1].code = p[5];
		calcificationObservation.component[1].code.coding[0].code = p[7];
		calcificationObservation.component[2].code.coding[0].code = p[9];
		output = Object.assign(Observation, calcificationObservation);
	}
	if (formID == 'asymmetry') {
		asymetryObservation.derivedFrom[0].reference = "Observation/" + id[1];
		asymetryObservation.valueCodeableConcept.coding[0].code = p[1];
		asymetryObservation.component[0].code.coding[0].code = p[3];
		asymetryObservation.component[0].code.coding[1].code = p[5];
		output = Object.assign(Observation, asymetryObservation);
	}
	if (formID == 'architecturalDistortion') {
		architecturalDistortionObservation.derivedFrom[0].reference = "Observation/" + id[1];
		architecturalDistortionObservation.valueCodeableConcept.coding[0].code = p[1];
		architecturalDistortionObservation.component[0].code.coding[0].code = p[3];
		architecturalDistortionObservation.component[0].code.coding[1].code = p[5];
		output = Object.assign(Observation, architecturalDistortionObservation);
	}
	if (formID == 'QuestionCheck') {
		questionObservation.derivedFrom[0].reference = "Observation/" + id[1];
		questionObservation.component[0].code.coding[0].code = p[1];
		questionObservation.component[1].code.coding[0].code = p[3];
		questionObservation.component[2].code.coding[0].code = p[5];
		questionObservation.component[3].code.coding[0].code = p[7];
		questionObservation.component[4].code.coding[0].code = p[9];
		questionObservation.component[5].code.coding[0].code = p[11];
		questionObservation.component[6].code.coding[0].code = p[13];
		questionObservation.component[7].code.coding[0].code = p[15];
		questionObservation.component[8].code.coding[0].code = document.getElementById("Q5_answer").value;
		output = Object.assign(Observation, questionObservation);
	}
	postData(output, "Observation", formID);
}
function diagnosisXML() {
	var i, j, p1, p2, p3, p4, p5, p6, p7, p8, p9 = "", len, temp, str = '', str2 = '', output = '';
	p1 = document.getElementById("pId").value;
	p2 = document.getElementById("pName").value;
	p3 = document.getElementById("birthDate").value;
	p4 = "Patient/112441"
	p5 = document.getElementById("examineDate").value;
	p6 = "Practitioner/AJN0050605011970N1"
	p7 = document.getElementById("radiologistName").value;
	temp = document.getElementsByName("category");
	for (i = 0; i < temp.length; i++) {
		if (temp[i].checked == true) {
			p8 = temp[i].value;;
			if (i == 2) {
				temp = document.getElementsByName("suspicion");
				for (j = 0; j < temp.length; j++) {
					if (temp[j].checked == true) {
						p8 += temp[j].value + '"/></DiagnosticReport>';
					}
				}
			}
			if (i != 2) {
				p8 += '"/></DiagnosticReport>'
			}
			break;
		}
	}

	for (i = 0; i < cmass[0]; i++) {
		str2 += '<result><reference value="Observation/' + cmass[i + 1] + '"/><identifier><system value="http://www.radlex.org"/><value value="RID39055"/></identifier></result>';
	}
	for (i = 0; i < ccal[0]; i++) {
		str2 += '<result><reference value="Observation/' + ccal[i + 1] + '"/><identifier><system value="http://www.radlex.org"/><value value="RID34642"/></identifier></result>';
	}
	for (i = 0; i < casym[0]; i++) {
		str2 += '<result><reference value="Observation/' + casym[i + 1] + '"/><identifier><system value="http://www.radlex.org"/><value value="RID34265"/></identifier></result>';
	}
	for (i = 0; i < cdistort[0]; i++) {
		str2 += '<result><reference value="Observation/' + cdistort[i + 1] + '"/><identifier><system value="http://www.radlex.org"/><value value="RID34261"/></identifier></result>';
	}

	output += '<?xml version="1.0" encoding="UTF-8"?><DiagnosticReport xmlns="http://hl7.org/fhir" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://hl7.org/fhir fhir-all-xsd/diagnosticreport.xsd">';
	output += '<Patient><id value="' + p1 + '"/><text><status value="generated"/><div xmlns="http://www.w3.org/1999/xhtml"><h1>病患資料顯示</h1></div></text><active value="true"/><name><use value="usual"/><text value="' + p2 + '"/></name><gender value="female"/><birthDate value="' + p3 + '"/></Patient>';
	output += '<status value="final"/><code><coding><system value="http://loinc.org"/><code value="24606-6"/></coding><text value="MG Breast Screening"/></code><subject><reference value="' + p4 + '"/></subject><effectiveDateTime value="' + p5 + '"/>';
	output += '<performer><role><coding><system value="http://hl7.org/fhir/ValueSet/performer-role"/><code value="41904004"/><display value="Medical X-ray technician"/></coding></role><actor><reference value="' + p6 + '"/><display value="' + p7 + '"/></actor></performer>';
	output += str2 + str + '<conclusion value="' + p8;

	alert(output);
	postData(output, "DiagnosticReport", "");
}
function postData(jsonString, type, formID) {

	//xhttp.setRequestHeader("Content-type", 'text/xml');
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", fhir.url + type, true);
	xhttp.setRequestHeader("Content-type", 'application/json');
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) // && this.status == 201) 
		{
			var ret = JSON.parse(this.responseText);
			if (formID != 'line' && formID != 'rectangle' && formID != 'circle') {
				alert(this.responseText);
			}

			//alert(str2[0]);
			if (formID == 'mass')
				cmass[cmass[0]] = ret.id;
			if (formID == 'calcifications')
				ccal[ccal[0]] = ret.id;
			if (formID == 'asymmetry')
				casym[casym[0]] = ret.id;
			if (formID == 'architecturalDistortion')
				cdistort[cdistort[0]] = ret.id;
			if (formID == 'line')
				cline.push(ret.id);
			//cline[currrows] = ret.id;
			if (formID == 'rectangle')
				crect.push(ret.id);
			//crect[currrows] = ret.id;
			if (formID == 'circle')
				ccircle.push(ret.id);
			//ccircle[currrows] = ret.id;

		}
	};
	var data = JSON.stringify(jsonString);
	xhttp.send(data);
}
function check(p) {
	if (p.id == "mass")
		cmass[0]++;
	if (p.id == "calcifications")
		ccal[0]++;
	if (p.id == "asymmetry")
		casym[0]++;
	if (p.id == "architecturalDistortion")
		cdistort[0]++;
	if (p.id == "QuestionCheck")
		cQuesCheck[0]++;

	var thisform = document.getElementById(p.id);
	var elements = thisform.elements, count = 0, checkcount = 0;
	if (p.id == "QuestionCheck") { checkcount = 0 }
	else {
		for (i = 0; i < elements.length; i++) {
			if (elements[i].checked == true)
				count++;
		}
		if (p.id == "mass" && count != 7)
			checkcount = 1;
		if (p.id == "calcifications" && count != 5)
			checkcount = 1;
		if ((p.id == "asymmetry" || p.id == "architecturalDistortion") && count != 3)
			checkcount = 1;
	}
	if (checkcount != 0)
		alert(p.id + "未勾選完畢");
	else {
		mammoXML(p.id, p.name);
		if (p.id == "QuestionCheck") {
			var que = ["RetractionSkin_", "ThickeningSkin_", "DilatedLactiferous_", "EnlargedAxillary_"];
			for (i = 0; i < que.length; i++) {
				for (j = 0; j < 2; j++) {
					p[count] = que[i] + j;
					document.getElementById(p[count]).checked = false;
				}
			} document.getElementById("Q5_answer").value = "";
		} else {
			for (i = 0; i < elements.length; i++) {
				if (elements[i].checked == true)
					elements[i].checked = false;
			}
		}
	}
}
