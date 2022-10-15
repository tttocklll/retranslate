export type googleTranslateLangs = {
  name: string;
  language: string;
};

export type translateItem = {
  id: number;
  language: string;
  text: string;
};

export type translations = {
  original: translateItem;
  retranslate: translateItem[];
  result: translateItem;
};
