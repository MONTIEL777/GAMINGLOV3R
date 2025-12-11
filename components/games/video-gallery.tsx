"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play } from "lucide-react"
import { useState } from "react"

interface VideoGalleryProps {
  onBack: () => void
}

export function VideoGallery({ onBack }: VideoGalleryProps) {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)

  const videos = [
    {
      id: 1,
      title: "El dia que todo empezo",
      thumbnail: "/thumbnails/1.jpg",
      videoUrl: "/thumbnails/Videos/1.mp4",
    },
    {
      id: 2,
      title: "Nuestra primera cita",
      thumbnail: "/thumbnails/2.jpg",
      videoUrl: "/thumbnails/Videos/2.mp4",
    },
    {
      id: 3,
      title: "Nuestra primera fiesta familiar",
      thumbnail: "/thumbnails/3.jpg",
      videoUrl: "/thumbnails/Videos/3.mp4",
    },
    {
      id: 4,
      title: "Recuerdos de Morelos",
      thumbnail: "/thumbnails/4.jpg",
      videoUrl: "/thumbnails/Videos/4.mp4",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl">Nuestra Historia en Videos</CardTitle>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden group hover:shadow-lg transition-all">
                <div className="relative aspect-video bg-muted">
                  {playingVideo === video.id ? (
                    <video
                      src={video.videoUrl}
                      controls
                      autoPlay
                      className="h-full w-full object-cover"
                      onEnded={() => setPlayingVideo(null)}
                    >
                      Tu navegador no soporta el video.
                    </video>
                  ) : (
                    <>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-full w-full object-cover"
                      />

                      <button
                        onClick={() => setPlayingVideo(video.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all hover:bg-black/40"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                          <Play className="h-8 w-8 ml-1" />
                        </div>
                      </button>
                    </>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
