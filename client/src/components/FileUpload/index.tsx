import React, { Dispatch, FC, useCallback, useMemo } from "react";
import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

export const FileUpload: FC<{ setFile: Dispatch<File> }> = ({ setFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, isFocused, isDragAccept, isDragReject, isDragActive } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      onDrop,
    });

  const style = useMemo(
    () => ({
      ...(isDragAccept ? { borderColor: "#00e676" } : {}),
      ...(isDragReject ? { borderColor: "#ff1744" } : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const dragStatus = () => {
    if (isDragReject)
      return <Text opacity="0.5">File type not allowed 😕</Text>;
    if (isDragActive) return <Text opacity="0.5">Drop the file here ...</Text>;
    return (
      <Text opacity="0.5">
        Drag 'n' drop some file here, or click to select file
      </Text>
    );
  };

  return (
    <Flex
      _hover={{
        cursor: "pointer",
        boxShadow: "inset 0 0 10em 1em rgba(255, 255, 255, 0.3)",
      }}
      transition="box-shadow 400ms linear"
      boxShadow="inset 0 0 100px 100px rgba(255, 255, 255, 0.1)"
      border="1px dashed gray"
      height="200px"
      width="400px"
      align="center"
      justify="center"
      flexDir="column"
      {...getRootProps({ style })}
    >
      <VStack spacing="14px">
        <Image width="70px" src="./images/file-svgrepo.svg" />
        <Text>Share files like fake news!</Text>
        {dragStatus()}
      </VStack>
    </Flex>
  );
};
