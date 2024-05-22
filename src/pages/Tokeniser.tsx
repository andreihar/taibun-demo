import { Container, Button, Switch, Flex, Box, Grid, Textarea, rem } from '@mantine/core';
import commonClasses from '../styles/common.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Tokeniser as Token } from 'taibun';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck } from '@tabler/icons-react';

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
            <Textarea size="xl" radius="md" placeholder={t('transliterator.enter')} minRows={10} maxRows={10} autosize
              onChange={event => setInputValue(event.target.value)} />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Textarea size="xl" radius="md" placeholder={t('tokeniser.output')} minRows={10} maxRows={10} autosize
              variant="filled" value={outputValue} readOnly />
            <Flex mt='lg' justify="center">
              <Button variant="light" radius="xl" size="md"
                rightSection={
                  clipboard.copied ? (
                    <IconCheck style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                  ) : (
                    <IconCopy style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                  )
                }
                styles={{
                  root: { paddingRight: rem(14), height: rem(48) },
                  section: { marginLeft: rem(22) },
                }}
                onClick={() => clipboard.copy(outputValue)}
              >{t('transliterator.copy')}</Button>
            </Flex>
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