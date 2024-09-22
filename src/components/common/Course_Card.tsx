import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import Image from "next/image"

export default function CourseCard() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <Image 
        src="https://i.ytimg.com/vi/drQK8ciCAjY/maxresdefault.jpg" 
        alt="Course thumbnail" 
        className="w-full h-40 object-cover"
        width={400}
        height={200}
      />
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">Introduction to React</h2>
        <p className="text-sm text-muted-foreground mb-4">Learn the basics of React and start building web applications</p>
        <Badge variant="secondary" className="flex items-center w-fit gap-1">
          <Clock className="h-3 w-3" />
          <span>8 weeks</span>
        </Badge>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-muted">
        <Button className="w-full">Start Learning</Button>
      </CardFooter>
    </Card>
  )
}