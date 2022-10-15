import { useState } from "react";
import { translateItem } from "../types";

export const useTranslateItem = () => {
  const [translateItem, setTranslateItem] = useState<translateItem[]>([
    {
      id: 1,
      target: "en",
    },
  ]);

  const onClickPlus = () => {
    setTranslateItem([
      ...translateItem,
      {
        id: translateItem.at(-1)!.id + 1,
        target: "en",
      },
    ]);
  };

  const onClickMinus = () => {
    if (translateItem.length > 1) {
      setTranslateItem(translateItem.slice(0, -1));
    }
  };

  const onChangeTranslateLang = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id?: number
  ) => {
    const target = e.target.value;
    setTranslateItem(
      translateItem.map((item) => {
        if (item.id === id) {
          return { ...item, target };
        } else {
          return item;
        }
      })
    );
  };

  return {
    translateItem,
    onClickPlus,
    onClickMinus,
    onChangeTranslateLang,
  };
};
