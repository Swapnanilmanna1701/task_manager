import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTasks } from '@/store/taskSlice';
import TaskItem from './TaskItem';
import { Loader2, ClipboardList } from 'lucide-react';

const TaskList = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error, filter, searchQuery } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.status === 'completed') ||
      (filter === 'pending' && task.status === 'pending');

    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
        {error}
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <ClipboardList className="mb-4 h-12 w-12" />
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm">
          {searchQuery
            ? 'Try adjusting your search or filter'
            : filter !== 'all'
            ? `No ${filter} tasks yet`
            : 'Add a task to get started'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
