import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function Timeline() {
  const timelineEvents = {
    title: "TIMELINE",
    subtitle: "INFOGRAPHICS",
    events: [
      {
        year: "1978",
        title: "LOREM IPSUM",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        color: "bg-red-500",
        textColor: "text-red-600",
        position: "right",
      },
      {
        year: "1989",
        title: "DOLOR EXIT UN CENTERA",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
        color: "bg-orange-500",
        textColor: "text-orange-600",
        position: "left",
      },
      {
        year: "1995",
        title: "SUMKAC SAFARIUM",
        content: [
          "Curabitur pretium tincidunt lacus",
          "Nulla gravida orci a odio",
          "Nullam varius, turpis et commodo pharetra",
          "Est errat in voluptate",
          "Velit esse cillum dolore eu",
          "Fugiat nulla sint occaecat",
        ],
        color: "bg-yellow-400",
        textColor: "text-yellow-600",
        position: "right",
        isList: true,
      },
      {
        year: "2006",
        title: "KASTROL DO KRED",
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        color: "bg-green-500",
        textColor: "text-green-600",
        position: "left",
      },
      {
        year: "2013",
        title: "ENE BENE LEXA",
        content:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.",
        color: "bg-blue-500",
        textColor: "text-blue-600",
        position: "right",
      },
      {
        year: "2016",
        title: "LAST SCAUTER",
        content:
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.",
        color: "bg-pink-500",
        textColor: "text-pink-600",
        position: "left",
      },
    ],
  }

  return (
    <div className={`max-w-4xl mx-auto p-4 ${montserrat.className}`}>
      {/* Título */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-light tracking-wide text-gray-800 mb-2">{timelineEvents.title}</h1>
        <h2 className="text-xl font-light tracking-wider text-gray-600 uppercase">{timelineEvents.subtitle}</h2>
      </div>

      {/* Línea del tiempo */}
      <div className="relative">
        {/* Línea central vertical */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-200" />

        {/* Eventos */}
        <div className="relative">
          {timelineEvents.events.map((event, index) => (
            <div key={index} className="mb-16 relative">
              {/* Año */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 z-10 bg-white px-2">
                <span className="text-2xl font-light text-gray-400">{event.year}</span>
              </div>

              {/* Contenido */}
              <div className={`flex ${event.position === "left" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-[45%] ${event.position === "left" ? "pl-8" : "pr-8"}`}>
                  {/* Línea horizontal y contenido */}
                  <div className={`relative ${event.position === "left" ? "text-right" : "text-left"}`}>
                    {/* Línea horizontal */}
                    <div className={`${event.color} h-px w-48 ${event.position === "left" ? "ml-auto" : ""} mb-4`} />

                    {/* Título y contenido */}
                    <h3 className={`${event.textColor} font-medium text-lg mb-2`}>{event.title}</h3>
                    {event.isList ? (
                      <ul
                        className={`text-sm text-gray-600 space-y-1 ${event.position === "left" ? "pl-0" : "pl-4"} list-disc`}
                      >
                        {Array.isArray(event.content) && event.content.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">{event.content}</p>
                    )}
                  </div>
                </div>
                <div className="w-[10%]" /> {/* Espaciador central */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

