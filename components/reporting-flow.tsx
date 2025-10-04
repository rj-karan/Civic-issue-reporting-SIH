"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Bot,
  Shield,
  CheckCircle,
  Clock,
  Smartphone,
  Headphones,
  Mail,
} from "lucide-react"

export function ReportingFlow() {
  const reportingSteps = [
    {
      step: "Citizen Reports",
      description: "Via WhatsApp, IVR, SMS, or Web",
      icon: <Smartphone className="w-5 h-5" />,
      status: "active",
    },
    {
      step: "AI Processing",
      description: "YOLO, Whisper AI validation",
      icon: <Bot className="w-5 h-5" />,
      status: "active",
    },
    {
      step: "Department Routing",
      description: "Auto-assigned to relevant authority",
      icon: <ArrowRight className="w-5 h-5" />,
      status: "active",
    },
    {
      step: "Resolution Tracking",
      description: "Real-time status updates",
      icon: <CheckCircle className="w-5 h-5" />,
      status: "active",
    },
  ]

  const communicationChannels = [
    {
      name: "WhatsApp Bot",
      number: "+91-XXXXX-XXXXX",
      description: "Text, voice, and image reporting",
      icon: <MessageSquare className="w-6 h-6 text-green-600" />,
      status: "Active",
      usage: "65%",
    },
    {
      name: "IVR System",
      number: "1800-XXX-XXXX",
      description: "Voice-based issue reporting",
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      status: "Active",
      usage: "25%",
    },
    {
      name: "SMS Gateway",
      number: "56677",
      description: "Quick text-based reporting",
      icon: <Mail className="w-6 h-6 text-purple-600" />,
      status: "Active",
      usage: "10%",
    },
  ]

  const ivrFlow = [
    "Dial 1800-XXX-XXXX",
    "Select language (Hindi/English/Regional)",
    "Choose issue category",
    "Record your complaint",
    "Provide location details",
    "Receive confirmation SMS",
  ]

  return (
    <div className="space-y-6">
      {/* Dashboard Flow */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            Dashboard Flow & Reporting Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportingSteps.map((step, index) => (
              <div key={step.step} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{step.step}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < reportingSteps.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Channels */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Headphones className="w-5 h-5 text-primary" />
            Multi-Channel Reporting System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communicationChannels.map((channel) => (
              <div key={channel.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  {channel.icon}
                  <div>
                    <p className="font-medium text-sm">{channel.name}</p>
                    <p className="text-xs text-muted-foreground">{channel.description}</p>
                    <p className="text-xs font-mono text-primary">{channel.number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-1">
                    {channel.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{channel.usage} usage</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IVR System Details */}
      <Card className="border-border bg-blue-500/5 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-600" />
            IVR System Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-card p-3 rounded-lg border border-border">
                <p className="text-sm font-medium mb-1">Toll-Free Number</p>
                <p className="text-lg font-mono text-blue-600">1800-XXX-XXXX</p>
              </div>
              <div className="bg-white dark:bg-card p-3 rounded-lg border border-border">
                <p className="text-sm font-medium mb-1">Available</p>
                <p className="text-sm text-muted-foreground">24/7 Multilingual Support</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-sm mb-3">Call Flow Process:</p>
              {ivrFlow.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS Gateway Details */}
      <Card className="border-border bg-purple-500/5 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="w-5 h-5 text-purple-600" />
            SMS Gateway Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-card p-3 rounded-lg border border-border">
                <p className="text-sm font-medium mb-1">Short Code</p>
                <p className="text-lg font-mono text-purple-600">56677</p>
              </div>
              <div className="bg-white dark:bg-card p-3 rounded-lg border border-border">
                <p className="text-sm font-medium mb-1">Format</p>
                <p className="text-sm text-muted-foreground">REPORT [ISSUE] [LOCATION]</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-medium text-sm">SMS Commands:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white dark:bg-card rounded border border-border">
                  <code className="text-xs bg-muted px-2 py-1 rounded">REPORT POTHOLE MG ROAD</code>
                  <span className="text-xs text-muted-foreground">Report road issue</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white dark:bg-card rounded border border-border">
                  <code className="text-xs bg-muted px-2 py-1 rounded">STATUS [ISSUE_ID]</code>
                  <span className="text-xs text-muted-foreground">Check status</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white dark:bg-card rounded border border-border">
                  <code className="text-xs bg-muted px-2 py-1 rounded">HELP</code>
                  <span className="text-xs text-muted-foreground">Get help menu</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-3 rounded-lg border border-purple-500/20">
              <p className="text-sm font-medium mb-1">Auto-Response Features</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Instant acknowledgment with issue ID</li>
                <li>• Location validation via GPS coordinates</li>
                <li>• Automatic department routing</li>
                <li>• Status update notifications</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border bg-green-500/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-green-600">2,847</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold text-blue-600">2.3h</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
                <p className="text-2xl font-bold text-primary">94%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
