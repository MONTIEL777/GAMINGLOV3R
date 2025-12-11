"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from "lucide-react"

type Question = {
  question: string
  options: string[]
  correct: number
}

const questions: Question[] = [
  {
    question: "¿Cuál es nuestro momento favorito juntos?",
    options: ["Comer", "Ver películas", "Caminar", "Bailar"],
    correct: 0,
  },
  {
    question: "¿Cómo fue nuestro mejor beso?",
    options: ["Apasionado", "Piquito", "Largo", "Tierno"],
    correct: 1,
  },
  {
    question: "¿Qué día fue nuestro primer viaje juntos?",
    options: ["15 de julio del 2025", "16 de agosto del 2025", "20 de septiembre del 2025", "10 de junio del 2025"],
    correct: 1,
  },
  {
    question: "¿Qué nos representa más juntos?",
    options: ["Rosa", "Lila", "Girasol", "Tulipán"],
    correct: 1,
  },
  {
    question: "¿Qué hemos comido más juntos?",
    options: ["Pizza", "Hamburguesas", "Comida china", "Tacos"],
    correct: 2,
  },
  {
    question: "¿Qué fue lo primero que visitamos juntos?",
    options: ["Cine", "Parque", "Playa", "Centro comercial"],
    correct: 1,
  },
  {
    question: "¿Quién abrazó primero a quién?",
    options: ["Alexis a Lola", "Lola a Alexis", "Los dos al mismo tiempo", "Nadie recuerda"],
    correct: 1,
  },
  {
    question: "¿Qué serie es nuestra favorita?",
    options: ["Breaking Bad", "The Office", "Stranger Things", "Friends"],
    correct: 2,
  },
  {
    question: "¿Qué día, hora y fecha fue nuestra primera foto?",
    options: [
      "10:30 del 15 de diciembre",
      "7:45 del 16 de diciembre",
      "12:00 del 17 de diciembre",
      "9:15 del 14 de diciembre",
    ],
    correct: 1,
  },
  {
    question: "¿Qué hicimos el 30 de diciembre?",
    options: ["Cine", "Picnic", "Fiesta", "Quedarnos en casa"],
    correct: 1,
  },
]

export function TriviaGame({ onBack }: { onBack: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(index)
    setShowResult(true)

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setGameFinished(true)
      }
    }, 1500)
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameFinished(false)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            <CardTitle className="text-center flex-1">Trivia Romántica</CardTitle>
            <div className="w-24 text-right text-sm text-muted-foreground">
              {score}/{questions.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {gameFinished ? (
            <div className="py-12 text-center">
              <Trophy className="mx-auto mb-4 h-16 w-16 text-accent animate-bounce" />
              <h3 className="mb-2 text-2xl font-bold text-balance">¡Juego Completado!</h3>
              <p className="mb-2 text-4xl font-bold text-primary">
                {score}/{questions.length}
              </p>
              <p className="mb-6 text-muted-foreground text-balance">
                {score === questions.length
                  ? "¡Perfecto! Eres una experta en nuestros recuerdos💕"
                  : score >= questions.length / 2
                    ? "¡Muy bien! Sabes mucho sobre nosotros"
                    : "¡Sigue intentando!"}
              </p>
              <Button onClick={resetGame} size="lg">
                Jugar de Nuevo
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </p>
                <h3 className="text-xl font-semibold text-balance leading-relaxed">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => {
                  const isCorrect = index === questions[currentQuestion].correct
                  const isSelected = index === selectedAnswer

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                        showResult
                          ? isCorrect
                            ? "border-green-500 bg-green-50 dark:bg-green-950"
                            : isSelected
                              ? "border-red-500 bg-red-50 dark:bg-red-950"
                              : "border-border bg-card"
                          : "border-border bg-card hover:border-primary hover:bg-secondary"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-balance">{option}</span>
                        {showResult && isCorrect && (
                          <CheckCircle2 className="h-5 w-5 text-green-600 animate-in zoom-in-50" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="h-5 w-5 text-red-600 animate-in zoom-in-50" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
