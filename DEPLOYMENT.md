# Deployment Guide - Hostinger CI/CD

This guide explains how to deploy the Rania website to Hostinger shared hosting using GitHub Actions CI/CD.

## Overview

The project uses GitHub Actions to automatically deploy to Hostinger shared hosting when code is pushed to specific branches:

- **Production Branch** → Deploys to production hosting
- **Staging Branch** → Deploys to staging hosting

## Prerequisites

1. Hostinger shared hosting account
2. GitHub repository with the project code
3. FTP access credentials from Hostinger

## Getting FTP Credentials from Hostinger

1. Log in to your Hostinger control panel (hPanel)
2. Navigate to **Files** → **FTP Accounts**
3. Note down or create FTP credentials:
   - **FTP Server/Host**: Usually `ftp.yourdomain.com` or IP address
   - **FTP Username**: Your FTP username
   - **FTP Password**: Your FTP password
   - **Server Directory**: The path where files should be uploaded (e.g., `/public_html` or `/public_html/subdomain`)

## Setting Up GitHub Secrets

GitHub Secrets store sensitive information like FTP credentials securely. Set these up once, and the CI/CD pipeline will use them automatically.

### Steps to Add Secrets:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

### Required Secrets for Production:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `FTP_SERVER` | Hostinger FTP server address | `ftp.yourdomain.com` or `123.45.67.89` |
| `FTP_USERNAME` | Your FTP username | `username@yourdomain.com` |
| `FTP_PASSWORD` | Your FTP password | `your-secure-password` |
| `FTP_SERVER_DIR` | Production deployment directory | `/public_html/` or `/public_html/yoursite/` |
| `VITE_API_BASE_URL` | Production API URL | `https://api.yourdomain.com/api` |
| `VITE_BASE_PATH` | Base path for the app (optional) | `/` or `/subfolder/` |

### Required Secrets for Staging:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `STAGING_FTP_SERVER_DIR` | Staging deployment directory | `/public_html/staging/` |
| `STAGING_VITE_API_BASE_URL` | Staging API URL | `https://staging.yourdomain.com/api` |
| `STAGING_VITE_BASE_PATH` | Base path for staging (optional) | `/` |

## How to Deploy

### Automatic Deployment

Once GitHub secrets are configured, deployment happens automatically:

1. **To Production**: Push or merge code to the `production` branch
   ```bash
   git checkout production
   git merge main
   git push origin production
   ```

2. **To Staging**: Push or merge code to the `staging` branch
   ```bash
   git checkout staging
   git merge main
   git push origin staging
   ```

### Manual Deployment

You can also trigger deployments manually from GitHub:

1. Go to your repository on GitHub
2. Navigate to **Actions** tab
3. Select the workflow (Deploy to Hostinger Production/Staging)
4. Click **Run workflow**
5. Select the branch and click **Run workflow**

## Deployment Process

When you push to the production/staging branch, the workflow will:

1. ✅ Checkout the code
2. ✅ Set up Node.js environment
3. ✅ Install dependencies (`npm ci`)
4. ✅ Create environment file with secrets
5. ✅ Build the project (`npm run build`)
6. ✅ Deploy built files to Hostinger via FTP

The entire process typically takes 2-5 minutes.

## Monitoring Deployments

### View Deployment Status:

1. Go to the **Actions** tab in your GitHub repository
2. You'll see all workflow runs with their status (✓ success, ✗ failed, ⏳ in progress)
3. Click on any workflow run to see detailed logs

### Deployment Status Badges:

You can add status badges to your README.md:

```markdown
![Deploy to Production](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/deploy-production.yml/badge.svg)
![Deploy to Staging](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/deploy-staging.yml/badge.svg)
```

## Branch Strategy

### Recommended Git Workflow:

```
main (development)
  ↓
staging (for testing)
  ↓
production (live site)
```

1. **Develop** on `main` or feature branches
2. **Test** by merging to `staging` branch
3. **Deploy** by merging to `production` branch

## Troubleshooting

### Deployment Fails with "FTP Connection Error"

**Solution:**
- Verify FTP credentials are correct in GitHub Secrets
- Check if your Hostinger FTP service is active
- Ensure your IP is not blocked (Hostinger may have IP restrictions)
- Try using the FTP server IP address instead of hostname

### Build Fails

**Solution:**
- Check the build logs in GitHub Actions
- Ensure all dependencies are in `package.json`
- Verify there are no build errors locally: `npm run build`
- Check if environment variables are set correctly

### Website Shows 404 or Blank Page

**Solution:**
- Verify `FTP_SERVER_DIR` path is correct
- Check if files were uploaded to the correct directory
- Ensure `VITE_BASE_PATH` matches your hosting structure
- Check browser console for errors (API URL might be wrong)

### Changes Not Reflecting on Website

**Solution:**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check if deployment workflow completed successfully
- Verify you pushed to the correct branch
- Check if Hostinger has file caching enabled

### Permission Denied Errors

**Solution:**
- Ensure FTP user has write permissions to the target directory
- Check directory ownership in Hostinger File Manager
- Contact Hostinger support if permissions can't be changed

## Security Best Practices

1. ✅ **Never commit** `.env` files or secrets to the repository
2. ✅ **Use GitHub Secrets** for all sensitive information
3. ✅ **Use strong FTP passwords** and change them regularly
4. ✅ **Enable two-factor authentication** on GitHub
5. ✅ **Limit FTP user permissions** to only necessary directories
6. ✅ **Regularly update dependencies** to patch security vulnerabilities

## Additional Configuration

### Custom Domain Setup

If using a custom domain on Hostinger:

1. Configure your domain in Hostinger DNS settings
2. Update `VITE_API_BASE_URL` to use your custom domain
3. Ensure SSL certificate is installed (Hostinger provides free SSL)

### Multiple Environments

To add more environments (e.g., `dev`, `qa`):

1. Create a new branch (e.g., `dev`)
2. Copy `deploy-staging.yml` and rename it (e.g., `deploy-dev.yml`)
3. Update branch name and secrets in the workflow file
4. Add corresponding secrets in GitHub

## Rollback Strategy

If a deployment causes issues:

### Option 1: Revert and Redeploy
```bash
git revert <commit-hash>
git push origin production
```

### Option 2: Manual Rollback
1. Keep backups of previous `dist` builds locally
2. Manually upload previous build via FTP
3. Use Hostinger File Manager to restore previous version

### Option 3: Hotfix Branch
```bash
git checkout production
git checkout -b hotfix/issue-name
# Make fixes
git commit -m "fix: critical issue"
git push origin production
```

## Contact & Support

- **Hostinger Support**: https://www.hostinger.com/support
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Project Repository**: [Add your repo URL]

## Notes

- The FTP deploy action uses incremental uploads (only changed files)
- First deployment may take longer as all files are uploaded
- Subsequent deployments are faster (only changes uploaded)
- `.git`, `node_modules`, and `.env` files are excluded from deployment
