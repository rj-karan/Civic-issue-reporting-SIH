"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IssuePoint {
  id: string
  type: "pothole" | "sanitation" | "lighting" | "water" | "traffic"
  coordinates: [number, number] // [longitude, latitude]
  title: string
  description: string
  status: "pending" | "valid" | "fake"
  timestamp: string
}

interface IndiaMapClusterProps {
  issues?: IssuePoint[]
  className?: string
}

const sampleIssues: IssuePoint[] = [
  {
    id: "1",
    type: "pothole",
    coordinates: [77.5946, 12.9716], // Bangalore
    title: "Large pothole on MG Road",
    description: "Deep pothole causing traffic issues in Bangalore",
    status: "valid",
    timestamp: "2025-01-15 10:30 AM",
  },
  {
    id: "2",
    type: "lighting",
    coordinates: [80.2707, 13.0827], // Chennai
    title: "Street light not working",
    description: "Dark street near bus stop in Chennai",
    status: "pending",
    timestamp: "2025-01-15 11:15 AM",
  },
  {
    id: "3",
    type: "sanitation",
    coordinates: [78.4867, 17.385], // Hyderabad
    title: "Garbage pile",
    description: "Waste accumulation near residential area in Hyderabad",
    status: "valid",
    timestamp: "2025-01-15 09:45 AM",
  },
  {
    id: "4",
    type: "water",
    coordinates: [76.2673, 9.9312], // Kochi, Kerala
    title: "Water logging",
    description: "Street flooding after rain in Kochi",
    status: "fake",
    timestamp: "2025-01-15 08:30 AM",
  },
  {
    id: "5",
    type: "traffic",
    coordinates: [76.9366, 11.0168], // Coimbatore, Tamil Nadu
    title: "Traffic signal malfunction",
    description: "Signal not working at major intersection in Coimbatore",
    status: "pending",
    timestamp: "2025-01-15 12:00 PM",
  },
  {
    id: "6",
    type: "pothole",
    coordinates: [76.9558, 8.5241], // Thiruvananthapuram, Kerala
    title: "Road damage",
    description: "Multiple potholes on main road in Thiruvananthapuram",
    status: "valid",
    timestamp: "2025-01-15 01:15 PM",
  },
  {
    id: "7",
    type: "sanitation",
    coordinates: [78.1198, 9.9252], // Madurai, Tamil Nadu
    title: "Overflowing dustbin",
    description: "Garbage bin needs immediate attention in Madurai",
    status: "valid",
    timestamp: "2025-01-15 02:30 PM",
  },
  {
    id: "8",
    type: "lighting",
    coordinates: [76.6394, 12.2958], // Mysore, Karnataka
    title: "Broken street lamp",
    description: "Street lamp post damaged in Mysore",
    status: "pending",
    timestamp: "2025-01-15 03:45 PM",
  },
  {
    id: "9",
    type: "water",
    coordinates: [74.856, 12.9141], // Mangalore, Karnataka
    title: "Drainage blockage",
    description: "Water stagnation due to blocked drainage in Mangalore",
    status: "valid",
    timestamp: "2025-01-15 04:00 PM",
  },
  {
    id: "10",
    type: "traffic",
    coordinates: [83.2185, 17.6868], // Visakhapatnam, Andhra Pradesh
    title: "Road construction delay",
    description: "Traffic congestion due to ongoing construction in Visakhapatnam",
    status: "pending",
    timestamp: "2025-01-15 05:15 PM",
  },
]

