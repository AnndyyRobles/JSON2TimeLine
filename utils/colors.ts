export const timelineColors = [
  { bg: "bg-red-500", text: "text-red-600" },
  { bg: "bg-orange-500", text: "text-orange-600" },
  { bg: "bg-yellow-400", text: "text-yellow-600" },
  { bg: "bg-green-500", text: "text-green-600" },
  { bg: "bg-blue-500", text: "text-blue-600" },
  { bg: "bg-pink-500", text: "text-pink-600" },
]

export const getColorByIndex = (index: number) => {
  return timelineColors[index % timelineColors.length]
}

