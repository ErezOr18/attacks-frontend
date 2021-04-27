import { Flex, FlexProps, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";

const Navbar: React.FC<{}> = (_props: FlexProps) => {
  return (
    <Flex zIndex={1} bg="tan" position="sticky" top={0} p={2}>
      <Fragment>
        <Text m={"auto"} fontSize={"3xl"}>
          Erez Project
        </Text>
      </Fragment>
    </Flex>
  );
};

export default Navbar;