export function IndiaMapCluster({ issues = sampleIssues, className }: IndiaMapClusterProps) {
  const [selectedIssue, setSelectedIssue] = useState<IssuePoint | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (typeof window === "undefined" || mapLoaded) return

    const initMap = async () => {
      try {
        // Dynamically import Leaflet to avoid SSR issues
        const L = (await import("leaflet")).default

        // Import Leaflet CSS
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)

        if (mapRef.current && !mapInstance) {
          const map = L.map(mapRef.current, {
            center: [12.5, 78.0], // Southern India center
            zoom: 6,
            zoomControl: false,
          })

          // Add OpenStreetMap tiles (free and open source)
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
          }).addTo(map)

          // Custom zoom control
          L.control.zoom({ position: "topright" }).addTo(map)

          setMapInstance(map)
          setMapLoaded(true)
        }
      } catch (error) {
        console.error("Failed to load map:", error)
      }
    }

    initMap()
  }, [mapLoaded, mapInstance])

  useEffect(() => {
    if (!mapInstance || !mapLoaded) return

    const L = (window as any).L
    if (!L) return

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapInstance.removeLayer(marker)
    })
    markersRef.current = []

    // Add new markers
    issues.forEach((issue) => {
      const color = getIssueColor(issue.type, issue.status)

      // Create custom icon
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            background-color: ${color};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: white;
            font-weight: bold;
          ">
            ${getIssueIcon(issue.type)}
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      const marker = L.marker([issue.coordinates[1], issue.coordinates[0]], {
        icon: customIcon,
      })
        .addTo(mapInstance)
        .on("click", () => {
          setSelectedIssue(issue)
        })

      // Add popup
      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">${issue.title}</h3>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${issue.description}</p>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: ${color};
            "></span>
            <span style="font-size: 11px; text-transform: capitalize;">${issue.type}</span>
            <span style="
              font-size: 10px;
              padding: 2px 6px;
              border-radius: 4px;
              color: white;
              background-color: ${issue.status === "valid" ? "#10b981" : issue.status === "fake" ? "#ef4444" : "#f97316"};
            ">${issue.status}</span>
          </div>
          <p style="margin: 0; font-size: 10px; color: #888;">${issue.timestamp}</p>
        </div>
      `)

      markersRef.current.push(marker)
    })
  }, [mapInstance, mapLoaded, issues])

  const getIssueColor = (type: string, status: string) => {
    if (status === "fake") return "#ef4444" // red
    if (status === "pending") return "#f97316" // orange

    switch (type) {
      case "pothole":
        return "#3b82f6" // blue
      case "sanitation":
        return "#10b981" // green
      case "lighting":
        return "#f59e0b" // yellow
      case "water":
        return "#06b6d4" // cyan
      case "traffic":
        return "#8b5cf6" // purple
      default:
        return "#6b7280" // gray
    }
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "pothole":
        return "🕳"
      case "sanitation":
        return "🗑"
      case "lighting":
        return "💡"
      case "water":
        return "💧"
      case "traffic":
        return "🚦"
      default:
        return "📍"
    }
  }

  const handleZoomToSouthIndia = () => {
    if (mapInstance) {
      mapInstance.setView([12.5, 78.0], 7)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          India Issues Map - Southern Focus
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="text-xs">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
            Pothole
          </Badge>
          <Badge variant="outline" className="text-xs">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Sanitation
          </Badge>
          <Badge variant="outline" className="text-xs">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
            Lighting
          </Badge>
          <Badge variant="outline" className="text-xs">
            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-1"></span>
            Water
          </Badge>
          <Badge variant="outline" className="text-xs">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
            Traffic
          </Badge>
          <Badge variant="outline" className="text-xs">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
            Fake Reports
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={handleZoomToSouthIndia}>
              <Layers className="w-4 h-4 mr-1" />
              Focus South India
            </Button>
          </div>

          <div
            ref={mapRef}
            className="w-full h-96 rounded-lg border border-border bg-slate-50 relative overflow-hidden"
            style={{ minHeight: "384px" }}
          >
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Loading interactive map...</p>
                </div>
              </div>
            )}
          </div>

          {/* Issue details popup */}
          {selectedIssue && (
            <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs z-[1000]">
              <button
                onClick={() => setSelectedIssue(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
              <h3 className="font-semibold text-sm mb-1">{selectedIssue.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{selectedIssue.description}</p>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: getIssueColor(selectedIssue.type, selectedIssue.status) }}
                ></span>
                <span className="text-xs capitalize">{selectedIssue.type}</span>
                <span
                  className={`text-xs px-1 py-0.5 rounded text-white ${
                    selectedIssue.status === "valid"
                      ? "bg-green-500"
                      : selectedIssue.status === "fake"
                        ? "bg-red-500"
                        : "bg-orange-500"
                  }`}
                >
                  {selectedIssue.status}
                </span>
              </div>
              <p className="text-xs text-gray-500">{selectedIssue.timestamp}</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>• Interactive map powered by OpenStreetMap (open source)</p>
          <p>• Click markers for detailed issue information</p>
          <p>• Focused on southern Indian cities and states</p>
          <p>• Live data showing civic issues across Karnataka, Tamil Nadu, Kerala, Andhra Pradesh</p>
        </div>
      </CardContent>
    </Card>
  )
}
