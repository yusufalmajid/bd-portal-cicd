export default function (context, inject) {
    const $dForm = {
        validationMessages: { // not used anymore. Since we are using translation
            required: "This field is required.",
            minlength: "Input must be at least {n} characters.",
            maxlength: "Input cannot be more than {n} characters.",
            equalto: "Input value does not match.",
            validemail: "Please enter a valid email.",
            min: "Minimum value is {n}.",
            max: "Maximum value is {n}.",
            accept: "File(s) extension is not accepted.",
            maxfile: "Please select not more than {n} files.",
            maxsize: "File(s) must less than {n}Mb.",
            validnumber: "Input must be a number.",
        },
        message(error) {
            const translateKey = `error_${error.type}`
            return error.value?.n ? context.i18n.t(translateKey, {n : error.value.n}) : context.i18n.t(translateKey)
        },
        customRules: {}
    }
    inject('dForm', $dForm);
}
