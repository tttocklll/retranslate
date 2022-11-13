import React, { useState } from "react";
import { translations } from "../types";

export const useTranslations = () => {
  const [translateItem, setTranslateItem] = useState<translations>({
    original: {
      id: 0,
      language: "ja",
      text: "",
    },
    retranslate: [{ id: 1, language: "en", text: "" }],
    result: {
      id: 0,
      language: "ja",
      text: "",
    },
  });
  console.log(translateItem);

  const onClickPlus = () => {
    setTranslateItem({
      ...translateItem,
      retranslate: [
        ...translateItem.retranslate,
        {
          id: translateItem.retranslate.at(-1)!.id + 1,
          language: "en",
          text: "",
        },
      ],
    });
  };

  const onClickMinus = () => {
    if (translateItem.retranslate.length > 0) {
      setTranslateItem({
        ...translateItem,
        retranslate: translateItem.retranslate.slice(0, -1),
      });
    }
  };

  const onChangeOriginalLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTranslateItem({
      ...translateItem,
      original: {
        ...translateItem.original,
        language: e.target.value,
      },
      result: {
        ...translateItem.result,
        language: e.target.value,
      },
    });
  };

  const onChangeTranslateLang = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id?: number
  ) => {
    const target = e.target.value;
    const retranslate = translateItem.retranslate.map((item) => {
      if (item.id === id) {
        return { ...item, language: target };
      } else {
        return item;
      }
    });

    setTranslateItem({ ...translateItem, retranslate });
  };

  const onChangeOriginalText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranslateItem({
      ...translateItem,
      original: {
        ...translateItem.original,
        text: e.target.value,
      },
    });
  };

  const translate = async (text: string, source: string, target: string) => {
    const res = await fetch(
      `${process.env.REACT_APP_GAS_URL}?text=${text}&source=${source}&target=${target}`
    );
    const data = await res.json();
    console.log(data);
    return data.text;
  };

  const onClickTranslate = async () => {
    const newTranslateItem = { ...translateItem };
    for (let i = 0; i <= newTranslateItem.retranslate.length; i++) {
      const source =
        i === 0
          ? newTranslateItem.original
          : newTranslateItem.retranslate[i - 1];
      const target =
        i === newTranslateItem.retranslate.length
          ? newTranslateItem.result
          : newTranslateItem.retranslate[i];
      target.text = await translate(
        source.text,
        source.language,
        target.language
      );
    }

    setTranslateItem(newTranslateItem);
  };

  return {
    translateItem,
    onClickPlus,
    onClickMinus,
    onChangeOriginalLang,
    onChangeTranslateLang,
    onChangeOriginalText,
    onClickTranslate,
  };
};
