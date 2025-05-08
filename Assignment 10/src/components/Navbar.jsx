import React from 'react'
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { SquarePlus } from 'lucide-react'
import { Addnote } from './Addnote'

const Navbar = () => {
    return (
        <>
            <nav className='bg-gray-900 flex w-full h-[70px] justify-between items-center px-24'>
                <div className='font-semibold text-3xl text-gray-200'>ToDo App</div>
                <div>
                    <Dialog>
                        <Button variant={"outline"}><SquarePlus /><DialogTrigger>Add New Task</DialogTrigger></Button>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Note Details</DialogTitle>
                                <DialogDescription>
                                    <Addnote />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog></div>
            </nav>
        </>
    )
}

export default Navbar