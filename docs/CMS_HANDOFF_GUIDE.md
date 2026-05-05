# LunaLab Website — Content Editing Guide

This guide explains how to update the LunaLab website. You do **not** need to write code. All updates are made by editing small text files (called JSON files) inside this GitHub repository.

The live website is published at:

**https://fullstackatbrown.github.io/project-lunar-lab/**

---

## 1. How the website works (the big picture)

The site is built from JSON files stored in the `content/` folder. Whenever someone updates one of those files and saves the change to the `main` branch on GitHub, GitHub automatically rebuilds the site and publishes the new version.

The flow looks like this:

```
Edit a JSON file  →  Commit the change on GitHub  →
GitHub Actions rebuilds the site  →  Live website updates (1–3 minutes later)
```

There is no separate database or admin login. The repository itself is the CMS.

---

## 2. Where everything lives

All editable content is under `content/`. Each subfolder is one section of the site:

| Folder                  | What it controls                                    | Page on the website |
| ----------------------- | --------------------------------------------------- | ------------------- |
| `content/members/`      | Current lab members (faculty, PhD, grad, undergrad) | Members             |
| `content/alumni/`       | Past lab members                                    | Members             |
| `content/collaborators/`| Partner organizations / labs                        | Members             |
| `content/papers/`       | Publications                                        | Research            |
| `content/tags/`         | Research areas / topic tags used by papers          | Research            |
| `content/programs/`     | Application programs (e.g. summer programs)         | Join                |
| `content/news/`         | News and blog posts                                 | News / Blog         |

Images go in `public/images/` (see Section 11).

### Template files

Every folder contains a template file you can copy from. Templates start with an underscore (`_member-template.json`) or contain the word `template` (`news-template.json`). The website **ignores** any file whose name starts with `_` or contains `template`, so they will never appear on the site.

---

## 3. The general workflow

For every kind of update, the steps are the same:

1. Open the right folder under `content/` on GitHub.
2. Either open an existing file (to edit) or copy a template (to add a new item).
3. Make your changes carefully — keep the JSON format valid.
4. Click **Commit changes** on GitHub. This will either commit directly to `main` or open a Pull Request.
5. Wait 1–3 minutes. GitHub Actions builds the site and publishes it.
6. Refresh the live site to see your changes.

> **Tip:** If you are nervous about breaking anything, choose "Create a new branch and start a pull request" when committing. Someone can then review the change before it goes live.

---

## 4. Lab members

**Folder:** `content/members/`
**One file per member**, e.g. `ellie-pavlick.json`.

### Required fields

| Field      | Type     | Notes                                                                 |
| ---------- | -------- | --------------------------------------------------------------------- |
| `id`       | string   | Unique short slug. Use lowercase with hyphens, e.g. `"jane-doe"`.     |
| `name`     | string   | Display name.                                                         |
| `category` | string   | One of: `professor`, `phd`, `graduate`, `undergraduate`.              |

### Optional fields

| Field         | Type    | Notes                                                                                |
| ------------- | ------- | ------------------------------------------------------------------------------------ |
| `role`        | string  | Title (e.g. `"Assistant Professor"`). **Not shown for undergraduates.**              |
| `image`       | string  | Image filename (e.g. `"jane_doe.png"`). The site looks for it in `public/images/`.   |
| `description` | string  | One-line bio or research focus. **Not shown for undergraduates.**                    |
| `url`         | string  | Personal homepage URL. If set, the name and photo become clickable links.            |
| `order`       | number  | Lower numbers appear first within the same category. Optional.                       |

### Example — full member entry

```json
{
  "id": "ellie-pavlick",
  "name": "Ellie Pavlick",
  "role": "Assistant Professor",
  "category": "professor",
  "image": "ellie_pavlick.png",
  "description": "Proud advisor of the below students. :)",
  "url": "https://cs.brown.edu/people/epavlick/",
  "order": 1
}
```

### How to add a new member

1. Go to `content/members/` on GitHub.
2. Click **Add file → Create new file**, or click `_member-template.json` and copy it.
3. Name the file using the member's slug, e.g. `jane-doe.json`.
4. Fill in the fields. Set `category` to the right group.
5. Upload a photo to `public/images/` first (see Section 11), then put its filename in `image`.
6. Commit the change.

