import React from 'react'
import { Box, Button, Grid, Paper, styled, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { requiredEmail, requiredPassword, shortPassword, wrongEmail } from '../../utlis/validationMessages'

const CustomForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 30,

})
const CustomInputContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    gap: 10
})
const CustomLabel = styled(Typography)({
    color: '#2538B8',
    fontWeight: 600,
})

export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().email(wrongEmail).required(requiredEmail),
            password: yup.string().min(8, shortPassword).required(requiredPassword),
        }),
        onSubmit: (values, { resetForm }): void => {
            console.log(values);

            // resetForm();
            // navigate('/otp', { replace: true });
        },
    })
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={6}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
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
                    display: 'flex',
                    flexDirection: 'center',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{
                        fontSize: 50,
                        fontWeight: 400,
                        color: '#000000'
                    }}>
                        Welcome Back
                    </Typography>
                    <Typography sx={{
                        fontSize: 30,
                        fontWeight: 300,
                        color: 'gray',
                        mb: 5
                    }}>
                        Welcome Back! Please Enter The Following Details
                    </Typography>
                    <CustomForm onSubmit={formik.handleSubmit}>
                        <CustomInputContainer>
                            <CustomLabel>Email</CustomLabel>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                id='email'
                                name='email'
                                helperText={formik.errors.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                            />
                        </CustomInputContainer>
                        <CustomInputContainer>
                            <CustomLabel>Password</CustomLabel>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                id='password'
                                name='password'
                                helperText={formik.errors.password}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                            />
                        </CustomInputContainer>
                        <Button
                            type='submit'
                            sx={{
                                bgcolor: '#000000',
                                color: 'white',
                                py: 2,
                                borderRadius: 20,
                                borderColor: '#000000',
                                '&:hover': {
                                    bgcolor: '#333333',
                                }
                            }}>Sign In</Button>
                    </CustomForm>
                    <Typography sx={{
                        fontSize: 20,
                        mt: 4,
                        color: 'gray',
                        textAlign: 'center'
                    }}>
                        Don't have an account?
                        <Link to='/register'>
                            <Typography component='span' sx={{
                                display: 'inline',
                                fontSize: 20,
                                color: '#2538B8',
                                fontWeight: 600,
                                ml: 1,

                            }}>
                                Register
                            </Typography>
                        </Link>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}
