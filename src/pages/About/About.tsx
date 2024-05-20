import { Container, Text, Button, Group } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import classes from './About.module.css';
import { Trans, useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function About() {
  const { t, i18n } = useTranslation();
  const [rerender, setRerender] = useState(0);

  useEffect(() => {
    setRerender(1);
  }, [i18n.language]);

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <Trans
            i18nKey="transliterator.title"
            components={[<Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit />]}
          />
        </h1>

        <Text className={classes.description} color="dimmed">
          Asdasdasdas
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Get started
          </Button>

          <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}