### How members are ordered on the page

Members are grouped by category in this order: **professor → phd → graduate → undergraduate**. Within each group they are sorted by `order` (low to high), then by name. If you want a specific person at the top of their group, give them a small `order` value like `1`.

### Common mistakes

- Forgetting the `category` field (the file will be skipped).
- Using a category value other than the four allowed strings.
- Pointing `image` at a file that doesn't exist in `public/images/` — the site will fall back to a default photo and print a warning at build time.

---

## 5. Alumni

**Folder:** `content/alumni/`
**One file per alumnus**, e.g. `aaron-traylor.json`.

### Required fields

| Field   | Type   | Notes                                                                            |
| ------- | ------ | -------------------------------------------------------------------------------- |
| `id`    | string | Unique slug.                                                                     |
| `name`  | string | Display name.                                                                    |
| `role`  | string | Original lab role, e.g. `"Ph.D. Student"`, `"MS Student"`, `"Undergraduate"`.    |

### Optional fields

| Field          | Type   | Notes                                                                |
| -------------- | ------ | -------------------------------------------------------------------- |
| `nextPosition` | string | Current job or affiliation, e.g. `"Microsoft"`, `"Postdoc at MIT"`.  |
| `url`          | string | Personal homepage.                                                   |
| `order`        | number | Display ordering.                                                    |

### Example

```json
{
  "id": "aaron-traylor",
  "name": "Aaron Traylor",
  "role": "Ph.D. Student",
  "nextPosition": "Microsoft",
  "order": 1
}
```

### How to add an alumnus

1. Go to `content/alumni/`.
2. Copy `_alumnus-template.json` or click **Add file**.
3. Save it as `firstname-lastname.json`.
4. Commit.

---

## 6. Collaborators

**Folder:** `content/collaborators/`
**One file per organization**, e.g. `bigai.json`.

### Required fields

| Field         | Type   | Notes                                                                              |
| ------------- | ------ | ---------------------------------------------------------------------------------- |
| `id`          | string | Unique slug.                                                                       |
| `name`        | string | Organization name.                                                                 |
| `image`       | string | Image filename in `public/images/` (e.g. `"bigai.png"`).                           |
| `description` | string | Short description.                                                                 |

### Optional fields

| Field        | Type   | Notes                                                                                  |
| ------------ | ------ | -------------------------------------------------------------------------------------- |
| `url`        | string | Homepage. If set, the card becomes clickable.                                          |
| `logoStyle`  | string | `"logo"` (compact, 251×176) or `"photo"` (large, 375×247). Defaults to `"photo"`.      |
| `order`      | number | Display ordering.                                                                      |

### Example

```json
{
  "id": "bigai",
  "name": "BigAI",
  "image": "bigai.png",
  "description": "Brown Integrative General Artificial Intelligence",
  "url": "http://bigai.cs.brown.edu/people.html",
  "logoStyle": "photo",
  "order": 1
}
```

---

## 7. Papers / Publications

**Folder:** `content/papers/`
**One file per paper.** Recommended filename: `firstauthor-year-shortslug.json` (e.g. `pavlick-2019-inherent-disagreements.json`).

### Required fields

| Field      | Type             | Notes                                                                                        |
| ---------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `id`       | string           | Unique slug. Same convention as the filename, without `.json`.                               |
| `title`    | string           | Paper title.                                                                                 |
| `authors`  | array of strings | Authors in order. Each is a simple string, e.g. `"Ellie Pavlick"`.                           |
| `year`     | number           | Publication year, e.g. `2024`.                                                               |
| `venue`    | string           | Where it appeared, e.g. `"ACL"`, `"NeurIPS"`, `"Preprint"`.                                  |
| `tags`     | array of strings | Tag IDs (must match an existing file in `content/tags/`). Example: `["llm", "evaluation-robustness"]`. |
| `paperUrl` | string (URL)     | Required link to the paper. The title becomes a clickable link to this URL.                  |

### Optional fields

