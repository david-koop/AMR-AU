declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NAME: string;
            EMAIL: string;
            PASSWORD: string;
            ORGANIZATION_NAME: string;
            ORG_USER_EMAIL: string;
            ORG_USER_PASSWORD: string;
            ORG_UNIT_ID: string;
            SECRET_KEY: string;

        }
    }
}

export { };
