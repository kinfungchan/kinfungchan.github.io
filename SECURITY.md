# Security policy

This repository is published directly by GitHub Pages. Only the small set of
files approved by `scripts/check-public-artifact.mjs` may be committed.

Install [Gitleaks](https://github.com/gitleaks/gitleaks), then enable the
repository-owned commit and push checks once per checkout:

```bash
git config core.hooksPath .githooks
```

Never commit credentials, API keys, access tokens, private keys, environment
files, confidential documents, source archives, or unpublished material. Keep
GitHub secret scanning and push protection enabled where available.

If a credential is exposed, revoke or rotate it immediately before removing it
from the files and repository history.
