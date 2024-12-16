pipeline {
    agent { label 'agent-01' }  // תבחר ב-Agent בשם 'agent-01'

    stages {
        // שלב זה מתקין את התלויות של Node.js, כולל playwright ו-ts-node
        stage('Install Dependencies') {
            steps {
                script {
                    // התקן את התלויות ב-Node.js
                    bat 'npm install'
                }
            }
        }

        // שלב זה טוען את קובץ ה-.env ומוסיף את המשתנים לסביבה של Jenkins
        stage('Prepare Environment') {
            steps {
                script {
                    // טוען את כל המשתנים מקובץ .env לסביבה של Jenkins
                    bat '''@echo off
                    for /f "delims=" %%i in ('type C:\\Jenkins\\agent\\workspace\\AMR\\.env') do set %%i
                    '''
                }
            }
        }

        // שלב זה מריץ את הבדיקות באמצעות Playwright
        stage('Run Playwright Tests') {
            steps {
                script {
                    // הרץ את הבדיקות באמצעות Playwright
                    bat 'npx playwright test LoginTest.spec.ts'
                }
            }
        }
    }

    post {
        // שלב זה יתבצע תמיד אחרי סיום ה-Pipeline (גם אם הוא נכשל)
        always {
            echo 'Cleaning up...'
        }
    }
}



// pipeline {
//     agent any

//     environment {
//         // משתנה לאחסון שם התמונה שאנחנו רוצים לבנות
//         DOCKER_IMAGE = "playwright-project"
//     }

//     stages {
//         // שלב זה בונה את התמונה של Docker
//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     // מבצע את פקודת Docker build כדי לבנות את התמונה
//                     bat 'docker build -t %DOCKER_IMAGE% .'
//                 }
//             }
//         }

//         // שלב זה מריץ את הבדיקות בתוך קונטיינר ה-Docker
//         stage('Run Playwright Tests') {
//             steps {
//                 script {
//                     // מריץ את הבדיקות בקונטיינר שנבנה בשלב הקודם
//                     bat 'docker run --rm %DOCKER_IMAGE%'
//                 }
//             }
//         }
//     }

//     post {
//         // שלב זה יתבצע תמיד אחרי סיום ה-Pipeline (גם אם הוא נכשל)
//         always {
//             echo 'Cleaning up...'
//         }
//     }
// }
