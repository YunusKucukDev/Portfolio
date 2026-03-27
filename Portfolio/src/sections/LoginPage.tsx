import { LockOutlined } from "@mui/icons-material";
import { loginUser } from "../Slices/AuthSlice";
import { useAppDispacth } from "../Store/Store";
import { Avatar, Box, Container, Paper, TextField, Typography, Link, Grid, Button } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";




export default function LoginPage() {
    const dispacth = useAppDispacth();
    const navigate =useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({});

    async function submitForm(data: FieldValues) {
        await dispacth(loginUser(data))
        navigate(location.state?.from || "/catalog")
    }

    console.log(errors);

    return (

        <Container maxWidth="sm">
            <Paper
                elevation={6}
                sx={{
                    marginTop: 12,
                    padding: { xs: 4, md: 6 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 3
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 56, height: 56 }}>
                    <LockOutlined fontSize="large" />
                </Avatar>

                <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Giriş Yap
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit(submitForm)} sx={{ mt: 2, width: '100%' }}>
                    <TextField
                        {...register("username", { required: "username is    required" })}
                        label="Kullanıcı Adı"
                        fullWidth
                        required
                        autoFocus
                        variant="outlined"
                        sx={{ mb: 3 }}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    <TextField
                        {...register("password", {
                            required: "password is required", minLength: {
                                value: 6,
                                message: "min şlenght is 6 characters"
                            }
                        })}
                        label="Şifre"
                        type="password"
                        fullWidth
                        required
                        variant="outlined"
                        sx={{ mb: 4 }}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />


                    <Button
                        loading={isSubmitting}
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            textTransform: 'none'
                        }}
                    >
                        Giriş Yap
                    </Button>

                    {/* Grid hatalarını önlemek için Grid2 ve size kullandık */}
                    <Grid container spacing={2} sx={{ mt: 3, width: '100%' }}>
                        <Grid size={{ xs: true }}>
                            <Link href="#" variant="body1">
                                Şifremi Unuttum
                            </Link>
                        </Grid>
                        <Grid>
                            <Link component={RouterLink} to="/register" variant="body1">
                                {"Kayıt Ol"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}