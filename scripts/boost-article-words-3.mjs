#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'article-contents');

const EXTRA = `    p(
      'Сравните свой протокол с рекомендациями производителя средств: температура сухожара, время контакта с дезраствором, совместимость с полированными ручками. Ошибка на одном этапе даёт ржавчину в шарнире или потемнение стали — мастер винит инструмент, хотя виноват режим. Ведите журнал хотя бы месяц: станет видно, где сбой.'
    ),
    p(
      'Учитесь у коллег не спорить «ножницы лучше», а обмениваться цифрами: минуты на валик, количество дочисток, возвраты клиентов. Тогда закупка в <a href="/collection">каталоге ZERK TOOL</a> превращается в управляемый процесс, а материал на сайте — в чек-лист, а не в теорию для поисковика.'
    ),
`;

for (let i = 3; i <= 10; i++) {
  const file = `article-${String(i).padStart(2, '0')}.mjs`;
  const fp = path.join(dir, file);
  let s = fs.readFileSync(fp, 'utf8');
  if (s.includes('обмениваться цифрами')) {
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
