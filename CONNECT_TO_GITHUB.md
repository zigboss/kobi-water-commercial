# How to Connect Your Local Repository to GitHub

Your local repository is already initialized! Now you need to connect it to GitHub.

## Quick Steps

### Step 1: Create a GitHub Repository

1. Go to **https://github.com** and sign in
2. Click the **"+"** icon (top right) → **"New repository"**
3. Enter a repository name (e.g., `kobi-water-commercial`)
4. Choose **Public** or **Private**
5. **IMPORTANT:** Do NOT check "Add a README file" (we already have one)
6. Click **"Create repository"**

### Step 2: Copy Your Repository URL

After creating the repository, GitHub will show you a page with commands. Copy the HTTPS URL that looks like:
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Step 3: Connect Local Repository to GitHub

Open your terminal in the project folder and run:

```bash
# First, make your initial commit (if you haven't already)
git commit -m "Initial commit: Kobi water commercial project"

# Add GitHub as remote repository (replace with YOUR URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Complete Command Sequence

Here's the full sequence you'll run:

```bash
# 1. Check current status
git status

# 2. Make your first commit (if not done)
git commit -m "Initial commit: Kobi water commercial project"

# 3. Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 4. Verify remote was added
git remote -v

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

## Authentication

When you run `git push`, you'll be asked to authenticate:

**Option 1: Personal Access Token (Recommended)**
- Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token with `repo` permissions
- Use the token as your password when pushing

**Option 2: GitHub CLI**
```bash
# Install GitHub CLI, then:
gh auth login
```

## Verify Connection

After pushing, check your GitHub repository page - you should see all your files!

## Common Issues

**"remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

**"Authentication failed"**
- Use Personal Access Token instead of password
- Or set up SSH keys

**"Branch 'main' does not exist"**
```bash
git checkout -b main
git push -u origin main
```

## Check Your Connection

```bash
# See your remote repository
git remote -v

# Should show:
# origin  https://github.com/YOUR_USERNAME/REPO_NAME.git (fetch)
# origin  https://github.com/YOUR_USERNAME/REPO_NAME.git (push)
```

