import { Flex, VStack, HStack, Button, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";
import { ProfileSchema } from "../validations/ProfileSchema";
import ErrorInput from "../components/inputs/ErrorInput";
import AvatarInput from "../components/inputs/AvatarInput";

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ProfileSchema),
  });
  function onSubmit(data: any) {
    return new Promise(() => {
      setTimeout(() => {
        console.log(data);
      }, 3000);
    });
  }
  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Flex w="100%" my="6" mx="auto" maxWidth="1480" px={{ base: 2, lg: 6 }}>
        <SideBar />
        <VStack
          as="form"
          p={{ base: "4", lg: "8" }}
          align="center"
          w="100%"
          spacing={8}
          bg="gray.800"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading size="lg" mr="auto" fontWeight="normal">
            Profile
          </Heading>
          <AvatarInput
            id="image"
            register={register}
            name="Thiago P"
            size="lg"
            errors={errors}
          />
          <VStack width="100%" maxW="480" spacing={4}>
            <ErrorInput
              id="name"
              placeholder="name"
              register={register}
              iconType="user"
              errors={errors}
            />
            <ErrorInput
              id="password"
              placeholder="password"
              register={register}
              iconType="lock"
              errors={errors}
            />
            <HStack spacing={4} justifyContent="flex-end" w="100%">
              <Button size="sm" w={20} colorScheme="gray" color="gray.700">
                Cancel
              </Button>
              <Button size="sm" w={20} type="submit">
                Save
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { "phisicaldash.token": token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};
