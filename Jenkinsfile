pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'oussamadhraief/tickets-backend:latest'
        FRONTEND_IMAGE = 'oussamadhraief/tickets-frontend:latest'
        DOCKER_CREDENTIALS_ID = 'dockerhub_credentials'  // Correct credentials ID reference
        DOCKER_CONTEXT = 'default' // Explicitly specify the Docker context
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/oussamadhraief/tickets.git', credentialsId: 'github_credentials'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Building the backend and frontend images
                    sh 'docker build -t oussamadhraief/tickets-backend:latest backend/'
                    sh 'docker build -t oussamadhraief/tickets-frontend:latest frontend/'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    withEnv(["DOCKER_CONTEXT=${env.DOCKER_CONTEXT}"]) {
                        // Using credentials to push images to Docker Hub
                        withDockerRegistry([credentialsId: DOCKER_CREDENTIALS_ID, url: 'https://index.docker.io/v1/']) {
                            sh 'docker push oussamadhraief/tickets-backend:latest'
                            sh 'docker push oussamadhraief/tickets-frontend:latest'
                        }
                    }
                }
            }
        }
    }
}

