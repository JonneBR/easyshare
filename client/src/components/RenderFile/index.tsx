import { Flex, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import { sizeInMb } from "../../../libs/sizeInMb";
import { IFile } from "../../../libs/types";

export const RenderFile: FC<{ file: IFile }> = ({
  file: { format, name, sizeInBytes },
}) => {
  console.log(format);
  console.log(name);
  console.log(sizeInBytes);

  return (
    <Flex flexDir="column" width="400px">
      <VStack spacing="14px" align="start" justify="start">
        <Text>
          <Text as="span" opacity="0.5">
            Format:{" "}
          </Text>
          {format}
        </Text>
        <Text>
          <Text as="span" opacity="0.5">
            File Name:{" "}
          </Text>
          {name}
        </Text>
        <Text>
          <Text as="span" opacity="0.5">
            Size:{" "}
          </Text>
          {sizeInMb(sizeInBytes)}
        </Text>
      </VStack>
    </Flex>
  );
};
