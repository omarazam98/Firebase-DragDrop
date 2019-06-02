## What are fixtures?
Fixtures are fake data that can be used for tests.

## Where do I use them?
They can be imported into test files, and can be used as data for rendering components, setting up a sample redux state, or populating a database.

## Keep in mind
Changeing fixtures willl affect all the tests that import it as a dependency. As such ensure that tests are run after fixture changes, and that none of them are broken. It is safer to add a new fixture, then it is to modify an old one.
