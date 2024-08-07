import { getInput, setFailed } from '@actions/core'
import { getOctokit, context } from '@actions/github'
import { buildReleaseCard } from './src/messages'
import { post } from './src/axios'

// Run Action.
const run = async () => {
  // try {
  // Get the GITHUB_TOKEN from the action's environment
  const token = getInput('github-token', { required: true })
  const octokit = getOctokit(token)

  // Get the current repository from the github context
  const { owner, repo } = context.repo

  // Fetch the latest release
  const { data: latestRelease } = await octokit.rest.repos.getLatestRelease({ owner, repo })

  const tagName = latestRelease.tag_name
  const author = latestRelease.author.login
  const releaseUrl = latestRelease.html_url
  const releaseBodyMarkdown = latestRelease.body

  const webhookUrl = getInput('webhook-url', { required: true })
  const card = buildReleaseCard(repo, tagName, author, releaseUrl, releaseBodyMarkdown)

  console.log({ tagName, author, releaseUrl, releaseBodyMarkdown, card })

  await post(webhookUrl, card)
  // } catch (error) {
  //   setFailed(error.message)
  // }
}

run()
