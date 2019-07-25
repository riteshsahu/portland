node server/script/index.js
node -e "require('./server/script').sync();"
node -e "require('./server/script').seedData();"


Role --- 
1. Admin
2. Management
3. Internal Employee
4. External Employee
5. Client

Status---
1. Active
2.Inactive































---- new customer
  this.state = {
            openState: 0,
            result: {
                clientInfo: {
                    firstName: "",
                    lastName: "",
                    initials: "",
                    title: "",
                    sin: "",
                    dob: "",
                    poa: "",
                    POAForm: ""
                },
                address: {
                    address: "",
                    primaryPhone: "",
                    mobileOther: "",
                    email: "",
                    zipcode: "",
                    province: "",
                    country: "",
                    appartmentNo: "",
                    houseNo: "",
                    city: "",
                },
                occupation: {
                    occupationStatus: "",
                    occupationStatus1: "",
                    occupation: "",
                    empName: "",
                    empEmail: "",
                    empAddress: "",
                    empCity: "",
                    empZipcode: "",
                    primaryPhone: "",
                    streetNo: "",
                    unitNo: "",
                    streetAdd: "",
                    country: "",
                    province: "",
                    industry: ""
                },
                identification: {
                    govtId: {
                        issueDate1: "",
                        fullName1: "",
                        idType1: "",
                        expiryDate1: "",
                        issuingAuthority1: "",
                        idNo1: "",
                        issueDate2: "",
                        fullName2: "",
                        idType2: "",
                        expiryDate2: "",
                        issuingAuthority2: "",
                        idNo2: "",
                    },
                    dualProcess: {
                        financeAccount: "",
                        name: "",
                        address: "",
                        dob: "",
                        sourceName1: "",
                        type1: "",
                        verificationDate1: "",
                        ref1: "",
                        sourceName2: "",
                        type2: "",
                        verificationDate2: "",
                        ref2: "",
                    },
                    creditFile: {
                        inquiryDate: "",
                        refInquiry: "",
                        bureauName: ""
                    }
                },
                residence: {
                    canadian: "",
                    citizenship: "",
                    tin: "",
                    usResident: "",
                    country: "",
                    province: "",
                    CRAform: "",
                    acAnEntity: "",
                    tinReason: "",
                    tinReasonInput: "",
                    CRA: "",
                },
                declaration: {
                    repName: "",
                    broker: "",
                    sign: "",
                    date: ""
                }
            }
        }
---- new Agent
 this.state = {
            addButton: false,
            data: {
                basicInfo: {
                    
                    legalName: "",
                    operatingName: "",
                    info:
                        [
                            {
                                businessType: "",
                                businessTypeInput: "",
                                registrationPlace: "",
                                expiryDate: "",
                                bin: "",
                                streetNo: "",
                                unitNo: "",
                                streetAdd: "",
                                country: "",
                                city: "",
                                province: "",
                                zipcode: "",
                                primaryPhone: "",
                                fax: ""
                            }
                        ],
                    website: "",
                    email: "",
                    branches: ""
                },
                contactInfo: [{
                    name: "",
                    position: "",
                    telephone: "",
                    email: ""
                }],
                businessStructure: {
                    gic: false,
                    mutualFunds: false,
                    securities: false,
                    insurance: false,
                    ppn: false,
                    mortgage: false,
                    other: false,
                    gicInput: "",
                    mutualFundsInput: "",
                    securitiesInput: "",
                    insuranceInput: "",
                    ppnInput: "",
                    mortgageInput: "",
                    otherInput: "",
                    rdba: false,
                    mfda: false,
                    iiroc: false,
                    mga: false

                },
                ccOfficer: {
                    name: "",
                    position: "",
                    telephone: "",
                    email: ""
                }
            }
        }