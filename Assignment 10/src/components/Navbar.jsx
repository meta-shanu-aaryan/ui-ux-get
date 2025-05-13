import React, { useState } from 'react'
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
    // const { task, setTask } = useContext(taskContext);
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false)
    }
    return (
        <>
            <nav className='bg-gray-300 flex w-full h-[70px] justify-between items-center px-24 drop-shadow-sm drop-shadow-gray-600'>
                <div className='font-semibold text-3xl text-gray-800'>Task Manager</div>
                <div>
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                        <Button><SquarePlus /><DialogTrigger >Add New Task</DialogTrigger></Button>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Task Details</DialogTitle>
                                {/* <DialogDescription> */}
                                <Addnote close={closeModal} />
                                {/* </DialogDescription> */}
                            </DialogHeader>
                        </DialogContent>
                    </Dialog></div>
            </nav>
        </>
    )
}

export default Navbar