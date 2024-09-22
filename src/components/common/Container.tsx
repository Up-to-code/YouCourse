import { ReactNode } from "react"

interface Props {
  children:  ReactNode
 ClassName?: string
}
  
function Container({ children , ClassName }: Props) {
  return (
    <div className={"container m-auto p-4 max-w-screen-xl dark:bg-background "+ClassName}>
      {children}
    </div>
  )
}

export default Container