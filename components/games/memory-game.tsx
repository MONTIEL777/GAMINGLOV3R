"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Heart, Trophy } from "lucide-react"
import Image from "next/image"

type CardType = {
  id: number
  image: string
  isFlipped: boolean
  isMatched: boolean
}

const images = [
  "/LOLA Y YO/1.jpg",
  "/LOLA Y YO/2.jpg",
  "/LOLA Y YO/3.jpg",
  "/LOLA Y YO/4.jpg",
  "/LOLA Y YO/5.jpg",
  "/LOLA Y YO/6.jpg",
  "/LOLA Y YO/7.jpg",
  "/LOLA Y YO/8.jpg",
]


export function MemoryGame({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isWon, setIsWon] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const gameImages = [...images, ...images]
    const shuffled = gameImages
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffled)
    setFlippedCards([])
    setMoves(0)
    setIsWon(false)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return
    if (flippedCards.includes(id)) return
    if (cards[id].isMatched) return

    const newFlipped = [...flippedCards, id]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlipped

      if (cards[first].image === cards[second].image) {
        setCards((prev) =>
          prev.map((card) => (card.id === first || card.id === second ? { ...card, isMatched: true } : card)),
        )
        setFlippedCards([])

        setTimeout(() => {
          const allMatched = cards.every((card, idx) => card.isMatched || idx === first || idx === second)
          if (allMatched) {
            setIsWon(true)
          }
        }, 300)
      } else {
        setTimeout(() => setFlippedCards([]), 1000)
      }
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            <CardTitle className="text-center flex-1">Memory de Fotos</CardTitle>
            <div className="w-24 text-right text-sm text-muted-foreground">Movimientos: {moves}</div>
          </div>
        </CardHeader>
        <CardContent>
          {isWon ? (
            <div className="py-12 text-center">
              <Trophy className="mx-auto mb-4 h-16 w-16 text-accent animate-bounce" />
              <h3 className="mb-2 text-2xl font-bold text-balance">¡Increíble!</h3>
              <p className="mb-6 text-muted-foreground text-balance">Completaste el juego en {moves} movimientos</p>
              <Button onClick={initializeGame} size="lg">
                Jugar de Nuevo
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                    flippedCards.includes(card.id) || card.isMatched
                      ? "ring-2 ring-primary scale-95"
                      : "bg-secondary hover:bg-secondary/80 hover:scale-105"
                  }`}
                  disabled={card.isMatched || flippedCards.includes(card.id)}
                >
                  {flippedCards.includes(card.id) || card.isMatched ? (
                    <div className="relative w-full h-full animate-in zoom-in-50">
                      <Image src={card.image || "/placeholder.svg"} alt="Memory card" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-secondary">
                      <Heart className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
