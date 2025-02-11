import { useState } from 'react'

import './App.css'
import { Button } from './components/ui/button'
import { Bookmark } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {

  return (
    <>
    <h1 className='text-5xl font-serif bg-gray-300 w-full rounded-xl py-4 '>BreakItDown</h1>
    <div className='h-screen flex justify-center items-center font-serif'>
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Contentttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt</p>
      </CardContent>
      <CardFooter >
        <div className='flex justify-between w-1/2 mx-auto mt-4'>
        <Button variant='outline'>Previous</Button>
        <Button variant="outline" size="icon"><Bookmark/></Button>
        <Button>Next</Button>
        </div>
      </CardFooter>
  </Card>
  </div>
  </>
  )
}

export default App
