import { Container, Text, Switch, Flex, Box, Grid, ActionIcon, rem } from '@mantine/core';
import commonClasses from '../styles/common.module.css';
import Textarea from '../components/Textarea/Textarea';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Tokeniser as Token } from 'taibun';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck, IconX } from '@tabler/icons-react';

export default function Tokeniser() {
  const [keepOriginal, setKeepOriginal] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState<string[]>([]);
  const clipboard = useClipboard();
  const { t } = useTranslation();
  const token = new Token(keepOriginal);

  useEffect(() => {
    setOutputValue(token.tokenise(inputValue));
  }, [keepOriginal, inputValue]);

  return (
    <Box className={commonClasses.wrapper}>
      <Container size={1200} my='lg' pos="relative">
        <Grid gutter="md" grow={false}>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Textarea value={inputValue} placeholder={t('input.enter')} onChange={event => setInputValue(event.target.value)}
              topRight={
                <ActionIcon variant="light" radius="xl" size="xl"
                  onClick={() => setInputValue('')}>
                  <IconX style={{ width: rem(20) }} />
                </ActionIcon>}
              bottomRight={<Text py="xs" pe="xs" c="dimmed">{t('input.keyWithCount', { count: inputValue.length })}</Text>}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Textarea readOnly placeholder={t('tokeniser.output')} value={outputValue}
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
              <Switch size="lg" onLabel="ON" offLabel="OFF" label={t('tokeniser.keepOriginal')} mt="md" fw={500} checked={keepOriginal} onChange={event => setKeepOriginal(event.target.checked)} />
            </Flex>
          </Container>
        </Grid>
      </Container>
    </Box>
  );
}