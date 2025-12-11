"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Sparkles, Video } from "lucide-react"
import { useState } from "react"
import { MemoryGame } from "./games/memory-game"
import { TriviaGame } from "./games/trivia-game"
import { RiddleGame } from "./games/riddle-game"
import { VideoGallery } from "./games/video-gallery"

type GameType = "memory" | "trivia" | "riddle" | "videos" | null

export function GameGrid() {
  const [activeGame, setActiveGame] = useState<GameType>(null)

  const games = [
    {
      id: "memory" as const,
      title: "Nuestras fotos",
      description: "Encuentra las parejas de fotos que guardan momentos lindos en nuestra vida",
      icon: Heart,
      color: "text-primary",
    },
    {
      id: "trivia" as const,
      title: "Trivia del amor",
      description: "Pon a prueba tus conocimientos sobre nosotros",
      icon: Brain,
      color: "text-accent",
    },
    {
      id: "riddle" as const,
      title: "Adivinanzas ",
      description: "Descifra estas dulces adivinanzas románticas",
      icon: Sparkles,
      color: "text-chart-3",
    },
    {
      id: "videos" as const,
      title: "Nuestra historia",
      description: "Revive nuestros momentos especiales juntos",
      icon: Video,
      color: "text-chart-4",
    },
  ]

  if (activeGame === "memory") {
    return <MemoryGame onBack={() => setActiveGame(null)} />
  }

  if (activeGame === "trivia") {
    return <TriviaGame onBack={() => setActiveGame(null)} />
  }

  if (activeGame === "riddle") {
    return <RiddleGame onBack={() => setActiveGame(null)} />
  }

  if (activeGame === "videos") {
    return <VideoGallery onBack={() => setActiveGame(null)} />
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-6 md:grid-cols-2">
        {games.map((game) => {
          const Icon = game.icon
          return (
            <Card
              key={game.id}
              className="group transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-2 hover:border-primary/50"
            >
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <Icon className={`h-6 w-6 ${game.color}`} />
                </div>
                <CardTitle className="text-2xl text-balance">{game.title}</CardTitle>
                <CardDescription className="text-balance leading-relaxed">{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setActiveGame(game.id)} className="w-full" size="lg">
                  Jugar Ahora
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
