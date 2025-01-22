@Library('jenkin-helpers') _

def project = 'vms-core'
def credential = 'dockerhub1'
def application = 'ui-mainternance'

pipeline {
  agent any

  options {
    ansiColor('xterm')
  }

  // parameters {
  //   string(name: 'branch', defaultValue: '*/master')
  // }

  environment {
    DOCKER_TAG = "${application}.v${BUILD_NUMBER}"
    DOCKER_IMAGE = "truongthanh2a3/${project}"
    DOCKER_CREDENTIAL = "${credential}"
  }

  stages {
    stage('Checkout') {
      // when {
      //   expression { params.branch != '*/master' }
      // }

      steps {
        checkout(
          [
            $class: 'GitSCM',
            branches: [[name: 'refs/heads/devops']],
            userRemoteConfigs: [
              [
                url: GIT_URL,
                credentialsId: 'github1',
                name: 'origin'
              ]
            ]
          ]
        )

        // script {
        //   sh '''
        //     sed -i 's/npm run build/npm run build:dev/g' Dockerfile
        //   '''
        // }
      }
    }

    stage('Build') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIAL, passwordVariable: 'DOCKER_CREDENTIAL_PASSWORD', usernameVariable: 'DOCKER_CREDENTIAL_USERNAME')]) {
            sh '''
              echo $DOCKER_CREDENTIAL_PASSWORD | docker login -u $DOCKER_CREDENTIAL_USERNAME --password-stdin $DOCKER_REGISTRY
              docker build -t $DOCKER_IMAGE:$DOCKER_TAG .
              docker push $DOCKER_IMAGE:$DOCKER_TAG
              docker image rm $DOCKER_IMAGE:$DOCKER_TAG
            '''
          }
        }
      }
    }
  }
}

