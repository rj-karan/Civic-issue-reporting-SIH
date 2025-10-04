import { type NextRequest, NextResponse } from "next/server"

interface DepartmentRequest {
  issueId: string
  category: string
  priority: string
  description: string
  location?: string
  aiValidation: any
}

export async function POST(request: NextRequest) {
  try {
    const body: DepartmentRequest = await request.json()

    if (!body.issueId || !body.category || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Route to appropriate department based on category
    const department = getDepartmentForCategory(body.category)

    // Create department ticket
    const ticketId = `DEPT${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    const departmentTicket = {
      ticketId,
      issueId: body.issueId,
      department,
      category: body.category,
      priority: body.priority,
      description: body.description,
      location: body.location,
      aiValidation: body.aiValidation,
      status: "assigned",
      assignedDate: new Date().toISOString(),
      estimatedResolution: getEstimatedResolution(body.priority),
    }

    console.log("Issue routed to department:", departmentTicket)

    // Simulate department notification
    await simulateDepartmentNotification(departmentTicket)

    return NextResponse.json({
      status: "routed",
      ticketId,
      department,
      message: `Issue successfully routed to ${department}`,
      estimatedResolution: departmentTicket.estimatedResolution,
    })
  } catch (error) {
    console.error("Department routing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function getDepartmentForCategory(category: string): string {
  const departmentMap: { [key: string]: string } = {
    road_maintenance: "Municipal Corporation - Roads Department",
    waste_management: "Municipal Corporation - Sanitation Department",
    water_supply: "Water Supply Department",
    electricity: "Electricity Board",
    infrastructure: "Municipal Corporation - Infrastructure",
    general: "Municipal Corporation - General",
  }

  return departmentMap[category] || departmentMap["general"]
}

function getEstimatedResolution(priority: string): string {
  switch (priority) {
    case "high":
      return "24-48 hours"
    case "medium":
      return "3-5 days"
    case "low":
      return "1-2 weeks"
    default:
      return "3-5 days"
  }
}

async function simulateDepartmentNotification(ticket: any) {
  // Simulate sending notification to department
  console.log(`📧 Notification sent to ${ticket.department}:`)
  console.log(`New ${ticket.priority} priority issue assigned: ${ticket.ticketId}`)
  console.log(`Description: ${ticket.description}`)
  console.log(`Expected resolution: ${ticket.estimatedResolution}`)

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 100))
}
