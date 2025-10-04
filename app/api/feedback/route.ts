import { type NextRequest, NextResponse } from "next/server"

interface FeedbackRequest {
  userId?: string
  message: string
  rating?: number
  category?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json()

    if (!body.message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Generate feedback ID
    const feedbackId = `FB${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`

    // Store feedback (simulated)
    const feedbackData = {
      id: feedbackId,
      userId: body.userId || "anonymous",
      message: body.message,
      rating: body.rating,
      category: body.category || "general",
      timestamp: new Date().toISOString(),
      status: "received",
    }

    console.log("Feedback received:", feedbackData)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      status: "success",
      feedbackId: feedbackId,
      message: "Thank you for your feedback! We will review it and improve our services.",
    })
  } catch (error) {
    console.error("Feedback error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
