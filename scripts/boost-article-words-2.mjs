#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'article-contents');
const MARKER = '  ],\n  faq:';

const EXTRA = `
    h2('Резюме для мастера'),
    p(
      'Вернитесь к протоколу: подготовка, выбор инструмента, стерилизация, хранение. Один слабый этап обесценивает премиальный бренд на столе. ZERK TOOL даёт предсказуемую сталь и заточку — дисциплина остаётся за кабинетом.'
    ),
    p(
      'Закрепите в команде короткий чек-лист на стене стерилизации и пересматривайте раз в квартал: что изменилось в услугах, каких гритов не хватает, какие кусачки ушли на заточку чаще остальных. Цифры из CRM и журнала циклов важнее мнения «всем нравится эта модель».'
    ),
    p(
      'Клиент платит за спокойствие и чистоту: новая сменка файла, стерильный пакет, мягкий ход кусачек или ножниц — это видимые знаки профессионального маникюра. Инвестиция в правильный маникюрный инструмент и расходники окупается повторными визитами и рекомендациями.'
    ),
    p(
      'Если остались вопросы по артикулу — напишите в Telegram с карточкой из каталога. Подбор по типу кутикулы, гриту и нагрузке салона быстрее, чем универсальная покупка «наугад».'
    ),
`;

for (let i = 3; i <= 10; i++) {
  const file = `article-${String(i).padStart(2, '0')}.mjs`;
  const fp = path.join(dir, file);
  let s = fs.readFileSync(fp, 'utf8');
  if (s.includes('Резюме для мастера')) {
    console.log('skip', file);
    continue;
  }
  if (!s.includes(MARKER)) {
    console.error('no marker', file);
    continue;
  }
  s = s.replace(MARKER, `${EXTRA}\n  ],\n  faq:`);
  fs.writeFileSync(fp, s);
  console.log('boosted2', file);
}
