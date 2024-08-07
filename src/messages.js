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
const buildReleaseCard = (repository, tagName, author, releaseUrl, releaseBodyMarkdown) => {
  // Split the markdown into lines
  const lines = releaseBodyMarkdown.split(/\r?\n/).filter(line => line.trim() !== '')

  const card = {
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
          { widgets: [] },
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

  const currentSection = card.cards[0].sections[1].widgets

  lines.forEach(line => {
    if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ') || line.startsWith('#### ')) {
      // Header
      currentSection.push({
        textParagraph: {
          text: `*${line.substring(3)}*`
        }
      })
    } else if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('1. ')) {
      // List item
      currentSection.push({
        textParagraph: {
          text: `• ${line.substring(2)}`
        }
      })
    } else if (line.startsWith('**')) {
      // Bold text
      currentSection.push({
        textParagraph: {
          text: line
        }
      })
    } else {
      // Regular paragraph
      currentSection.push({
        textParagraph: {
          text: line
        }
      })
    }
  })

  return card
}

module.exports = { buildReleaseCard }
