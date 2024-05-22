import { Container, Text, Title, Button, Group, Box, Image, Avatar, ActionIcon, ThemeIcon, SimpleGrid, Flex, rem } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import classes from './About.module.css';
import commonClasses from '../../styles/common.module.css';
import { Trans, useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import image from '../../assets/mail.svg';
import background from '../../assets/background.jpg';
import { IconAt, IconBrandLinkedin, IconBrandGithub, IconLanguageKatakana, IconBrandDouban, IconDevices2, IconReceiptOff } from '@tabler/icons-react';

export default function About() {
  const { t, i18n } = useTranslation();
  const [_, setRerender] = useState(0);
  useEffect(() => {
    setRerender(1);
  }, [i18n.language]);

  const MOCKDATA = [
    { icon: IconLanguageKatakana, title: t('about.feat1.title'), description: t('about.feat1.description') },
    { icon: IconBrandDouban, title: t('about.feat2.title'), description: t('about.feat2.description') },
    { icon: IconDevices2, title: t('about.feat3.title'), description: t('about.feat3.description') },
    { icon: IconReceiptOff, title: t('about.feat4.title'), description: t('about.feat4.description') }
  ];
  const features = MOCKDATA.map((feature) => (
    <Box key={feature.title}>
      <ThemeIcon size={44} radius="md" variant="gradient" gradient={{ deg: 133, from: 'blue', to: 'cyan' }}>
        <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>{feature.title}</Text>
      <Text c="dimmed" fz="md">{feature.description}</Text>
    </Box>
  ));

  return (
    <>
      <Box bgsz="cover" bgp="center" className={commonClasses.wrapper} style={{ backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(${background})`, paddingTop: `calc(var(--mantine-spacing-xl) * 3)`, paddingBottom: `calc(var(--mantine-spacing-xl) * 3)`, minHeight: `calc(100vh - 60px)` }}>
        <Container pos='relative' size={700}>
          <Title c='white' fz={{ base: '42', sm: '62' }} lh={{ base: '1.1', sm: '1.0' }} fw={900} m={0} p={0} className={classes.title}>
            <Trans
              i18nKey="about.title"
              components={[<Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit />]}
            />
          </Title>
          <Text c='white' opacity={0.85} mt='xl' fz={{ 'base': 20, 'sm': 24 }}>{t('about.description')}</Text>
          <Group mt="xl">
            <Button component="a" href="#features" size="xl" px={{ base: '18', sm: '38' }} h={54} flex={{ base: '1', sm: 'none' }} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
              {t('about.features')}
            </Button>
            <Button component="a" href="https://github.com/andreihar/taibun" target="_blank" size="xl" variant="default" px={{ base: '18', sm: '38' }} h={54} flex={{ base: '1', sm: 'none' }} leftSection={<GithubIcon size={20} />}>
              GitHub
            </Button>
          </Group>
        </Container>
      </Box >
      <Box className={commonClasses.wrapper} style={{ minHeight: `calc(100vh - 60px)` }}>
        <Container size="lg">
          <Title id="features" mt="md" ta="center" className={classes.title}>{t('about.title2')}</Title>
          <SimpleGrid mt={60} cols={{ base: 1, sm: 2 }} spacing={{ base: 'xl', md: 50 }} verticalSpacing={{ base: 'xl', md: 50 }}>
            {features}
          </SimpleGrid>
        </Container>
      </Box>
      <Box style={{ backgroundColor: `light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))` }}>
        <Container size="lg">
          <Title id="features" pt="md" ta="center" className={classes.title}>{t('about.thanks.title')}</Title>
          <Flex align="center" gap="xl" justify="space-between" className={classes.mail}>
            <Box ta="right" style={{ flex: 1 }}>
              <Title className={classes.title}>{t('about.thanks.sam')}</Title>
              <Text c="dimmed" size="lg">{t('about.thanks.description')}</Text>
              <Box mt="xl">
                <ActionIcon component="a" href="https://www.linkedin.com/in/samuel-jen/" target="_blank" variant="light" size="xl" mx="md" radius="lg" aria-label="LinkedIn">
                  <IconBrandLinkedin stroke={1.5} />
                </ActionIcon>
                <ActionIcon component="a" href="https://github.com/SSSam/" target="_blank" variant="light" size="xl" mx="md" radius="lg" aria-label="Github">
                  <IconBrandGithub stroke={1.5} />
                </ActionIcon>
              </Box>
            </Box>
            <Box style={{ flex: 1 }}><Avatar h={200} w={200} src="https://avatars.githubusercontent.com/u/72668861?v=4" /></Box>
          </Flex>
        </Container >
      </Box>
      <Box style={{ backgroundColor: `light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))` }}>
        <Container size="lg">
          <Flex align="center" className={classes.mail}>
            <Box>
              <Text fw={500} fz="xl" mb={5}>{t('about.suggest')}</Text>
              <Title mb="md" className={classes.title}>{t('about.reach')}</Title>
              <Text fz="lg" c="dimmed">{t('about.contribute')}</Text>

              <Box mt="xl">
                <ActionIcon component="a" href="mailto:andrei.harbachov@gmail.com" target="_blank" variant="light" size="xl" mx="md" radius="lg" aria-label="Email">
                  <IconAt stroke={1.5} />
                </ActionIcon>
                <ActionIcon component="a" href="https://www.linkedin.com/in/andreihar/" target="_blank" variant="light" size="xl" mx="md" radius="lg" aria-label="LinkedIn">
                  <IconBrandLinkedin stroke={1.5} />
                </ActionIcon>
                <ActionIcon component="a" href="https://github.com/andreihar/" target="_blank" variant="light" size="xl" mx="md" radius="lg" aria-label="Github">
                  <IconBrandGithub stroke={1.5} />
                </ActionIcon>
              </Box>
            </Box>
            <Image src={image} maw={{ base: '100%', sm: '50%' }} />
          </Flex>
        </Container >
      </Box>
    </>
  );
}