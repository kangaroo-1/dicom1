"use client"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Bot } from 'lucide-react';
import { Folder } from 'lucide-react';
import { UserSearch } from 'lucide-react';

function Sidebar() {
  const router = useRouter();
  return (
    <div className = 'bg-gray-200 text-black p-2 md:p-5 relative'>
      <div className="md:hidden h-full">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30  rounded-lg" size={40}/>
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div className="flex flex-col justify-between space-y-5">
                <Button>DICOM Library</Button>
                <Button>View</Button>
                <Button>Account</Button>
                <Button>Dicom </Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
     
      <div className="hidden md:inline">
        <div className="flex flex-col justify-between space-y-5">
          <Button onClick={() =>{router.push('/library')}}>
            <Folder />
            Your Library
          </Button>
          <Button>View</Button>
          <Button onClick={() =>{router.push('/chatbox')}}>
            <Bot />
            AI Chatbox
          </Button>
          <Button onClick={() =>{router.push('/parser')}}>
            <UserSearch />
            Dicom Parser
          </Button>
        </div>
      </div>
    
    </div>
  )
}

export default Sidebar
