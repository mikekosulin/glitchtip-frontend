import * as fs from "fs-extra";
import * as glob from "glob";
import * as path from "path";
import { format } from "date-fns";

const blogDir = path.join(__dirname, "projects/marketing/public/blog");
const routesFile = path.join(__dirname, "projects/marketing/routes.txt");
const blogIndexFile = path.join(blogDir, "blogIndex.json");
const rssFeedFile = path.join(blogDir, "rss.xml");

// Utility function to extract the frontmatter (metadata) from a markdown file
function extractFrontmatter(content: string): { [key: string]: string } {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(content);

  if (match) {
    const frontmatter = match[1];
    return frontmatter.split("\n").reduce(
      (acc, line) => {
        const [key, value] = line.split(":").map((part) => part.trim());
        if (key && value) {
          acc[key] = value.replace(/^['"]|['"]$/g, ""); // Remove quotes around the value
        }
        return acc;
      },
      {} as { [key: string]: string },
    );
  }

  return {};
}

// Function to extract the date from the filename
function extractDateFromFilename(filename: string): Date | null {
  const dateRegex = /(\d{4}-\d{2}-\d{2})/; // Matches YYYY-MM-DD format
  const match = dateRegex.exec(filename);

  if (match) {
    return new Date(match[1]);
  }

  return null;
}

// Function to generate routes.txt, blogIndex.json, and rss.xml
function generateRoutesIndexAndRSS(): void {
  const files: string[] = glob.sync(`${blogDir}/**/*.md`);
  const routes: string[] = [];
  const blogIndex: { title: string; route: string; date: string }[] = [];
  let rssItems: string[] = [];

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    const frontmatter = extractFrontmatter(content);
    const date = extractDateFromFilename(file);
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

    const route = file
      .replace(blogDir, "")
      .replace(/\.md$/, "")
      .replace(/\\/g, "/");
    const url = `/blog${route}`;

    routes.push(url);

    if (frontmatter.title && date) {
      blogIndex.push({
        title: frontmatter.title,
        route: url,
        date: formattedDate,
      });

      // Generate RSS item
      rssItems.push(`
        <item>
          <title>${frontmatter.title}</title>
          <link>${url}</link>
          <pubDate>${date.toUTCString()}</pubDate>
        </item>
      `);
    }
  });

  // Write the routes.txt file
  fs.writeFileSync(routesFile, routes.join("\n"), "utf-8");
  console.log(`Routes generated at ${routesFile}`);

  // Write the blogIndex.json file
  fs.writeFileSync(blogIndexFile, JSON.stringify(blogIndex, null, 2), "utf-8");
  console.log(`Blog index generated at ${blogIndexFile}`);

  // Generate and write the RSS feed
  const rssFeed = `
    <rss version="2.0">
      <channel>
        <title>GlichTip Blog</title>
        <link>https://glitchtip.com/blog</link>
        <description>GlitchTip open source error monitoring</description>
        ${rssItems.join("\n")}
      </channel>
    </rss>
  `;

  fs.writeFileSync(rssFeedFile, rssFeed.trim(), "utf-8");
  console.log(`RSS feed generated at ${rssFeedFile}`);
}

// Run the function to generate the files
generateRoutesIndexAndRSS();
