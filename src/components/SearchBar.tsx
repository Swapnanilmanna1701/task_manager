import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery } from '@/store/taskSlice';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.tasks.searchQuery);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="pl-9"
      />
    </div>
  );
};

export default SearchBar;
