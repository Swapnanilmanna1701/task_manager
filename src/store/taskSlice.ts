import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, FilterType } from '@/types/task';
import { mockApi } from '@/services/mockApi';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: FilterType;
  searchQuery: string;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all',
  searchQuery: '',
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await mockApi.getTasks();
});

export const addTask = createAsyncThunk('tasks/addTask', async (title: string) => {
  return await mockApi.addTask(title);
});

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
    return await mockApi.updateTask(id, updates);
  }
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  await mockApi.deleteTask(id);
  return id;
});

export const toggleTaskStatus = createAsyncThunk('tasks/toggleStatus', async (id: string) => {
  return await mockApi.toggleTaskStatus(id);
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      // Add task
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      })
      // Toggle status
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export const { setFilter, setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;
