var Observation, massObservation, calcificationObservation, asymetryObservation, architecturalDistortionObservation, questionObservation, annotationObservation;
Observation = {
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
            "system": "http://hl7.org/fhir/STU3/valueset-observation-codes.html",
            "code": "",//10193-1
            "Display": "Physical findings of Breasts Narrative"
        }]
    },
    "subject": {
        "reference": ""
    }
}
massObservation =
{
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
calcificationObservation =
{
    "derivedFrom":
        [{
            "reference": "",
        }]
    ,
    "valueCodeableConcept": {
        "coding": [{
            "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/breastrad-RtOrLt",
            "code": "",
        }]
    },
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
                "system": "http://misat.org.tw/CodeSystem/DistributionCS",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://misat.org.tw/CodeSystem/MorphologyCS",
                "code": "",
            }]
        }
    }]
}
asymetryObservation =
{
    "derivedFrom":
        [{
            "reference": "",
        }]
    ,
    "valueCodeableConcept": {
        "coding": [{
            "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/breastrad-RtOrLt",
            "code": "",
        }]
    },
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
    }]
}
architecturalDistortionObservation =
{
    "derivedFrom":
        [{
            "reference": "",
        }]
    ,
    "valueCodeableConcept": {
        "coding": [{
            "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/breastrad-RtOrLt",
            "code": "",
        }]
    },
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
    }]
}
questionObservation =
{
    "derivedFrom":
        [{
            "reference": "",
        }]
    ,
    "component": [{
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/RetractionSkin_Right",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/RetractionSkin_Left",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/ThickeningSkin_Right",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/ThickeningSkin_Left",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/DilatedLactiferous_Right",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breastcancer/CodeSystem/DilatedLactiferous_Left",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breast-radiology/2019Sep/CodeSystem-breastrad-LymphNodeQualifiersCS.json.html",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breast-radiology/2019Sep/CodeSystem-breastrad-LymphNodeQualifiersCS.json.html",
                "code": "",
            }]
        }
    }, {
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/us/breast-radiology/2019Sep/CodeSystem-breastrad-answer",
                "code": "",
            }]
        }
    }
    ]
}
annotationObservation =
{
    "basedOn": [{
        "identifier": {
            "system": "http://127.0.0.1:5500/study_22.html",
            "value": "1.2.1840.113681.2198909122.3931.3228559234.102.1"
        }
    }],
    "category": [{
        "coding": [{
            "system": "http://hl7.org/fhir/observation-category",
            "code": "imaging"
        }]
    }],
    "component": [{
        "code": {
            "coding": [{
                "system": "https://www.dicom.org.tw/",
                "code": "SVG.Annotation",
                "display": "SVG Annotation"
            }]
        },
        "valueString": ""
    }, {
        "code": {
            "coding": [{
                "system": "https://www.dicom.org.tw/",
                "code": "viewPort.sx",
                "display": "viewPort.sx"
            }]
        },
        "valueString": "0"
    }, {
        "code": {
            "coding": [{
                "system": "https://www.dicom.org.tw/",
                "code": "viewPort.sy",
                "display": "viewPort.sy"
            }]
        },
        "valueString": "0"
    }, {
        "code": {
            "coding": [{
                "system": "https://www.dicom.org.tw/",
                "code": "viewPort.sw",
                "display": "viewPort.sw"
            }]
        },
        "valueString": "2560"
    }, {
        "code": {
            "coding": [{
                "system": "https://www.dicom.org.tw/",
                "code": "viewPort.sh",
                "display": "viewPort.sh"
            }]
        },
        "valueString": "3328"
    }, {
        "code": {
            "coding": [{
                "system": "https://www.dicom.org.tw/",
                "code": "WindowCenter",
                "display": "WindowCenter"
            }]
        },
        "valueString": "2047"
    }, {
        "code": {
            "coding": [{
                "system": "https://www.dicom.org.tw/",
                "code": "WindowWidth",
                "display": "WindowWidth"
            }]
        },
        "valueString": "4096"
    }, {
        "code": {
            "coding": [{
                "system": "https://www.dicom.org.tw/",
                "code": "DCM File",
                "display": "DCM File"
            }]
        },
        "valueString": "203.64.84.86/DicomWebViewer/Study2/DCMfiles/mammo1.dcm"
    }]
}

var fhir = {
    "url": "http://hapi.fhir.org/baseR4/"
}
var result = {
    "url": "http://hapi.fhir.org/baseDstu3/"
}

