import * as Yup from 'yup'

const FlashCardSchema = Yup.object().shape({
    // Validates that the "groupid" field is a string.
    groupid: Yup.string(),

    // Validates that the "groupname" field is a string with a maximum length of 30 characters and is required.
    groupname: Yup.string()
        .max(30, "Must be less than 30 characters")
        .required('Required'),

    // Validates that the "groupdescription" field is a string with a maximum length of 320 characters.
    groupdescription: Yup.string()
    .max(320, "Must be less than 320 characters")
    .required('Required'),

    // Validates that the "groupimg" field is a mixed type.
    groupimg: Yup.mixed(),

    // Validates that the "cards" field is an array of objects, and each object has the "cardid", "cardname", and "carddescription" fields.
    cards: Yup.array().of(
        Yup.object().shape({
            cardid: Yup.string(),
            cardname: Yup.string()
                .max(20, 'Must be less than 20 characters')
                .required('Required'),

            // Validates that the "carddescription" field is a string with a maximum length of 320 characters and is required.
            carddescription: Yup.string()
                .max(320, "Must be less than 320 characters")
                .required('Required')
        })
    ),

    // Validates that the "createdOn" field is a date type with a default value of the current date and time.
    createdOn: Yup.date().default(() => new Date())
})

export default FlashCardSchema
