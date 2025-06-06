import React, { useState } from 'react';
import { 
  VStack, 
  Input, 
  InputGroup, 
  Button
} from "@chakra-ui/react";
import { 
  FormControl,
  FormLabel
} from "@chakra-ui/form-control";
import { InputRightElement } from "@chakra-ui/input";
import { Toaster, toaster } from "../ui/toaster.jsx";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    
    const handleClick = () => setShow(!show);

    <Toaster />
    const postDetails = (pics) => {
        setLoading(true);
        if(pics === undefined) {
            toaster.create({
                title: "Please select an image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position:"bottom",
            });
            return;
        }

        if(pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "Chat-App");
            data.append("cloud_name", "primish");

            fetch("https://api.cloudinary.com/v1_1/primish/image/upload", {
                method: "post",
                body: data,
            })
            .then((res) => res.json())
            .then((data) => {
                setPic(data.url.toString());
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
        else {
            toaster.create({
                title: "Please select a valid image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position:"bottom",
            });
            setLoading(false);
            return;
        }
    };

    const submitHandler = async() => {
        setLoading(true);
        if(!name || !email || !password || !confirmPassword) {
            toaster.create({
                title: "Please fill all the fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position:"bottom",
            });
            setLoading(false);
            return;
        }

        if(password !== confirmPassword) {
            toaster.create({
                title: "Passwords do not match!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position:"bottom",
            });
            return;
        }
        try {
            const config= {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post("/api/user", {name,email,password,pic},
                config
            );

            toaster.create({
                title: "Registration Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position:"bottom",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);

            history.push("/chats");
        } catch (error) {
            toaster.create({
                title: "Error Occurred!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom",
            });
            setLoading(false);   
        }
    };

    return (
        <VStack spacing='5px' color="black">
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                    placeholder='Enter your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input 
                        type={show ? "text" : "password"}
                        placeholder='Enter your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='confirm-password' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input 
                        type={show ? "text" : "password"}
                        placeholder='Confirm your Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='pic'>
                <FormLabel>Upload your Picture</FormLabel>
                <Input 
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button
                width='100%'
                colorScheme='teal'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;