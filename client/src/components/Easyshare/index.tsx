import React, { FC, useState } from "react";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import axios, { AxiosPromise } from "axios";
import { FileUpload } from "../FileUpload";
import { RenderFile } from "../RenderFile";

import { IData } from "../../../libs/types";

export const Easyshare: FC = () => {
  const [file, setFile] = useState<File>();
  const [id, setId] = useState<string>("");
  const [downloadPageLink, setDownloadPageLink] = useState<string>("");
  const [uploadState, setUploadState] = useState<
    "Uploading" | "Upload Failed" | "Uploaded"
  >(null);

  const handleUpload = async () => {
    if (uploadState === "Uploading") return;
    const formData = new FormData();
    formData.append("myFile", file);

    // try {
    //   const { data }: { data: IData } = await axios({
    //     method: "post",
    //     data: formData,
    //     url: "api/file/upload",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   setId(data.id);
    //   setDownloadPageLink(data.downloadPageLink);
    // } catch (error) {
    //   console.log(error);
    //   setUploadState("Upload Failed");
    // }
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
          onClick={handleUpload}
        >
          Generate link
        </Button>
      </VStack>
    </Flex>
  );
};
