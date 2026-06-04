#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'article-contents');

const EXTRA = `    p(
      'Добавьте в закупочный лист резерв: вторая пара кусачек или ножниц в стерилизации, запас сменок 180 grit на две недели пика, масло для шарнира. Мелочи без простоя кресла. Официальный каталог ZERK TOOL обновляется по артикулам — сохраняйте ссылки на карточки, чтобы не путать лезвие и грит при повторном заказе.'
    ),
`;

const targets = [3, 5, 6, 7, 8, 9, 10];

for (const i of targets) {
  const file = `article-${String(i).padStart(2, '0')}.mjs`;
  const fp = path.join(dir, file);
  let s = fs.readFileSync(fp, 'utf8');
  if (s.includes('закупочный лист резерв')) {
    console.log('skip', file);
    continue;
  }
  const idx = s.lastIndexOf('  ],\n  faq:');
  if (idx === -1) {
    console.error('no faq marker', file);
    continue;
  }
  s = s.slice(0, idx) + EXTRA + s.slice(idx);
  fs.writeFileSync(fp, s);
  console.log('ok', file);
}
