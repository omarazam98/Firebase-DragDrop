#Win Win Development Best Practices

## Testing

Our primary concern for testing is regression.

Every new feature should include at least one new test for every new component or logical addition.

Every bugfix should include tests that help prevent the bug discovery from going unseen ever again

## Spaces or tabs

Currently we use spaces. Fight me.

## Branch naming

Our branch names will follow the following convention.

<gitflow-prefix>/<jira-issue-number>-<additional-description>

eg. feature/WH40-add-git-docs

###Gitflow names (Prefixes)
We use the gitflow branch prefixes when naming our branches. The 3 main options are:

- feature/
  - Features are what you will deal with most, especially pre mvp. Any branch that contains a new feature should be prefixed in this way. When a feature is complete, it will be merged into integration.
- bugfix/
  - Bugfixes are the second most common type of branch they will be used any time that a problem is discovered in already existing code. The distinction is that if we have a release branch active, bugfixes will be merged to the release branch as well as the integration branch.
- hotfix/
  - Hotfixes will only be used once our application is deployed into production. These branches are used to fix issues that exist in production and merge them right into our production branch. They will be merged into release and integration branch as well

The fourth type of branch is the release branch.

- release/
  - Release branches are created when all the features that will be added into an iteration have been completed and merged into integration. Once a release branch has been completed, no additional features will be merged into it. If there are bugs discovered during the testing of the release branch. Bugfixes may be merged into the release branch. The release branch will be eventually merged into master, and deployed to production.

### JIRA issue number

The second part of the branch name will be the Jira issue number for the feature or bug that your branch addresses. This can be found on the jira board.

This should have the board name short form "WH" followed by the number.

    feature/**WH40**-add-git-docs

### Description (suffix)

In addition to the required two sections above, an additional optional description can be added to the branch (recommended). Keep it short and separate it by hyphens.

    feature/WH40-**add-git-docs**

## Style guide/linter
Take a very close look at the Airbnb

https://github.com/airbnb/javascript/tree/master/react 

Follow the instructions in the EnvironmentSetup.md to see how to setup linting in your local environment.