export const jsonTemplate = {
    "_id": "xxxxxxxxx",
    "stepId": "xxxxxxxxx",
    "orderIndex": ["0x1","0x2","0x3"],
    "stepRenderingJson": {
        "0x1": [
            {
                "id": "name",
                "label": "Enter Your Fullname",
                "type": "input",
                "placeholder": "Enter name",
                "config": {
                    "datatype": "text",
                    "placeholder": "Your Name"
                },
                "value": "",
                "validation": {
                    "required": true
                },
                "valid": false, 
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "street",
                "label": "Enter Your Address",
                "type": "textarea",
                "placeholder": "Enter Address",
                "config": {
                    "datatype": "text",
                    "placeholder": "Street"
                },
                "value": "",
                "validation": {
                    "required": true
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "zipCode",
                "type": "input",
                "label": "Enter zipcode",
                "placeholder": "Enter zipcode",
                "config": {
                    "datatype": "text",
                    "placeholder": "ZIP Code"
                },
                "value": "",
                "validation": {
                    "required": true,
                    "minLength": 5,
                    "maxLength": 5
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "country",
                "type": "select",
                "label":"Enter country",
                "placeholder": "Enter country",
                "config": {
                    "datatype": "text",
                    "placeholder": "Country"
                },
                "options": [
                    {
                        "value": "USA",
                        "displayvalue": "United state of america"
                    },
                    {
                        "value": "UK",
                        "displayvalue": "United kingdom"
                    },
                    {
                        "value": "IN",
                        "displayvalue": "India"
                    }
                ],
                "value": "",
                "validation": {
                    "required": true
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "email",
                "type": "input",
                "label": "Enter email",
                "placeholder": "Enter email",
                "config": {
                    "datatype": "email",
                    "placeholder": "Your E-Mail"
                },
                "value": "",
                "validation": {
                    "required": true,
                    "isEmail": true
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            }
        ],
        "0x2": [
            {
                "id": "name",
                "label": "Enter Your Fullname",
                "type": "input",
                "placeholder": "Enter name",
                "config": {
                    "datatype": "text",
                    "placeholder": "Your Name"
                },
                "value": "",
                "validation": {
                    "required": true
                },
                "valid": false, 
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "street",
                "label": "Enter Your Address",
                "type": "textarea",
                "placeholder": "Enter Address",
                "config": {
                    "datatype": "text",
                    "placeholder": "Street"
                },
                "value": "",
                "validation": {
                    "required": true
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "zipCode",
                "type": "input",
                "label": "Enter zipcode",
                "placeholder": "Enter zipcode",
                "config": {
                    "datatype": "text",
                    "placeholder": "ZIP Code"
                },
                "value": "",
                "validation": {
                    "required": true,
                    "minLength": 5,
                    "maxLength": 5
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "country",
                "type": "select",
                "label":"Enter country",
                "placeholder": "Enter country",
                "config": {
                    "datatype": "text",
                    "placeholder": "Country"
                },
                "options": [
                    {
                        "value": "USA",
                        "displayvalue": "United state of america"
                    },
                    {
                        "value": "UK",
                        "displayvalue": "United kingdom"
                    },
                    {
                        "value": "IN",
                        "displayvalue": "India"
                    }
                ],
                "value": "",
                "validation": {
                    "required": true
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "email",
                "type": "input",
                "label": "Enter email",
                "placeholder": "Enter email",
                "config": {
                    "datatype": "email",
                    "placeholder": "Your E-Mail"
                },
                "value": "",
                "validation": {
                    "required": true,
                    "isEmail": true
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            }
        ],
        "0x3": [
            {
                "id": "name",
                "label": "Enter Your Fullname",
                "type": "input",
                "placeholder": "Enter name",
                "config": {
                    "datatype": "text",
                    "placeholder": "Your Name"
                },
                "value": "",
                "validation": {
                    "required": true
                },
                "valid": false, 
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "street",
                "label": "Enter Your Address",
                "type": "textarea",
                "placeholder": "Enter Address",
                "config": {
                    "datatype": "text",
                    "placeholder": "Street"
                },
                "value": "",
                "validation": {
                    "required": true
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "zipCode",
                "type": "input",
                "label": "Enter zipcode",
                "placeholder": "Enter zipcode",
                "config": {
                    "datatype": "text",
                    "placeholder": "ZIP Code"
                },
                "value": "",
                "validation": {
                    "required": true,
                    "minLength": 5,
                    "maxLength": 5
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "country",
                "type": "select",
                "label":"Enter country",
                "placeholder": "Enter country",
                "config": {
                    "datatype": "text",
                    "placeholder": "Country"
                },
                "options": [
                    {
                        "value": "USA",
                        "displayvalue": "United state of america"
                    },
                    {
                        "value": "UK",
                        "displayvalue": "United kingdom"
                    },
                    {
                        "value": "IN",
                        "displayvalue": "India"
                    }
                ],
                "value": "",
                "validation": {
                    "required": true
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            },
            {
                "id": "email",
                "type": "input",
                "label": "Enter email",
                "placeholder": "Enter email",
                "config": {
                    "datatype": "email",
                    "placeholder": "Your E-Mail"
                },
                "value": "",
                "validation": {
                    "required": true,
                    "isEmail": true
                },
                "valid": false,
                "errorMessage": "Enter valid data",
                "touched": false
            }
        ]
       
    }
}