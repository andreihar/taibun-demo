import { Group, ActionIcon, rem, Flex, Box } from '@mantine/core';
import { IconBrandYoutube, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [_, setRerender] = useState(0);
  useEffect(() => {
    setRerender(1);
  }, [i18n.language]);

  return (
    <Box p={0} style={{ borderTop: `1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))`, backgroundColor: `light-dark(white, #333)` }}>
      <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between" align="center" p="md">
        <Group mt={{ sm: '0', base: 'sm' }} mb={{ sm: '0', base: 'sm' }}>© 2024 Andrei Harbachov. {t('copyright')}</Group>
        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon component="a" href="https://www.github.com/andreihar" target="_blank" size="lg" variant="default" radius="xl" aria-label="Github">
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon component="a" href="https://www.linkedin.com/in/andreihar" target="_blank" size="lg" variant="default" radius="xl" aria-label="LinkedIn">
            <IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon component="a" href="https://www.youtube.com/@aharba" target="_blank" size="lg" variant="default" radius="xl" aria-label="YouTube">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Flex>
    </Box >
  );
}