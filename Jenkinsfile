pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "playwright-project"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // שימוש ב-bat כדי להריץ פקודות CMD ב-Windows
                    bat 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    // גם כאן נשתמש ב-bat כדי להריץ את הפקודה ב-Windows
                    bat 'docker run --rm ${DOCKER_IMAGE}'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
        }
    }
}
