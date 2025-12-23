import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/themeSlice';

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch(toggleTheme())}
      className="rounded-full"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-foreground transition-all" />
      ) : (
        <Moon className="h-5 w-5 text-foreground transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
