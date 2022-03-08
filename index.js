/* eslint-disable no-restricted-globals */
const lib = (exports.lib = require('./lib.js'));
const core = require('@actions/core');
const github = require('@actions/github');

const main = async function () {
  const context = github.context;
  const token = core.getInput('token');
  const expireIn = core.getInput('expire-in');
  const onlyPrefix = core.getInput('onlyPrefix', { required: false });
  const exceptPrefix = core.getInput('exceptPrefix', { required: false });
  const deletedArtifacts = await lib.purgeArtifacts(
    argv.token,
    argv.owner,
    argv.expireIn,
    argv.onlyPrefix,
    argv.nexceptPrefix,
  );
  core.setOutput('deleted-artifacts', JSON.stringify(deletedArtifacts));
};

if (process.env.GITHUB_ACTION) {
  main().catch((error) => {
    console.error(error);
    core.setFailed(error.message);
  });
}
