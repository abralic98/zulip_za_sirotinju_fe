import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { ObservableElement } from "../components/ObservableElement";

export const usePagination = (
  query: UseInfiniteQueryResult<unknown, unknown>,
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  const {
    hasNextPage,
    isFetching,
    isLoading,
    isInitialLoading,
    fetchNextPage,
  } = query || {};

  const { isIntersecting } = useIntersactionObserver(ref);


  const fetchNextPageConditions =
    isIntersecting &&
    hasNextPage &&
    !isFetching &&
    !isLoading &&
    !isInitialLoading 

  useEffect(() => {
    if (fetchNextPageConditions) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, isInitialLoading, ref]);
};

export const useIntersactionObserver = (
  ref: MutableRefObject<HTMLDivElement | null>
) => {
    
    const [isIntersecting, setIsIntersecting] = useState(false);
    
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    setIsIntersecting(target.isIntersecting);
  }, []);
  
  useEffect(() => {
    
    if (!ref.current) return;
    const element = ref.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);

    return () => observer.unobserve(element);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return { ObservableElement, isIntersecting };
};
