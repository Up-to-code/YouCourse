"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Rocket, Shield, Zap } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Focused Learning",
      description: "Streamline your YouTube learning experience by organizing playlists into structured courses. Our platform helps you stay focused, manage your notes efficiently, and minimize distractions from unrelated content.",
      icon: Lightbulb,
    },
    {
      title: "Rapid Deployment",
      description: "Quick implementation to save time and resources.",
      icon: Rocket,
    },
    {
      title: "Robust Security",
      description: "Top-tier security to safeguard your data.",
      icon: Shield,
    },
    {
      title: "High Performance",
      description: "Optimized for efficiency and speed.",
      icon: Zap,
    },
  ]

  return (
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto">
        <h2 id="features-heading" className="text-3xl font-extrabold text-primary text-center mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-primary">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl font-semibold text-primary">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
