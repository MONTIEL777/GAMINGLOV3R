"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, ChevronRight } from "lucide-react"

type Riddle = {
  question: string
  answer: string
  hint: string
}

const riddles: Riddle[] = [
  {
    question: "Soy rojo y simbolizo el amor, me dan en San Valentín y mi aroma es mi mayor don. ¿Qué soy?",
    answer: "rosa",
    hint: "Es una flor muy popular",
  },
  {
    question:
      "Tengo alas pero no vuelo, lanzo flechas con mi arco pero no cazo. Hago que dos personas se enamoren. ¿Quién soy?",
    answer: "cupido",
    hint: "Es un personaje mitológico",
  },
  {
    question: "Redondo y brillante, símbolo de compromiso, en el dedo anular suelo estar contigo. ¿Qué soy?",
    answer: "anillo",
    hint: "Se usa en las bodas",
  },
  {
    question: "No tiene piernas pero corre, no tiene boca pero conquista, cuando llega todo lo embellece. ¿Qué es?",
    answer: "amor",
    hint: "Es un sentimiento",
  },
  {
    question: "Dulce o amargo, en forma de corazón, regalo perfecto para demostrar mi devoción. ¿Qué soy?",
    answer: "chocolate",
    hint: "Es algo que se come",
  },
]

export function RiddleGame({ onBack }: { onBack: () => void }) {
  const [currentRiddle, setCurrentRiddle] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [showResult, setShowResult] = useState<"correct" | "incorrect" | null>(null)
  const [score, setScore] = useState(0)

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
  }

  const handleSubmit = () => {
    const correct = normalizeText(userAnswer) === normalizeText(riddles[currentRiddle].answer)

    setShowResult(correct ? "correct" : "incorrect")

    if (correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentRiddle < riddles.length - 1) {
        setCurrentRiddle(currentRiddle + 1)
        setUserAnswer("")
        setShowHint(false)
        setShowResult(null)
      }
    }, 2000)
  }

  const resetGame = () => {
    setCurrentRiddle(0)
    setUserAnswer("")
    setShowHint(false)
    setShowResult(null)
    setScore(0)
  }

  const isLastRiddle = currentRiddle === riddles.length - 1
  const gameFinished = showResult !== null && isLastRiddle

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            <CardTitle className="text-center flex-1">Adivinanzas de Amor</CardTitle>
            <div className="w-24 text-right text-sm text-muted-foreground">
              {score}/{riddles.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {gameFinished ? (
            <div className="py-12 text-center space-y-6">
              <div className="text-6xl">🎉</div>
              <div>
                <h3 className="mb-2 text-2xl font-bold text-balance">¡Completado!</h3>
                <p className="text-4xl font-bold text-primary mb-2">
                  {score}/{riddles.length}
                </p>
                <p className="text-muted-foreground text-balance">
                  {score === riddles.length
                    ? "¡Perfecto! Todas las adivinanzas correctas 💕"
                    : score >= riddles.length / 2
                      ? "¡Muy bien! Tienes buen ingenio"
                      : "¡Buen intento! Las adivinanzas pueden ser difíciles"}
                </p>
              </div>
              <Button onClick={resetGame} size="lg">
                Jugar de Nuevo
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Adivinanza {currentRiddle + 1} de {riddles.length}
                </p>
                <div className="rounded-xl bg-secondary p-6 mb-6">
                  <p className="text-lg font-medium text-balance leading-relaxed">{riddles[currentRiddle].question}</p>
                </div>

                {showHint && (
                  <div className="mb-4 rounded-lg bg-accent/20 p-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-accent-foreground">
                      <Lightbulb className="h-4 w-4" />
                      <span className="text-balance">{riddles[currentRiddle].hint}</span>
                    </div>
                  </div>
                )}

                {showResult === null ? (
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Escribe tu respuesta..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && userAnswer && handleSubmit()}
                      className="text-center text-lg"
                      autoFocus
                    />

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setShowHint(!showHint)} className="flex-1">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        {showHint ? "Ocultar" : "Ver"} Pista
                      </Button>
                      <Button onClick={handleSubmit} disabled={!userAnswer} className="flex-1">
                        Responder
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`rounded-xl p-6 animate-in zoom-in-50 ${
                      showResult === "correct" ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {showResult === "correct" ? (
                        <>
                          <CheckCircle2 className="h-8 w-8 text-green-600" />
                          <div className="text-left">
                            <p className="font-semibold text-green-900 dark:text-green-100">¡Correcto! 🎉</p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              La respuesta era: {riddles[currentRiddle].answer}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-8 w-8 text-red-600" />
                          <div className="text-left">
                            <p className="font-semibold text-red-900 dark:text-red-100">No es correcto</p>
                            <p className="text-sm text-red-700 dark:text-red-300">
                              La respuesta era: {riddles[currentRiddle].answer}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
