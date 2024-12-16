declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NAME: string;
            EMAIL: string;
            PASSWORD: string;
            ORG_USER_EMAIL: string;
            ORG_USER_PASSWORD: string;
            EMAIL_CONTENT_CANDIDATE: string;
            EMAIL_CONTENT_INTERVIEWER: string;
            SMS_CONTENT: string;
            ORG_UNIT_ID: string;
            SECRET_KEY: string;
            EMAIL_TEMPLATE_NAME: string;
            INTERVIEWER_EMAIL_TEMPLATE_NAME: string;
            SMS_TEMPLATE_NAME: string;
            ORGANIZATION_NAME: string;
            FORM_TEMPLATE_NAME: string;
            BRANCH_NAME1: string;
            BRANCH_NAME2: string;

        }
    }
}

export { };
