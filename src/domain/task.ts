
export type ChecklistItem={ id:string; text:string; done:boolean };
export type Task={ id:string; title:string; status:'todo'|'doing'|'done'; checklist:ChecklistItem[] };
