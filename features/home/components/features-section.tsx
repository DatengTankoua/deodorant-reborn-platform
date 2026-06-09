import { ScanSearch, GitCompare, Wrench, Puzzle, Zap, ShieldCheck } from "lucide-react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

/** Core plugin features displayed as scannable cards */
const FEATURES: Feature[] = [
  {
    icon: <ScanSearch className="size-5" />,
    title: "Type-1 Clone Detection",
    description:
      "Identifies identical code fragments that differ only in whitespace, layout, and comments — across your entire Java/Kotlin project.",
  },
  {
    icon: <GitCompare className="size-5" />,
    title: "Type-2 Clone Detection",
    description:
      "Finds syntactically similar code that differs in identifiers, literals, or types, catching near-duplicates that manual review misses.",
  },
  {
    icon: <Wrench className="size-5" />,
    title: "Automated Refactoring",
    description:
      "One-click refactoring suggestions — extract method, extract variable, and more — applied safely with full preview inside IntelliJ IDEA.",
  },
  {
    icon: <Puzzle className="size-5" />,
    title: "Seamless IDE Integration",
    description:
      "Runs inside IntelliJ IDEA as a first-class plugin: inspections, gutter icons, and a dedicated tool window with no external setup.",
  },
  {
    icon: <Zap className="size-5" />,
    title: "Incremental Analysis",
    description:
      "Only re-analyses changed files, keeping detection fast even on large codebases without blocking your workflow.",
  },
  {
    icon: <ShieldCheck className="size-5" />,
    title: "Research-Driven",
    description:
      "Built on peer-reviewed clone detection research. Every detection heuristic is documented and traceable back to academic literature.",
  },
]

/**
 * Renders the Features section (US-003).
 * Displays core plugin capabilities as an accessible, keyboard-navigable card grid.
 */
export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="mx-auto max-w-6xl px-6 py-20"
    >
      <div className="mb-12 text-center">
        <h2
          id="features-heading"
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Everything you need to fight code duplication
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          A research-backed toolkit integrated directly into your IntelliJ workflow.
        </p>
      </div>

      <ul
        role="list"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((feature) => (
          <li
            key={feature.title}
            className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted/40"
          >
            <div
              className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
              aria-hidden="true"
            >
              {feature.icon}
            </div>
            <h3 className="mb-2 font-semibold">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
