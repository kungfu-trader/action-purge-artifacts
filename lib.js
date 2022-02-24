/* eslint-disable no-restricted-globals */
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/core');
const { restEndpointMethods } = require('@octokit/plugin-rest-endpoint-methods');
const parseDuration = require('parse-duration');

exports.purgeArtifacts = async function (token, owner) {
  const octokit = github.getOctokit(token);
  const repositoriesQuery = await octokit.graphql(`
    query {
      organization(login: "${owner}") {
        id
        repositories(first: 100) {
          nodes {
            id,
            name,
            diskUsage
          }
        }
      }
    }`);
  for (const repository of repositoriesQuery.organization.repositories.nodes) {
    const repoDiskUsage = repository.diskUsage / 2 ** 20;
    console.log(`> purging for repository ${repository.name} (${repoDiskUsage.toFixed(2)} MB)`);
  }
};
