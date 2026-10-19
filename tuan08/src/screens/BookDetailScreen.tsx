import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Button, FlatList, ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/hooks';
import { Book, Review, bookService } from '../services/bookService';
import { averageRating } from '../utils/rating';
import RatingStars from '../components/RatingStars';
import type { RootStackParamList } from '../navigation/types';

export default function BookDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'BookDetail'>) {
  const { bookId } = route.params;
  const { token, user } = useAppSelector((s) => s.auth);

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    Promise.all([bookService.get(bookId), bookService.list()])
      .then(([b, all]) => {
        if (!alive) return;
        setBook(b);
        setReviews(b.reviews ?? []);
        setRelated(all.filter((x) => x.id !== b.id && !!b.category && x.category === b.category));
      })
      .catch((e: unknown) => alive && setError(e instanceof Error ? e.message : 'Có lỗi xảy ra'))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [bookId]);

  const avg = useMemo(() => averageRating(reviews), [reviews]);

  const submit = useCallback(async () => {
    if (!token || !user) return;
    if (stars < 1) return setFormError('Vui lòng chọn số sao');
    if (!comment.trim()) return setFormError('Vui lòng nhập bình luận');
    setFormError(null);
    setSubmitting(true);
    try {
      const created = await bookService.addReview(token, {
        bookId,
        userId: user.id,
        userName: user.email.split('@')[0],
        rating: stars,
        comment: comment.trim(),
      });
      setReviews((prev) => [created, ...prev]); // cập nhật list + điểm TB, không reload
      setStars(0);
      setComment('');
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Gửi đánh giá thất bại');
    } finally {
      setSubmitting(false);
    }
  }, [token, user, bookId, stars, comment]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (error || !book) return <Text style={styles.error}>{error ?? 'Không tìm thấy sách'}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{book.title}</Text>

      <View style={styles.row}>
        <RatingStars value={avg} size={24} />
        <Text style={styles.avg}>{avg.toFixed(1)} ({reviews.length} đánh giá)</Text>
      </View>

      <Text style={styles.section}>Đánh giá</Text>
      {reviews.length === 0 && <Text style={styles.muted}>Chưa có đánh giá nào.</Text>}
      {reviews.map((r) => (
        <View key={r.id} style={styles.review}>
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <Text style={styles.bold}>{r.userName}</Text>
            <RatingStars value={r.rating} size={14} />
          </View>
          <Text style={{ marginTop: 4 }}>{r.comment}</Text>
          <Text style={styles.date}>{new Date(r.createdAt).toLocaleDateString('vi-VN')}</Text>
        </View>
      ))}

      <Text style={styles.section}>Viết đánh giá</Text>
      {token ? (
        <View>
          <RatingStars value={stars} size={32} onChange={setStars} />
          <TextInput
            style={styles.input}
            placeholder="Bình luận của bạn"
            multiline
            value={comment}
            onChangeText={(t) => { setComment(t); setFormError(null); }}
          />
          {!!formError && <Text style={styles.error}>{formError}</Text>}
          <Button title={submitting ? 'Đang gửi...' : 'Gửi đánh giá'} onPress={submit} disabled={submitting} />
        </View>
      ) : (
        <Button
          title="Đăng nhập để đánh giá"
          onPress={() =>
            navigation.navigate('Auth', { redirectTo: 'BookDetail', redirectParams: { bookId } })
          }
        />
      )}

      {related.length > 0 && (
        <>
          <Text style={styles.section}>Sách liên quan</Text>
          <FlatList
            horizontal
            data={related}
            keyExtractor={(b) => b.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.push('BookDetail', { bookId: item.id })}
              >
                <Text numberOfLines={2} style={styles.bold}>{item.title}</Text>
                <RatingStars value={averageRating(item.reviews ?? [])} size={14} />
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  avg: { fontSize: 15, color: '#555' },
  section: { fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 8 },
  muted: { color: '#888' },
  bold: { fontWeight: '600' },
  review: { paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#ccc' },
  date: { fontSize: 12, color: '#888', marginTop: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginVertical: 12, minHeight: 80, textAlignVertical: 'top' },
  error: { color: '#dc2626', marginBottom: 8 },
  card: { width: 140, padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, gap: 6 },
});