| Field      | Type         | Notes                                                  |
| ---------- | ------------ | ------------------------------------------------------ |
| `codeUrl`  | string (URL) | Link to a code repo (e.g. GitHub).                     |
| `dataUrl`  | string (URL) | Link to a dataset.                                     |

### Example

```json
{
  "id": "pavlick-2019-inherent-disagreements",
  "title": "Inherent Disagreements in Human Textual Inferences",
  "authors": ["Ellie Pavlick", "Tom Kwiatkowski"],
  "year": 2019,
  "venue": "TACL",
  "tags": [
    "language-meaning-semantics",
    "bias-social-meaning-human-communication",
    "cognitive-science-theory"
  ],
  "paperUrl": "https://www.mitpressjournals.org/doi/full/10.1162/tacl_a_00293"
}
```

### How to add a paper

1. Go to `content/papers/`.
2. Click **Add file → Create new file** and name it `lastname-year-shortslug.json`.
3. Copy the structure from `_paper-template.json` or any existing paper.
4. Make sure each tag in `tags` already exists as a file in `content/tags/`. If not, add the tag first (see Section 8).
5. Commit.

### Common mistakes

- **Using a tag ID that doesn't exist** — the paper will still build, but the tag will not look right on the site. Add the tag file first.
- **Tags written with capital letters or spaces** — tag IDs must be lowercase with hyphens, e.g. `large-language-models`, not `Large Language Models`.
- **Missing `paperUrl`** — this is required because the title is rendered as a link.
- **Putting a placeholder URL like `https://REPLACE_ME` in `codeUrl` / `dataUrl`** — leave them out entirely if you don't have a real link.

---

## 8. Tags / Research areas

**Folder:** `content/tags/`
**One file per tag**, e.g. `llm.json`.

Tags are the topic labels shown on papers. Every tag a paper references must have its own file here.

### Required fields

| Field         | Type   | Notes                                                                                            |
| ------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `id`          | string | Unique tag ID. **Must be lowercase, hyphen-separated** (e.g. `"large-language-models"`).         |
| `label`       | string | Human-readable name (e.g. `"Large Language Models"`).                                            |
| `description` | string | Short explanation of what the tag covers.                                                        |
| `color`       | string | Hex color code, must be 6 digits (e.g. `"#8B5CF6"`).                                             |

### Example

```json
{
  "id": "llm",
  "label": "Large Language Models",
  "description": "Related to large language models and their applications.",
  "color": "#8B5CF6"
}
```

### Common mistakes

- **Bad `id` format** — must match `^[a-z0-9]+(?:-[a-z0-9]+)*$`. No spaces, no underscores, no capital letters.
- **3-digit hex color** — use the full 6-digit form, like `#FF0000`, not `#F00`.

---

## 9. Programs

**Folder:** `content/programs/`
**One file per program**, e.g. `program-one.json`.

These appear on the **Join** page.

### Required fields

| Field            | Type         | Notes                                              |
| ---------------- | ------------ | -------------------------------------------------- |
| `id`             | string       | Unique slug.                                       |
| `name`           | string       | Program name.                                      |
| `introduction`   | string       | One- or two-paragraph description.                 |
| `applicationUrl` | string (URL) | Link where applicants apply.                       |

### Example

```json
{
  "id": "summer-research",
  "name": "Summer Research Program",
  "introduction": "A 10-week paid summer research experience for undergraduates interested in NLP and cognitive science.",
  "applicationUrl": "https://example.com/apply"
}
```

Programs are listed sorted by `id`, so if you want a specific order, name files accordingly (e.g. `1-summer.json`, `2-winter.json`).

---

## 10. News / Blog posts

**Folder:** `content/news/`
**One file per post**, e.g. `2024-11-nsf-grant.json`.

### Required fields

| Field         | Type   | Notes                                                                                |
| ------------- | ------ | ------------------------------------------------------------------------------------ |
| `id`          | string | Unique slug. Convention: `YYYY-MM-short-topic`, e.g. `"2024-11-nsf-grant"`.          |
| `date`        | string | **Must be `YYYY-MM-DD`** (ISO format), e.g. `"2024-11-05"`.                          |
| `title`       | string | Headline.                                                                            |
| `description` | string | Body text. Use `\n\n` between paragraphs to create paragraph breaks.                 |

