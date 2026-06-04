#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'article-contents');

const EXTRA = `    p(
      'Перед сезоном пересмотрите остатки и состояние кромок: тупая пара тянет время записи и портит отзывы сильнее, чем отсутствие нового цвета гель-лака. Плановая заточка и резерв в пакете — часть себестоимости услуги, которую клиент не видит, но чувствует по аккуратности валика и отсутствию задержек в кресле. Закрепите ответственного за стерилизацию в смене — один человек, один журнал, меньше хаоса в пик записи.'
    ),
`;

for (const i of [3, 6, 7, 8, 9, 10]) {
  const file = `article-${String(i).padStart(2, '0')}.mjs`;
  const fp = path.join(dir, file);
  let s = fs.readFileSync(fp, 'utf8');
  if (s.includes('отсутствию задержек в кресле')) {
    console.log('skip', file);
    continue;
  }
  const idx = s.lastIndexOf('  ],\n  faq:');
  s = s.slice(0, idx) + EXTRA + s.slice(idx);
  fs.writeFileSync(fp, s);
  console.log('ok', file);
}
