import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import React from "react";

export default function Main() {
  const { keyword } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () =>
      fetch(`/data/${keyword ? "result" : "popular"}.json`).then((res) =>
        res.json().then((res) => res.items)
      ),
  });
  return (
    <div>
      {isLoading && "loading"}
      {error && `'error ' ${error.message}`}
      {data &&
        data.map((item) => <div key={item.id}>{item.snippet.title}</div>)}
    </div>
  );
}
