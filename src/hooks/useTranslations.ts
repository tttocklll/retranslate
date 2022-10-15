import { useState } from "react";
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

  return {
    translateItem,
    onClickPlus,
    onClickMinus,
    onChangeOriginalLang,
    onChangeTranslateLang,
  };
};
