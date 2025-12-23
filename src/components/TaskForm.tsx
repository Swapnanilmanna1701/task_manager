import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/store/hooks';
import { addTask } from '@/store/taskSlice';
import { toast } from '@/hooks/use-toast';

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: 'Error',
        description: 'Task title is required',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(addTask(title.trim())).unwrap();
      setTitle('');
      toast({
        title: 'Success',
        description: 'Task added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add task',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isSubmitting}>
        <Plus className="mr-2 h-4 w-4" />
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
