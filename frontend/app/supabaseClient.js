import { createClient } from '@supabase/supabase-js'

const supbase_url = 'https://rqlkruvushnznnactrcj.supabase.co';
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxbGtydXZ1c2huem5uYWN0cmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMzcwNzcsImV4cCI6MjA1MzcxMzA3N30.qn1Zz24Uv9N_PeW5tW3tOi3Fr385V_v6twG4C0cmcy4'
export const supabase = createClient(supbase_url, supabase_key)