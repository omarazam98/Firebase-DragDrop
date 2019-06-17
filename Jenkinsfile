pipeline {
  triggers {
    pollSCM 'H/1 * * * *'
  }
  agent {
    dockerfile true
  }
  stages {
    stage('test'){
      steps {
        sh 'npm install'
        sh 'npm test -- --watchAll=false'
      }
    }
    stage('build'){
      steps {
        sh 'npm run build'
      }
    }
  }
}