### Optional fields

| Field   | Type         | Notes                                                                                       |
| ------- | ------------ | ------------------------------------------------------------------------------------------- |
| `url`   | string (URL) | External link (e.g. press release, paper).                                                  |
| `image` | string       | **Must be a full path** like `"/images/news/my-photo.jpg"` or an external URL.              |

### Example

```json
{
  "id": "2024-11-nsf-grant",
  "date": "2024-11-05",
  "title": "LunaLab awarded NSF grant for cognitive NLP research",
  "description": "We are pleased to announce that LunaLab has been awarded a three-year grant from the NSF.\n\nThe project will investigate the cognitive plausibility of language model representations.",
  "image": "/images/news/nsf-grant.jpg"
}
```

News items are automatically sorted **newest first** by `date`. Each post also gets its own URL: `https://fullstackatbrown.github.io/project-lunar-lab/blog/<id>/`.

### Common mistakes

- **Wrong date format** — `2024/11/05` or `Nov 5, 2024` will be rejected. Use `2024-11-05`.
- **Image path missing the leading `/`** — news images need the full `"/images/news/your-file.jpg"` path. (This is different from members and collaborators, where a bare filename works.)
- **Referencing an image file that hasn't been uploaded** — make sure the image actually exists in `public/images/news/` before referencing it.

---

## 11. Images

### Where to put them

| What                          | Folder                  | How to reference in JSON                                  |
| ----------------------------- | ----------------------- | --------------------------------------------------------- |
| Member photos                 | `public/images/`        | bare filename: `"jane_doe.png"`                           |
| Collaborator logos / photos   | `public/images/`        | bare filename: `"bigai.png"`                              |
| News / blog images            | `public/images/news/`   | full path: `"/images/news/nsf-grant.jpg"`                 |
| Hero carousel photos          | `public/images/`        | hard-coded in `components/home/HeroCarousel.tsx`          |

> The folder `public/images/news/` may not exist yet. If you are the first person to add a news image, create the folder when uploading the image (GitHub will let you do this in the **Add file** dialog by typing `news/your-image.jpg` as the filename).

### File naming rules

- **Use only lowercase letters, numbers, hyphens, and underscores.** Example good names: `jane-doe.jpg`, `nsf_grant.png`, `lab-photo-2024.webp`.
- **Never use spaces.** `Lab Photo.jpg` will break links. Use `lab-photo.jpg`.
- **Avoid special characters** like `?`, `&`, `#`, `%`.
- Keep file extensions consistent: `.jpg` (or `.jpeg`), `.png`, `.webp`. The build is case-sensitive on the live server, so `pic1.JPG` and `pic1.jpg` are different files.

### Recommended formats and sizes

- **Photos:** `.jpg` or `.webp`. Aim for under 500 KB per image when possible.
- **Logos / graphics with transparency:** `.png` or `.webp`.
- **Member photos display at:** 375×247 pixels — provide images at least that large.
- **Collaborator logos display at:** 251×176 pixels.
- **News hero images display at:** up to 900×500 pixels.

### How to upload an image through GitHub

1. Open the `public/images/` folder (or `public/images/news/` for news).
2. Click **Add file → Upload files**.
3. Drag-and-drop the image. To upload into a subfolder you can type the path in the filename, e.g. `news/my-photo.jpg`.
4. Click **Commit changes**.
5. Now reference the file from your JSON.

---

## 12. Editing through the GitHub website (no code editor needed)

You don't need to install anything to edit content. The full workflow in a browser:

1. Go to the repository: **https://github.com/fullstackatbrown/project-lunar-lab**
2. Click into the relevant folder under `content/`.
3. To **edit an existing item**, click the file, then click the pencil icon (✏️) at the top right.
4. To **add a new item**, click **Add file → Create new file** at the top of the folder. Name it `something.json`.
5. Type or paste your JSON content. You can copy the structure from the `_*-template.json` file in the same folder.
6. Scroll to the bottom and click **Commit changes**.
7. In the dialog:
   - Either commit directly to `main` (the change goes live immediately after the build), or
   - Choose **Create a new branch for this commit and start a pull request** (recommended for big changes — someone can review first).
