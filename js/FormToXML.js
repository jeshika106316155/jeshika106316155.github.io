function formInputsToXML(formID, selected, selectedObs) {
    var thisform = document.getElementById(formID);
    var elements = thisform.elements;
	if ( selected == "Patient" ){
		var output = '<Patient xmlns="http://hl7.org/fhir">';
		for (i = 0; i < elements.length; i++) {
			// alert(i + elements[i].name + elements[i].value);
			form_elem = elements[i];
			if (form_elem.type === "text") {
				output += '<' + form_elem.name + '>';
				if ( form_elem.name == "identifier" ){
					output += '<value';
				}
				if ( form_elem.name == "name" ){
					output += '<text';
				}
				output += ' value="' + form_elem.value + '"/>';
				output += '</' + form_elem.name + '>';
			}
			//---radio and checkbox
			if (form_elem.type === "radio" && form_elem.checked === true) { 
				output += '<' + form_elem.name;
				output += ' value="' + form_elem.value + '"/>';
			}
			if (form_elem.type === "date") { 
				output += '<' + form_elem.name;
				output += ' value="' + form_elem.value + '"/>';
			}
		}
		output += '</Patient>';
	}
	if ( selected == "Organization" ){
		var output = '<Organization xmlns="http://hl7.org/fhir"><type><coding><system value="http://hl7.org/fhir/organization-type"/>';
		for (i = 0; i < elements.length; i++) {
			// alert(i + elements[i].name + elements[i].value);
			form_elem = elements[i];
			if (form_elem.type === "text") {
				if ( form_elem.name == "type" ){
					output += '<text value="' + form_elem.value + '"/></type>';
				}
				if ( form_elem.name == "name" ){
					output += '<name value="' + form_elem.value + '"/>';
				}
				if ( form_elem.name == "telecom" ){
					output += '<value value="' + form_elem.value + '"/></' + form_elem.name + '>';
				}
				if ( form_elem.name == "postalCode" ){
					output += '<address><' + form_elem.name + ' value="' + form_elem.value + '"/>';
				}
				if ( form_elem.name == "address" ){
					output += '<text value="' + form_elem.value + '"/></' + form_elem.name + '>';
				}
			}
			//---select
			if (form_elem.type === "select-one") {
				var selectTitle = form_elem.options[form_elem.selectedIndex].title;
				if ( form_elem.name == "code" ){
					output += '<' + form_elem.name;
					output += ' value="' + selectTitle + '"/>';	
					output += '<display value="' + form_elem.value + '"/></coding>';
				}
				if ( form_elem.name == "system" ){
					output += '<telecom><' + form_elem.name;
					output += ' value="' + selectTitle + '"/>';	
				}
				
			}
		}
		output += '</Organization>';
	}
	if ( selected == "MedicationRequest" ){
		var output = '<MedicationRequest xmlns="http://hl7.org/fhir"><id value=""/>';
		for (i = 0; i < elements.length; i++) {
			// alert(i + elements[i].name + elements[i].value);
			form_elem = elements[i];
			if (form_elem.type === "text") {
				if ( form_elem.name == "identifier" ){
					output += '<' + form_elem.name +'><value value="' + form_elem.value + '"/></' + form_elem.name + '><status value="completed"/>';
				}
				if ( form_elem.name == "pid" ){
					output += '<subject>';
					output += '<reference value="Patient/' + form_elem.value + '"/>';
				}
				if ( form_elem.name == "pname" ){
					output += '<display value="' + form_elem.value + '"/></subject>';
				}
				if ( form_elem.name == "oid" ){
					output += '<requester><onBehalfOf>';
					output += '<reference value="Organization/' + form_elem.value + '"/>';
				}
				if ( form_elem.name == "oname" ){
					output += '<display value="' + form_elem.value + '"/></onBehalfOf></requester>';
				}
				if ( form_elem.name == "additionalInstruction" ){
					output += '<dosageInstruction><' + form_elem.name +'><coding><system value="http://hl7.org/fhir/ValueSet/additional-instruction-codes"/><code value="311504000"/>';
					output += '<display value="' + form_elem.value + '"/></coding></' + form_elem.name + '>';
				}
			}
			//---select
			if (form_elem.type === "select-one") {
				var selectTitle = form_elem.options[form_elem.selectedIndex].title;
				if ( form_elem.name == "category" ){
					output += '<' + form_elem.name + '><coding><system value="http://hl7.org/fhir/medication-request-category"/><code';
					output += ' value="' + selectTitle + '"/></coding></category>';	
				}
				if ( form_elem.name == "timing" ){
					output += '<' + form_elem.name + '><code><coding><system value="www.nhi.gov.tw"/>';
					output += '<code value="' + selectTitle + '"/>';	
					output += '<display value="' + form_elem.value + '"/></coding></code></' + form_elem.name + '>';
				}
				if ( form_elem.name == "route" ){
					output += '<' + form_elem.name + '><coding><system value="www.nhi.gov.tw"/>';
					output += '<code value="' + selectTitle + '"/>';	
					output += '<display value="' + form_elem.value + '"/></coding></' + form_elem.name + '></dosageInstruction>';
				}			
			}
		}
		output += '</MedicationRequest>';
	}
	if ( selected == "Observation" ){
		var output = '<?xml version="1.0" encoding="UTF-8"?><Observation xmlns="http://hl7.org/fhir"><id value=""/><status value="preliminary"/><category><coding><system value="http://hl7.org/fhir/observation-category"/>';
		if (selectedObs == 'BloodPressure' ){
			output+= '<code value="vital-signs"/></coding></category><code><coding><system value="http://loinc.org"/><code value="85354-9"/><display value="Blood pressure panel with all children optional"/></coding></code>';
		}
		if (selectedObs == 'BodyTemperature' ){
			output+= '<code value="vital-signs"/></coding></category><code><coding><system value="http://loinc.org"/><code value="8310-5"/><display value="Body temperature"/></coding></code>';
		}
		if (selectedObs == 'Glucose' ){
				output+= '<code value="laboratory"/></coding></category><code><coding><system value="http://loinc.org"/><code value="15074-8"/><display value="Glucose [Moles/volume] in Blood"/></coding></code>';
		}
		for (i = 0; i < elements.length; i++) {
			
			// alert(i + elements[i].name + elements[i].value);
			form_elem = elements[i];
			if (form_elem.type === "text") {
				if ( form_elem.name == "pid" ){
					output += '<subject>';
					output += '<reference value="Patient/' + form_elem.value + '"/>';
				}
				if ( form_elem.name == "pname" ){
					output += '<display value="' + form_elem.value + '"/></subject>';
				}
				if ( form_elem.name == "device" ){
					output += '<' + form_elem.name + '>';
					output += '<reference value="Device/' + form_elem.value + '"/></' + form_elem.name + '>';
				}
				if ( form_elem.name == "valueQuantity" ){
					output += '<' + form_elem.name + '>';
					output += '<value value="' + form_elem.value + '"/><unit value="' + document.getElementById('unit').innerHTML + '"/>';
					output += '</' + form_elem.name + '>';
				}
				if ( form_elem.name == "8480-6" || form_elem.name == "8462-4"){
					output += '<component><code><coding><system value="http://loinc.org"/><code value="' + form_elem.name + '"/><display value="';
					if ( form_elem.name == "8480-6"){
						output += 'Systolic blood pressure"/>';
					}
					if ( form_elem.name == "8462-4"){
						output += 'Diastolic blood pressure"/>';
					}
					output += '</coding></code><valueQuantity><value value="' + form_elem.value + '"/><unit value="mmHg"/></valueQuantity></component>';
				}
			}
		}
		output += '</Observation>';
	}
	alert(output)
	return output;

}
function showXMLData(xmlStr) {
    var xmlDataArray;
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlStr, "text/xml");
    var nodeList = xmlDoc.getElementsByTagName("effectiveDateTime");
    alert(nodeList.length);
    alert(nodeList[0].nodeName);
    // https://www.w3schools.com/xml/met_element_getattribute.asp
    attValue = nodeList[0].getAttribute("value");
    alert(attValue);
}


function formXMLDataToArray(xmlStr) {
    var xmlDataArray;
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlStr, "text/xml");
    var nodeList = xmlDoc.getElementsByTagName("orderForm1");
    //    alert(entryList.length);
    var i;
    for (i = 0; i < nodeList.length; i++)
      {var nodeList2;
       nodeList2 = nodeList[i].childNodes;
       //alert(childNodes.length);
       alert(nodeList2[2].nodeName);
        //  alert(nodeList2[2].nodeValue);
       var nodeList3;
       nodeList3 = nodeList2[2].childNodes;
       alert(nodeList3[0].nodeName);
       alert(nodeList3[0].nodeValue);
  
       }
}

function postData(xmlString, type) {
    var xhttp = new XMLHttpRequest();
	var api='http://hapi.fhir.org/baseDstu3/' + type;
	xhttp.open("POST", api, true);
	xhttp.setRequestHeader("Content-type", 'text/xml');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) // && this.status == 201) 
        {
            ret=this.responseText;	
			alert(ret);
        }
    };
    var postData;
    postData = xmlString;
    xhttp.send(postData);
}
