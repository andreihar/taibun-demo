import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from "react-helmet-async";
import i18n from './libs/i18n';
import Transliterator from "./pages/Transliterator";
import Tokeniser from "./pages/Tokeniser";
import Converter from "./pages/Converter";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const theme = {
  primaryColor: 'red',
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Noto Sans TC, Noto Sans SC, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  colors: {
    'red': ['#FFEAEF', '#FBD4DA', '#F4A6B1', '#EE7587', '#E94D62', '#E7344C', '#E7273F', '#CC1A32', '#B7122B', '#A10323'] as const,
  },
};

export default function App() {
  return (
    <HelmetProvider>
      <MantineProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <Navbar />
          <Routes>
            <Route path="/tokeniser" element={<Tokeniser />} />
            <Route path="/characters" element={<Converter />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Transliterator />} />
          </Routes>
          <Footer />
        </I18nextProvider>
      </MantineProvider>
    </HelmetProvider>
  );
}
