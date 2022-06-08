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
import React from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { FileUpload } from "../FileUpload";

type FormValues = {
  file_: FileList;
};

export const InputImage = () => {
  const { getRootProps, acceptedFiles } = useDropzone({
    noClick: true,
    onDrop: (files) => validateFiles(files),
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.name}>{file.name}</li>
  ));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log("On Submit: ", data));

  const validateFiles = (value: FileList | File[]) => {
    console.log("VALUE", value.length);

    if (value.length < 1) {
      return "Files is required";
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

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      flexDir="column"
      width="100%"
    >
      <VStack spacing="14px">
        <Heading as="h1">File Upload</Heading>
        <Flex
          _hover={{
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
          {...getRootProps()}
        >
          <VStack spacing="14px">
            <Image width="70px" src="./images/file-svgrepo.svg" />
            <Text>Share files like fake news!</Text>
          </VStack>
        </Flex>
        <ul>{files}</ul>
        <form onSubmit={onSubmit}>
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
        </form>
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
