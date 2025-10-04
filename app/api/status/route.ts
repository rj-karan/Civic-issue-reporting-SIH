import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId parameter is required" }, { status: 400 })
    }

    // Simulate fetching user status from database
    const userStatus = {
      userId: userId,
      submitted: Math.floor(Math.random() * 10) + 1,
      accepted: Math.floor(Math.random() * 8) + 1,
      resolved: Math.floor(Math.random() * 5) + 1,
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json(userStatus)
  } catch (error) {
    console.error("Status fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
