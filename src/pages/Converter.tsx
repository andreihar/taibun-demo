import { Container, Text, Button, ActionIcon, Flex, Box, Grid, rem } from '@mantine/core';
import Textarea from '../components/Textarea/Textarea';
import commonClasses from '../styles/common.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { toSimplified, toTraditional } from 'taibun';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck, IconLetterT, IconLetterS, IconX } from '@tabler/icons-react';

export default function Converter() {
  const [mode, setMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const clipboard = useClipboard();
  const { t } = useTranslation();

  const performConversion = () => {
    if (mode) {
      setOutputValue(toTraditional(inputValue));
    } else {
      setOutputValue(toSimplified(inputValue));
    }
  };

  useEffect(() => {
    performConversion();
  }, [inputValue, mode]);

  return (
    <Box className={commonClasses.wrapper}>
      <Container size={1200} my='lg' pos="relative">
        <Grid gutter="md" grow={false}>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Textarea value={inputValue} cn={mode} placeholder={t('input.enter')} onChange={event => setInputValue(event.target.value)}
              topRight={
                <ActionIcon variant="light" radius="xl" size="xl"
                  onClick={() => setInputValue('')}>
                  <IconX style={{ width: rem(20) }} />
                </ActionIcon>}
              bottomRight={<Text py="xs" pe="xs" c="dimmed">{t('input.keyWithCount', { count: inputValue.length })}</Text>}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Textarea readOnly cn={!mode} placeholder={t('converter.output')} value={outputValue}
              bottomRight={
                <ActionIcon variant="light" radius="xl" size="xl"
                  onClick={() => clipboard.copy(outputValue)}>
                  {clipboard.copied ? (<IconCheck style={{ width: rem(20) }} />
                  ) : (<IconCopy style={{ width: rem(20) }} />)}
                </ActionIcon>}
            />
          </Grid.Col>
          <Container>
            <Flex justify="center">
              <Button radius="xl" size="md"
                leftSection={
                  mode ? (
                    <IconLetterT style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                  ) : (
                    <IconLetterS style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                  )
                }
                styles={{
                  root: { paddingLeft: rem(14), height: rem(48) },
                  section: { marginRight: rem(22) },
                }}
                onClick={() => setMode(!mode)}
              >{mode ? (t('converter.traditional')) : (t('converter.simplified'))}</Button>
            </Flex>
          </Container>
        </Grid>
      </Container>
    </Box>
  );
}