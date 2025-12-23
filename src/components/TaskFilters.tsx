import { FilterType } from '@/types/task';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilter } from '@/store/taskSlice';
import { cn } from '@/lib/utils';

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
];

const TaskFilters = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector((state) => state.tasks.filter);

  return (
    <div className="flex gap-2">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => dispatch(setFilter(value))}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-all',
            currentFilter === value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-secondary text-secondary-foreground hover:bg-accent'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
