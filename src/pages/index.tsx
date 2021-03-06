import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
// import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { useQuery } from "react-query";
import AttackCard from "../components/AttackCard";
import Layout from "../components/Layout";
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
          <div>Error {data.error}</div>
        ) : data.data ? (
          <div>
            <Stack p={8}>
              {data?.data.map((attack: Attack) => (
                <AttackCard attack={attack}></AttackCard>
              ))}
            </Stack>
            {variabless.skip < data.count ? (
              <Flex
                mt={4}
                mb={2}
                position={"sticky"}
                bottom={0}
                bg={"tan"}
                width={"full"}
                p={2}
              >
                <Text m={"auto"}>
                  Current Page: {variabless.skip / TAKE + 1}
                </Text>
                <Button
                  size={"md"}
                  m={"auto"}
                  onClick={() =>
                    setVariabless((old) => {
                      return {
                        take: old.take,
                        skip: old.skip - TAKE,
                        keyword: old.keyword,
                      };
                    })
                  }
                  disabled={variabless.skip < TAKE}
                >
                  Previous Page
                </Button>
                <Button
                  size={"md"}
                  m={"auto"}
                  onClick={() => {
                    if (!isPreviousData && data.count > variabless.skip) {
                      setVariabless((old) => {
                        return {
                          take: old.take,
                          skip: old.skip + old.take,
                          keyword: old.keyword,
                        };
                      });
                    }
                  }}
                  // Disable the Next Page button until we know a next page is available
                  disabled={isPreviousData || data.count < variabless.skip}
                >
                  Next Page
                </Button>
              </Flex>
            ) : null}
          </div>
        ) : null
      ) : (
        <div>Query error</div>
      )}
    </Layout>
  );
};

export default Index;
