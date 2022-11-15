import React, { useState } from "react";
import { translateItem, translations } from "../types";

export const useTranslations = () => {
  const [translateItem, setTranslateItem] = useState<translations>({
    original: {
      id: 0,
      language: "ja",
      text: "",
      isLoading: false,
    },
    retranslate: [{ id: 1, language: "en", text: "", isLoading: false }],
    result: {
      id: 0,
      language: "ja",
      text: "",
      isLoading: false,
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
          isLoading: false,
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
    try {
      const res = await fetch(
        `${process.env.REACT_APP_GAS_URL}?text=${text}&source=${source}&target=${target}`
      );
      const data = await res.json();
      if (data.code >= 400) {
        throw new Error(data.text);
      }
      console.log(data);
      return data.text;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const resetResults = () => {
    const retranslate: translateItem[] = translateItem.retranslate.map(
      (item) => {
        return { ...item, text: "", isLoading: false, isSuccessful: undefined };
      }
    );

    const result: translateItem = {
      ...translateItem.result,
      text: "",
      isLoading: false,
      isSuccessful: undefined,
    };

    const resetTranslateItem = {
      ...translateItem,
      retranslate,
      result,
    };

    setTranslateItem(resetTranslateItem);
    return resetTranslateItem;
  };

  const onClickTranslate = async () => {
    let newTranslateItem = resetResults();
    for (let i = 0; i <= translateItem.retranslate.length; i++) {
      const source =
        i === 0
          ? newTranslateItem.original
          : newTranslateItem.retranslate[i - 1];
      const target =
        i === newTranslateItem.retranslate.length
          ? newTranslateItem.result
          : newTranslateItem.retranslate[i];
      target.isLoading = true;
      setTranslateItem(newTranslateItem);

      newTranslateItem = { ...newTranslateItem };
      try {
        target.text = await translate(
          source.text,
          source.language,
          target.language
        );
        target.isLoading = false;
        target.isSuccessful = true;
        setTranslateItem(newTranslateItem);
        newTranslateItem = { ...newTranslateItem };
      } catch (error: any) {
        target.isLoading = false;
        target.isSuccessful = false;
        target.errorMessage = error.message;
        setTranslateItem(newTranslateItem);
        console.error(error);
        break;
      }
    }
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
