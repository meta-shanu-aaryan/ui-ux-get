import React, { useContext, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import taskContext from '@/context/taskContext'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button';
import { Check, CheckCheck, Eye, PenSquare, Trash } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';



const Body = () => {
    const context = useContext(taskContext);
    const { tasks, editTask, deleteTask, progressTask, completedTask } = context; // Get tasks directly from context

    const [editTaskModal, setEditTaskModal] = useState(false);
    const [deleteTaskModal, setDeleteTaskModal] = useState(false);

    const [taskEditData, setTaskEditData] = useState({
        title: "",
        description: "",
        priority: "",
        status: ""
    })


    const editTaskAction = (index) => {
        editTask(index, taskEditData.title, taskEditData.description, taskEditData.priority, taskEditData.status)
        setTaskEditData({ ...taskEditData, title: "", description: "", priority: "", status: "" })
    }

    return (
        <div className='h-[91vh] bg-[#c2c2d9] p-12 flex gap-12'>
            <div className='w-1/3 bg-[#fcf5ff] rounded-sm overflow-auto transition-all'>
                <div className='px-4 text-center bg-red-400'>
                    <p className='text-3xl text-gray-800 pt-4 pb-7 mb-4 text-between font-semibold'>New Tasks</p>
                </div>
                {(
                    tasks.filter(task => task.status === "new").length === 0 ? (<div className='text-center text-xl font-semibold text-gray-600'>Nothing available</div>) : tasks.filter(task => task.status === "new").sort((task1, task2) => {
                        if (task1.priority == "high" && task2.priority == "medium") {
                            return -1;
                        } else if (task1.priority == "high" && task2.priority == "low") {
                            return -1;
                        } else if (task1.priority == "medium" && task2.priority == "high") {
                            return 1;
                        } else if (task1.priority == "medium" && task2.priority == "low") {
                            return -1;
                        } else if (task1.priority == "low" && task2.priority == "high") {
                            return 1;
                        } else if (task1.priority == "low" && task2.priority == "medium") {
                            return 1;
                        } else {
                            return 0;
                        }
                    }).map((task, index) => (
                        <div key={index} className={`px-5 my-3 transition-all`}>
                            <div className={`rounded-2xl overflow-hidden my-3 ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}`}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            <div className='flex justify-between px-3 mt-2'>
                                                <p className='text-black text-xl'>{task.title}</p>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button><Eye /></Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <div className='flex justify-between mt-5 items-center gap-6'>
                                                                <DialogTitle>Task Details</DialogTitle>
                                                                <div className='flex gap-3'>
                                                                    <Button variant={"outline"} onClick={() => { progressTask(task.id) }}><Check /></Button>
                                                                    <Dialog>
                                                                        <DialogTrigger asChild>
                                                                            <Button variant="outline"><PenSquare /></Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent className="sm:max-w-[425px]">
                                                                            <DialogHeader>
                                                                                <DialogTitle>Edit Task</DialogTitle>
                                                                                <DialogDescription>
                                                                                    Make changes to your Task here. Click save when you're done.
                                                                                </DialogDescription>
                                                                            </DialogHeader>
                                                                            <div className="grid gap-4 py-4">
                                                                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                                                                    <Label htmlFor="email">Title</Label>
                                                                                    <Input type="title" id="email" placeholder={task.title} value={taskEditData.title} onChange={(e) => { setTaskEditData({ ...taskEditData, title: e.target.value }) }} />
                                                                                </div>
                                                                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                                                                    <Label htmlFor="email">Description</Label>
                                                                                    <Input type="title" id="email" placeholder={task.description} value={taskEditData.description} onChange={(e) => { setTaskEditData({ ...taskEditData, description: e.target.value }) }} />
                                                                                </div>
                                                                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                                                                    <Label htmlFor="email">Priority</Label>
                                                                                    <Select value={taskEditData.priority} onValueChange={(value) => { setTaskEditData({ ...taskEditData, priority: value }) }}>
                                                                                        <SelectTrigger className="w-[180px]">
                                                                                            <SelectValue placeholder={task.priority} />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                            <SelectGroup>
                                                                                                <SelectLabel>Priority</SelectLabel>
                                                                                                <SelectItem value="high">High</SelectItem>
                                                                                                <SelectItem value="medium">Medium</SelectItem>
                                                                                                <SelectItem value="low">Low</SelectItem>
                                                                                            </SelectGroup>
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                </div>
                                                                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                                                                    <Label htmlFor="email">Status</Label>
                                                                                    <Select value={taskEditData.status} onValueChange={(value) => { setTaskEditData({ ...taskEditData, status: value }) }}>
                                                                                        <SelectTrigger className="w-[180px]">
                                                                                            <SelectValue placeholder={task.status} />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                            <SelectGroup>
                                                                                                <SelectLabel>Status</SelectLabel>
                                                                                                <SelectItem value="new">New</SelectItem>
                                                                                                <SelectItem value="in progress">In Progress</SelectItem>
                                                                                                <SelectItem value="completed">Completed</SelectItem>
                                                                                            </SelectGroup>
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                </div>
                                                                            </div>
                                                                            <DialogFooter>
                                                                                <Button onClick={() => { editTaskAction(task.id) }}>Save changes</Button>
                                                                            </DialogFooter>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                    <Dialog>
                                                                        <DialogTrigger asChild>
                                                                            <Button variant="destructive"><Trash /></Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent className="sm:max-w-[425px]">
                                                                            <DialogHeader>
                                                                                <DialogTitle>Edit Task</DialogTitle>
                                                                                <DialogDescription>
                                                                                    Make changes to your profile here. Click save when you're done.
                                                                                </DialogDescription>
                                                                            </DialogHeader>
                                                                            <div className="grid gap-4 py-4">

                                                                            </div>
                                                                            <DialogFooter>
                                                                                <Button onClick={() => { deleteTask(task.id) }} variant={"destructive"}>Delete</Button>
                                                                            </DialogFooter>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </div>
                                                            </div>

                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4 rounded">
                                                            <p className='text-xl'>Title : {task.title}</p>
                                                            <p>Description : {task.description}</p>
                                                            <Badge>Priority : {task.priority}</Badge>
                                                            <Badge>Creation Date : {task.creationDate}</Badge>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                            </div>
                                        </CardTitle>
                                        {/* <CardDescription>{task.description}</CardDescription> */}
                                    </CardHeader>
                                    <CardContent>
                                        <div className='py-5 text-black'>
                                            <p className=''>{task.description.length < 50 ? task.description : task.description.slice(0, 50) + "..."}</p>
                                            <div className=''>Priority : {task.priority}</div>
                                            <div className=''>Creation Date : {task.creationDate}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className='w-1/3 bg-[#fcf5ff] rounded-sm overflow-auto'>
                <div className='px-4 text-center bg-blue-400'>
                    <p className='text-3xl text-gray-800 pt-4 pb-7 mb-4 text-between font-semibold'>In Progress</p>
                </div>
                {(
                    tasks.filter(task => task.status === "in progress").length === 0 ? (<div className='text-center text-xl font-semibold text-gray-600'>Nothing available</div>) : tasks.filter(task => task.status === "in progress").sort((task1, task2) => {
                        if (task1.priority == "high" && task2.priority == "medium") {
                            return -1;
                        } else if (task1.priority == "high" && task2.priority == "low") {
                            return -1;
                        } else if (task1.priority == "medium" && task2.priority == "high") {
                            return 1;
                        } else if (task1.priority == "medium" && task2.priority == "low") {
                            return -1;
                        } else if (task1.priority == "low" && task2.priority == "high") {
                            return 1;
                        } else if (task1.priority == "low" && task2.priority == "medium") {
                            return 1;
                        } else {
                            return 0;
                        }
                    }).map((task, index) => (
                        <div key={index} className={`px-5 my-3`}>
                            <div className={`rounded-lg my-3 ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}`}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            <div className='flex justify-between px-3 mt-2'>
                                                <p className='text-black text-xl'>{task.title}</p>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button><Eye /></Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <div className='flex items-center gap-6 justify-between mt-5'>
                                                                <DialogTitle>Task Details</DialogTitle>
                                                                <div className='flex'>
                                                                    <Button variant={"outline"} onClick={() => { completedTask(task.id) }}><CheckCheck /></Button>
                                                                    <Dialog>
                                                                        <DialogTrigger asChild>
                                                                            <Button variant="outline"><PenSquare /></Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent className="sm:max-w-[425px]">
                                                                            <DialogHeader>
                                                                                <DialogTitle>Edit Task</DialogTitle>
                                                                                <DialogDescription>
                                                                                    Make changes to your Task here. Click save when you're done.
                                                                                </DialogDescription>
                                                                            </DialogHeader>
                                                                            <div className="grid gap-4 py-4">
                                                                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                                                                    <Label htmlFor="email">Title</Label>
                                                                                    <Input type="title" id="email" placeholder={task.title} value={taskEditData.title} onChange={(e) => { setTaskEditData({ ...taskEditData, title: e.target.value }) }} />
                                                                                </div>
                                                                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                                                                    <Label htmlFor="email">Description</Label>
                                                                                    <Input type="title" id="email" placeholder={task.description} value={taskEditData.description} onChange={(e) => { setTaskEditData({ ...taskEditData, description: e.target.value }) }} />
                                                                                </div>
                                                                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                                                                    <Label htmlFor="email">Priority</Label>
                                                                                    <Select value={taskEditData.priority} onValueChange={(value) => { setTaskEditData({ ...taskEditData, priority: value }) }}>
                                                                                        <SelectTrigger className="w-[180px]">
                                                                                            <SelectValue placeholder={task.priority} />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                            <SelectGroup>
                                                                                                <SelectLabel>Priority</SelectLabel>
                                                                                                <SelectItem value="high">High</SelectItem>
                                                                                                <SelectItem value="medium">Medium</SelectItem>
                                                                                                <SelectItem value="low">Low</SelectItem>
                                                                                            </SelectGroup>
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                </div>
                                                                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                                                                    <Label htmlFor="email">Status</Label>
                                                                                    <Select value={taskEditData.status} onValueChange={(value) => { setTaskEditData({ ...taskEditData, status: value }) }}>
                                                                                        <SelectTrigger className="w-[180px]">
                                                                                            <SelectValue placeholder={task.status} />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                            <SelectGroup>
                                                                                                <SelectLabel>Status</SelectLabel>
                                                                                                <SelectItem value="completed">Completed</SelectItem>
                                                                                            </SelectGroup>
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                </div>
                                                                            </div>
                                                                            <DialogFooter>
                                                                                <Button onClick={() => { editTaskAction(task.id) }}>Save changes</Button>
                                                                            </DialogFooter>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                    <Dialog>
                                                                        <DialogTrigger asChild>
                                                                            <Button variant="destructive"><Trash /></Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent className="sm:max-w-[425px]">
                                                                            <DialogHeader>
                                                                                <DialogTitle>Delete Task</DialogTitle>
                                                                                <DialogDescription>
                                                                                    Are You sure you want to delete this task? It can't be recovered.
                                                                                </DialogDescription>
                                                                            </DialogHeader>
                                                                            <div className="grid gap-4 py-4">

                                                                            </div>
                                                                            <DialogFooter>
                                                                                <Button onClick={() => { deleteTask(task.id) }} variant={"destructive"}>Delete</Button>
                                                                            </DialogFooter>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </div>
                                                            </div>

                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <p className='text-xl'>Title : {task.title}</p>
                                                            <p>Description : {task.description}</p>
                                                            <Badge>Priority : {task.priority}</Badge>
                                                            <Badge>Creation Date : {task.creationDate}</Badge>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                            </div>
                                        </CardTitle>
                                        {/* <CardDescription>{task.description}</CardDescription> */}
                                    </CardHeader>
                                    <CardContent>
                                        <div className='py-5 text-black'>
                                            <p className=''>{task.description.length < 50 ? task.description : task.description.slice(0, 50) + "..."}</p>
                                            <div className=''>Priority : {task.priority}</div>
                                            <div className=''>Creation Date : {task.creationDate}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className='w-1/3 bg-[#fcf5ff] rounded-sm overflow-auto'>
                <div className='px-4 text-center bg-green-400'>
                    <p className='text-3xl text-gray-800 pt-4 pb-7 mb-4 font-semibold text-between'>Completed</p>
                </div>
                {(
                    tasks.filter(task => task.status === "completed").length === 0 ? (<div className='text-center text-xl font-semibold text-gray-600'>Nothing available</div>) : tasks.filter(task => task.status === "completed").sort((task1, task2) => {
                        if (task1.priority == "high" && task2.priority == "medium") {
                            return -1;
                        } else if (task1.priority == "high" && task2.priority == "low") {
                            return -1;
                        } else if (task1.priority == "medium" && task2.priority == "high") {
                            return 1;
                        } else if (task1.priority == "medium" && task2.priority == "low") {
                            return -1;
                        } else if (task1.priority == "low" && task2.priority == "high") {
                            return 1;
                        } else if (task1.priority == "low" && task2.priority == "medium") {
                            return 1;
                        } else {
                            return 0;
                        }
                    }).map((task, index) => (
                        <div key={index} className={`px-5 my-3`}>
                            <div className={`rounded-lg my-3 ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}`}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            <div className='flex justify-between px-3 mt-2'>
                                                <p className='text-black text-xl'>{task.title}</p>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button><Eye /></Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <div className='flex justify-between mt-5 items-center gap-6'>
                                                                <DialogTitle>Task Details</DialogTitle>
                                                                <div className='flex gap-3'>
                                                                    <Dialog>
                                                                        <DialogTrigger asChild>
                                                                            <Button variant="destructive"><Trash /></Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent className="sm:max-w-[425px]">
                                                                            <DialogHeader>
                                                                                <DialogTitle>Delete Task</DialogTitle>
                                                                                <DialogDescription>
                                                                                    Are You sure you want to delete this task? It can't be recovered.
                                                                                </DialogDescription>
                                                                            </DialogHeader>
                                                                            <div className="grid gap-4 py-4">

                                                                            </div>
                                                                            <DialogFooter>
                                                                                <Button onClick={() => { deleteTask(task.id) }} variant={"destructive"}>Delete</Button>
                                                                            </DialogFooter>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </div>
                                                            </div>

                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <p className='text-xl'>Title : {task.title}</p>
                                                            <p>Description : {task.description}</p>
                                                            <Badge>Priority : {task.priority}</Badge>
                                                            <Badge>Creation Date : {task.creationDate}</Badge>
                                                            <Badge>Completion Date : {task.completionDate}</Badge>
                                                            <Badge>status : {task.status}</Badge>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                            </div>
                                        </CardTitle>
                                        {/* <CardDescription>{task.description}</CardDescription> */}
                                    </CardHeader>
                                    <CardContent>
                                        <div className='py-5 text-black'>
                                            <p className=''>{task.description.length < 50 ? task.description : task.description.slice(0, 50) + "..."}</p>
                                            <div className=''>Priority : {task.priority}</div>
                                            <div className=''>Creation Date : {task.creationDate}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default Body