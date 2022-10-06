import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "../../../lib/tailwind";
import LoginQuery from "../../graphql/mutations/User/LoginQuery";
import { AUTHENTICATE_USER_IN_STORE, user } from "../../slicer/authReducer";

export default function Login() {

  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [loginMutation] = useMutation(LoginQuery, {
    variables: {
      loginUserInput: { mail, password },
    },
    onCompleted(data) {
      dispatch(
        AUTHENTICATE_USER_IN_STORE({
          user: data.Login.user,
          token: data.Login.token,
        })
      );
    },
    onError(error) {
      console.error(JSON.stringify(error, null, 2));
    },
  });

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={tw`flex mt-25 w-100`}>
        <View style={tw`m-auto mb-15`}>
          <Image
            source={require("mobile/src/assets/img/lasthope_column.png")}
            style={tw`w-60 h-55`}
          />
        </View>
        <View style={tw`flex flex-col items-center justify-center w-80 m-auto`}>
          <TextInput
            onChangeText={(mail) => setMail(mail)}
            style={tw`border   mb-6  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="Mail"
          ></TextInput>
          <TextInput
            onChangeText={(password) => {
              setPassword(password)
            }}
            style={tw`border   rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="Password"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View style={tw`mt-10`}>
          <Pressable
            onPress={() => loginMutation()}
            style={tw`bg-primary w-80 mt-4 m-auto text-white font-bold py-2 px-4 rounded`}
          >
            <Text style={tw`text-center text-white p-1 text-lg`}>
              Login
            </Text>
          </Pressable>
          <View style={tw`text-center mt-6`}>
            <Text style={tw`text-center p-2`}>Lost password ?</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
