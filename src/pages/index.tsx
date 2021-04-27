import { Input, Stack } from "@chakra-ui/react";
// import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { useQuery } from "react-query";
import AttackCard from "../components/AttackCard";
import Layout from "../components/Layout";
import PageNavigator from "../components/PageNavigator";
import { TAKE } from "../constants";
import { AttackFetcherProps, fetchAttacks } from "../fetchers/atttackFetcher";
import { Attack } from "../types/attack";
import { PaginationType } from "../types/PaginationType";

const Index: React.FC<AttackFetcherProps> = (props) => {
  const [variabless, setVariabless] = useState<PaginationType>({
    take: TAKE,
    skip: 0,
    keyword: "",
  });
  const { isLoading, data, isPreviousData } = useQuery(
    ["attacks", variabless],
    () => fetchAttacks(variabless as PaginationType),
    {
      keepPreviousData: true,
      initialData: props,
    }
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setVariabless((old) => {
      return {
        take: old.take,
        skip: 0,
        keyword: event.target.value,
      };
    });

  const updateVariabless = (vars: PaginationType) => {
    setVariabless({
      take: vars.take,
      skip: vars.skip,
      keyword: vars.keyword,
    });
  };

  return (
    <Layout>
      <Input
        placeholder="enter attack description"
        size="lg"
        m={"auto"}
        variant={"flushed"}
        textAlign={"center"}
        onChange={handleChange}
      />
      {isLoading ? (
        <div>loading...</div>
      ) : data ? (
        data.error ? (
          <div>{data.error}</div>
        ) : data.data ? (
          <div>
            <Stack p={8}>
              {data.data.map((attack: Attack) => (
                <AttackCard attack={attack}></AttackCard>
              ))}
            </Stack>
            <PageNavigator
              updateVariabless={updateVariabless}
              vars={variabless}
              count={data.count}
              isPreviousData={isPreviousData}
            />
          </div>
        ) : null
      ) : (
        <div>query error</div>
      )}
    </Layout>
  );
};

export default Index;
