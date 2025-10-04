import { type NextRequest, NextResponse } from "next/server"

interface IssueHistory {
  id: string
  issue: string
  status: "submitted" | "accepted" | "resolved" | "rejected"
  date: string
  points: number
  category: string
  priority: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId parameter is required" }, { status: 400 })
    }

    // Simulate fetching user history
    const history: IssueHistory[] = [
      {
        id: "RB2024001",
        issue: "Pothole on MG Road causing traffic issues",
        status: "resolved",
        date: "2024-01-10",
        points: 25,
        category: "road_maintenance",
        priority: "high",
      },
      {
        id: "RB2024002",
        issue: "Street light not working near bus stop",
        status: "accepted",
        date: "2024-01-12",
        points: 15,
        category: "electricity",
        priority: "medium",
      },
      {
        id: "RB2024003",
        issue: "Garbage collection delay in residential area",
        status: "submitted",
        date: "2024-01-14",
        points: 0,
        category: "waste_management",
        priority: "medium",
      },
      {
        id: "RB2024004",
        issue: "Water pipe leakage on main road",
        status: "accepted",
        date: "2024-01-15",
        points: 10,
        category: "water_supply",
        priority: "high",
      },
    ]

    return NextResponse.json(history)
  } catch (error) {
    console.error("History fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
