
import { Task } from '../domain/task';

export function createTask(title:string):Task{
 return {id:crypto.randomUUID(),title,status:'todo',checklist:[]}
}
