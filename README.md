# site

personal site built with purpose of:

1. book tracking (fetching book metadata, covers, page count)
2. easy to render hierarchical content (breadcrumbs nav, list of posts, list of dirs, etc.)

## setup

1. clone and install dependencies:

```bash
git clone https://github.com/0xtimsb/site.git
cd site
bun install
```

2. create your own private data repository:

- create a github repository named `data`.

- initialize with the following structure:

```
data/
├── books/
│ ├── covers/
│ ├── sections.json
│ └── page-count.json
└── posts/
  ├── index.mdx
  └── sub-directory/
    ├── index.mdx
    └── first-post.mdx
```

3. update the submodule url in `.gitmodules`.

4. initialize the submodule:

```bash
git submodule update --init --recursive
```

## book section management

books are organized in sections through `data/books/sections.json`.

the `fetch-books` script automatically:

- fetches book metadata from google books api
- downloads and optimizes book covers
- updates page counts in `data/books/page-count.json`

run it after adding new books:

```bash
bun run fetch-books
```

## navigation

the site automatically generates breadcrumb navigation based on your content structure:

- root level: just the page title
- nested pages: home > directory > sub-directory > page title
- each intermediate path requires an index.mdx file with title metadata

## build & deploy

```bash
bun run build
```
