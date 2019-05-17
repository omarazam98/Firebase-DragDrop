# Win Win Onboarding and Environment Setup

[![N|Solid](http://winwinhomesharing.com/wp-content/uploads/2019/02/WIN-WIN-Logo-322x169.png)](http://winwinhomesharing.com/)

## Git
### What is Git?
Git is the most popular version control software in the world. It allows for version controlling and collaboration, and is quick to pick up. There are tons of resources available for learning the basics of git.

* [Atlassian Git tutorial](https://www.atlassian.com/git/tutorials)
* [Beginner Git Tutorial](https://www.atlassian.com/git/tutorials/what-is-version-control)

### Workflows
We are using the GitFlow workflow. In order to understand git flow please read the sections on Centralized Workflow, Feature Branch Workflow, and Git Flow Workflow at the link below.

* [Atlassian Git Workflows Guide](https://www.atlassian.com/git/tutorials/comparing-workflows/)

### Installing Git 

You can follow the atlassian guide below or check the appropriate subsection for your OS

* [Atlassian Git Installation Guide](https://www.atlassian.com/git/tutorials/install-git)

#### Linux
##### APT
    $ sudo apt update
    $ git --version // if this command shows a number there is no need for the next step
    $ sudo apt install git
    
#### Mac
If you have XCode or xcode command line tools installed, you will already have git installed.
You can check this by typing the command below:

    $ git --version
    git version 2.9.2
    
If this results in an error you can use homebrew to install it. If you don't have homebrew check out the homebrew installation guide below.

    $ brew install git

#### Windows
Unfortunately package managers on windows are lacking. Instead follow the link to the git installer below. And follow the wizard.

* [Windows Git Installer](https://git-scm.com/download/win)

 
## Homebrew (Mac Only)
### What is Homebrew?
Homebrew is a package manager for MacOs. If you've used any Linux package manager before, homebrew is very similar. It allows you to install, remove and manage software from the command line. It will allow you to install software that you need, from one centralized location.

### How to install
Follow the installalition guide below

* [Installation Guide](https://www.howtogeek.com/211541/homebrew-for-os-x-easily-installs-desktop-apps-and-terminal-utilities/)


## NodeJS and npm
### What is node?
NodeJS is a Javascript Runtime that allows javascript to be used as a server side language. We are not using Node at the moment. We may in the future, however for now, we need to install node in order to use npm (The node package manager).

### What is npm?
NPM ist the Node Package Manager. It's used to download packages, manage dependencies, and run scripts for Javascript applications. It is the biggest package manager in the world used by 11 000 000 developers worldwide.

We will be using npm to manage our application dependencies and in order to use npm we need to install node.

### Node installation
The node installation guide can be found here

* [Node installation guide](https://nodejs.org/en/download/package-manager/)

Or follow any of the guides below. Once completed you can confirm success by typing

    $ npm -v
    10.15.3 // any version number means success
    

#### Debian based Linux Distros includeing Ubuntu (APT)

In your terminal type

    $ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    $ sudo apt-get install -y nodejs
    
#### Mac

With homebrew

    $ brew install node
    
Without homebrew

    $ curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"

#### Windows

Download the LTS version of node from

* [Node installer page](https://nodejs.org/en/#download)
    
## Webstorm

Webstorm is the main IDE we will be using for development. It is a popular tool produced by JetBrains, one of the biggest providers of IDEs. If you've ever used Intellij, Pycharm, PHPstorm, or Clion you will have an easy time picking up Webstorm.

### Getting Webstorm for free
If you are currently a student, you are eligible for a free jetbrains account with access to the pro version of all of their IDEs. In order to redeem this, fill out the form at

* [Free Webstorm Application](https://www.jetbrains.com/shop/eform/students)

When you have installed WebStorm you will be able to login with the same account and gain access for free.

### Installing Webstorm
Full instructions are available at the link below. OS specific instructions are also available in the subheadings.

* [Webstorms installation instruction page](https://www.jetbrains.com/help/webstorm/install-and-set-up-product.html)

#### Linux
Download the installer below

* [Linux Installer](https://www.jetbrains.com/webstorm/download/#section=linux)    

Unpack the tarball
    
    $ tar xfz WebStorm-*.tar.gz <new_archive_folder>
    
Install at you desired location. Recommended is /opt. Replace /opt if you would like it to be installed elsewhere.

    $ sudo tar xfz WebStorm-*.tar.gz -C /opt/
    
Run with

    $ /opt/WebStorm-*/bin/webstorm.sh

#### MacOS
Download the installer below

* [Mac Installer](https://www.jetbrains.com/webstorm/download/#section=mac)    

Open the .dmg package that you downloaded then drag Webstorm to the Application folder.

#### Windows
Download the installer below

* [Windows Installer](https://www.jetbrains.com/webstorm/download/#section=windows)    

Run the Webstorm-*.exe file that you downloaded and follow the installation instructions

### Webstorm Plugins
#### React-Snippets
The most useful plugin. Offers a ton of snippets to complete boilerplate code in a split second.
#### React-Templates
Useful for creating your own snippets if you find that you reuse sections of code over and over


#### Idea-vim (if you like vim)
vim emulator for your ide to allow 
#### Material UI (if you want a VSCode like theme)
Material ui is a user interface skin for webstorm that makes it feel a lot more like VSCode. It comes with nice icons for your folders as well.


## Browser Plugins
### React dev-tools 
React dev tools allow you to interact with JSX in your browser rather than the compiled javascript. It makes debugging and development much easier and should be considered a required plugin.

* [Firefox Install](https://addons.mozilla.org/en-CA/firefox/addon/react-devtools/)
* [Chrome Install](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [Github Repo](https://github.com/facebook/react-devtools)
### React-redux dev tools
React-redux developer tools are an amazing browser plugin that lets you see the activity and interact with redux store in real time in your browser. It helps in development, test creation, and debugging, and should be considered an essential plugin as well.

Install at

* [Firefox Install]( https://addons.mozilla.org/en-CA/firefox/addon/reduxdevtools/ )
* [Chrome Install](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
* [Github Repo](https://github.com/zalmoxisus/redux-devtools-extension)

**It does require some additional steps to connect to your react app.**

In order to use it with a redux store, you need to add one line of code to your store initialization. The third line is added to a basic store, to allow it to connect to the redux devtools extension.

    const store = createStore(
        reducer, /* preloadedState, */
      + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    
## Atlassian
We use two main atlassian services.

* Bitbucket
* Jira

As such an atlassian account is required. Sign up using your company email at 

* [Atlassian Signup](https://id.atlassian.com/signup)

Ensure that you are both part of the WinWin Jira board, and the WinWin Bitbucket team. If you aren't, contact Brendan Lucas at brendan.lucas@winwinhomesharing.com

## Jenkins Account
Jenkins is our Continuous Integration (CI) pipeline. We use jenkins to run builds, and tests to ensure that our code works before integrating it into our release branch.

You will need an account for our Jenkins server, however, at the moment the server is not accessible publicly. This section will be updated when the Server is available to the developers.

## Firebase Account
Firebase provides our Backend as a Service (BaaS) through the Firestore database. As such you need to ensure that you have access to a firebase account, and that that account is added to our project.

Login with your google account at and make sure that you have access to firebase services

* [Firebase](https://firebase.google.com)

At the moment there is no main project database, but as soon as the GSuite is available, you will be added as a collaborator by the admin.
### Firebase api keys
Each developer will need a special set of API keys to interact with the test firestore database. Once these become available this section will be expanded uppon.
