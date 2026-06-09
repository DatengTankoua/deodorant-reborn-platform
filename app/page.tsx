import { Navbar } from "@/features/navigation/components/navbar"
import { Footer } from "@/features/layout/components/footer"
import { Hero } from "@/features/home/components/hero"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
