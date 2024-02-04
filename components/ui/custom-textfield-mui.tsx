import { TextField, TextFieldProps, styled } from "@mui/material";

export const CustomTextfield = styled(TextField, {
  name: "CustomTextfield",
  slot: "Root",
})<TextFieldProps>(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    borderColor: "red !important",
  },
  "& .MuiInputBase-input": {
    fontFamily: "Poppins",
    fontSize: "12px",
    borderColor: "red !important",
  },
}));
