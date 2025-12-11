"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Heart, Sparkles } from "lucide-react"

const messages = [
  "Eres la razón por la que mi corazón late más fuerte cada día ❤️",
  "Contigo descubrí que el amor verdadero sí existe 💕",
  "Cada momento a tu lado es un regalo que atesoro para siempre",
  "Eres mi persona favorita en todo el universo ✨",
  "Tu sonrisa ilumina incluso mis días más oscuros",
  "Gracias por ser mi compañera de aventuras y mi hogar",
  "Eres el mejor capítulo de mi historia de vida 📖",
  "Mi lugar favorito es estar entre tus brazos 🤗",
  "Eres la respuesta a todas las preguntas que mi corazón tenía",
  "Contigo aprendí que el amor puede ser tan hermoso y real",
  "Eres mi sueño hecho realidad 💫",
  "Cada día te amo más que ayer, pero menos que mañana",
  "Tu amor es la melodía más hermosa que he escuchado 🎵",
  "Eres mi complemento perfecto, mi media naranja 🍊",
  "Gracias por llenar mi vida de colores y alegría 🌈",
]

export function LoveMessageGenerator({ onBack }: { onBack: () => void }) {
  const [currentMessage, setCurrentMessage] = useState("")
  const [animating, setAnimating] = useState(false)

  const generateMessage = () => {
    setAnimating(true)

    setTimeout(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      setCurrentMessage(randomMessage)
      setAnimating(false)
    }, 500)
  }

  const sendViaSMS = () => {
    if (currentMessage) {
      const phoneNumber = "7296376495"
      const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(currentMessage)}`
      window.location.href = smsUrl
    }
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
            <CardTitle className="text-center flex-1">Mensajes de Amor</CardTitle>
            <div className="w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <Heart className={`h-12 w-12 fill-primary text-primary ${animating ? "animate-pulse" : ""}`} />
                  <Sparkles className="absolute -right-2 -top-2 h-6 w-6 text-accent animate-pulse" />
                </div>
              </div>
              <p className="text-muted-foreground text-balance leading-relaxed">
                Genera mensajes románticos y envíalos fácilmente por SMS
              </p>
            </div>

            {currentMessage && (
              <div
                className={`rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 border-2 border-primary/20 ${
                  animating ? "animate-out fade-out zoom-out-95" : "animate-in fade-in zoom-in-95"
                }`}
              >
                <p className="text-lg font-medium text-center text-balance leading-relaxed">{currentMessage}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={generateMessage} size="lg" className="flex-1">
                <Sparkles className="mr-2 h-5 w-5" />
                Generar Mensaje
              </Button>
              {currentMessage && (
                <Button onClick={sendViaSMS} size="lg" variant="secondary" className="flex-1">
                  <Heart className="mr-2 h-5 w-5" />
                  Enviar SMS
                </Button>
              )}
            </div>

            <div className="rounded-lg bg-secondary p-4 text-sm text-muted-foreground text-balance text-center leading-relaxed">
              Genera un mensaje y luego presiona "Enviar SMS" para abrirlo en tu aplicación de mensajes.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
