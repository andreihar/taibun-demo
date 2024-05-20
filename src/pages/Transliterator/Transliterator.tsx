import { Container, Text, Button, Group } from '@mantine/core';
import { Grid, Textarea, Select, Checkbox } from '@mantine/core';
import classes from './Transliterator.module.css';
import { Trans, useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Tokeniser, Converter } from 'taibun';

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
  const { t } = useTranslation();

  useEffect(() => {
    const options: any = { system, dialect, format, punctuation, convertNonCjk };

    if (useCustomDelimiter) {
      options.delimiter = delimiter;
    }

    if (sandhi !== 'default') {
      options.sandhi = sandhi;
    }

    setOptions(options);
    const c = new Converter(options);
    setOutputValue(c.get(inputValue));
  }, [system, dialect, format, delimiter, useCustomDelimiter, sandhi, punctuation, convertNonCjk]);

  const handleConvert = () => {
    const c = new Converter(options);
    setOutputValue(c.get(inputValue));
  };

  return (
    <div className={classes.wrapper}>
      <Container size={1200} className={classes.inner}>
        <Grid gutter="md" grow={false}>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Textarea size="xl" radius="md" label="Textarea 1" placeholder="Enter text here..." minRows={10} autosize
              onChange={event => setInputValue(event.target.value)} />
            <Select data={[
              { value: 'Tailo', label: t('transliterator.system.tailo') },
              { value: 'POJ', label: t('transliterator.system.poj') },
              { value: 'Zhuyin', label: t('transliterator.system.zhuyin') },
              { value: 'TLPA', label: t('transliterator.system.tlpa') },
              { value: 'Pingyim', label: t('transliterator.system.pingyim') },
              { value: 'Tongiong', label: t('transliterator.system.tongiong') },
              { value: 'IPA', label: t('transliterator.system.ipa') },
            ]} value={system} onChange={(value) => setSystem(value as any)} />
            <Select data={[
              { value: 'south', label: t('transliterator.dialect.south') },
              { value: 'north', label: t('transliterator.dialect.north') },
            ]} value={dialect} onChange={(value) => setDialect(value as any)} />
            <Select data={[
              { value: 'mark', label: t('transliterator.format.mark') },
              { value: 'number', label: t('transliterator.format.number') },
              { value: 'strip', label: t('transliterator.format.strip') },
            ]} value={format} onChange={(value) => setFormat(value as any)} />
            <input type="checkbox" checked={useCustomDelimiter} onChange={event => setUseCustomDelimiter(event.target.checked)} />
            {useCustomDelimiter && <input type="text" value={delimiter} onChange={event => setDelimiter(event.target.value)} />}
            <Select data={[
              { value: 'default', label: t('transliterator.sandhi.default') },
              { value: 'auto', label: t('transliterator.sandhi.auto') },
              { value: 'none', label: t('transliterator.sandhi.none') },
              { value: 'excLast', label: t('transliterator.sandhi.excLast') },
              { value: 'inclLast', label: t('transliterator.sandhi.inclLast') },
            ]} value={sandhi} onChange={(value) => setSandhi(value as any)} />
            <Select data={[
              { value: 'format', label: t('transliterator.punctuation.format') },
              { value: 'none', label: t('transliterator.punctuation.none') },
            ]} value={punctuation} onChange={(value) => setPunctuation(value as any)} />
            <input type="checkbox" checked={convertNonCjk} onChange={event => setConvertNonCjk(event.target.checked)} />
            <Button onClick={handleConvert}>{t('transliterator.convert')}</Button>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Textarea size="xl" radius="md" label="Textarea 2" placeholder="Enter text here..." minRows={10} autosize
              value={outputValue} readOnly />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}