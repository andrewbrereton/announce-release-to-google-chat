# Announce Release to Google Chat

Announce your latest release to a Google Chat.

## Inputs

### `url`

**Required** Your Google Chat Webhook URL. You can find it in "Configure Webhooks" option in Chat rooms.

## Example workflow

- In your deploy workflow in your `.github/workflows/` directory:

```yaml
name: deploy
on:
  push:
    tags:
      - 'v[0-9]+.[0-9]+.[0-9]+'
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Create release
        id: create_release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: ${{ steps.get_tag.outputs.TAG_NAME }}
          generate_release_notes: true
      - uses: andrewbrereton/announce-release-to-google-chat@v1
        with:
          url: ${{ secrets.GOOGLE_CHAT_PULL_REQUEST_WEBHOOK_URL }}
```
