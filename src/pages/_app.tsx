import { ThemeProvider } from '../contexts/ThemeModeContext' //themes
import '../styles/global.css' //importar css
function MyApp({ Component, pageProps }) {
  
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
    )
}

export default MyApp
