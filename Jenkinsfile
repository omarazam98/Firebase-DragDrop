def project = 'silent-vim-243301'
def  appName = 'client'
def  feSvcName = "${appName}-service"
//slashes are invalid characters for image names, so we replace them with underscores
def modifiedBranchName = env.BRANCH_NAME.replace("/", "_")
def  imageTag = "gcr.io/${project}/${appName}:${modifiedBranchName}.${env.BUILD_NUMBER}"

pipeline {
  agent {
    kubernetes {
      label 'client'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
labels:
  component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: cd-jenkins
  containers:
  - name: node
    image: node:8.16.0-jessie
    command:
    - cat
    tty: true
  - name: gcloud
    image: gcr.io/cloud-builders/gcloud
    command:
    - cat
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    command:
    - cat
    tty: true
"""
     }
  }
  stages {
    stage('Install dependencies') {
      steps {
        container('node') {
          sh """
            ln -s `pwd` /app
            cd /app
            npm ci
          """
        }
      }
    }
    stage('Test') {
      steps {
        container('node') {
          sh """
            npm test -- --watchAll=false
          """
        }
      }
    }
    stage('Build and push image with Container Builder') {
      steps {
        container('gcloud') {
          sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${imageTag} ."
        }
      }
    }
    stage('Deploy integration'){
      when {branch 'integration'}
      steps {
        container('kubectl'){
          sh """
            sed -i.bak 's#gcr.io/${project}/${appName}:1.0.0#${imageTag}#' ./k8s/integration/*.yaml")
            kubectl --namespace=integration apply -f k8s/services/
            kubectl --namespace=integration apply -f k8s/integration/
            echo http://`kubectl --namespace=integration get service/${feSvcName} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${feSvcName}
          """
        }
      }
    }
    // stage('Deploy Canary') {
    //   // Canary branch
    //   when { branch 'canary' }
    //   steps {
    //     container('kubectl') {
    //       // Change deployed image in canary to the one we just built
    //       sh("sed -i.bak 's#gcr.io/${project}/${appName}:1.0.0#${imageTag}#' ./k8s/canary/*.yaml")
    //       sh("kubectl --namespace=production apply -f k8s/services/")
    //       sh("kubectl --namespace=production apply -f k8s/canary/")
    //       sh("echo http://`kubectl --namespace=production get service/${feSvcName} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${feSvcName}")
    //     } 
    //   }
    // }
    // stage('Deploy Production') {
    //   // Production branch
    //   when { branch 'master' }
    //   steps{
    //     container('kubectl') {
    //     // Change deployed image in canary to the one we just built
    //     // searches for the line that 
    //       sh("sed -i.bak 's#gcr.io/${project}/${appName}:1.0.0#${imageTag}#' ./k8s/production/*.yaml")
    //       sh("kubectl --namespace=production apply -f k8s/services/")
    //       sh("kubectl --namespace=production apply -f k8s/production/")
    //       sh("echo http://`kubectl --namespace=production get service/${feSvcName} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${feSvcName}")
    //     }
    //   }
    // }
    stage('Deploy Dev') {
      // Developer Branches
      when { 
        not { branch 'master' } 
        not { branch 'canary' }
        not { branch 'integration'}
      } 
      steps {
        container('kubectl') {
          // Create namespace if it doesn't exist
          sh """
            kubectl get ns ${modifiedBranchName} || kubectl create ns ${modifiedBranchName}
            // Don't use public load balancing for development branches
            sed -i.bak 's#LoadBalancer#ClusterIP#' ./k8s/services/client-service.yaml
            sed -i.bak 's#gcr.io/${project}/${appName}:1.0.0#${imageTag}#' ./k8s/dev/*.yaml
            kubectl --namespace=${modifiedBranchName} apply -f k8s/services/
            kubectl --namespace=${modifiedBranchName} apply -f k8s/dev/
          """
          echo 'To access your environment run `kubectl proxy`'
          echo "Then access your service via http://localhost:8001/api/v1/proxy/namespaces/${modifiedBranchName}/services/${feSvcName}:5000/"
        }
      }     
    }
  }
}
