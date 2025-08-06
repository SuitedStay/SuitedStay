import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ezbbmhohtapeqgcroskq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6YmJtaG9odGFwZXFnY3Jvc2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2ODQyNTUsImV4cCI6MjA0NzI2MDI1NX0.wN3R2rt17C0gNRqDHA8oAtV9TQI3RsEBPNfss5Q_m-A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)