8. Wait 1–3 minutes for the build to finish.
9. Refresh the live website to see your update.

### How to check that the build worked

1. Go to the **Actions** tab on the repository.
2. Find the most recent run of **"Deploy LunaLab to GitHub Pages"**.
3. A green check (✅) means the site has been published.
4. A red X (❌) means there was an error — click into the run to read the message.

---

## 13. For developers — running the site locally

If you have Node.js installed:

```bash
# install once
npm install

# run the dev server (live reload at http://localhost:3000)
npm run dev

# build the static site (output goes to ./out)
npm run build

# validate every JSON file against its schema before committing
npm run validate
```

The `npm run validate` command is the fastest way to catch typos in JSON or missing required fields. It runs the same Zod schemas the website uses, and it will print a `[FAIL]` line for any broken file.

---

## 14. Deployment — what happens after you commit

1. You push (or merge a PR) to the `main` branch.
2. GitHub Actions runs the workflow `.github/workflows/deploy.yml`.
3. The workflow installs dependencies, runs `next build`, and produces a static site in `./out`.
4. The static files are uploaded and published to GitHub Pages.
5. The live site at **https://fullstackatbrown.github.io/project-lunar-lab/** updates within 1–3 minutes.

If a build fails, GitHub will email the person who pushed the change. The site will keep showing the previous version until the next successful build.

---

## 15. Common mistakes and troubleshooting

### "My change went through but I don't see it on the site"

- Wait 2–3 minutes. The build needs time.
- Check the **Actions** tab. Is the latest run green?
- Hard-refresh your browser (Cmd+Shift+R on Mac, Ctrl+F5 on Windows).

### "The build failed"

The most common causes:

| Symptom                                                       | Likely cause                                                                                    |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `JSON.parse` error                                            | Trailing comma, missing comma, missing closing bracket. Use a JSON validator like jsonlint.com. |
| `Invalid news file skipped: ...`                              | A required field is missing or the date is in the wrong format.                                 |
| `Invalid tag id format`                                       | Tag `id` is not lowercase + hyphens.                                                            |
| `Color must be a valid 6-digit hex color`                     | Tag `color` is wrong format — use `#RRGGBB`.                                                    |
| `paperUrl must be a valid URL`                                | Paper URL is empty or malformed.                                                                |
| Image is broken / shows fallback                              | The filename in the JSON doesn't match the file in `public/images/`. Filenames are case-sensitive. |

### "I want to remove an item"

Just delete the JSON file from the appropriate folder. The website will rebuild without it.

### "I want to hide an item temporarily"

Rename the file so it starts with `_` (e.g. `_jane-doe.json`). The site ignores any file starting with `_`. To bring it back, rename without the underscore.

### "I broke something — how do I undo?"

On GitHub, every file has a **History** button at the top. Click it, find a previous good version, click it, then click **Revert** or copy the old contents back.

---

## 16. Quick reference

| I want to…                          | Do this                                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| Add a new lab member                | Create a new JSON file in `content/members/`. Set `category` correctly.                  |
| Move a member to alumni             | Delete their file from `content/members/`. Add a new file in `content/alumni/`.          |
| Add a paper                         | Create a JSON file in `content/papers/`. Make sure all `tags` exist in `content/tags/`.  |
| Add a research area / tag           | Create a JSON file in `content/tags/`. Use a lowercase-hyphen `id`.                      |
| Add a news post                     | Create a JSON file in `content/news/` named `YYYY-MM-short-slug.json`.                   |
| Add an application program          | Create a JSON file in `content/programs/`.                                               |
| Add a collaborator                  | Create a JSON file in `content/collaborators/` and upload their logo.                    |
| Upload an image                     | Put it in `public/images/` (or `public/images/news/` for news).                          |
| Hide something temporarily          | Rename the JSON file to start with an underscore (`_`).                                  |
| Check my JSON before committing     | Run `npm run validate` locally.                                                          |
