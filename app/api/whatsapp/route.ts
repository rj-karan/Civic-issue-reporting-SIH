import { type NextRequest, NextResponse } from "next/server"

interface WhatsAppRequest {
  userPhone: string
  message: string
  mediaUrl?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: WhatsAppRequest = await request.json()

    // Validate required fields
    if (!body.userPhone || !body.message) {
      return NextResponse.json({ error: "Missing required fields: userPhone, message" }, { status: 400 })
    }

    // Generate unique issue ID
    const issueId = `WA${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`

    // Process WhatsApp message
    const processedData = {
      userId: body.userPhone,
      type: body.mediaUrl ? "image" : "text",
      data: body.message,
      mediaUrl: body.mediaUrl,
      source: "whatsapp",
    }

    // Simulate AI processing
    const aiResult = await simulateWhatsAppAI(processedData)

    // Store in database (simulated)
    console.log("WhatsApp issue processed:", {
      issueId,
      phone: body.userPhone,
      message: body.message,
      aiResult,
    })

    // Send WhatsApp response (simulated)
    const responseMessage = `✅ Thank you! Your issue has been registered with ID: ${issueId}. 
    
Our AI system is processing your report. You will receive updates on this number.

Issue: ${body.message}
Status: Processing
Priority: ${aiResult.priority}

Reply STOP to unsubscribe.`

    console.log("WhatsApp response sent:", responseMessage)

    return NextResponse.json({
      status: "processed",
      issueId: issueId,
      message: "WhatsApp message processed successfully",
      aiProcessing: aiResult,
    })
  } catch (error) {
    console.error("WhatsApp processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function simulateWhatsAppAI(data: any) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Extract keywords and classify
  const message = data.data.toLowerCase()
  let category = "general"
  let priority = "medium"

  if (message.includes("pothole") || message.includes("road")) {
    category = "road_maintenance"
    priority = "high"
  } else if (message.includes("garbage") || message.includes("waste")) {
    category = "waste_management"
    priority = "medium"
  } else if (message.includes("water") || message.includes("pipe")) {
    category = "water_supply"
    priority = "high"
  } else if (message.includes("light") || message.includes("electricity")) {
    category = "electricity"
    priority = "medium"
  }

  return {
    category,
    priority,
    confidence: 0.85,
    extractedKeywords: message.split(" ").filter((word) => word.length > 3),
    departmentRoute: getDepartmentForCategory(category),
    timestamp: new Date().toISOString(),
  }
}

function getDepartmentForCategory(category: string): string {
  const departmentMap: { [key: string]: string } = {
    road_maintenance: "Municipal Corporation - Roads Department",
    waste_management: "Municipal Corporation - Sanitation Department",
    water_supply: "Water Supply Department",
    electricity: "Electricity Board",
    general: "Municipal Corporation - General",
  }

  return departmentMap[category] || departmentMap["general"]
}
