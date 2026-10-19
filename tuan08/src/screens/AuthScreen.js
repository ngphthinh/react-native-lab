import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearError } from '../redux/authSlice';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(mode, { email, password, confirm }) {
  const errors = {};
  if (!email.trim()) errors.email = 'Vui lòng nhập email';
  else if (!EMAIL_REGEX.test(email.trim())) errors.email = 'Email không hợp lệ';

  if (!password) errors.password = 'Vui lòng nhập mật khẩu';
  else if (password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự';

  if (mode === 'register') {
    if (!confirm) errors.confirm = 'Vui lòng nhập lại mật khẩu';
    else if (confirm !== password) errors.confirm = 'Mật khẩu nhập lại không khớp';
  }
  return errors;
}

export default function AuthScreen({ navigation, route }) {
  const redirectTo = route.params?.redirectTo; // vd: 'Checkout'
  const dispatch = useDispatch();
  const { loading, error: serverError } = useSelector((s) => s.auth);

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const onChange = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (serverError) dispatch(clearError());
  };

  const switchMode = (next) => {
    setMode(next);
    setErrors({});
    dispatch(clearError());
  };

  const goAfterLogin = () => {
    if (redirectTo) {
      // replace: Auth bị thay bằng Checkout, nút Back quay về màn trước đó
      navigation.replace(redirectTo);
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  };

  const onSubmit = async () => {
    const errs = validate(mode, form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const action = mode === 'login' ? login : register;
    try {
      await dispatch(action({ email: form.email.trim(), password: form.password })).unwrap();
      goAfterLogin();
    } catch {
      // lỗi từ server đã nằm trong state.auth.error
    }
  };

  const isLogin = mode === 'login';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.tabs}>
        {[['login', 'Đăng nhập'], ['register', 'Đăng ký']].map(([key, label]) => (
          <TouchableOpacity
            key={key}
            style={[styles.tab, mode === key && styles.tabActive]}
            onPress={() => switchMode(key)}
          >
            <Text style={[styles.tabText, mode === key && styles.tabTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.email}
        onChangeText={onChange('email')}
      />
      {!!errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Mật khẩu"
        secureTextEntry
        value={form.password}
        onChangeText={onChange('password')}
      />
      {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {!isLogin && (
        <>
          <TextInput
            style={[styles.input, errors.confirm && styles.inputError]}
            placeholder="Nhập lại mật khẩu"
            secureTextEntry
            value={form.confirm}
            onChangeText={onChange('confirm')}
          />
          {!!errors.confirm && <Text style={styles.error}>{errors.confirm}</Text>}
        </>
      )}

      {!!serverError && <Text style={[styles.error, styles.serverError]}>{serverError}</Text>}

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  tabs: { flexDirection: 'row', marginBottom: 24 },
  tab: { flex: 1, paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: '#ddd', alignItems: 'center' },
  tabActive: { borderBottomColor: '#2563eb' },
  tabText: { color: '#888', fontSize: 16 },
  tabTextActive: { color: '#2563eb', fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginTop: 12, fontSize: 16 },
  inputError: { borderColor: '#dc2626' },
  error: { color: '#dc2626', fontSize: 13, marginTop: 4 },
  serverError: { marginTop: 12, textAlign: 'center' },
  button: { backgroundColor: '#2563eb', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
