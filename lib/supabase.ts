import { createClient } from '@supabase/supabase-js'

const supabaseUrl = typeof window !== 'undefined' 
  ? window.location.hostname === 'localhost' 
  https://ezbbmhohtapeqgcroskq.supabase.co

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6YmJtaG9odGFwZXFnY3Jvc2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1Mzg3ODgsImV4cCI6MjA2OTExNDc4OH0.v5OwSPPKgXCa02faRrYujwbjxF1TRJ602rTT8b3gSZY'  // Replace with your actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)