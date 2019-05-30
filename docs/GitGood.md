# I'm done writing some code, how do I get it into production?

## Submitting for review
### Making sure you're up to date
After you're done development of a feature. The first step is to make sure that you are up to date with integration. If you don't do this, you will be running our CI tests on a branch that does not represent the state of our application. These tests will be effectively useless.

1. Fetch the latest version of integration 

    git fetch --all

2. Rebase your branch on top of it

    git rebase -i origin/integration

3. Fix all merge conflicts

### Pushing to Origin

Once done you will push your branch to the origin. 

    git push origin <branch-name>


### Jenkins Continuous Integration

Jenkins will run the branch through the CI pipeline and perform a variety of tests on it. At the moment these include:

1. Simple build (Catch webpack compilation errors)
2. Jest automated unit tests (Catches failed tests)
3. Sonarqube Linter (Will run through the code using a linter to determine code smells, bugs, and security vulnerabilities)
4. Integration tests in a production like environment with prod data

If any of the above fail, your build will fail. 

If this is the case, you do not continue throught the process. Inspect the errors, determine what to fix, and re-push one your code is fixed.

Once all tests pass, you can proceed to getting reviewed

### Creating a pull request and assigning reviewers

Create a new pull request with the branch that you just pushed.

The title should start with the issue number that this pull request resolves, and then followed by a short description.

The description should include a detailed list of changes. If there are suggested tests to run, include those as well. Include any additional details that you want to include for posterity.

You must then assign two reviewers to look over your work before you can merge to integration.

### Reviewing Work

When reviewing work you should pull the branch down from origin in order to 