import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  SegmentedControl
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { i18n, t } = useTranslation();

  const changeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nLang', newLang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('i18nLang');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  return (
    <Box className={classes.navbar}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <a>MantineLogo</a>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              {t('navbar.transliterator')}
            </Link>
            <Link to="/tokeniser" className={classes.link}>
              {t('navbar.tokeniser')}
            </Link>
            <Link to="/characters" className={classes.link}>
              {t('navbar.characters')}
            </Link>
            <Link to="/about" className={classes.link}>
              {t('navbar.about')}
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <SegmentedControl
              radius="xl"
              size="md"
              data={[
                { value: 'en', label: 'EN' },
                { value: 'tw', label: '台語' },
                { value: 'zh', label: '國語' }
              ]}
              value={i18n.language}
              classNames={classes}
              onChange={changeLanguage}
            />
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            {t('navbar.home')}
          </a>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <SegmentedControl
              radius="xl"
              size="md"
              data={['EN', '台語', '國語']}
              defaultValue='EN'
              classNames={classes}
            />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}