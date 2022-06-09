import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { FC, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { FileUpload } from "../FileUpload";

// type FormValues = {
//   file_: FileList;
// };

export const Easyshare: FC = () => {
  const [file, setFile] = useState<File>();

  const files = Object.keys(file || {}).length ? (
    <li key={file?.name}>{file?.name}</li>
  ) : (
    <li key="1">No file uploaded yet</li>
  );

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
        <ul>{files}</ul>
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
