import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { baseUrl } from '../constant/baseUrl';
import axios from 'axios';

import { toast } from 'react-toastify'


export default function SignIn() {
  // const [formData, setFormData] = useState({});
  // const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email === "" || password === "") {
      toast('Please Fill All the fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      // setError("Please fill all fields")
    }

    else {
      const user = {

        email: email.toLowerCase(),
        password: password
      }


      axios.defaults.withCredentials = true;

      await axios.post(`${baseUrl}/api/auth/signin`, user).then((res) => {
        console.log(res.data)
        // setError(res.data.message)
        //toast(res.data.message, { type: "success" })
        dispatch(signInSuccess(res.data.data))
        navigate("/")
      })
        .catch((error) => {
          toast(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          console.log(error)
          // setError(error.response.data.message)
          // toast(error.response.data.message, { type: "error" })
        })

    }

  };
  return (
    <div>
      <div className='min-h-screen sign-in-page'>
        <div className='flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20'>
          {/* left */}
          <div className='flex-1 mt-20'>
            <Link to='/' className='font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-blue-500 rounded-lg text-white'>
                Techs
              </span>
              Blog
            </Link>
            <p className='text-sm mt-5'>
              This is a Blog project. You can sign in with your email and password.
            </p>
            <img src="girls.jpg.png" />
          </div>
          {/* right */}

          <div className='flex-1 mt-15'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <Label value='Your email' />
                <TextInput
                  type='email'
                  placeholder='name@company.com'
                  id='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label value='Your password' />
                <TextInput
                  type='password'
                  placeholder='**********'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                gradientDuoTone='purpleToBlue'
                type='submit'
              // disabled={loading}
              >
                Sign In
              </Button>

            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Dont Have an account?</span>
              <Link to='/sign-up' className='text-blue-500'>
                Sign Up
              </Link>
            </div>
            {/* {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )} */}
          </div>
        </div>
      </div>
      
    </div>
  );
}