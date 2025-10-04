import { type NextRequest, NextResponse } from "next/server"

interface TrashRequest {
  issueId: string
  reason: string
  aiAnalysis: any
  reviewedBy?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: TrashRequest = await request.json()

    if (!body.issueId || !body.reason) {
      return NextResponse.json({ error: "Missing required fields: issueId, reason" }, { status: 400 })
    }

    // Create trash record
    const trashRecord = {
      issueId: body.issueId,
      reason: body.reason,
      aiAnalysis: body.aiAnalysis,
      reviewedBy: body.reviewedBy || "AI_SYSTEM",
      trashedDate: new Date().toISOString(),
      category: categorizeTrashReason(body.reason),
    }

    console.log("Issue moved to trash:", trashRecord)

    // Update issue status in database (simulated)
    await updateIssueStatus(body.issueId, "rejected", body.reason)

    // Log for analytics
    await logTrashAnalytics(trashRecord)

    return NextResponse.json({
      status: "trashed",
      issueId: body.issueId,
      reason: body.reason,
      message: "Issue has been marked as invalid and moved to trash",
    })
  } catch (error) {
    console.error("Trash processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function categorizeTrashReason(reason: string): string {
  const reasonLower = reason.toLowerCase()

  if (reasonLower.includes("duplicate")) return "duplicate"
  if (reasonLower.includes("spam")) return "spam"
  if (reasonLower.includes("fake") || reasonLower.includes("false")) return "fake_report"
  if (reasonLower.includes("inappropriate")) return "inappropriate_content"
  if (reasonLower.includes("unclear") || reasonLower.includes("insufficient")) return "insufficient_information"

  return "other"
}

async function updateIssueStatus(issueId: string, status: string, reason: string) {
  // Simulate database update
  console.log(`Updated issue ${issueId} status to ${status} with reason: ${reason}`)
  await new Promise((resolve) => setTimeout(resolve, 50))
}

async function logTrashAnalytics(record: any) {
  // Log for improving AI models
  console.log("Analytics logged:", {
    category: record.category,
    reason: record.reason,
    timestamp: record.trashedDate,
  })
  await new Promise((resolve) => setTimeout(resolve, 50))
}
