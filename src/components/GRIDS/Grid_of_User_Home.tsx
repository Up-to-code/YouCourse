 import React from 'react'
import PlusCard from '../common/PlusCard'
import CourseCard from '../common/Course_Card'
 
 function Grid_of_User_Home() {
   return (
     <div className='flex flex-wrap   gap-4 '>
       <PlusCard />
       <CourseCard />
     </div>
   )
 }
 
 export default Grid_of_User_Home