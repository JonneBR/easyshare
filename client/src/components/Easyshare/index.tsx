import React, { FC, useState } from "react";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FileUpload } from "../FileUpload";
import { RenderFile } from "../RenderFile";

export const Easyshare: FC = () => {
  const [file, setFile] = useState<File>();

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      flexDir="column"
      width="100%"
    >
      <VStack spacing="14px">
        <Heading as="h1">Easyshare</Heading>
        <Text>1 file is the maximum</Text>
        <FileUpload setFile={setFile} />
        {file ? (
          <RenderFile
            file={{
              name: file.name,
              sizeInBytes: file.size,
              format: file.type.split("/")[1],
            }}
          />
        ) : (
          <Text>No file uploaded yet</Text>
        )}
        <Button
          colorScheme="green"
          variant="outline"
          disabled={Object.keys(file || {}).length ? false : true}
        >
          Generate link
        </Button>
      </VStack>
    </Flex>
  );
};
