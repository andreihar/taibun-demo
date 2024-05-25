import { Container, Text, TextInput, Switch, Flex, Box, Grid, Select, Checkbox, ActionIcon, rem } from '@mantine/core';
import Textarea from '../components/Textarea';
import classes from '../styles/common.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { Converter } from 'taibun';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck, IconVolume, IconX, IconSquare } from '@tabler/icons-react';

export default function Transliterator() {
  const [system, setSystem] = useState<'Tailo' | 'POJ' | 'Zhuyin' | 'TLPA' | 'Pingyim' | 'Tongiong' | 'IPA'>('Tailo');
  const [dialect, setDialect] = useState<'south' | 'north'>('south');
  const [format, setFormat] = useState<'mark' | 'number' | 'strip'>('mark');
  const [delimiter, setDelimiter] = useState<string>('');
  const [useCustomDelimiter, setUseCustomDelimiter] = useState<boolean>(false);
  const [sandhi, setSandhi] = useState<'auto' | 'none' | 'excLast' | 'inclLast' | 'default'>('default');
  const [punctuation, setPunctuation] = useState<'format' | 'none'>('format');
  const [convertNonCjk, setConvertNonCjk] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const playAudio = async () => {
    setStatus('loading');
    const c = new Converter({ format: 'number' });
    const src = encodeURI("https://hapsing.ithuan.tw/bangtsam?taibun=") + encodeURIComponent(c.get(inputValue).toLowerCase());
    audioRef.current = new Audio(src);
    audioRef.current.oncanplaythrough = () => setStatus('playing');
    audioRef.current.onended = () => setStatus('idle');
    audioRef.current.onerror = () => setStatus('idle');
    audioRef.current.play();
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setStatus('idle');
    }
  };

  return (
    <Box pos='relative' className={classes.wrapper}>
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
            <Textarea readOnly placeholder={t('transliterator.output')} value={outputValue}
              bottomLeft={
                <ActionIcon loading={status === 'loading'} variant="light" radius="xl" size="xl"
                  onClick={status === 'playing' ? stopAudio : playAudio}>
                  {status === 'playing' ? <IconSquare style={{ width: rem(20) }} /> : <IconVolume style={{ width: rem(20) }} />}
                </ActionIcon>}
              bottomRight={
                <ActionIcon variant="light" radius="xl" size="xl"
                  onClick={() => clipboard.copy(outputValue)}>
                  {clipboard.copied ? (<IconCheck style={{ width: rem(20) }} />
                  ) : (<IconCopy style={{ width: rem(20) }} />)}
                </ActionIcon>}
            />
          </Grid.Col>
          <Container>
            <Grid>
              <Grid.Col span={{ base: 6, md: 4 }}>
                <Select size="md" label={t('transliterator.system.label')} allowDeselect={false} data={[
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
                <Select size="md" label={t('transliterator.dialect.label')} allowDeselect={false} data={[
                  { value: 'south', label: t('transliterator.dialect.south') },
                  { value: 'north', label: t('transliterator.dialect.north') },
                ]} value={dialect} onChange={(value) => setDialect(value as any)} />
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 4 }}>
                <Select size="md" label={t('transliterator.format.label')} allowDeselect={false} data={[
                  { value: 'mark', label: t('transliterator.format.mark') },
                  { value: 'number', label: t('transliterator.format.number') },
                  { value: 'strip', label: t('transliterator.format.strip') },
                ]} value={format} onChange={(value) => setFormat(value as any)} />
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 4 }}>
                <Box mt={4}>
                  <Text size="md" fw={500} >{t('transliterator.delimiter')}</Text>
                  <Flex align="center" style={{ width: '100%' }}>
                    <Checkbox checked={useCustomDelimiter} size="md" style={{ flexShrink: 0 }}
                      onChange={event => setUseCustomDelimiter(event.target.checked)}
                    />
                    <TextInput value={delimiter} size="md" disabled={!useCustomDelimiter}
                      onChange={event => setDelimiter(event.target.value)}
                      style={{ marginLeft: '10px', flexGrow: 1 }}
                    />
                  </Flex>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 4 }}>
                <Select size="md" label={t('transliterator.sandhi.label')} allowDeselect={false} data={[
                  { value: 'default', label: t('transliterator.sandhi.default') },
                  { value: 'auto', label: t('transliterator.sandhi.auto') },
                  { value: 'none', label: t('transliterator.sandhi.none') },
                  { value: 'excLast', label: t('transliterator.sandhi.excLast') },
                  { value: 'inclLast', label: t('transliterator.sandhi.inclLast') },
                ]} value={sandhi} onChange={(value) => setSandhi(value as any)} />
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 4 }}>
                <Select size="md" label={t('transliterator.punctuation.label')} allowDeselect={false} data={[
                  { value: 'format', label: t('transliterator.punctuation.format') },
                  { value: 'none', label: t('transliterator.punctuation.none') },
                ]} value={punctuation} onChange={(value) => setPunctuation(value as any)} />
              </Grid.Col>
            </Grid>
            <Flex justify="center">
              <Switch size="lg" onLabel="ON" offLabel="OFF" label={t('transliterator.convertNonCjk')} mt="md" fw={500} checked={convertNonCjk} onChange={event => setConvertNonCjk(event.target.checked)} />
            </Flex>
          </Container>
        </Grid>
      </Container>
    </Box>
  );
}