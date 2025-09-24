export default {
    common: {
        cancel: 'Cancel',
        ok: 'OK',
        save: 'Submit',
        signIn: 'Sign In',
        activeCard: 'Activate Card',
        emergencyAccess: 'Emergency Access',
        submitRequest: 'Submit Request',
        page_title: 'Temi Web',
        no_options: 'Empty',
        table: {
            total: (total: number) => {
                return `Total ${total} items`;
            },
        },
        validate: {
            required: 'This field is required',
            invalid: {
                email: 'Email invalid',
                password: 'Password invalid',
            },
        },
        placeholder: {
            placeholderCardId: 'Enter your Card ID',
            placeholderPassword: 'Enter your password',
            placeholderEmergency: 'Enter emergency password',
            placeholderBirthPlace: 'Enter birth place',
        },
    },
    auth: {
        loginButton: 'Login',
        title: 'my DMO-Card',
        individual: {
            title: 'Individual Access',
            subTitle: ' Personal Access allows you to activate your card and manage your medical record associated with your DMO-Card.',
            buttonText: 'Manage my DMO-Card',
            login: {
                title: 'HealthCare Portal',
                subTitle: 'Welcome to your personal health portal. Sign in to access your medical records and appointments.',
                form: {
                    cardId: 'Card ID',
                    password: 'Password',
                    email: 'Email Address',
                },
            },
        },
        professional: {
            title: 'Health Professional Access',
            subTitle:
                'Access for a health care professional allows you to access the entire medical record of the patient, subject to his or her authorization.',
            buttonText: "Accessing a patient's DMO-Card",
            login: {
                title: 'Medical Professional Portal',
                subTitle:
                    'Access patient records, manage appointments, and collaborate with your medical team through our secure professional platform.',
                note1: 'Electronic Health Records',
                note2: 'Patient Management System',
                note3: 'Clinical Decision Support',
                note4: 'Secure Communication',
                titleForm: 'Medical Staff Login',
                subTitleForm: 'Sign in to access your professional dashboard',
                form: {
                    cardId: 'Card ID',
                    emergencyPassword: 'Emergency Password',
                    birthDate: 'Birth Date',
                    birthPlace: 'Birth Place',
                    applicantName: 'Name of Applicant',
                    applicantEmail: "Applicant's Email",
                },
            },
        },
        emergency: {
            title: 'Emergency Overview',
            buttonText: 'Emergency',
            subTitle: 'Quick access to critical medical information during emergencies',
            login: {
                title: 'EMERGENCY ACCESS',
                subTitle: 'CRITICAL PATIENT ACCESS PORTAL',
                subTitle2: 'For immediate medical emergencies and urgent patient care',
                textWarning: 'Emergency Protocol Active',
                descriptions:
                    'This portal provides rapid access to critical patient information for emergency medical situations. All access is logged and monitored for security purposes.',
                form: {
                    title: 'EMERGENCY ACCESS',
                    subTitleForm: 'For critical medical emergencies only',
                    cardId: 'Card ID',
                    emergencyPassword: 'Emergency Password',
                    birthDate: 'Birth Date',
                    birthPlace: 'Birth Place',
                },
            },
        },
    },
};
