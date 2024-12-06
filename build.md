# build & deploy

## problem

when deploying to cloudflare pages, the build process fails to access private submodules because it doesn't have the necessary authentication.

```
fatal: repository 'https://github.com/username/private-repo.git/' not found
failed to clone submodule
```

## solution

we'll use github deploy keys to give cloudflare pages read-only access to the private repository.

### 1. generate deploy key

generate a new ssh key pair specifically for deployment:

```bash
ssh-keygen -t ed25519 -C "cloudflare-deploy-key" -f deploy_key
```

this creates two files:

- `deploy_key` (private key)
- `deploy_key.pub` (public key)

### 2. add deploy key to github

1. go to your private repository (the submodule repository)
2. navigate to settings > deploy keys
3. click "add deploy key"
4. title: "cloudflare pages deploy key"
5. key: paste the content of `deploy_key.pub`
6. enable "allow write access" if needed
7. click "add key"

### 3. add private key to cloudflare

1. go to your cloudflare pages project
2. navigate to settings > environment variables
3. add new variable:
   - name: `SSH_KEY`
   - value: content of `deploy_key` (the private key)
4. save

### 4. configure cloudflare pages

update your build settings in cloudflare pages:

- build command: `bash ./build.sh`
- build output directory: `dist`

### 5. post clean up

remove deploy keys from local you no longer need it.
