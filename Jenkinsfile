pipeline {
    agent any
    triggers {
        pollSCM('H/5 * * * *')  // Poll SCM every 5 minutes
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('jenkins')  // Correct credential reference
        IMAGE_NAME_SERVER = 'oussamadhraief/tickets-backend'  // Corrected image name format
        IMAGE_NAME_CLIENT = 'oussamadhraief/tickets-frontend'  // Corrected image name format
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/oussamadhraief/tickets.git',
                    credentialsId: 'github_credentials'
            }
        }
        stage('Build Server Image') {
            steps {
                dir('backend') {
                    script {
                        dockerImageServer = docker.build("${IMAGE_NAME_SERVER}")
                    }
                }
            }
        }
        stage('Build Client Image') {
            steps {
                dir('frontend') {
                    script {
                        dockerImageClient = docker.build("${IMAGE_NAME_CLIENT}")
                    }
                }
            }
        }
        stage('Push Images to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKERHUB_CREDENTIALS}") {
                        dockerImageServer.push()
                        dockerImageClient.push()
                    }
                }
            }
        }
    }
}

