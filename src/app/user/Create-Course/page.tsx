import Container from '@/components/common/Container'
import YouTubePlaylistForm from '@/components/common/FormCreateCorse'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[90vh] py-10'>
        <Container>
            <YouTubePlaylistForm />
        </Container>
    </div>
  )
}

export default page