pipeline {
    agent { label 'agent-01' }  // Choose 'agent-01'


//    options {
//        // If one test fail the automation will stop
//         failFast true
//     }






    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // all the script is with 'bat' because it's windows
                    bat 'npm install'
                }
            }
        }

        // load the .ENV file to the job 
        stage('Prepare Environment') {
            steps {
                script {
                    bat '''@echo off
                    for /f "delims=" %%i in ('type C:\\Jenkins\\agent\\workspace\\AMR\\.env') do set %%i
                    '''
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    bat 'npx playwright test LoginTest.spec.ts --reporter=allure-playwright'

                    bat 'npx playwright test ChangePasswordTest.spec.ts --reporter=allure-playwright'
                    
                    bat 'npx playwright test GeneralSettingsTest.spec.ts --reporter=allure-playwright'

                    bat 'npx playwright test UsersSettingsTest.spec.ts --reporter=allure-playwright'

                    bat 'npx playwright test PositionsSettingsTest.spec.ts --reporter=allure-playwright'

                    bat 'npx playwright test EmailBuilderSettingsTest.spec.ts --reporter=allure-playwright'

                    bat 'npx playwright test SMSBuilderSettingsTest.spec.ts --reporter=allure-playwright'

                    bat 'npx playwright test AddPositionTest.spec.ts --reporter=allure-playwright'

                    bat 'npx playwright test AddCandidateTest.spec.ts --reporter=allure-playwright'

                }
            }
        }
    }

    post {
        always {
            // create allure report in jenkins
            archiveArtifacts '**/allure-results/**'  
            allure includeProperties: false, results: [[path: '**/allure-results']]
        }
    }
}