const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:false,
        placeholder:"Email address"
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:false,
        placeholder:"Password"
    }
]

const signupFields=[
    {
        labelText:"First Name",
        labelFor:"firstName",
        id:"firstName",
        name:"firstName",
        type:"text",
        autoComplete:"firstName",
        isRequired:true,
        placeholder:"First Name"
    },
    {
        labelText:"Last Name",
        labelFor:"lastName",
        id:"lastName",
        name:"lastName",
        type:"text",
        autoComplete:"lastName",
        isRequired:true,
        placeholder:"Last Name"
    },
    {
        labelText:"Email address",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"
    }
]

export {loginFields,signupFields}