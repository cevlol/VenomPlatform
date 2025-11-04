# Publishing the Landing Page Updates

This project is a static site, so deploying the latest changes is a matter of ensuring the HTML, CSS, and assets are available on a web server. The steps below walk through publishing the current implementation to GitHub Pages, which is the simplest option when the repository is already hosted on GitHub.

## 0. Prepare your Codespace workspace
If you are developing in GitHub Codespaces, complete these setup steps before running the rest of the guide:

1. Launch the Codespace from the repository root so that the existing relative paths (for example, `Assets/css/main.css`) continue to resolve correctly.
2. Open a terminal in the Codespace and install any optional tooling you prefer (such as the **Live Server** VS Code extension). No additional build tools are required because the site is static.
3. From that terminal, run `ls` to confirm that `index.html`, the `Assets/` folder, and the `Docs/` directory are present. If you opened the Codespace in a subfolder by mistake, use the **File → Open Folder…** command to switch to the repository root.
4. Continue with the verification, commit, and publishing steps below from this root workspace.

## 1. Verify the site locally
1. From the repository root, start a simple HTTP server so you can confirm that both the main landing page (`index.html`) and the GitHub Pages copy (`Docs/index.html`) render correctly:
   ```bash
   python3 -m http.server 8000
   ```
2. Visit `http://localhost:8000/index.html` and `http://localhost:8000/Docs/index.html` in your browser.
3. Ensure the hero video, carousel assets, calculators, and interactive buttons work as expected.
4. Stop the server with `Ctrl+C` when you are done.

## 2. Commit and push your changes
1. Stage the modified files:
   ```bash
   git add index.html Docs/index.html Assets/css/main.css
   ```
2. Commit the updates with a meaningful message (if you have not already committed them):
   ```bash
   git commit -m "Refine landing page styling and docs copy"
   ```
3. Push the branch to your GitHub repository:
   ```bash
   git push origin <your-branch-name>
   ```

## 2a. Download the updated files if you cannot push yet
If you are evaluating the workspace before pushing to GitHub, you can still grab the generated files directly from your Codespace:

1. In the VS Code file explorer, right-click `index.html`, `Docs/index.html`, or any other file you need and choose **Download…**. The browser will save a copy to your local machine.
2. Alternatively, select the files (or the entire `Docs/` folder) and choose **Download as Zip** to export everything in one archive.
3. You can also run `zip -r site-export.zip index.html Docs Assets` from the terminal to create an archive manually, then download `site-export.zip` from the **Ports**/file explorer panel.
4. When you are ready to publish, return to step 2 to commit and push from the same workspace so GitHub Pages can pick up the updates.

## 3. Configure GitHub Pages (one-time setup)
1. Open the repository on GitHub and navigate to **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the branch you pushed in step 2 (for example, `main`) and set the folder to `/docs`.
4. Save the settings. GitHub will automatically build the site and provide a public URL in the Pages panel. Initial provisioning can take a few minutes.

## 4. Verify the live site
1. Once GitHub reports that the site is published, open the URL it provides (usually `https://<username>.github.io/<repository>/`).
2. Confirm that the page matches what you saw locally, paying special attention to video playback, carousel transitions, and any forms or interactive components.
3. If something looks off, double-check the file paths inside `Docs/index.html` and re-run the local verification steps before pushing fixes.

## 5. Keep the deployment up to date
- Repeat steps 1, 2, and 4 each time you update the landing page.
- GitHub Pages will automatically redeploy whenever new commits reach the configured branch and `/docs` directory.

> **Note:** If you prefer another hosting provider (e.g., Netlify, Vercel, or a custom server), the same `index.html`/`Assets` structure can be uploaded as-is. Those platforms typically detect static sites automatically—just make sure the document root is the repository’s base directory so the asset paths remain valid.
