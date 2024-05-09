import { useEffect, useRef, useCallback } from "react";

const useMounted = () => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const checkMounted = useCallback(() => mounted.current, []);

  return checkMounted;
};

export default useMounted;
