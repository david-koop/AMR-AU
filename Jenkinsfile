pipeline {
    agent any  // משתמש ב-Agent של Jenkins

    environment {
        // משתנה לאחסון שם התמונה שאנחנו רוצים לבנות (ללא צורך כאן אם לא משתמשים ב-Docker)
        DOCKER_IMAGE = "playwright-project"
    }

    stages {
        // שלב זה בונה את התמונה של Docker (לא נדרש אם לא משתמשים ב-Docker)
        stage('Install Dependencies') {
            steps {
                script {
                    // מתקין את התלויות ב-Node.js, כולל playwright ו-ts-node
                    bat 'npm install'
                }
            }
        }

        // שלב זה מריץ את הבדיקות באמצעות Playwright
        stage('Run Playwright Tests') {
            steps {
                script {
                    // מריץ את הבדיקות באמצעות Playwright (באמצעות npm)
                    bat 'npx playwright test'
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
