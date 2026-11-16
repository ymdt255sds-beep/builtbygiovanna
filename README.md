# Built by Giovanna

Prepared for the existing Cloudflare Worker `flat-hall-e9fa`.

## Connect once

1. Put these files in a GitHub repository, preserving public/ and wrangler.json at the repository root.
2. In the existing Worker, open Settings → Builds → Connect and select this repository.
3. Production branch: main. Root directory: repository root. Leave the build command empty. Deploy command: `npx wrangler deploy`.
4. Complete Cloudflare’s connection prompts, then trigger a deployment and check the website and contact form.

Future changes pushed to main will publish to this Worker automatically.
Website files live in public/. Keep its existing custom domain managed in Cloudflare.
The Web3Forms form access key is intentionally public browser configuration.
Never put Cloudflare API tokens or account passwords in these files.

This package is prepared, but GitHub and Cloudflare are not connected yet.
Wrangler deployment has not been run or verified from this environment.
