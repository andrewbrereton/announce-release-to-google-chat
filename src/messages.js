/**
 * Build body of Google Chat card for new releases.
 *
 * @param {string} repo - Tag repository
 * @param {string} tag - Tag name title
 * @param {string} author - GitHub author username
 * @param {string} htmlUrl - Tag GitHub Url
 *
 * @returns {object} Google Chat card body
 */
const newRelease = (repository, tagName, author, releaseUrl, releaseBody) => {
  const body = {
    cards: [
      {
        header: {
          title: 'New release',
          imageUrl: 'https://theentropic.gallerycdn.vsassets.io/extensions/theentropic/git-tag-loader/1.0.0/1563851448848/Microsoft.VisualStudio.Services.Icons.Default'
        },
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Repository',
                  content: repository
                }
              },
              {
                keyValue: {
                  topLabel: 'Tag',
                  content: tagName
                }
              },
              {
                keyValue: {
                  topLabel: 'Author',
                  content: author
                }
              }
            ]
          },
          {
            widgets: [
              {
                buttons: [
                  {
                    textButton: {
                      text: 'OPEN',
                      onClick: {
                        openLink: {
                          url: releaseUrl
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  return body
}

module.exports = { newRelease }
