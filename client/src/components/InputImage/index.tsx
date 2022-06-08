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
import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { FileUpload } from "../FileUpload";

// type FormValues = {
//   file_: FileList;
// };

export const InputImage = () => {
  const {
    getRootProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    maxFiles: 1,
    onDrop: (files) => validateFiles(files),
  });

  const files = acceptedFiles.length ? (
    acceptedFiles.map((file) => <li key={file.name}>{file.name}</li>)
  ) : (
    <li key="1">No file uploaded yet</li>
  );

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormValues>();
  // const onSubmit = handleSubmit((data) => console.log("On Submit: ", data));

  const validateFiles = (value: FileList | File[]) => {
    console.log("value", value);

    if (value.length > 1) {
      return "Cannot upload up to 1 file";
    }

    if (value.length < 1) {
      return "File is required";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      console.log("fsMb", fsMb);

      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb";
      }
    }
    return true;
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () => ({
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
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
            {isDragActive ? (
              <Text opacity="0.5">Drop the file here ...</Text>
            ) : (
              <Text opacity="0.5">
                Drag 'n' drop some file here, or click to select file
              </Text>
            )}
          </VStack>
        </Flex>
        <ul>{files}</ul>
        <Button
          colorScheme="green"
          variant="outline"
          disabled={acceptedFiles.length ? false : true}
        >
          Generate link
        </Button>
        {/* <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.file_} isRequired>
            <FileUpload
              accept={"image/*"}
              multiple
              register={register("file_", { validate: validateFiles })}
            >
              <Button colorScheme="green" variant="outline">
                Upload a file
              </Button>
            </FileUpload>
            <FormErrorMessage>
              {errors.file_ && errors?.file_.message}
            </FormErrorMessage>
            <button>Submit</button>
          </FormControl>
        </form> */}
      </VStack>
      {/* <Box>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.file_} isRequired>
            <FormLabel>{"File input"}</FormLabel>

            <FileUpload
              accept={"image/*"}
              multiple
              register={register("file_", { validate: validateFiles })}
            >
              leftIcon={<Icon as={FiFile} />}
              <Button>Upload</Button>
            </FileUpload>

            <FormErrorMessage>
              {errors.file_ && errors?.file_.message}
            </FormErrorMessage>
          </FormControl>

          <button>Submit</button>
        </form>
      </Box> */}
    </Flex>
  );
};
