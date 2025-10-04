import { type NextRequest, NextResponse } from "next/server"

interface LeaderboardEntry {
  user: string
  points: number
  issuesResolved: number
  rank: number
}

export async function GET(request: NextRequest) {
  try {
    // Simulate fetching leaderboard data
    const leaderboard: LeaderboardEntry[] = [
      { user: "Rahul Kumar", points: 120, issuesResolved: 8, rank: 1 },
      { user: "Aditi Sharma", points: 95, issuesResolved: 6, rank: 2 },
      { user: "Kiran Patel", points: 80, issuesResolved: 5, rank: 3 },
      { user: "Priya Singh", points: 75, issuesResolved: 5, rank: 4 },
      { user: "Amit Gupta", points: 65, issuesResolved: 4, rank: 5 },
      { user: "Sneha Reddy", points: 60, issuesResolved: 4, rank: 6 },
      { user: "Vikash Yadav", points: 55, issuesResolved: 3, rank: 7 },
      { user: "Neha Joshi", points: 50, issuesResolved: 3, rank: 8 },
      { user: "Ravi Mehta", points: 45, issuesResolved: 3, rank: 9 },
      { user: "Pooja Agarwal", points: 40, issuesResolved: 2, rank: 10 },
    ]

    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error("Scoreboard fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
