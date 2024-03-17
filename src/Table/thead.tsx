import React from "react";
import { TableHeadProps, Thead as ChakraThead } from "@chakra-ui/react";

interface CloneElementProps {
    inHeader: boolean;
}

export const Thead = (props: TableHeadProps) => {
    const { children, ...rest } = props;

    return (
        <ChakraThead {...rest}>
            {React.isValidElement(children) &&
            React.cloneElement(children, { inHeader: true } as CloneElementProps)}
        </ChakraThead>
    );  
};
