import { Anchor, Group, ActionIcon, rem } from '@mantine/core';
import { IconBrandYoutube, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Footer.module.css';

export default function Footer() {

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <a href="">MantineLogo</a>

        <Group className={classes.links}>© 2024 Andrei Harbachov. All rights reserved.</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <a href="https://www.github.com/andreihar">
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </a>
          <a href="https://www.linkedin.com/in/andreihar">
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </a>
          <a href="https://www.youtube.com/@aharba">
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </a>
        </Group>
      </div>
    </div>
  );
}