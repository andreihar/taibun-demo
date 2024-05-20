import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './libs/i18n';
import Transliterator from "./pages/Transliterator/Transliterator";
import About from "./pages/About/About";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Transliterator />} />
        </Routes>
        <Footer />
      </I18nextProvider>
    </MantineProvider>
  );
}
