import { type NextRequest, NextResponse } from "next/server"

interface UserRewards {
  totalPoints: number
  badges: Badge[]
  achievements: Achievement[]
  currentLevel: string
  nextLevelPoints: number
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedDate: string
}

interface Achievement {
  id: string
  title: string
  description: string
  points: number
  unlockedDate: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId parameter is required" }, { status: 400 })
    }

    // Simulate fetching user rewards
    const rewards: UserRewards = {
      totalPoints: 65,
      currentLevel: "Community Helper",
      nextLevelPoints: 100,
      badges: [
        {
          id: "first_reporter",
          name: "First Reporter",
          description: "Submitted your first civic issue",
          icon: "🏆",
          earnedDate: "2024-01-10",
        },
        {
          id: "community_helper",
          name: "Community Helper",
          description: "Helped resolve 3 community issues",
          icon: "🤝",
          earnedDate: "2024-01-12",
        },
        {
          id: "photo_reporter",
          name: "Photo Reporter",
          description: "Submitted 5 issues with photos",
          icon: "📸",
          earnedDate: "2024-01-14",
        },
      ],
      achievements: [
        {
          id: "quick_resolver",
          title: "Quick Resolver",
          description: "Had an issue resolved within 24 hours",
          points: 25,
          unlockedDate: "2024-01-11",
        },
        {
          id: "consistent_reporter",
          title: "Consistent Reporter",
          description: "Reported issues for 5 consecutive days",
          points: 20,
          unlockedDate: "2024-01-15",
        },
        {
          id: "quality_reporter",
          title: "Quality Reporter",
          description: "All your reports were validated as genuine",
          points: 20,
          unlockedDate: "2024-01-13",
        },
      ],
    }

    return NextResponse.json(rewards)
  } catch (error) {
    console.error("Rewards fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
