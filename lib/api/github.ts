/**
 * GitHub API client for fetching public repository stats.
 * All fetches are server-side only and cached via Next.js ISR (revalidate every hour).
 */

/** Shape of GitHub repository data we care about */
export interface GitHubRepoStats {
  stars: number
  forks: number
  openIssues: number
}

/** Shape of a single release asset from GitHub API */
interface GitHubReleaseAsset {
  download_count: number
}

/** Shape of a GitHub release */
interface GitHubRelease {
  assets: GitHubReleaseAsset[]
}

/** Aggregated stats returned to the UI */
export interface PluginStats {
  stars: number
  contributors: number
  totalDownloads: number
}

/** Fallback values shown when the API is unreachable */
const FALLBACK_STATS: PluginStats = {
  stars: 0,
  contributors: 0,
  totalDownloads: 0,
}

/**
 * Builds request headers for the GitHub REST API.
 * Includes a personal access token when available to raise the rate limit.
 */
function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

/**
 * Fetches the total number of contributors for a GitHub repository.
 * Uses the `per_page=1` trick with the Link header to avoid loading every page.
 */
async function fetchContributorCount(repo: string, headers: HeadersInit): Promise<number> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contributors?per_page=1&anon=true`,
    { headers, next: { revalidate: 3600 } },
  )
  if (!res.ok) return 0

  // The Link header contains `rel="last"` with the total page count = contributor count
  const link = res.headers.get('link') ?? ''
  const match = link.match(/[?&]page=(\d+)>; rel="last"/)
  if (match) return parseInt(match[1], 10)

  // If there is no Link header, all contributors fit on one page
  const data = (await res.json()) as unknown[]
  return data.length
}

/**
 * Fetches the total download count across all releases and assets.
 */
async function fetchTotalDownloads(repo: string, headers: HeadersInit): Promise<number> {
  const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`, {
    headers,
    next: { revalidate: 3600 },
  })
  if (!res.ok) return 0

  const releases = (await res.json()) as GitHubRelease[]
  return releases.reduce((total, release) => {
    const releaseDownloads = release.assets.reduce(
      (sum, asset) => sum + asset.download_count,
      0,
    )
    return total + releaseDownloads
  }, 0)
}

/**
 * Returns aggregated plugin stats (stars, contributors, total downloads).
 * Data is cached server-side for 1 hour; falls back to zeros on error.
 */
export async function fetchPluginStats(): Promise<PluginStats> {
  const repo = process.env.GITHUB_REPO
  if (!repo) return FALLBACK_STATS

  try {
    const headers = buildHeaders()

    const repoRes = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    })

    if (!repoRes.ok) return FALLBACK_STATS

    const repoData = (await repoRes.json()) as { stargazers_count: number }

    const [contributors, totalDownloads] = await Promise.all([
      fetchContributorCount(repo, headers),
      fetchTotalDownloads(repo, headers),
    ])

    return {
      stars: repoData.stargazers_count,
      contributors,
      totalDownloads,
    }
  } catch {
    // Graceful fallback — never crash the page due to a GitHub API failure
    return FALLBACK_STATS
  }
}
