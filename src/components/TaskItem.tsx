import { useState } from 'react';
import { Check, Pencil, Trash2, X, RotateCcw } from 'lucide-react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch } from '@/store/hooks';
import { updateTask, deleteTask, toggleTaskStatus } from '@/store/taskSlice';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = async () => {
    if (!editTitle.trim()) {
      toast({
        title: 'Error',
        description: 'Task title cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    try {
      await dispatch(updateTask({ id: task.id, updates: { title: editTitle.trim() } })).unwrap();
      setIsEditing(false);
      toast({
        title: 'Success',
        description: 'Task updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(task.id)).unwrap();
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive',
      });
    }
  };

  const handleToggleStatus = async () => {
    try {
      await dispatch(toggleTaskStatus(task.id)).unwrap();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task status',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        'group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md',
        task.status === 'completed' && 'opacity-75'
      )}
    >
      <button
        onClick={handleToggleStatus}
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all',
          task.status === 'completed'
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-muted-foreground hover:border-primary'
        )}
      >
        {task.status === 'completed' && <Check className="h-4 w-4" />}
      </button>

      <div className="flex flex-1 items-center gap-3">
        {isEditing ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          />
        ) : (
          <span
            className={cn(
              'flex-1 text-card-foreground',
              task.status === 'completed' && 'line-through'
            )}
          >
            {task.title}
          </span>
        )}

        <Badge
          variant={task.status === 'completed' ? 'default' : 'secondary'}
          className="shrink-0"
        >
          {task.status === 'completed' ? 'Completed' : 'Pending'}
        </Badge>
      </div>

      <div className="flex shrink-0 gap-1">
        {isEditing ? (
          <>
            <Button size="icon" variant="ghost" onClick={handleSave}>
              <Check className="h-4 w-4 text-primary" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="icon"
              variant={task.status === 'completed' ? 'outline' : 'default'}
              onClick={handleToggleStatus}
              title={task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
            >
              {task.status === 'completed' ? (
                <RotateCcw className="h-4 w-4" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              <Pencil className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDelete}
              title="Delete task"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
