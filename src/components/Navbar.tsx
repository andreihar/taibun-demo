import cx from 'clsx';
import { Text, Group, Box, Divider, Burger, Drawer, ScrollArea, rem, SegmentedControl, Image, ActionIcon, Flex, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from '../styles/common.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColourScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const { i18n, t } = useTranslation();

  const routes = [
    { path: '/', label: 'navbar.transliterator' },
    { path: '/tokeniser', label: 'navbar.tokeniser' },
    { path: '/characters', label: 'navbar.characters' },
    { path: '/about', label: 'navbar.about' },
  ];

  const languageOptions = [
    { value: 'en', label: 'EN' },
    { value: 'tw', label: '台語' },
    { value: 'zh', label: '國語' }
  ];

  const ColourSchemeToggle = () => (
    <ActionIcon variant='default' size='xl' radius="md" aria-label='Toggle colour scheme'
      onClick={() => setColorScheme(computedColourScheme === 'light' ? 'dark' : 'light')}
    >
      <IconSun style={{ width: rem(22), height: rem(22) }} className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon style={{ width: rem(22), height: rem(22) }} className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );

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
    <header className={classes.navbar} style={{ position: 'sticky', top: 0, backgroundColor: `light-dark(white, #333)` }}>
      <Box className={classes.header} style={{ height: rem(60), borderBottom: `rem(1px) solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))`, boxShadow: `var(--mantine-shadow-md)` }} px="lg">
        <Group justify="space-between" h="100%">
          <Link to="/" style={{ textDecorationLine: 'none', color: 'inherit' }} aria-label="Home">
            <Group>
              <Image h={50} src={logo} alt="Taibun logo" />
              <Text size="xl" fw={700}>Taibun</Text>
            </Group>
          </Link>
          <Group h="100%" gap={0} visibleFrom="md">
            {routes.map((route) => (
              <Link to={route.path} className={classes.link} key={route.path} aria-label={t(route.label)}>
                {t(route.label)}
              </Link>
            ))}
          </Group>
          <Group visibleFrom="md">
            <ColourSchemeToggle aria-label="Toggle color scheme" />
            <SegmentedControl radius="xl" size="md" value={i18n.language} classNames={classes} onChange={changeLanguage} data={languageOptions} aria-label="Language switcher" />
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" aria-label="Toggle navigation menu" />
        </Group>
      </Box>

      <Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" padding="md" title="" hiddenFrom="md" zIndex={1000000}>
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {routes.map((route) => (
            <Link to={route.path} className={classes.link} onClick={closeDrawer} key={route.path} aria-label={t(route.label)}>
              {t(route.label)}
            </Link>
          ))}
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <SegmentedControl radius="xl" size="md" value={i18n.language} classNames={classes} onChange={(newLang) => { changeLanguage(newLang); closeDrawer(); }} data={languageOptions} aria-label="Language switcher" />
          </Group>
          <Flex justify="center" align="center">
            <ColourSchemeToggle aria-label="Toggle color scheme" />
          </Flex>
        </ScrollArea>
      </Drawer>
    </header>
  );
}