pipeline {
    agent any
    stages {
        stage('Prepare') {
            steps {
                echo 'Kwerty Admin Frontend Prepare Stage'
                sh 'node -v'
                sh 'npm -v'
            }
        }
        stage('Deploy') {
            when {
                branch 'develop'
            }
            steps {
                echo 'Kwerty Admin Frontend Deploy Stage'
                sh 'ssh projects@44.239.126.131 "cd kwerty-admin-frontend && git stash && git pull origin develop && npm install && npm run build && pm2 restart kwerty-admin"'
            }
        }
    }
}
