import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
    <Flex height="100vh" align="center" justify="center" width="100%">
      <Box border="1px solid green">
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.file_} isRequired>
            <FormLabel>{"File input"}</FormLabel>

            <FileUpload
              accept={"image/*"}
              multiple
              register={register("file_", { validate: validateFiles })}
            >
              {/* leftIcon={<Icon as={FiFile} />} */}
              <Button>Upload</Button>
            </FileUpload>

            <FormErrorMessage>
              {errors.file_ && errors?.file_.message}
            </FormErrorMessage>
          </FormControl>

          <button>Submit</button>
        </form>
      </Box>
    </Flex>
  );
};
