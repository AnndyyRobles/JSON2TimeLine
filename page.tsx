"use client"

import { useState, useRef } from "react"
import { Montserrat } from "next/font/google"
import { getColorByIndex } from "./utils/colors"
import { examples, defaultJSON } from "./utils/examples"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download } from "lucide-react"
import html2canvas from "html2canvas"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function TimelineGenerator() {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(defaultJSON, null, 2))
  const [timelineData, setTimelineData] = useState<any>(null)
  const [error, setError] = useState("")
  const timelineRef = useRef<HTMLDivElement>(null)

  const loadExample = (type: keyof typeof examples) => {
    setJsonInput(JSON.stringify(examples[type], null, 2))
    setError("")
  }

  const generateTimeline = () => {
    try {
      const parsedData = JSON.parse(jsonInput)

      if (!parsedData.title || !parsedData.subtitle || !Array.isArray(parsedData.events)) {
        throw new Error("Invalid JSON structure. Please check the example format.")
      }

      const processedData = {
        ...parsedData,
        events: parsedData.events.map((event: any, index: number) => ({
          ...event,
          ...getColorByIndex(index),
          position: index % 2 === 0 ? "left" : "right",
        })),
      }

      setTimelineData(processedData)
      setError("")
    } catch (err) {
      setError("Invalid JSON format. Please check your input.")
      setTimelineData(null)
    }
  }

  const downloadImage = async () => {
    if (timelineRef.current) {
      console.log("Generating image...")
      const canvas = await html2canvas(timelineRef.current)
      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = "timeline.png"
      link.click()
      console.log("Image downloaded")
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 py-12 ${montserrat.className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-wide text-gray-800 mb-3">Timeline Generator</h1>
          <p className="text-lg text-gray-600 mb-6">Create beautiful timelines from JSON data</p>
          <div className="flex gap-4 justify-center mb-8">
            <Button variant="outline" onClick={() => loadExample("simple")}>
              Simple Example
            </Button>
            <Button variant="outline" onClick={() => loadExample("complete")}>
              Complete Example
            </Button>
            <Button variant="outline" onClick={() => loadExample("list")}>
              List Example
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Enter your JSON</h2>
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="font-mono text-sm min-h-[300px] mb-4"
            placeholder="Paste your JSON here..."
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Button onClick={generateTimeline} className="w-full">
            Generate Timeline
          </Button>
        </div>

        {timelineData && (
          <div className="relative mb-8">
            <div ref={timelineRef} className="bg-white p-12 rounded-lg shadow-lg">
              <div className="mb-12 text-center">
                <h1 className="text-4xl font-light tracking-wide text-gray-800 mb-2">{timelineData.title}</h1>
                <h2 className="text-xl font-light tracking-wider text-gray-600 uppercase">{timelineData.subtitle}</h2>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-300" />

                <div className="relative">
                  {timelineData.events.map((event: any, index: number) => (
                    <div key={index} className="mb-16 relative">
                      <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 z-10 bg-white px-2">
                        <span className="text-2xl font-light text-gray-400">{event.year}</span>
                      </div>

                      <div className={`flex ${event.position === "left" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-[45%] ${event.position === "left" ? "pl-8" : "pr-8"}`}>
                          <div className={`relative ${event.position === "left" ? "text-right" : "text-left"}`}>
                            <div
                              className={`${event.bg} h-px w-48 ${event.position === "left" ? "ml-auto" : ""} mb-4`}
                            />

                            <h3 className={`${event.text} font-medium text-lg mb-2`}>{event.title}</h3>
                            {event.isList ? (
                              <ul
                                className={`
                                text-sm text-gray-600 list-none
                                ${event.position === "left" ? "text-right" : "text-left"}
                              `}
                              >
                                {Array.isArray(event.content) &&
                                  event.content.map((item: string, i: number) => (
                                    <li
                                      key={i}
                                      className={`
                                    mb-0.5 flex items-center gap-1
                                    ${event.position === "left" ? "flex-row-reverse" : "flex-row"}
                                  `}
                                    >
                                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-600">{event.content}</p>
                            )}
                          </div>
                        </div>
                        <div className="w-[10%]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button
              onClick={downloadImage}
              className="absolute top-4 right-4 bg-[#1b207c] hover:bg-[#161969] text-white rounded-md px-3 py-2 shadow-md transition-all duration-200 ease-in-out hover:shadow-lg flex items-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span className="text-sm font-medium">Download</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

