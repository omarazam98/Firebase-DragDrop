node {
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
}
