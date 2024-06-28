"use client"
import * as React from 'react';

export function ThemeProvider({ children, ...props }) {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    import('next-themes').then((module) => {
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    // Render a placeholder or loading indicator if needed
    return null;
  }

  const { ThemeProvider: NextThemesProvider } = require('next-themes');

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
