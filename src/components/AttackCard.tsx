import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Attack } from "../types/attack";
import EllipsisText from "./EllipsisText";

interface AttackCardProps {
  attack: Attack;
}

export const AttackCard: React.FC<AttackCardProps> = ({ attack }) => {
  return (
    <Box key={attack.id} p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">Name: {attack.name}</Heading>
      <Text>
        <b>Description:</b>
        <br></br>{" "}
        <EllipsisText
          tail={"..."}
          tailClassName={"more"}
          text={attack.description}
          length={30}
        ></EllipsisText>
      </Text>
      <Text mt={2}>
        <b>X Mitre Platforms:</b>
        <br></br>
        {attack.xMitrePlatforms.join(",")}
      </Text>
      <Text mt={2}>
        <b>X Mitre Detection:</b> <br></br>
        {attack.xMitreDetection.join(",")}
      </Text>
      <Text mt={2}>
        <b>Phase Name:</b>
        <br></br> {attack.phaseName.join(",")}
      </Text>
    </Box>
  );
};
export default AttackCard;
