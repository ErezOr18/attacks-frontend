import { Flex, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { TAKE } from "../constants";
import { PaginationType } from "../types/PaginationType";

interface PageNavigatorProps {
  vars: PaginationType;
  count: number;
  isPreviousData: boolean;
  updateVariabless: (variabless: PaginationType) => void;
}

const PageNavigator: React.FC<PageNavigatorProps> = ({
  vars,
  count,
  isPreviousData,
  updateVariabless,
}) => {
  const [variabless, setVariabless] = useState<{
    vars: PaginationType;
    count: number;
  }>({
    vars,
    count,
  });
  return (
    <div>
      <Flex
        mt={4}
        mb={2}
        position={"sticky"}
        bottom={0}
        bg={"tan"}
        width={"full"}
        p={2}
      >
        <Text m={"auto"}>Current Page: {vars.skip / TAKE + 1}</Text>
        <Button
          size={"md"}
          m={"auto"}
          onClick={() => {
            setVariabless((old) => {
              return {
                vars: {
                  take: old.vars.take,
                  skip: old.vars.skip - TAKE,
                  keyword: old.vars.keyword,
                },
                count: old.count,
              };
            });
            updateVariabless(variabless.vars);
          }}
          disabled={vars.skip < TAKE}
        >
          Previous Page
        </Button>
        <Button
          size={"md"}
          m={"auto"}
          onClick={() => {
            if (!isPreviousData && count > vars.skip) {
              setVariabless((old) => {
                return {
                  vars: {
                    take: old.vars.take,
                    skip: old.vars.skip + old.vars.take,
                    keyword: old.vars.keyword,
                  },
                  count: old.count,
                };
              });
              updateVariabless(variabless.vars);
            }
          }}
          disabled={isPreviousData || count < vars.skip}
        >
          Next Page
        </Button>
      </Flex>
    </div>
  );
};
export default PageNavigator;
