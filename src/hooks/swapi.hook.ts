import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {request,getImages} from "../utils/";
import SWAPI from "../types";

;
export function useSwapi() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const images = useMemo(() => getImages(), [page,query])
  function get(url: string) {
    return request<SWAPI>({
      url,
      method:'GET'
    }).then((data)=>{
      data.results=data.results.map((character,index)=>{
          character['img']=images[index]
          return character
      })
      return data
    })
  }
  
  const {data,isLoading,isError,error,refetch,isFetching} = useQuery(['characters',page,query],()=>get( `/people?search=${query}&page=${page}`),{
    cacheTime:3000,
    staleTime:3000,
  })
  const changePage = (pg:number) =>{
    if (page!=pg) {
        setPage(pg)
    }

  }
  return { fetching:isFetching,refresh:refetch, error,people:data?.results, setQuery,changePage, loading:isLoading,count:Math.ceil((data?.count || 0) /10) };
}

