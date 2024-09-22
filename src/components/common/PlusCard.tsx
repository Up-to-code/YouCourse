import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function PlusCard() {
  return (
    <Link href="/user/Create-Course">
    <Button 
      variant="outline" 
      size="icon" 
      className="w-[300px] h-[364px]   bg-white/10 hover:bg-white/20 transition-colors ease-in-out duration-200 shadow-md"
    >
      <Plus className="h-6 w-6 dark:text-white" />
     </Button></Link>
  )
}