import { useReducer, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

interface LoginState {
  email: string;
  password: string;
  error: string;
}
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "RESET" };

const initialState: LoginState = {
  email: "",
  password: "",
  error: "",
};

function formReducer(state: LoginState, action: Action): LoginState {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
        error: "",
      };

    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
        error: "",
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
const LoginScreen = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleLogin = async () => {
    if (!state.email || !state.password) {
      dispatch({
        type: "SET_ERROR",
        payload: "Vui lòng nhập đầy đủ thông tin",
      });
      return;
    }

    if (!state.email.includes("@")) {
      dispatch({
        type: "SET_ERROR",
        payload: "Email phải chứa '@'",
      });
      return;
    }

    if (state.password.length < 6) {
      dispatch({
        type: "SET_ERROR",
        payload: "Mật khẩu có ít nhất sáu ký tự.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await delay(3000);

      dispatch({ type: "RESET" });
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: "Lỗi khi đăng nhập",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ gap: 10 }}>
      <TextInput
        style={{
          borderColor: "#000",
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
        }}
        value={state.email}
        onChangeText={(text) => dispatch({ type: "SET_EMAIL", payload: text })}
        placeholder="Email"
      />

      <TextInput
        style={{
          borderColor: "#000",
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
        }}
        value={state.password}
        onChangeText={(text) =>
          dispatch({ type: "SET_PASSWORD", payload: text })
        }
        placeholder="Mật khẩu"
        secureTextEntry
      />
      {state.error ? <Text>{state.error}</Text> : null}

      <Button title="Đăng nhập" onPress={handleLogin} disabled={isSubmitting} />
      <Button title="Đặt lại" onPress={() => dispatch({ type: "RESET" })} />
    </View>
  );
};

export default LoginScreen;
