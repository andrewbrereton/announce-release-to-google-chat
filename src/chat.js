const github = require('@actions/github')
const { post } = require('./axios')
const { newRelease } = require('./messages')

/**
 * Sends Google Chat message.
 *
 * @param {string} url - Google Chat Webhook URL
 */
const send = async (url) => {
  const { repo } = github.context.repo
  const { tag_name: tag } = github.context.payload.release
  const { actor: author } = github.context
  const { html_url: htmlUrl } = github.context.payload.release

  const body = newRelease(repo, tag, author, htmlUrl)
  await post(url, body)
}

module.exports = { send }
