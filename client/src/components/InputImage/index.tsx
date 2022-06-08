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
import { useForm } from "react-hook-form";
import { FileUpload } from "../FileUpload";

type FormValues = {
  file_: FileList;
};

export const InputImage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log("On Submit: ", data));

  const validateFiles = (value: FileList) => {
    console.log("VALUE", value);

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
          border="1px dashed gray"
          height="200px"
          width="400px"
          align="center"
          justify="center"
          flexDir="column"
        >
          <VStack spacing="14px">
            <Image width="70px" src="./images/file-svgrepo.svg" />
            <Text>Share files like fake news!</Text>
          </VStack>
        </Flex>
        <Button colorScheme="green" variant="outline">
          Upload a file
        </Button>
      </VStack>
      {/* <Box border="1px solid green">
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
