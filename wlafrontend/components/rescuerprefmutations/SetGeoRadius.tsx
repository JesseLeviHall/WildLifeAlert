//set radius
import * as React from "react";
import { Text, Keyboard, View, TouchableOpacity } from "react-native";
import { FormControl, Input, Button } from "native-base";
import { useMutation } from "@tanstack/react-query/build/lib";
import { setGeoRadius } from "../../api/index";
import { useAuth } from "@clerk/clerk-expo";
import SuccessToast from "../../components/SuccessToast";

type Props = {
  geoRadiusProp: string;
};
type Errors = {
  Radius: string;
};

const SetGeoRadius = ({ geoRadiusProp }: Props) => {
  const [error, setError] = React.useState("");
  const [errors, setErrors] = React.useState<Errors>({
    Radius: "",
  });
  const [showToast, setShowToast] = React.useState(false);
  const [Radius, setRadius] = React.useState(geoRadiusProp);
  const { sessionId, getToken } = useAuth();
  const [token, setToken] = React.useState<string | null>(null);
  React.useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      if (fetchedToken) {
        setToken(fetchedToken);
      }
    };
    fetchToken();
  }, []);

  const mutation = useMutation(setGeoRadius, {
    onSuccess: () => {
      // Show the toast when the mutation is successful
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1200);
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  const validate = async () => {
    const radiusPattern = /^(?:[1-9][0-9]{0,2}|1000)$/;
    let updatedErrors = {
      Radius: "",
    };

    if (!radiusPattern.test(Radius)) {
      updatedErrors.Radius = "whole numbers 1-1000";
    }
    setErrors(updatedErrors);
    if (updatedErrors.Radius === "") {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmitGeoPref = async () => {
    if (mutation.isLoading || mutation.error) return;
    try {
      const isValid = await validate();
      if (isValid) {
        setError("");
        Keyboard.dismiss();
        const token = await getToken();
        if (sessionId && token !== null) {
          mutation.mutate({ sessionId, token, Radius });
        } else {
          throw new Error("Session ID, token, or user details is undefined");
        }
      }
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="items-center w-full h-36 justify-center">
      <Text className=" text-lg mb-1 font-semibold">
        Alert Radius: {Radius} miles
      </Text>
      <FormControl className="w-1/2">
        <Input
          className=" bg-[#d4e1ea] w-2/3"
          placeholder="Enter Alert Radius"
          variant="filled"
          keyboardType="numeric"
          onChangeText={(text) => setRadius(text)}
          value={Radius}
          onSubmitEditing={Keyboard.dismiss}
        />
        {"Radius" in errors ? (
          <FormControl.HelperText className="items-center text-center ">
            {errors.Radius}
          </FormControl.HelperText>
        ) : null}
      </FormControl>
      <TouchableOpacity
        className="border rounded-full px-4 py-2 -mt-2 border-cyan-500 "
        onPress={handleSubmitGeoPref}
      >
        <Text className="text-white font-thin">Save</Text>
      </TouchableOpacity>
      {showToast && (
        <View className="-mt-16 h-16 rounded-lg">
          <SuccessToast message="Radius Set" />
        </View>
      )}
    </View>
  );
};

export default SetGeoRadius;
