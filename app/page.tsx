import { Heart } from "lucide-react"
import { GameGrid } from "@/components/game-grid"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Heart className="h-16 w-16 fill-primary text-primary animate-pulse" />
              <Heart className="absolute inset-0 h-16 w-16 fill-accent text-accent opacity-50 blur-xl animate-pulse" />
            </div>
          </div>

          <h1 className="font-serif text-5xl font-bold text-balance text-foreground md:text-7xl mb-4">
            FELICES 11 MESES AMOR
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-balance text-muted-foreground md:text-xl leading-relaxed">
            Una colección especial de juegos interactivos diseñados para disfrutar juntos y de nuestra historia para cuando lo necesites amor
           
          </p>
        </div>

        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
          <Heart className="h-96 w-96 text-primary" />
        </div>
      </section>

      {/* Games Section */}
      <section className="px-4 py-12">
        <GameGrid />
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Hecho con el <Heart className="inline h-4 w-4 fill-primary text-primary" /> para ti
        </p>
      </footer>
    </main>
  )
}
