import { useAppSelector } from '@/store/hooks';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';

const TaskStats = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;

  const stats = [
    { label: 'Total', value: total, icon: ListTodo, color: 'text-foreground' },
    { label: 'Completed', value: completed, icon: CheckCircle2, color: 'text-primary' },
    { label: 'Pending', value: pending, icon: Circle, color: 'text-muted-foreground' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="flex flex-col items-center rounded-lg border border-border bg-card p-4"
        >
          <Icon className={`mb-2 h-6 w-6 ${color}`} />
          <span className="text-2xl font-bold text-card-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
