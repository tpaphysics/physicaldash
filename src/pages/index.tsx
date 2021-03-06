import {
  Button,
  VStack,
  Flex,
  Text,
  Box,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import type { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { avatars } from "../../arrays";
import api from "../api/api";
import Avatars from "../components/home/Avatars";
import ErrorInput from "../components/inputs/ErrorInput";
import { useAuth } from "../hooks/AuthHook";
import { SigInSchema } from "../validations/SignInSchema";

const Home: NextPage = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SigInSchema),
  });

  function onSubmit(data: any) {
    return new Promise(() => {
      setTimeout(() => {
        signIn(data);
      }, 3000);
    });
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      flexDir={isWideVersion ? "row" : "column"}
    >
      <Flex
        w="100%"
        maxW={290}
        borderRadius={8}
        flexDir="column"
        marginRight={24}
        mx={isWideVersion ? "" : "auto"}
        alignItems={isWideVersion ? "" : "center"}
        justifyContent="center"
        mb={{ base: 8, lg: 0 }}
      >
        <Image src="logo.png" alt="phisicaldash" width={220} />
        {isWideVersion && (
          <>
            <Text
              fontWeight="600"
              textAlign="left"
              lineHeight={1.2}
              fontSize="5xl"
              marginTop={8}
            >
              Your the best platform
            </Text>
            <Avatars mt={4} avatarSize="md" avatars={avatars} />
          </>
        )}
      </Flex>
      <Flex flexDir="row">
        <Box width="1px" bg="yellow.400" h={64} my="auto" />
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          w="100%"
          maxW={460}
          bg="gray.800"
          p={16}
          borderRadius={8}
        >
          <VStack w="100%" spacing={4}>
            <ErrorInput
              id="email"
              errors={errors}
              register={register}
              iconType="user"
              placeholder="email"
            />
            <ErrorInput
              id="password"
              errors={errors}
              register={register}
              iconType="lock"
              placeholder="Your password"
              isPassword
            />
            <Button isFullWidth type="submit">
              Sigin
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { "phisicaldash.token": token } = parseCookies(ctx);
  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};
