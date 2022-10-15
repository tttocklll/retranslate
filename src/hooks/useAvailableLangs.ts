import { useState, useEffect } from "react";
import { googleTranslateLangs } from "../types";

export const useAvailableLangs = () => {
  const [availableLangs, setAvailableLangs] = useState<googleTranslateLangs[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://translation.googleapis.com/language/translate/v2/languages?key=${process.env.REACT_APP_GOOGLE_API_KEY}&target=ja`
    )
      .then((res) => res.json())
      .then((data) => {
        setAvailableLangs(data.data.languages);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return { availableLangs, isLoading };
};
