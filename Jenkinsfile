pipeline {
    agent any

    environment {
        // משתנה לאחסון שם התמונה שאנחנו רוצים לבנות
        DOCKER_IMAGE = "playwright-project"
    }

    stages {
        // שלב זה בונה את התמונה של Docker
        stage('Build Docker Image') {
            steps {
                script {
                    // מבצע את פקודת Docker build כדי לבנות את התמונה
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }

        // שלב זה מריץ את הבדיקות בתוך קונטיינר ה-Docker
        stage('Run Playwright Tests') {
            steps {
                script {
                    // מריץ את הבדיקות בקונטיינר שנבנה בשלב הקודם
                    sh 'docker run --rm ${DOCKER_IMAGE}'
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
