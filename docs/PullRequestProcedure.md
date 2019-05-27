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

When reviewing code, you may do the code review in the bitbucket gui, or by pulling the branch down and looking at the diff on your own machine.

When you notice something that is not up to your standard, write comments on the pull request, and inform the submitter that they must make the appropriate changes before you accept it.

**Things to look for in code review**:

**General**
- Is the logic correct?
- Does it conform to our conventions?
- Is it redundant or duplicate?
- Is it as modular as possible?
- Are the antipatterns (globals, overuse of let, etc.)
- Is it clear (good variable names, comments where needed)

**Tests**
There should be at least one new test for each component that is added, or logical change made. If the pull request is for a bugfix, there must be a test added that makes the bug that was fixed discoverable through a unit test.

- Is the source code testable.
- Are there tests? Are they comprehensive?
- Are the tests actually testing the right code and paths?

**After reviewing the code**

When reviewing work you should pull the branch down from origin in order to test it in your own dev environment.

    git fetch origin <branch name>

Then you should run the unit tests that were added, and manually test any functionality that you think may have been affected by the changes.

**If and only if the code passes the checklist above you may approve the pull request**

### Making changes to the Pull Request

If a reviewer asks you to make changes to the pull request before they can approve it, you may do so on the same branch. Once you have completed those changes, push it to origin once again, and the jenkins tests will run on it. The reviewer will then review your changes and again decide whether or not to approve them.

### Accepting the Pull Request

After all reviewers have approved your pull request you are ready to merge. 

We are going to use the fast-forward option for merging on BitBucket. In order to do so:

Select merge, then in the merge strategy dropdown fast-forward should be selected by default. If it is not, use the dropdown to select it, and click merge!
