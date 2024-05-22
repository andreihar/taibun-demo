import cx from 'clsx';
import { Text, Group, Box, Divider, Burger, Drawer, ScrollArea, rem, SegmentedControl, Image, ActionIcon, Flex, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from './Navbar.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColourScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
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
    <Box className={classes.navbar} pos="sticky" top={0}>
      <Box className={classes.header} style={{ height: rem(60) }} px="lg">
        <Group justify="space-between" h="100%">
          <Link to="/" style={{ textDecorationLine: 'none', color: 'inherit' }}>
            <Group>
              <Image h={50} src={logo} />
              <Text size="xl" fw={700}>Taibun</Text>
            </Group>
          </Link>
          <Group h="100%" gap={0} visibleFrom="md">
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
          <Group visibleFrom="md">
            <ActionIcon variant='default' size='xl' radius="md" aria-label='Toggle colour scheme'
              onClick={() => setColorScheme(computedColourScheme === 'light' ? 'dark' : 'light')}
            >
              <IconSun style={{ width: rem(22), height: rem(22) }} className={cx(classes.icon, classes.light)} stroke={1.5} />
              <IconMoon style={{ width: rem(22), height: rem(22) }} className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>

            <SegmentedControl radius="xl" size="md" value={i18n.language} classNames={classes} onChange={changeLanguage}
              data={[
                { value: 'en', label: 'EN' },
                { value: 'tw', label: '台語' },
                { value: 'zh', label: '國語' }
              ]}
            />
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
        </Group>
      </Box>

      <Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" padding="md" title="Taibun" hiddenFrom="md" zIndex={1000000}>
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link to="/" className={classes.link} onClick={closeDrawer}>
            {t('navbar.transliterator')}
          </Link>
          <Link to="/tokeniser" className={classes.link} onClick={closeDrawer}>
            {t('navbar.tokeniser')}
          </Link>
          <Link to="/characters" className={classes.link} onClick={closeDrawer}>
            {t('navbar.characters')}
          </Link>
          <Link to="/about" className={classes.link} onClick={closeDrawer}>
            {t('navbar.about')}
          </Link>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <SegmentedControl radius="xl" size="md" value={i18n.language} classNames={classes} onChange={(newLang) => { changeLanguage(newLang); closeDrawer(); }}
              data={[
                { value: 'en', label: 'EN' },
                { value: 'tw', label: '台語' },
                { value: 'zh', label: '國語' }
              ]}
            />
          </Group>
          <Flex justify="center" align="center">
            <ActionIcon variant='default' size='xl' radius="md" aria-label='Toggle colour scheme'
              onClick={() => setColorScheme(computedColourScheme === 'light' ? 'dark' : 'light')}
            >
              <IconSun style={{ width: rem(22), height: rem(22) }} className={cx(classes.icon, classes.light)} stroke={1.5} />
              <IconMoon style={{ width: rem(22), height: rem(22) }} className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
          </Flex>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}