export default {
    common: {
        cancel: 'Annuler',
        ok: 'OK',
        save: 'Soumettre',
        signIn: 'Se connecter',
        activeCard: 'Activer la carte',
        emergencyAccess: 'Accès d’urgence',
        submitRequest: 'Envoyer la demande',
        page_title: 'Temi Web',
        no_options: 'Vide',
        table: {
            total: (total: number) => {
                return `Total ${total} éléments`;
            },
        },
        validate: {
            required: 'Ce champ est obligatoire',
            invalid: {
                email: 'E-mail invalide',
                password: 'Mot de passe invalide',
            },
        },
        placeholder: {
            placeholderCardId: 'Entrez votre ID de carte',
            placeholderPassword: 'Entrez votre mot de passe',
            placeholderEmergency: 'Entrez le mot de passe d’urgence',
            placeholderBirthPlace: 'Entrez le lieu de naissance',
        },
    },
    sideBar: {
        profile: 'Profil',
        chronology: 'Chronologie',
        doctor: 'Médecins',
    },
    auth: {
        loginButton: 'Connexion',
        title: 'ma DMO-Card',
        individual: {
            title: 'Accès individuel',
            subTitle: 'L’accès personnel vous permet d’activer votre carte et de gérer votre dossier médical associé à votre DMO-Card.',
            buttonText: 'Gérer ma DMO-Card',
            login: {
                title: 'Portail Santé',
                subTitle:
                    'Bienvenue sur votre portail de santé personnel. Connectez-vous pour accéder à vos dossiers médicaux et rendez-vous.',
                form: {
                    cardId: 'ID de la carte',
                    password: 'Mot de passe',
                    email: 'Adresse e-mail',
                },
            },
        },
        professional: {
            title: 'Accès professionnel de santé',
            subTitle:
                'L’accès pour un professionnel de santé vous permet de consulter l’ensemble du dossier médical du patient, sous réserve de son autorisation.',
            buttonText: 'Accéder à la DMO-Card d’un patient',
            login: {
                title: 'Portail des professionnels de santé',
                subTitle:
                    'Accédez aux dossiers des patients, gérez les rendez-vous et collaborez avec votre équipe médicale via notre plateforme professionnelle sécurisée.',
                note1: 'Dossiers de santé électroniques',
                note2: 'Système de gestion des patients',
                note3: 'Support à la décision clinique',
                note4: 'Communication sécurisée',
                titleForm: 'Connexion du personnel médical',
                subTitleForm: 'Connectez-vous pour accéder à votre tableau de bord professionnel',
                form: {
                    cardId: 'ID de la carte',
                    emergencyPassword: 'Mot de passe d’urgence',
                    birthDate: 'Date de naissance',
                    birthPlace: 'Lieu de naissance',
                    applicantName: 'Nom du demandeur',
                    applicantEmail: 'E-mail du demandeur',
                },
            },
        },
        emergency: {
            title: 'Vue d’ensemble d’urgence',
            buttonText: 'Urgence',
            subTitle: 'Accès rapide aux informations médicales essentielles en cas d’urgence',
            login: {
                title: 'ACCÈS D’URGENCE',
                subTitle: 'PORTAIL D’ACCÈS PATIENT CRITIQUE',
                subTitle2: 'Pour les urgences médicales immédiates et les soins urgents aux patients',
                textWarning: 'Protocole d’urgence actif',
                descriptions:
                    'Ce portail fournit un accès rapide aux informations critiques du patient lors de situations médicales d’urgence. Tous les accès sont enregistrés et surveillés à des fins de sécurité.',
                form: {
                    title: 'ACCÈS D’URGENCE',
                    subTitleForm: 'Uniquement pour les urgences médicales critiques',
                    cardId: 'ID de la carte',
                    emergencyPassword: 'Mot de passe d’urgence',
                    birthDate: 'Date de naissance',
                    birthPlace: 'Lieu de naissance',
                },
            },
        },
    },
    dashboard: {
        chronology: {
            title: 'Chronologie des interventions',
            subTitle: 'Aperçu chronologique de l’historique médical',
            addButton: 'Ajouter une intervention',
            form: {
                note: 'Veuillez compléter le formulaire ci-dessous',
                type: 'Type d’intervention',
                interventionDate: 'Date de l’intervention',
                interventionTitle: 'Titre de l’intervention',
                hospital: 'Hôpital',
                attendingDoctor: 'Médecin traitant',
                des: 'Description et notes',
                addIntervention: 'Ajouter une intervention',
                updateIntervention: 'Mettre à jour une intervention',
            },
        },
        doctors: {
            title: 'Annuaire des médecins',
            subTitle: 'Gestion des spécialistes pour Sophie de Spiegelaar',
            addButton: 'Ajouter un médecin',
            form: {
                note: 'Veuillez compléter le formulaire ci-dessous',
                specialization: 'Spécialisation',
                firstName: 'Prénom',
                lastName: 'Nom',
                hospital: 'Hôpital / Cabinet',
                address: 'Adresse',
                country: 'Pays',
                phone: 'Téléphone',
                email: 'E-mail',
                addDoctor: 'Ajouter un médecin',
                updateDoctor: 'Mettre à jour un médecin',
            },
        },
    },
};
