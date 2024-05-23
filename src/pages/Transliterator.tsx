import { Container, Text, TextInput, Button, Switch, Flex, Box, Grid, Textarea, Select, Checkbox, rem } from '@mantine/core';
import commonClasses from '../styles/common.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { Converter } from 'taibun';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck } from '@tabler/icons-react';

export default function Transliterator() {
  const [system, setSystem] = useState<'Tailo' | 'POJ' | 'Zhuyin' | 'TLPA' | 'Pingyim' | 'Tongiong' | 'IPA'>('Tailo');
  const [dialect, setDialect] = useState<'south' | 'north'>('south');
  const [format, setFormat] = useState<'mark' | 'number' | 'strip'>('mark');
  const [delimiter, setDelimiter] = useState<string>('');
  const [useCustomDelimiter, setUseCustomDelimiter] = useState<boolean>(false);
  const [sandhi, setSandhi] = useState<'auto' | 'none' | 'excLast' | 'inclLast' | 'default'>('default');
  const [punctuation, setPunctuation] = useState<'format' | 'none'>('format');
  const [convertNonCjk, setConvertNonCjk] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const [options, setOptions] = useState({ system, dialect, format, punctuation, convertNonCjk });
  const clipboard = useClipboard();
  const { t } = useTranslation();
  const cRef = useRef(new Converter(options));

  const performConversion = () => {
    const chunks = inputValue.split(/([\n\t]+)/);
    const convertedChunks = chunks.map(chunk => /[\n\t]/.test(chunk) ? chunk : cRef.current.get(chunk));
    setOutputValue(convertedChunks.join(''));
  };

  useEffect(() => {
    const options: any = { system, dialect, format, punctuation, convertNonCjk };

    if (useCustomDelimiter) {
      options.delimiter = delimiter;
    }

    if (sandhi !== 'default') {
      options.sandhi = sandhi;
    }

    setOptions(options);
    cRef.current = new Converter(options);
    performConversion();
  }, [system, dialect, format, delimiter, useCustomDelimiter, sandhi, punctuation, convertNonCjk]);

  useEffect(() => {
    performConversion();
  }, [inputValue]);

  return (
    <Box pos='relative' className={commonClasses.wrapper}>
      <Container size={1200} my='lg' pos="relative">
        <Grid gutter="md" grow={false}>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Textarea size="xl" radius="md" placeholder={t('transliterator.enter')} minRows={10} maxRows={10} autosize
              onChange={event => setInputValue(event.target.value)} />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Textarea size="xl" radius="md" placeholder={t('transliterator.output')} minRows={10} maxRows={10} autosize
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
            <Grid>
              <Grid.Col span={{ base: 6, md: 4 }}>
                <Select label={t('transliterator.system.label')} allowDeselect={false} data={[
                  { value: 'Tailo', label: t('transliterator.system.tailo') },
                  { value: 'POJ', label: t('transliterator.system.poj') },
                  { value: 'Zhuyin', label: t('transliterator.system.zhuyin') },
                  { value: 'TLPA', label: t('transliterator.system.tlpa') },
                  { value: 'Pingyim', label: t('transliterator.system.pingyim') },
                  { value: 'Tongiong', label: t('transliterator.system.tongiong') },
                  { value: 'IPA', label: t('transliterator.system.ipa') },
                ]} value={system} onChange={(value) => setSystem(value as any)} />
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 4 }}>
                <Select label={t('transliterator.dialect.label')} allowDeselect={false} data={[
                  { value: 'south', label: t('transliterator.dialect.south') },
                  { value: 'north', label: t('transliterator.dialect.north') },
                ]} value={dialect} onChange={(value) => setDialect(value as any)} />
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 4 }}>
                <Select label={t('transliterator.format.label')} allowDeselect={false} data={[
                  { value: 'mark', label: t('transliterator.format.mark') },
                  { value: 'number', label: t('transliterator.format.number') },
                  { value: 'strip', label: t('transliterator.format.strip') },
                ]} value={format} onChange={(value) => setFormat(value as any)} />
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 4 }}>
                <Box mt={4}>
                  <Text fw={500} size="sm">{t('transliterator.delimiter')}</Text>
                  <Flex align="center" style={{ width: '100%' }}>
                    <Checkbox
                      checked={useCustomDelimiter}
                      onChange={event => setUseCustomDelimiter(event.target.checked)}
                      style={{ flexShrink: 0 }}
                    />
                    <TextInput value={delimiter}
                      onChange={event => setDelimiter(event.target.value)}
                      disabled={!useCustomDelimiter}
                      style={{ marginLeft: '10px', flexGrow: 1 }}
                    />
                  </Flex>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 4 }}>
                <Select label={t('transliterator.sandhi.label')} allowDeselect={false} data={[
                  { value: 'default', label: t('transliterator.sandhi.default') },
                  { value: 'auto', label: t('transliterator.sandhi.auto') },
                  { value: 'none', label: t('transliterator.sandhi.none') },
                  { value: 'excLast', label: t('transliterator.sandhi.excLast') },
                  { value: 'inclLast', label: t('transliterator.sandhi.inclLast') },
                ]} value={sandhi} onChange={(value) => setSandhi(value as any)} />
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 4 }}>
                <Select label={t('transliterator.punctuation.label')} allowDeselect={false} data={[
                  { value: 'format', label: t('transliterator.punctuation.format') },
                  { value: 'none', label: t('transliterator.punctuation.none') },
                ]} value={punctuation} onChange={(value) => setPunctuation(value as any)} />
              </Grid.Col>
            </Grid>
            <Flex justify="center">
              <Switch size="md" onLabel="ON" offLabel="OFF" label={t('transliterator.convertNonCjk')} mt="md" fw={500} checked={convertNonCjk} onChange={event => setConvertNonCjk(event.target.checked)} />
            </Flex>
          </Container>
        </Grid>
      </Container>
    </Box>
  );
}