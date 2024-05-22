import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './libs/i18n';
import Transliterator from "./pages/Transliterator/Transliterator";
import Tokeniser from "./pages/Tokeniser/Tokeniser";
import Converter from "./pages/Converter/Converter";
import About from "./pages/About/About";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const theme = {
  colors: {
    'blue': ['#FFEAEF', '#FBD4DA', '#F4A6B1', '#EE7587', '#E94D62', '#E7344C', '#E7273F', '#CC1A32', '#B7122B', '#A10323'] as const,
    'cyan': ['#FFF4E6', '#FFE8CC', '#FFD8A8', '#FFC078', '#FFA94D', '#FF922B', '#FD7E14', '#F76707', '#E8590C', '#D9480F'] as const,
  },
};

export default function App() {
  return (
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
  );
}
