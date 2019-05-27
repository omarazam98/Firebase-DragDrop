node {
  try {
    def commit_id
    stage('Preparation') {
      checkout scm
      sh "git rev-parse --short HEAD > .git/commit-id"
      commit_id = readFile('.git/commit-id').trim()
    }
    stage('test'){
      def myTestContainer = docker.image('node:10.15.3')
      myTestContainer.pull()
      myTestContainer.inside{

        withEnv([
                /* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
                'npm_config_cache=npm-cache',
                /* set home to our current directory because other bower
                * nonsense breaks with HOME=/, e.g.:
                * EACCES: permission denied, mkdir '/.config'
                */
                'HOME=.',
        ]){
          sh 'npm install'
          sh 'npm test -- --watchAll=false'
        }
      }
    }
  } catch (e) {
    // If there was an exception thrown, the build failed
    currentBuild.result = "FAILED"
    throw e
  } finally {
    // Success or failure, always send notifications
    notifyBuild(currentBuild.result)
  }
}

// method to send build notifications
def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  // Send notifications to slack
  slackSend (color: colorCode, message: summary)
}
}
