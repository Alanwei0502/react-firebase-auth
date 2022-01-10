import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const history = useHistory();
  const query = useQuery();
  const toast = useToast();
  const { resetPassword } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    resetPassword(query.get("oobCode"), newPassword)
      .then((res) => {
        toast({
          description: "Password has been changed, you can login now.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        history.push("/login");
      })
      .catch((err) => {
        toast({
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Reset password
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form onSubmit={onSubmit}>
          <Stack spacing="6">
            <FormControl id="password">
              <FormLabel>New password</FormLabel>
              <Input
                type="password"
                autoComplete="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="primary" size="lg" fontSize="md">
              Reset password
            </Button>
          </Stack>
        </chakra.form>
      </Card>
    </Layout>
  );
}
