import { Moon, Sun } from 'lucide-react';
import { Button } from './index';
import { useTheme } from '../theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Cycle through themes in order: light -> dark -> system -> light
  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  // Derive effective dark state by inspecting the document root class (this respects system)
  const root = typeof window !== 'undefined' ? document.documentElement : null;
  const isDark = root ? root.classList.contains('dark') : theme === 'dark';

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 p-0"
    >
      <Sun className={`h-4 w-4 transition-all ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
      <Moon className={`absolute h-4 w-4 transition-all ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
