import { useAppTheme } from "@/entrypoints/popup/hooks/useAppTheme.ts";
import { ThemeProvider } from '@/entrypoints/popup/providers';
import { Main } from '@/entrypoints/popup/components/Main';

function App() {
    const [theme, toggle] = useAppTheme()

    return (
        <ThemeProvider toggle={toggle} theme={theme}>
          <Main />
        </ThemeProvider>
    );
}

export default App;
