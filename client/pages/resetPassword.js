import Layout from "../components/Layout";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';

const RESET_PASSWORD = gql`
    mutation resetPassword($input: resetPasswordInput){
        resetPassword(input:$input){
        email
        }
    }
`;




 function resetPassword(){

    const [resetPassword] =useMutation(RESET_PASSWORD);

    const formik = useFormik({
        initialValues: {
            email:'',
            password: '',
            confirmPassword:''            
        },
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('El email no es válido')
                        .required('El email no puede ir vacio'),
            password: Yup.string()
                        .required('El password es obligatorio'),
            confirmPassword: Yup.string()
                        .required('La confirmación es necesaria')
        }),
        onSubmit: async values => {
            //console.log(values);

            const { email, password, confirmPassword } = values;

            try {
                const { data } = await resetPassword({
                    variables:{
                        input:{
                            email,
                            password,
                            confirmPassword
                        }
                    }
                });
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
    })


    return(
        <>
            <Layout>
                <h1 className="text-center text-black">Reiniciar Contraseña</h1> 

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-gray-100 px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                           
                        >   

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email Usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </div>

                            { formik.touched.email && formik.errors.email ? (
                                <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ): null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Nueva Contraseña
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Nueva Contraseña"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}                                    
                                />
                            </div>

                            { formik.touched.password && formik.errors.password ? (
                                <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ): null }                            

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                    Confirmar Contraseña
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmPassword"
                                    type="Password"
                                    placeholder="Confirma Contraseña"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleChange}
                                    value={formik.values.confirmPassword}                                   
                                />
                            </div>

                            { formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.confirmPassword}</p>
                                </div>
                            ): null }   

                         

                           

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                value="reiniciar contraseña"
                            
                            />
                        </form>
                    </div>
                </div>
                    
            </Layout>            
            
        </>
            
        
        
    )
};

export default resetPassword;