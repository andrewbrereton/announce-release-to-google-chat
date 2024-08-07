const core = require('@actions/core')
const chat = require('./src/chat')
const github = require('@actions/github')
const MarkdownIt = require('markdown-it');

// Run Action.
const run = async () => {
  try {
    // Get the GITHUB_TOKEN from the action's environment
    const token = core.getInput('github-token', { required: true })
    const octokit = github.getOctokit(token)

    // Get the current repository from the github context
    const { owner, repo } = github.context.repo

    // Fetch the latest release
    const { data: latestRelease } = await octokit.rest.repos.getLatestRelease({
      owner,
      repo
    })

    /*
    owner
    repo
    latestRelease.tag_name
    latestRelease.author.login
    latestRelease.html_url
    latestRelease.body
    */

    const md = new MarkdownIt();
    const releaseBodyHtml = md
      .render(latestRelease.body)
      .replace(/\n/g, '')   // Remove all newlines
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .trim()               // Remove leading and trailing whitespace

    // console.log({releaseBodyMarkdown: latestRelease.body, releaseBodyHtml})

    // console.log({owner, repo, latestRelease});

    // console.log(`Latest release: ${latestRelease.name}`)
    // console.log(`Release tag: ${latestRelease.tag_name}`)
    // console.log(`Release URL: ${latestRelease.html_url}`)

    // core.setOutput('release-name', latestRelease.name)
    // core.setOutput('release-tag', latestRelease.tag_name)
    // core.setOutput('release-url', latestRelease.html_url)

    const webhookUrl = core.getInput('webhook-url', { required: true })

    const body = newRelease(repository, tagName, author, releaseUrl, releaseBodyHtml)

    await post(webhookUrl, body)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
