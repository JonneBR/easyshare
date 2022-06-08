import { InputGroup } from "@chakra-ui/react";
import React, { ReactNode, useRef } from "react";
import { DropzoneInputProps } from "react-dropzone";
import { UseFormRegisterReturn } from "react-hook-form";

interface FileUploadProps {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
}

export const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={"file"}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => console.log("inputRef", inputRef.current)}
        // ref={(e) => {
        //   ref(e);
        //   inputRef.current = e;
        // }}
      />
      <>{children}</>
    </InputGroup>
  );
};
