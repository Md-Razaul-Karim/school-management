// ─── SUPABASE CONFIG ───
// Replace with YOUR values from Supabase Settings → API
const SUPABASE_URL = 'https://jogqwkklqmgxzjejmeoo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZ3F3a2tscW1neHpqZWptZW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MTkxMzAsImV4cCI6MjA5NzA5NTEzMH0.DnQy1LraFGYSiAM2CojxN2HnbGANmt3TbMCQTiVaDKw';

// Initialize Supabase client
const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ─── AUTH FUNCTIONS ───

// Login with email and password
async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

// Logout
async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current logged in user
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Get user role from users table
async function getUserRole(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('role, full_name')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

// ─── DATA FUNCTIONS ───

// Fetch all students
async function fetchStudents() {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('roll', { ascending: true });
  if (error) throw error;
  return data;
}

// Fetch single student by ID
async function fetchStudentById(studentId) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('student_id', studentId)
    .single();
  if (error) throw error;
  return data;
}

// Fetch all teachers
async function fetchTeachers() {
  const { data, error } = await supabase
    .from('teachers')
    .select('*');
  if (error) throw error;
  return data;
}

// Fetch notices
async function fetchNotices() {
  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// Fetch books
async function fetchBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*');
  if (error) throw error;
  return data;
}

// Fetch exams
async function fetchExams() {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .order('exam_date', { ascending: false });
  if (error) throw error;
  return data;
}

// Save attendance
async function saveAttendance(records) {
  const { data, error } = await supabase
    .from('attendance')
    .upsert(records);
  if (error) throw error;
  return data;
}

// Add new student
async function addStudent(studentData) {
  const { data, error } = await supabase
    .from('students')
    .insert([studentData])
    .select();
  if (error) throw error;
  return data;
}

// Update student
async function updateStudent(studentId, updates) {
  const { data, error } = await supabase
    .from('students')
    .update(updates)
    .eq('student_id', studentId)
    .select();
  if (error) throw error;
  return data;
}

// Delete student
async function deleteStudent(studentId) {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('student_id', studentId);
  if (error) throw error;
}

// Save marks
async function saveMarks(marksData) {
  const { data, error } = await supabase
    .from('marks')
    .upsert(marksData);
  if (error) throw error;
  return data;
}

// Record fee payment
async function recordFeePayment(feeData) {
  const { data, error } = await supabase
    .from('fees')
    .insert([feeData])
    .select();
  if (error) throw error;
  return data;
}

// Add notice
async function addNotice(noticeData) {
  const { data, error } = await supabase
    .from('notices')
    .insert([noticeData])
    .select();
  if (error) throw error;
  return data;
}

// Real-time listener for notices
function subscribeToNotices(callback) {
  return supabase
    .channel('notices')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'notices' },
      callback
    )
    .subscribe();
}
