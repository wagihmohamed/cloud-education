import React, { useState, useReducer } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    requiredEmail,
    requiredPassword,
    shortPassword,
    wrongEmail,
    requiredFirstName,
    requiredLastName,
    requiredPhone,
    requiredConfrimPassword,
} from "../../utlis/validationMessages";
import {
    Grid,
    Typography,
    Button,
    styled,
    Box,
    Paper,
    TextField,
    Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const CustomForm = styled("form")({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 30,
    marginTop: "3rem",
});
const CustomInputContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    gap: 10,
});


    let initailPasswordVisible= {
        password: false,
        confirmPassword: false,
    }
    
function passwordReducer(state=initailPasswordVisible, action: any) {
    if (action === "password") {
        return { ...state, password: !state.password };
    }
    if (action === "confrimPassword") {
        return { ...state, confirmPassword: !state.confirmPassword };
    }
    return state;
}
export const SignUp = () => {
    //CONTROL OF PASSWORD INPUT VISIBLE
        const [state, distpatch] = useReducer(passwordReducer, initailPasswordVisible);

    //REGISTER VALIDATION SCHEMA
    const validationSchema = () => {
        return Yup.object({
            firstName: Yup.string().required(requiredFirstName),
            lastName: Yup.string().required(requiredLastName),
            email: Yup.string().email(wrongEmail).required(requiredEmail),
            password: Yup.string()
                .min(8, shortPassword)
                .required(requiredPassword),
            confirmPassword: Yup.string()
                .oneOf(
                    [Yup.ref("password"), ""],
                    "Confirm password not match password "
                )
                .required(requiredConfrimPassword),
            phone: Yup.string().required(requiredPhone),
        });
    };
    const handleRegisterSubmit = (values: object) => {
        // console.log(formik.values);
    };
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values): void => {
            handleRegisterSubmit(values);
        },
    });

    // const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    // const [confrimPasswordVisible, setConfrimPasswordVisible] =
    //     useState<boolean>(false);
    // const visibleHandler = () => {
    //     setpa((prev) => !prev);
    // };
    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={6}
                sx={{
                    backgroundImage: "url(https://source.unsplash.com/random)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={6}
                component={Paper}
                elevation={6}
                square
                sx={{
                    display: "flex",
                    flexDirection: "center",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <Typography
                        component="h1"
                        align="center"
                        fontSize="2rem"
                        fontWeight="bold">
                        Create Account
                    </Typography>
                    <Grid>
                        <CustomForm onSubmit={formik.handleSubmit}>
                            <Stack flexDirection="row" gap={2}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    id="firstName"
                                    type="text"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    helperText={
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                    }
                                    error={
                                        formik.touched.firstName &&
                                        Boolean(formik.errors.firstName)
                                    }
                                />
                                <TextField
                                    fullWidth
                                    name="lastName"
                                    label="Last Name"
                                    id="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    helperText={
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                    }
                                    error={
                                        formik.touched.lastName &&
                                        Boolean(formik.errors.lastName)
                                    }
                                />
                            </Stack>
                            <CustomInputContainer>
                                <TextField
                                    fullWidth
                                    label="Email "
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    helperText={
                                        formik.touched.email &&
                                        formik.errors.email
                                    }
                                    error={
                                        formik.touched.email &&
                                        Boolean(formik.errors.email)
                                    }
                                    onChange={formik.handleChange}
                                />
                            </CustomInputContainer>
                            <CustomInputContainer>
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    id="password"
                                    name="password"
                                    helperText={
                                        formik.touched.password &&
                                        formik.errors.password
                                    }
                                    error={
                                        formik.touched.password &&
                                        Boolean(formik.errors.password)
                                    }
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    autoComplete="true"
                                    type={state.password ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        distpatch("password")
                                                    }>
                                                    {state.password ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}></TextField>
                            </CustomInputContainer>
                            <CustomInputContainer>
                                <TextField
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    label="Confirm Password"
                                    id="confirmPassword"
                                    autoComplete="true"
                                    type={state.confirmPassword ? "text" : "password"}
                                    helperText={
                                        formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword
                                    }
                                    error={
                                        formik.touched.confirmPassword &&
                                        Boolean(formik.errors.confirmPassword)
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={()=>distpatch("confrimPassword")}>
                                                    {state.confirmPassword ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"></TextField>
                            </CustomInputContainer>
                            <Button
                                type="submit"
                                sx={{
                                    bgcolor: "#000000",
                                    color: "white",
                                    py: 2,
                                    borderRadius: 20,
                                    borderColor: "#000000",
                                    "&:hover": {
                                        bgcolor: "#333333",
                                    },
                                }}>
                                Sign Up
                            </Button>
                        </CustomForm>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};
