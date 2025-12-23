import { Task } from '@/types/task';

// Simulated delay for API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initial mock tasks
const initialTasks: Task[] = [
  { id: '1', title: 'Review project requirements', status: 'completed', createdAt: new Date().toISOString() },
  { id: '2', title: 'Set up development environment', status: 'completed', createdAt: new Date().toISOString() },
  { id: '3', title: 'Implement user authentication', status: 'pending', createdAt: new Date().toISOString() },
  { id: '4', title: 'Design dashboard layout', status: 'pending', createdAt: new Date().toISOString() },
  { id: '5', title: 'Write unit tests', status: 'pending', createdAt: new Date().toISOString() },
];

// In-memory storage
let tasks: Task[] = [...initialTasks];

export const mockApi = {
  getTasks: async (): Promise<Task[]> => {
    await delay(300);
    // Return cloned objects to avoid accidental mutations outside the mock API
    return tasks.map((t) => ({ ...t }));
  },

  addTask: async (title: string): Promise<Task> => {
    await delay(200);
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return newTask;
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    await delay(200);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    tasks[index] = { ...tasks[index], ...updates };
    return tasks[index];
  },

  deleteTask: async (id: string): Promise<void> => {
    await delay(200);
    tasks = tasks.filter(t => t.id !== id);
  },

  toggleTaskStatus: async (id: string): Promise<Task> => {
    await delay(200);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');

    const updated: Task = {
      ...tasks[index],
      status: tasks[index].status === 'pending' ? 'completed' : 'pending',
    };
    tasks[index] = updated;
    return updated;
  },
};
