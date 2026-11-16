# Built by Giovanna

Website source for https://builtbygiovanna.com.

Cloudflare Worker: `flat-hall-e9fa`.
GitHub is connected to Cloudflare Workers Builds. Pushes to `main` trigger production deployment.

## Deployment settings

- Root directory: repository root
- Build command: none
- Deploy command: `npx wrangler deploy`
- Static website files: `public/`
- Worker configuration: `wrangler.json`

Keep the custom domain managed in Cloudflare. The Web3Forms form access key is intentionally public browser configuration. Never commit account passwords or Cloudflare API tokens.

After deployment, check the live site and contact-form delivery.
