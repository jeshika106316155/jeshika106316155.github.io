var fhir = {
    "url": "http://hapi.fhir.org/baseR4/"
}
var massObservation =
{
    "resourceType": "Observation",
    "identifier": [{
        "system": "",
        "value": ""
    }],
    "status": "",
    "code": {
        "coding": [{
            //"system": "http://www.radlex.org",
            //"code": "RID39055"http://hl7.org/fhir/ValueSet/observation-codes
            "system": "",
            "code": "",//10193-1
            "Display": ""
        }]
    },
    "subject": {
        "reference": ""
    },
    "valueCodeableConcept": {
        "coding": [{
            "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/breastrad-RtOrLt",
            "code": "",
        }]
    },
    "derivedFrom":
        [{
            "reference": "",
        }]
    ,
    "component": [{
        "code": {
            "fhir_comments": ["Location"],
            "coding": [{
                "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/oncology-BreastSiteCS",
                "code": "",
            }, {
                "fhir_comments": [" One view Only "],
                "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/breastrad-HemsphereViewCS",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/breastrad-SizeCS",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breast-radiology/CodeSystem/breastrad-ShapeCS",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breast-radiology/CodeSystem/breastrad-MarginCS",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breast-radiology/CodeSystem/breastrad-AbnormalityDensityCS",
                "code": "",
            }]
        }
    }]
}
// JSON 可參考的欄位:https:www.hl7.org/fhir/observation.html